import * as funcionarioService from "./funcionario_firebase.js";
import * as funcionarioUI from "./funcionario_ui.js";

/**
 * Funcionários Feature
 * Orquestra a comunicação entre o Service e a UI Handler
 */

export async function init() {
  // Verifica se a página atual deve exibir a lista de funcionários
  if (!funcionarioUI.hasFuncionariosListContainer()) {
    return;
  }

  await loadAndRenderFuncionarios();
  setupDesativarFuncionarioListener();
}

// ==================== CARREGAMENTO E RENDERIZAÇÃO ====================

async function loadAndRenderFuncionarios() {
  try {
    const funcionarios = await funcionarioService.getAllFuncionarios();
    funcionarioUI.renderFuncionariosList(funcionarios);
  } catch (error) {
    console.error("Erro ao carregar lista de funcionários:", error);
    // Opcional: mostrar mensagem de erro na UI
  }
}

// ==================== EVENT LISTENERS ====================

function setupDesativarFuncionarioListener() {
  document.addEventListener("desativarFuncionario", async (event) => {
    const { funcionarioId } = event.detail;

    if (!funcionarioId) return;

    try {
      await funcionarioService.desativarFuncionario(funcionarioId);
      funcionarioUI.removeFuncionarioFromList(funcionarioId);
    } catch (error) {
      console.error("Erro ao desativar funcionário:", error);
      // Aqui você pode chamar uma função da UI para mostrar erro, se quiser
    }
  });
}