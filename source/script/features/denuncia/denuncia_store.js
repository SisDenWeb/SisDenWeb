// features/denuncia/denuncia_store.js

import { denunciaRepository } from "./denuncia_repository.js";

class DenunciaStore {
  constructor() {
    this.state = {
      denuncias: [],
      denunciasNaoVisualizadasParaMim: [], // Apenas as não visualizadas pelo usuário atual
      loading: false,
      error: null,
      modalDetalheDeDenunciaAberto: false,
      denunciaSelecionada: null,
    };

    this.listeners = [];
    this.currentUser = null; // Será preenchido ao logar
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () =>
      (this.listeners = this.listeners.filter((l) => l !== listener));
  }

  notify() {
    this.listeners.forEach((l) => l(this.state));
  }

  setCurrentUser(user) {
    this.currentUser = user;
  }

  async loadDenuncias(forceRefresh = false) {
    this.state.loading = true;
    this.notify();

    try {
      if (this.currentUser?.role === "paciente") {
        this.state.denuncias = await denunciaRepository.getAll(
          forceRefresh,
          this.currentUser.uid,
        );
      } else {
        this.state.denuncias = await denunciaRepository.getAll(forceRefresh);
      }
      this.state.denuncias = this.state.denuncias.map((denuncia) => {
        return this.mapDenuncia(denuncia);
      });

      this.updateUnviewedForCurrentUser();
    } catch (error) {
      console.error("Erro ao carregar denúncias:", error);
      this.state.error = "Não foi possível carregar as denúncias.";
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  mapDenuncia(denuncia) {
    if (denuncia.tipoProblema == "foco") {
      denuncia.tipoProblema = "Foco de Mosquito";
    }
    if (denuncia.tipoProblema == "sintomas") {
      denuncia.tipoProblema = "Alguém com sintomas suspeitos";
    }
    if (denuncia.tipoProblema == "criadouro") {
      denuncia.tipoProblema = "Criadouro em terreno baldio";
    }
    return denuncia;
  }

  async openModalDetalheDenuncia(id) {
    this.state.loading = true;
    this.notify();

    try {
      this.state.denunciaSelecionada = this.mapDenuncia(
        await denunciaRepository.getById(id),
      );
    } catch (error) {
      console.error("Erro ao carregar denúncia:", error);
      this.state.error = "Não foi possível carregar a denúncia.";
      throw error;
    } finally {
      this.state.modalDetalheDeDenunciaAberto = true;
      this.state.loading = false;
      this.notify();
    }
  }

  closeModalDetalheDenuncia() {
    this.state.modalDetalheDeDenunciaAberto = false;
    this.state.denunciaSelecionada = null;
    this.notify();
  }

  async createDenuncia(denunciaData) {
    this.state.loading = true;
    this.notify();

    if (this.currentUser.role !== "paciente") {
      this.state.error = "Usuário não é paciente.";
      throw new Error("Usuário não é paciente.");
    }

    denunciaData.pacienteId = this.currentUser.uid; // Associa denúncia ao usuário atual

    console.log("Criando denúncia com dados:", denunciaData);

    try {
      const id = await denunciaRepository.create(denunciaData);
      await this.loadDenuncias(true);
      return id;
    } catch (error) {
      this.state.error = "Não foi possível registrar a denúncia.";
      throw error;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  async markAsViewed(denunciaId) {
    if (!this.currentUser) return;

    try {
      await denunciaRepository.markAsViewedByUser(
        denunciaId,
        this.currentUser.uid,
      );

      this.state.denuncias = this.state.denuncias.map((denuncia) => {
        if (denuncia.id === denunciaId) {
          denuncia.visualizadoPor.push(this.currentUser.uid);
        }
        return denuncia;
      });

      // Atualiza localmente a lista de não visualizadas
      this.updateUnviewedForCurrentUser();
      this.notify();
    } catch (error) {
      console.error("Erro ao marcar como visualizada:", error);
    }
  }

  // newStatus as {status: "status", motivo: "motivo (opcional)"}
  updateDenunciaStatus(denunciaId, novoStatus, motivo = "", user) {
    return denunciaRepository.updateStatus(
      denunciaId,
      novoStatus,
      motivo,
      user,
    );
  }

  updateUnviewedForCurrentUser() {
    if (!this.currentUser) {
      this.state.denunciasNaoVisualizadasParaMim = this.state.denuncias;
      return;
    }

    this.state.denunciasNaoVisualizadasParaMim = this.state.denuncias.filter(
      (denuncia) => {
        return !denuncia.visualizadoPor.includes(this.currentUser.uid);
      },
    );
  }

  getUnviewedCount() {
    return this.state.denunciasNaoVisualizadasParaMim.length;
  }
}

export const denunciaStore = new DenunciaStore();
