import {
  getFirestore, // Não precisa importar aqui se 'db' já vem de config-firebase.js
  collection,
  getDoc,
  setDoc,
  addDoc,
  doc,
  getDocs, // <-- Importe getDocs
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { db } from "./config-firebase.js"; // Sua instância do Firestore

// return null => nenhum caso encontrado
export async function getAllCasos() {
  try {
    const casosCollectionRef = collection(db, "casos");
    const querySnapshot = await getDocs(casosCollectionRef); // <-- Faz a requisição

    if (!querySnapshot) {
      console.log("Nenhum caso encontrado.");
      return null;
    } else {
      const listaDeCasos = [];
      querySnapshot.forEach((casoDoc) => {
        const caso = casoDoc.data();
        caso.id = casoDoc.id;
        listaDeCasos.push(caso);
      });
      return listaDeCasos;
    }
  } catch (error) {
    console.error("Erro ao recuperar os casos:", error);
    return -1;
  }
}

export async function findCasoById(casoId) {
  try {
        const docRef = doc(db, "casos", casoId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(`Documento '${casoId}' encontrado:`, docSnap.data());
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log(`Documento '${casoId}' não encontrado.`);
            return null;
        }
    } catch (error) {
        console.error(`Erro ao recuperar documento '${casoId}':`, error);
        throw error;
    }
}

export async function deleteCase(casoId) {}

export async function saveCaseInFirebase(casoData) {
  try {
    console.log("Json recebido para salvar:", casoData);

    if (casoData.id != "") {
      console.log(`Salvando caso existente com ID '${casoData.id}'...`);
      const docRef = doc(db, "casos", casoData.id);
      await setDoc(docRef, casoData);
      console.log(`JSON salvo com sucesso! Documento com ID '${casoData.id}'.`);
      return casoData.id;
    } else {
      console.log("Salvando novo caso (sem ID)...");
      const docRef = await addDoc(collection(db, "casos"), casoData);
      console.log(
        `JSON salvo com sucesso! Documento com ID automático: ${docRef.id}`,
      );
      return docRef.id;
    }
  } catch (error) {
    console.error("Erro ao salvar JSON:", error);
    throw error;
  }
}