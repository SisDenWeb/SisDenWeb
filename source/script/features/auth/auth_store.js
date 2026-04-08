// features/auth/auth_store.js

import { authRepository } from "./auth_repository.js";

class AuthStore {
  constructor() {
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isPrimeiroLogin: false,
      loading: false,
      error: null,
    };

    this.listeners = [];
  }

  // ==================== SUBSCRIBE / NOTIFY ====================

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // ==================== ACTIONS ====================

  async login(email, senha) {
    this.state.loading = true;
    this.state.error = null;
    this.notify();

    try {
      const result = await authRepository.login(email, senha);

      this.state.currentUser = {
        uid: result.user.uid,
        email: result.user.email,
        ...result.user  // inclui nome, role, etc.
      };
      this.state.isAuthenticated = true;
      this.state.isPrimeiroLogin = result.isPrimeiroLogin;

      this.notify();
      return result;
    } catch (error) {
      this.state.error = authRepository.getErrorMessage(error);
      this.notify();
      throw error;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  async cadastrarPaciente(nome, email, senha) {
    this.state.loading = true;
    this.state.error = null;
    this.notify();

    try {
      const user = await authRepository.createPaciente(nome, email, senha);

      this.state.currentUser = {
        uid: user.uid,
        email: email,
        nome: nome,
        role: "paciente",
        primeiroLogin: true,
      };
      this.state.isAuthenticated = true;
      this.state.isPrimeiroLogin = true;

      this.notify();
      return user;
    } catch (error) {
      this.state.error = authRepository.getErrorMessage(error);
      this.notify();
      throw error;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  async resetPassword(email) {
    this.state.loading = true;
    this.state.error = null;
    this.notify();

    try {
      await authRepository.resetPassword(email);
      this.notify();
    } catch (error) {
      this.state.error = authRepository.getErrorMessage(error);
      this.notify();
      throw error;
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  async logout() {
    console.log("logout")
    this.state.loading = true;
    this.notify();

    try {
      await authRepository.logout();
      
      // Limpa estado local
      this.state.currentUser = null;
      this.state.isAuthenticated = false;
      this.state.isPrimeiroLogin = false;
      
      this.notify();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      this.state.loading = false;
      this.notify();
    }
  }

  // ==================== CARREGAMENTO INICIAL ====================

  async loadCurrentUser() {
    // Tenta pegar do cache primeiro
    const cachedUser = authRepository.getCurrentUserFromCache();

    if (cachedUser) {
      this.state.currentUser = cachedUser;
      this.state.isAuthenticated = true;
      this.state.isPrimeiroLogin = cachedUser.primeiroLogin === true;
      this.notify();
      return;
    }

    // Se não tiver cache, aguarda o listener do Firebase
    // (o initAuthListener já está rodando no feature)
  }

  // ==================== GETTERS ====================

  getCurrentUser() {
    return this.state.currentUser;
  }

  isUserAuthenticated() {
    return this.state.isAuthenticated;
  }

  isFirstLogin() {
    return this.state.isPrimeiroLogin;
  }

  hasError() {
    return !!this.state.error;
  }

  getError() {
    return this.state.error;
  }

  initAuthListener() {
    authRepository.initAuthListener();
  }

}

// Exporta instância única (singleton)
export const authStore = new AuthStore();