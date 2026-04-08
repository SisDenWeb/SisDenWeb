// features/caso/caso_store.js

import { casoRepository } from "./caso_repository.js";

class CasoStore {
  constructor() {
    this.state = {
      casos: [], // Todos os casos do Firebase
      casosFiltrados: [], // Casos após filtro de busca
      geoCasos: [], // Dados geo para o mapa
      searchTerm: "",
      searchFields: {
        nome: true,
        cartaoSus: false,
        id: false,
        municipio: false,
        agravo: false,
        dataNotificacao: false,
      },
      casoSelecionado: null,
      loading: false,
      modalAberto: false,
      modo: "create", // 'create' ou 'edit'
    };

    this.listeners = [];
    this.debounceTimer = null;
  }

  // ==================== SUBSCRIBE / NOTIFY ====================

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  // ==================== FILTRO COM DEBOUNCE ====================

  setSearchTerm(term) {
    this.state.searchTerm = term.trim();

    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.applyFilter();
    }, 300);
  }

  setActiveSearchFields(fields) {
    this.state.searchFields = { ...fields };
    this.applyFilter();
  }

  applyFilter() {
    const term = this.state.searchTerm.toLowerCase().trim();
    console.log(term);
    if (!term) {
      this.state.casosFiltrados = [...this.state.casos];
    } else {
      this.state.casosFiltrados = this.state.casos.filter((caso) =>
        this.matchesSearch(caso, term),
      );
    }

    this.notify();
  }

  matchesSearch(caso, term) {
    const fieldsToSearch = [];

    if (this.state.searchFields.nome)
      fieldsToSearch.push(caso.notificacao_individual?.nome_paciente);
    if (this.state.searchFields.cartaoSus)
      fieldsToSearch.push(caso.notificacao_individual?.cartao_sus);
    if (this.state.searchFields.id) fieldsToSearch.push(caso.id);
    if (this.state.searchFields.municipio)
      fieldsToSearch.push(caso.residencia?.municipio);
    if (this.state.searchFields.agravo)
      fieldsToSearch.push(caso.dados_gerais?.agravo_doenca);
    if (this.state.searchFields.dataNotificacao)
      fieldsToSearch.push(caso.dados_gerais?.data_notificacao);

    // Se nenhum campo específico estiver marcado, busca em tudo
    if (fieldsToSearch.length === 0) {
      return this.extractSearchableText(caso).includes(term);
    }

    return fieldsToSearch.some(
      (value) => value && String(value).toLowerCase().includes(term),
    );
  }

  extractSearchableText(caso) {
    const texts = [];
    const traverse = (obj) => {
      if (!obj || typeof obj !== "object") {
        if (obj != null && obj !== "") texts.push(String(obj).toLowerCase());
        return;
      }
      Object.values(obj).forEach((value) => traverse(value));
    };
    traverse(caso);
    return texts.join(" ");
  }

  getCasosFiltrados() {
    return this.state.casosFiltrados;
  }

  // ==================== DASHBOARD HELPERS ====================

  getDashboardStats() {
    const total = this.state.casos.length;
    const confirmados = this.state.casos.filter(
      (c) =>
        c.conclusao?.classificacao === "1" ||
        c.conclusao?.classificacao?.toLowerCase().includes("confirmado"),
    ).length;

    const graves = this.state.casos.filter(
      (c) =>
        c.dengue_grave?.apresentou === "1" ||
        c.dengue_grave?.apresentou === true,
    ).length;

    const topMunicipios = this.getTopMunicipios();
    const ultimosCasos = this.getUltimosCasos();

    return {
      totalCasos: total,
      casosConfirmados: confirmados,
      casosGraves: graves,
      casosEmInvestigacao: total - confirmados,
      topMunicipios: topMunicipios,
      ultimosCasos: ultimosCasos,
    };
  }

  getTopMunicipios(limit = 5) {
    const count = {};
    this.state.casos.forEach((caso) => {
      const municipio = caso.residencia?.municipio || "Não informado";
      count[municipio] = (count[municipio] || 0) + 1;
    });

    return Object.entries(count)
      .map(([nome, quantidade]) => ({ nome, quantidade }))
      .sort((a, b) => b.quantidade - a.quantidade)
      .slice(0, limit);
  }

  getUltimosCasos(limit = 5) {
    return [...this.state.casos]
      .sort((a, b) => {
        const dataA = new Date(a.dados_gerais?.data_notificacao || 0);
        const dataB = new Date(b.dados_gerais?.data_notificacao || 0);
        return dataB - dataA;
      })
      .slice(0, limit);
  }

  // ==================== CRUD ====================

  async loadCasos(forceRefresh = false) {
    this.state.loading = true;
    this.notify();

    try {
      this.state.casos = await casoRepository.getAll(forceRefresh);
      this.applyFilter();
      this.loadGeoCasos();
    } catch (error) {
      console.error("Erro ao carregar casos:", error);
    } finally {
      this.state.loading = false;
      this.notify();
    }
    return this.state.casos;
  }

  async loadGeoCasos() {
    if (!this.state.casos.length) await this.loadCasos();
    this.state.geoCasos = this.state.casos.map((caso) => ({
      id: caso.id,
      lat: parseFloat(caso.residencia.geo1),
      lon: parseFloat(caso.residencia.geo2),
      display_name: caso.notificacao_individual?.nome_paciente || "Sem nome",
      agravo: caso.dados_gerais?.agravo_doenca || "Desconhecido",
    }));
    return this.state.geoCasos;
  }

  async salvarCaso(data) {
    this.state.loading = true;
    this.notify();

    try {
      await casoRepository.save(data);
      await this.loadCasos(true);
      this.closeModal();
    } catch (error) {
      console.error("Erro ao salvar caso:", error);
      throw error;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  async deletarCaso(id) {
    try {
      await casoRepository.delete(id);
      this.state.casos = this.state.casos.filter((c) => c.id !== id);
      this.applyFilter();
      this.loadGeoCasos();
      this.notify();
    } catch (error) {
      console.error("Erro ao deletar caso:", error);
      throw error;
    }
  }

  async openModal(casoId = null) {
    try {
      if (casoId) {
        const caso = await casoRepository.getById(casoId);
        if (!caso)
          throw new Error("Caso com ID ${casoId} não encontrado para edição.");
        this.state.casoSelecionado = caso;
        this.state.modo = "edit";
      } else {
        // Abre para criação
        this.state.casoSelecionado = null;
        this.state.modo = "create";
      }
    } catch (error) {
      console.error("Erro ao abrir modal:", error);
    } finally {
      this.state.modalAberto = true;
      this.notify();
    }
  }

  closeModal() {
    this.state.modalAberto = false;
    this.state.casoSelecionado = null;
    this.notify();
  }
}

export const casoStore = new CasoStore();
