// features/denuncia/denuncia_feature.js
// Orquestrador principal da Feature de Denúncias

import * as denunciaFormUI from "./ui/denuncia_form_ui.js";
import * as denunciaListPacienteUI from "./ui/denuncia_list_paciente_ui.js";
import * as denunciaListFuncionarioUI from "./ui/denuncia_list_funcionario_ui.js";
import { denunciaStore } from "./denuncia_store.js";
import { authStore } from "../auth/auth_store.js";

export async function init() {
  const currentUser = authStore.getCurrentUser();

  if (!currentUser)
    throw new Error(
      "Usuário não autenticado. DenúnciaFeature requer um usuário logado.",
    );

  denunciaStore.setCurrentUser(currentUser);

  await denunciaStore.loadDenuncias();

  if (authStore.isPaciente() && denunciaListPacienteUI.hasContainer()) {
    denunciaListPacienteUI.setupDenunciaPacienteListListeners();
  }

  if (authStore.isFuncionario() && denunciaListFuncionarioUI.hasContainer()) {
    denunciaListFuncionarioUI.init(
      denunciaStore.state.denuncias,
      authStore.getCurrentUser().uid,
      denunciaStore.state.denunciasNaoVisualizadasParaMim.length,
    );
  }

  if (denunciaFormUI.hasContainer()) {
    denunciaFormUI.init();
  }

  setupUIEventListeners();

  setupStoreSubscription();
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
    console.log("Evento mudarStatusDenuncia recebido com dados:", {
      denunciaId,
      novoStatus,
      motivo,
    });
    await denunciaStore.updateDenunciaStatus(
      denunciaId,
      novoStatus,
      motivo,
      authStore.getCurrentUser(),
    );
    denunciaStore.closeModalDetalheDenuncia();
  });
}

// ==================== SUBSCRIPTION DO STORE ====================

function setupStoreSubscription() {
  denunciaStore.subscribe((state) => {
    if (authStore.isPaciente() && denunciaListPacienteUI.hasContainer()) {
      denunciaListPacienteUI.renderDenunciasPaciente(state.denuncias);
    }

    if (authStore.isFuncionario() && denunciaListFuncionarioUI.hasContainer()) {
      denunciaListFuncionarioUI.renderDenunciasFuncionario(
        state.denuncias,
        authStore.getCurrentUser().uid,
      );
      denunciaListFuncionarioUI.updateUnviewedCount(
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
