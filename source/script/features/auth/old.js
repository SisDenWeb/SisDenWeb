import * as authService from "./auth_firebase.js";
import * as authUI from "./auth_ui.js";

export function init() {
  authUI.setupAuthUIEvents();
  authService.initAuthListener();
  setupEventListeners();
}

export function getCurrentUser() {
  return authService.getCurrentUser();
}

function setupEventListeners() {
  setupLogoutListener();
  setupLoginListener();
  setupSignupListener();
  setupResetPasswordListener();
}

function setupLogoutListener() {
  document.addEventListener("logoutAttempt", async () => {
    try {
      await authService.logout();
      window.location.replace("/source/html/login/login.html");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  });
}

function setupLoginListener() {
  document.addEventListener("loginAttempt", async (event) => {
    const { email, senha } = event.detail;

    try {
      await authService.login(email, senha);
    } catch (error) {
      const errorMessage = authService.getErrorMessage(error);
      authUI.showMessage(errorMessage, "error");
    }
  });
}

function setupSignupListener() {
  document.addEventListener("signupAttempt", async (event) => {
    const { nome, email, senha } = event.detail;

    try {
      await authService.createPaciente(nome, email, senha);
    } catch (error) {
      const errorMessage = authService.getErrorMessage(error);
      authUI.showMessage(errorMessage, "error");
    }
  });
}

function setupResetPasswordListener() {
  document.addEventListener("resetarSenhaAttempt", async (event) => {
    const { email } = event.detail;

    try {
      await authService.resetPassword(email);
      authUI.showMessage("Um link para redefinir a senha foi enviado para seu e-mail.", "success");
    } catch (error) {
      const errorMessage = authService.getErrorMessage(error);
      authUI.showMessage(errorMessage, "error");
    }
  });
}