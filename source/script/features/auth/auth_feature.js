// features/auth/auth_feature.js

import * as authUI from "./auth_ui.js";
import { authStore } from "./auth_store.js";

export function init() {
  authUI.initAuthUI();
  
  // Listener principal do Firebase Auth (responsável por redirecionamentos)
  authStore.initAuthListener();
  
  // Listeners dos eventos disparados pela UI
  setupUIEventListeners();
  
  // Subscription para reagir a mudanças de estado (UI, mensagens, etc.)
  setupStoreSubscription();
  
  // Tenta carregar usuário do cache local
  authStore.loadCurrentUser();
}

// ==================== EVENTOS DA UI ====================

function setupUIEventListeners() {
  document.addEventListener("loginAttempt", async (event) => {
    console.log("login")
    const { email, senha } = event.detail;
    try {
      await authStore.login(email, senha);
      // Não redireciona aqui. O onAuthStateChanged no repository fará isso.
    } catch (error) {
      // Erro é tratado no Store e exibido via subscription
    }
  });

  document.addEventListener("signupAttempt", async (event) => {
    const { nome, email, senha } = event.detail;
    try {
      await authStore.cadastrarPaciente(nome, email, senha);
    } catch (error) {
      // Erro tratado no subscription
    }
  });

  document.addEventListener("resetarSenhaAttempt", async (event) => {
    const { email } = event.detail;
    try {
      await authStore.resetPassword(email);
    } catch (error) {
      // Erro tratado no subscription
    }
  });

  document.addEventListener("logoutAttempt", async () => {
    try {
      await authStore.logout();
      // Redirecionamento será feito pelo onAuthStateChanged
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  });
}

// ==================== SUBSCRIPTION DO STORE ====================

function setupStoreSubscription() {
  authStore.subscribe((state) => {
    authUI.showCurrentUserInfoInMenu(state.currentUser);

    // Exibe mensagens de erro
    if (state.error) {
      authUI.showMessage(state.error, "error");
    }

    // Se for primeiro login, podemos mostrar uma mensagem ou redirecionar para onboarding
    if (state.isAuthenticated && state.isPrimeiroLogin) {
      authUI.showMessage("Bem-vindo! Por favor, complete seu cadastro.", "info");
      // Exemplo futuro: window.location.replace("/onboarding.html");
    }
  });
}