// features/denuncia/repository/denuncia_repository.js

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import { db } from "../../core/config_firebase.js";

const COLLECTION_NAME = "denuncias";
const CACHE_KEY = "denuncias_cache";
const CACHE_EXPIRATION = 10 * 60 * 1000; // 10 minutos

export const denunciaRepository = {
  // ==================== CRIAR DENÚNCIA ====================
  async create(denunciaData) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...denunciaData,
        status: "pendente",
        visualizadoPor: [], // Array de UIDs que já visualizaram
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      this.clearCache();
      return docRef.id;
    } catch (error) {
      console.error("Erro ao criar denúncia:", error);
      throw error;
    }
  },

  // ==================== BUSCAR TODAS AS DENÚNCIAS ====================
  async getAll(forceRefresh = false, pacienteId = null) {
    if (!forceRefresh) {
      const cached = this.getFromCache();
      if (cached) return cached;
    }

    try {
      let q;

      if (pacienteId) {
        console.log(`Buscando denúncias para pacienteId: ${pacienteId}`);
        // Paciente vê apenas suas denúncias
        q = query(
          collection(db, COLLECTION_NAME),
          where("pacienteId", "==", pacienteId),
          //orderBy("createdAt", "desc"),
        );
      } else {
        console.log("Buscando todas as denúncias para funcionário/admin");
        // Funcionário/Admin vê todas
        q = query(
          collection(db, COLLECTION_NAME),
          orderBy("createdAt", "desc"),
        );
      }

      const querySnapshot = await getDocs(q);
      const denuncias = [];

      querySnapshot.forEach((docSnap) => {
        denuncias.push({
          id: docSnap.id,
          ...docSnap.data(),
        });
      });

      this.saveToCache(denuncias);
      return denuncias;
    } catch (error) {
      console.error("Erro ao buscar denúncias:", error);
      throw error;
    }
  },

  async updateStatus(denunciaId, novoStatus, motivo = "", user) {
    if (!denunciaId || !novoStatus) {
      throw new Error("denunciaId e novoStatus são obrigatórios");
    }

    try {
      const denunciaRef = doc(db, COLLECTION_NAME, denunciaId);

      const entradaHistorico = {
        status: novoStatus,
        motivo: motivo.trim() || "Status atualizado",
        data: new Date().toISOString(),
        usuario: user.uid || "sistema",
        usuarioRole: user.nome || "desconhecido"
      };

      await updateDoc(denunciaRef, {
        status: novoStatus,
        updatedAt: serverTimestamp(),
        historicoStatus: arrayUnion(entradaHistorico)
      });

      this.clearCache();
      return true;
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      throw error;
    }
  },

  // ==================== MARCAR COMO VISUALIZADA POR USUÁRIO ====================
  async markAsViewedByUser(denunciaId, userUid) {
    if (!userUid) throw new Error("userUid é obrigatório");

    try {
      const denunciaRef = doc(db, COLLECTION_NAME, denunciaId);

      await updateDoc(denunciaRef, {
        visualizadoPor: arrayUnion(userUid), // Adiciona UID sem duplicar
        updatedAt: serverTimestamp(),
      });

      this.clearCache();
      return true;
    } catch (error) {
      console.error("Erro ao marcar denúncia como visualizada:", error);
      throw error;
    }
  },

  // ==================== BUSCAR DENÚNCIA POR ID ====================
  async getById(id) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar denúncia por ID:", error);
      throw error;
    }
  },

  // ==================== CACHE ====================
  getFromCache() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp > CACHE_EXPIRATION) {
        this.clearCache();
        return null;
      }

      return parsed.data;
    } catch (e) {
      return null;
    }
  },

  saveToCache(data) {
    try {
      const cacheData = {
        data: data,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (e) {
      console.warn("Não foi possível salvar cache de denúncias");
    }
  },

  clearCache() {
    localStorage.removeItem(CACHE_KEY);
  },
};
