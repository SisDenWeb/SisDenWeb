import { casoStore } from "./caso_store.js";
import { setupClickDelegation } from "./ui/caso_button_events.js";
import * as casoListaUI from "./ui/caso_lista_ui.js";
import * as casoFormUI from "./ui/caso_form_ui.js";
import * as casoMapaUI from "./ui/caso_mapa_ui.js";
import * as casoFilterUI from "./ui/caso_filter_modal.js";
import * as casoDashboardUI from "./ui/caso_dashboard_ui.js";

/**
 * Caso Feature
 * Responsável por orquestrar a comunicação entre UI, Store e Repository.
 * Mantém a UI burra (só dispara eventos simples).
 */

export async function init() {
  // Conecta o Store à UI (reatividade)
  setupStoreSubscription();

  const casos = await casoStore.loadCasos();
  const geoData = await casoStore.loadGeoCasos();
  const dashboardStats = casoStore.getDashboardStats();

  if (casoListaUI.hasContainer()) {
    casoFilterUI.initFiltroAvancado();
    casoListaUI.initCasoListUI(casos);
  }

  if (casoFormUI.hasContainer()) {
    casoFormUI.initCasoFormUI();
  }

  if (casoMapaUI.hasContainer()) {
    casoMapaUI.initMapaUI(geoData);
  }

  if (casoDashboardUI.hasContainer()) {
    casoDashboardUI.initDashboardUI(dashboardStats);
  }

  setupClickDelegation();
  setupEventListeners();
}

// ==================== ESCUTA EVENTOS DA UI ====================

function setupEventListeners() {
  document.addEventListener("novoCaso", () => {
    casoStore.openModal();
  });

  document.addEventListener("editarCaso", (event) => {
    const { id } = event.detail;
    if (id) {
      casoStore.openModal(id);
    }
  });

  document.addEventListener("deletarCaso", (event) => {
    const { id } = event.detail;
    console.log("id: ", id);
    if (id) {
      casoStore.deletarCaso(id);
    }
  });

  document.addEventListener("salvarCaso", async (event) => {
    try {
      const { data } = event.detail;
      await casoStore.salvarCaso(data);
      casoStore.closeModal();
    } catch (error) {
      console.error("Erro ao salvar caso:", error);
      // Aqui você pode disparar um evento de erro para a UI tratar, se quiser
    }
  });

  document.addEventListener("fecharModal", () => {
    casoStore.closeModal();
  });

  document.addEventListener("searchCasos", (e) => {
    casoStore.setSearchTerm(e.detail.term);
  });

  document.addEventListener("updateSearchFields", (e) => {
    casoStore.setActiveSearchFields(e.detail.fields);
  });

  document.addEventListener("editarLocalizacao", () => {
    casoMapaUI.updateMarkerPosition();
    casoMapaUI.toggleEditarLocalizacaoModal();
  });

  document.addEventListener("salvarLocalizacao", async (event) => {
    try {
      const {id} = event.detail;
      const {lat, lng} = casoMapaUI.getCurrentGeoCords();
      console.log("currentGeoCords: ", casoMapaUI.getCurrentGeoCords());
      console.debug("Salvando localização para caso ID:", id, "Lat:", lat, "Lng:", lng);
      await casoStore.updateGeolocalizacao(id, lat, lng);
      casoMapaUI.toggleEditarLocalizacaoModal();
      console.debug("Localização atualizada com sucesso.");
    }catch (error) {
      console.error("Erro ao salvar localização:", error);
      // Aqui você pode disparar um evento de erro para a UI tratar, se quiser
    }
  });

  document.addEventListener("fecharEditarLocalizacao", () => {
    casoMapaUI.toggleEditarLocalizacaoModal();
  });
}

// ==================== REATIVIDADE DO STORE ====================

function setupStoreSubscription() {
  casoStore.subscribe(async (state) => {
    console.debug("Store atualizado, re-renderizando UI...");
    if (casoListaUI.hasContainer()) {
      casoListaUI.renderCasosList(state.casosFiltrados);
    }

    if (casoMapaUI.hasContainer()) {
      casoMapaUI.updateMapLayers(state.geoCasos);
    }

    if (casoDashboardUI.hasContainer()) {
      casoDashboardUI.renderDashboard(casoStore.getDashboardStats());
    }

    // Controla abertura/fechamento do modal
    if (state.modalAberto) {
      if (state.modo === "edit" && state.casoSelecionado) {
        casoFormUI.openModalAsEditCase(state.casoSelecionado);
      } else {
        casoFormUI.openModalAsNewCase();
      }
    } else {
      casoFormUI.closeModalCase();
    }
  });
}
