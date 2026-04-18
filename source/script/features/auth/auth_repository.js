// features/auth/repository/auth_repository.js

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import { auth, db } from "../../core/config_firebase.js";

const CURRENT_USER_KEY = "current_user";
const CACHE_EXPIRATION = 30 * 60 * 1000; // 30 minutos

export const authRepository = {
  initAuthListener() {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        localStorage.removeItem(CURRENT_USER_KEY);
        const currentUrl = window.location.href;
        if (
          !currentUrl.endsWith("index.html") &&
          !currentUrl.endsWith("login.html")
        ) {
          window.location.replace("/source/html/index.html");
        }
        return;
      }

      const userProfile = await this.getUserProfile(user.uid);

      this.saveCurrentUser({
        uid: user.uid,
        email: user.email,
        ...userProfile,
      });

      await this.handleUserRoutePermission(user);
    });
  },

  async login(email, senha) {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential.user;

    const userProfile = await this.getUserProfile(user.uid);
    const isPrimeiroLogin = userProfile.primeiroLogin === true;

    // Salva no localStorage
    this.saveCurrentUser({
      uid: user.uid,
      email: user.email,
      ...userProfile,
    });

    return { user, isPrimeiroLogin };
  },

  async createPaciente(nome, email, senha) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha,
    );
    const user = userCredential.user;

    const userData = {
      uid: user.uid,
      email,
      nome,
      role: "paciente",
      active: true,
      createdAt: serverTimestamp(),
      primeiroLogin: true,
    };

    await setDoc(doc(db, "users", user.uid), userData);

    this.saveCurrentUser({
      uid: user.uid,
      email,
      ...userData,
    });

    return user;
  },

  async getUserProfile(uid) {
    try {
      const docSnap = await getDoc(doc(db, "users", uid));
      return docSnap.exists() ? docSnap.data() : { profileIncomplete: true };
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
      return null;
    }
  },

  async markFirstLoginAsDone(uid) {
    if (!uid) throw new Error("UID inválido");

    await updateDoc(doc(db, "users", uid), { primeiroLogin: false });

    // Atualiza cache local
    const current = this.getCurrentUserFromCache();
    if (current) {
      current.primeiroLogin = false;
      this.saveCurrentUser(current);
    }
  },

  async resetPassword(email) {
    await sendPasswordResetEmail(auth, email);
  },

  async logout() {
    await signOut(auth);
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // ==================== CACHE LOCALSTORAGE ====================

  saveCurrentUser(userData) {
    const cache = {
      ...userData,
      timestamp: Date.now(),
    };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(cache));
  },

  getCurrentUserFromCache() {
    try {
      const cached = localStorage.getItem(CURRENT_USER_KEY);
      if (!cached) return null;

      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp > CACHE_EXPIRATION) {
        localStorage.removeItem(CURRENT_USER_KEY);
        return null;
      }
      return parsed;
    } catch (e) {
      return null;
    }
  },

  async handleUserRoutePermission(user) {
    try {
      const profile = await this.getUserProfile(user.uid);
      if (!profile) return;

      const role = profile.role;
      const currentPath = window.location.pathname;

      const allowedPaths = {
        admin: "/source/html/admin/",
        funcionario: "/source/html/funcionario/",
        paciente: "/source/html/paciente/",
      };

      const allowed = allowedPaths[role];
      if (allowed && !currentPath.startsWith(allowed)) {
        const dashboards = {
          admin: "/source/html/admin/admin-management.html",
          funcionario: "/source/html/funcionario/funcionario-cases.html",
          paciente: "/source/html/paciente/paciente-alerta.html",
        };
        window.location.replace(dashboards[role]);
      }
    } catch (error) {
      console.error("Erro ao verificar permissão:", error);
    }
  },

  getErrorMessage(error) {
    switch (error.code) {
      case "auth/wrong-password":
        return "Senha incorreta";
      case "auth/user-not-found":
        return "Usuário não encontrado";
      case "auth/invalid-email":
        return "Email inválido";
      case "auth/email-already-in-use":
        return "Este email já está cadastrado";
      case "auth/weak-password":
        return "Senha muito fraca";
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente mais tarde.";
      default:
        return error.message || "Ocorreu um erro inesperado.";
    }
  },
};
