// features/denuncia/denuncia_feature.js
// Orquestrador principal da Feature de Denúncias

import * as denunciaFormUI from "./ui/denuncia_form_ui.js";
import * as denunciaListPacienteUI from "./ui/denuncia_list_paciente_ui.js";
import * as denunciaListFuncionario from "./ui/denuncia_list_funcionario_ui.js";
import { denunciaStore } from "./denuncia_store.js";
import { authStore } from "../auth/auth_store.js";

export async function init() {
  const currentUser = authStore.getCurrentUser();

  console.log("authStore ", authStore);
  if (!currentUser)
    throw new Error(
      "Usuário não autenticado. DenúnciaFeature requer um usuário logado.",
    );

  console.log("DenunciaFeature: currentUser", currentUser);
  denunciaStore.setCurrentUser(currentUser);

  if (authStore.isPaciente()) {
    await denunciaStore.loadDenuncias();
  }
  if (authStore.isFuncionario()) {
    await denunciaStore.loadDenuncias();
    denunciaListFuncionario.init(
      denunciaStore.state.denuncias,
      authStore.getCurrentUser().uid,
    );
  }

  const isPacienteListPage =
    denunciaListPacienteUI.hasDenunciaPacienteListContainer();
  //const isFuncionarioPage = denunciaAlertUI.hasAlertContainer();

  denunciaFormUI.init();

  if (isPacienteListPage) {
    denunciaListPacienteUI.setupDenunciaPacienteListListeners();
  }

  //const isFuncionarioPage = denunciaListFuncionario.hasDenunciaFuncionarioListContainer();
  //if (isFuncionarioPage) {
  //  denunciaListFuncionario.setupDenunciaFuncionarioListListeners();
  //}

  // Configura listeners globais de eventos
  setupUIEventListeners();

  // Configura subscription reativa do Store
  setupStoreSubscription();

  // Define o usuário atual (importante para marcar visualizações individuais)

  // Carrega os dados iniciais
  await denunciaStore.loadDenuncias();
}

// ==================== EVENTOS DA UI ====================

function setupUIEventListeners() {
  // Evento disparado ao enviar nova denúncia (do modal)
  document.addEventListener("criarDenuncia", async (event) => {
    const denunciaData = event.detail;

    console.log("Evento criarDenuncia recebido com dados:", denunciaData);
    try {
      await denunciaStore.createDenuncia(denunciaData);
      // Feedback de sucesso já é mostrado no modal (pela UI)
    } catch (error) {
      console.error("Erro ao criar denúncia:", error);
    }
  });

  // Evento disparado quando funcionário visualiza uma denúncia
  document.addEventListener("denunciaVisualizada", async (event) => {
    const { id } = event.detail;
    console.log("Evento denunciaVisualizada recebido com ID:", id);
    if (id) {
      denunciaStore.openModalDetalheDenuncia(id);
      await denunciaStore.markAsViewed(id);
    }
  });

  document.addEventListener("voltarParaListaDenuncias", async () => {
    denunciaStore.closeModalDetalheDenuncia();
  });

  document.addEventListener("refreshDenuncias", async () => {
    await denunciaStore.loadDenuncias(true);
  });

  document.addEventListener("mudarStatusDenuncia", async (event) => {
    const { denunciaId, novoStatus, motivo } = event.detail;
    console.log("Evento mudarStatusDenuncia recebido com dados:", { denunciaId, novoStatus, motivo });
    await denunciaStore.updateDenunciaStatus(denunciaId, novoStatus, motivo, authStore.getCurrentUser());
    denunciaStore.closeModalDetalheDenuncia();
  });

}

// ==================== SUBSCRIPTION DO STORE ====================

function setupStoreSubscription() {
  denunciaStore.subscribe((state) => {
    // Atualiza lista do paciente (se estiver na tela de Minhas Denúncias)
    if (authStore.isPaciente()) {
      denunciaListPacienteUI.renderDenunciasPaciente(state.denuncias);
    }
    if (authStore.isFuncionario()) {
      denunciaListFuncionario.renderDenunciasFuncionario(
        state.denuncias,
        authStore.getCurrentUser().uid,
      );
      denunciaListFuncionario.updateUnviewedCount(
        state.denunciasNaoVisualizadasParaMim.length,
      );

      if (state.modalDetalheDeDenunciaAberto) {
        denunciaFormUI.openDetalhesDenuncia(state.denunciaSelecionada);
      } else {
        denunciaFormUI.closeModalDetalheDenuncia();
      }
    }

    // Atualiza alertas para funcionários
    //if (denunciaAlertUI.hasAlertContainer()) {
    //   denunciaAlertUI.renderAlerts(state.denunciasNaoVisualizadasParaMim);
    //}
  });
}

// ==================== FUNÇÕES PÚBLICAS ====================

/**
 * Retorna quantidade de denúncias não visualizadas (útil para badge no menu)
 */
export function getUnviewedCount() {
  return denunciaStore.getUnviewedCount();
}

/**
 * Recarrega manualmente as denúncias
 */
export async function refreshDenuncias() {
  await denunciaStore.loadDenuncias(true);
}
