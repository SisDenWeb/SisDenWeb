// features/caso/repository/caso_repository.js

import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  doc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import { db } from "../../core/config_firebase.js";

const CACHE_KEY = "caso_repository_cache";
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutos

/**
 * Funções para lidar com os casos no Firebase e no cache local,
 * - busca de todos os casos
 * - salvamento de casos
 * - deleção de casos
 * - busca de caso por ID
 * Nenhuma função presente aqui lida com manipulação de DOM
 */

export const casoRepository = {
  // ==================== GET ALL ====================
  async getAll(forceRefresh = false) {
    if (!forceRefresh) {
      console.debug("Carregando casos do cache...");
      const cached = this.getFromCache();
      if (cached) return cached;
    }

    try {
      console.debug("Carregando casos do Firebase...");
      const querySnapshot = await getDocs(collection(db, "casos"));
      const lista = [];

      querySnapshot.forEach((docSnap) => {
        const caso = docSnap.data();
        caso.id = docSnap.id;
        lista.push(caso);
      });

      this.saveToCache(lista);
      return lista;
    } catch (error) {
      console.error("Erro no repository getAll:", error);
      throw error;
    }
  },

  // ==================== GET BY ID (com cache) ====================
  async getById(id) {
    // Primeiro tenta buscar no cache
    const cachedList = this.getFromCache();
    if (cachedList) {
      const found = cachedList.find((c) => c.id === id);
      if (found) {
        console.debug(`✅ Caso ${id} encontrado no cache`);
        return found;
      }
    }

    // Se não encontrou no cache, busca no Firebase
    try {
      const docRef = doc(db, "casos", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const caso = { id: docSnap.id, ...docSnap.data() };
        console.debug(`✅ Caso ${id} carregado do Firebase`);
        return caso;
      }
      return null;
    } catch (error) {
      console.error(`Erro no repository getById(${id}):`, error);
      throw error;
    }
  },

  // ==================== SAVE (otimizado) ====================
  async save(data) {
    try {
      let id = data.id;
      
      if (id) {
        // Atualização
        const docRef = doc(db, "casos", id);
        await setDoc(docRef, data);
      } else {
        // Criação
        const docRef = await addDoc(collection(db, "casos"), data);
        id = docRef.id;
        data.id = id;
      }

      // Atualiza o cache localmente (sem precisar recarregar tudo)
      this.updateCacheAfterSave(data);

      return id;
    } catch (error) {
      console.error("Erro no repository save:", error);
      throw error;
    }
  },

  // ==================== DELETE ====================
  async delete(id) {
    try {
      console.debug("Deletando caso com ID:", id);
      await deleteDoc(doc(db, "casos", id));

      // Atualiza cache removendo o item localmente
      this.updateCacheAfterDelete(id);

      return true;
    } catch (error) {
      console.error("Erro no repository delete:", error);
      throw error;
    }
  },

  // ==================== CACHE HELPERS ====================

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
    } catch (e) {}
  },

  // Atualiza cache após salvar (sem recarregar tudo)
  updateCacheAfterSave(newCaso) {
    let cached = this.getFromCache();
    if (!cached) cached = [];

    const index = cached.findIndex((c) => c.id === newCaso.id);

    if (index >= 0) {
      cached[index] = newCaso; // atualiza
    } else {
      cached.unshift(newCaso); // adiciona no início
    }

    this.saveToCache(cached);
  },

  // Atualiza cache após deletar
  updateCacheAfterDelete(id) {
    let cached = this.getFromCache();
    if (!cached) return;

    cached = cached.filter((c) => c.id !== id);
    this.saveToCache(cached);
  },

  clearCache() {
    localStorage.removeItem(CACHE_KEY);
  },
};
