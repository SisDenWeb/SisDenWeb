import {
  collection,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import { db } from "../../core/config_firebase.js"; // Sua instância do Firestore

/** 
 * Funções para lidar com os funcionarios no Firebase,
 * - busca de todos os funcionarios
 * - salvamento de funcionarios
 * - deleção de funcionarios
 * - busca de funcionario por ID
 * Nenhuma função presente aqui lida com manipulação de DOM, apenas com o firestore
 */

// recupera todos os funcionarios ativos e inativos e retorna 
// uma lista de objetos com os dados dos funcionarios
export async function getAllFuncionarios() {
  try {
    const casosCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(casosCollectionRef); // <-- Faz a requisição

    if(!querySnapshot) {
      console.log("Nenhum funcionário encontrado.");
      return null;
    } else {
       const listaDeFuncionarios = [];
      querySnapshot.forEach((funcionarioDoc) => {
        const funcionario = funcionarioDoc.data();
        funcionario.id = funcionarioDoc.id;
        listaDeFuncionarios.push(funcionario);
      });
      return listaDeFuncionarios;
    }
  } catch (error) {
    console.error("Erro ao recuperar os funcionarios:", error);
    document.getElementById("container-funcionarios-list").innerHTML =
      `<li>Erro ao carregar os dados: ${error.message}</li>`;
  }
}

// desativa um funcionario, setando o campo "active" para false
export async function desativarFuncionario(documentId) {
  const COLLECTION_NAME = "users";
  try {
    const docRef = doc(db, COLLECTION_NAME, documentId);

    await updateDoc(docRef, {
      active: false,
    });

    console.log(`Funcionário com ID '${documentId}' desativado.`);
    return true; // Sucesso
  } catch (error) {
    console.error(
      `Erro ao desativar funcionário com ID '${documentId}' na coleção '${COLLECTION_NAME}':`,
      error,
    );
    return false; // Erro
  }
}

// TODO: implementar a criacao do auth de funcionario em um backend separado
// cria um novo funcionario, setando o campo "active" para true e "primeiroLogin" para true
export async function criarFuncionario(email, nome) {
  const userRef = doc(db, "users", email); 

  try {
    await setDoc(userRef, {
      email: email,
      nome: nome,
      role: 'funcionario', // Ou a role inicial desejada
      active: true,
      primeiroLogin: true, // Flag para indicar que o usuário precisa finalizar o cadastro
      createdAt: serverTimestamp(),
    }, { merge: true }); // Use merge:true para não sobrescrever o documento se ele já existir parcialmente

    console.log(`Documento de usuário inicial para ${email} criado no Firestore.`);
    alert(`Usuário ${email} cadastrado com sucesso no Firestore. Informe a ele para usar o fluxo de "esqueci a senha" para criar sua conta.`);

  } catch (error) {
    console.error("Erro ao cadastrar usuário no Firestore:", error);
    alert("Erro ao cadastrar usuário.");
  }
}