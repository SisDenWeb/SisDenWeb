import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import { auth, db } from "./config-firebase.js"; // Sua instância do Firestore

async function listarFuncionarios() {
  try {
    const casosCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(casosCollectionRef); // <-- Faz a requisição

    const lista = document.getElementById("funcionarios-list");
    lista.innerHTML = "";

    querySnapshot.forEach((userDoc) => {
      const user = userDoc.data();
      user.id = userDoc.id;

      if (user.role == "funcionario" && user.active) {
        const employerHTML = `
    <div class="flex items-start justify-between border-b pb-2">
      <div>
        <p class="font-medium">${user.nome}</p>
        <p class="text-sm text-gray-700">${user.email}</p>
      </div>
      <div class="flex flex-col space-y-2">
        <button data-id="${user.id}" data-nome="${user.nome}" class="desativar-funcionario bg-gray-400 text-black px-4 py-1 rounded">
          Desativar
        </button>
        <button data-id="${user.id}" class="redefinir-senha bg-gray-400 text-black px-4 py-1 rounded">
          Redefinir senha
        </button>
      </div>
    </div>
  `;
        lista.insertAdjacentHTML("beforeend", employerHTML);
      }
    });

    if (lista.innerHTML == "") {
      console.log("Nenhum funcionário encontrado.");
      lista.innerHTML = "Nenhum funcionário ativo/cadastrado.";
      return;
    }

    lista.querySelectorAll(".desativar-funcionario").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const idToDeactivate = event.target.dataset.id;
        const nomeToDeactivate = event.target.dataset.nome;

        const confirmDeactivate = confirm(
          `Tem certeza que deseja destivar o funcionário ${nomeToDeactivate}?`,
        );
        if (confirmDeactivate) {
          const success = await desativarFuncionario("users", idToDeactivate);
          if (success) {
            console.log(
              "Desativação iniciada. Aguarde a atualização da lista...",
            );
            listarFuncionarios();
          }
        }
      });
    });
  } catch (error) {
    console.error("Erro ao recuperar os funcionarios:", error);
    document.getElementById("funcionarios-list").innerHTML =
      `<li>Erro ao carregar os dados: ${error.message}</li>`;
  }
}

async function desativarFuncionario(collectionName, documentId) {
  try {
    const docRef = doc(db, collectionName, documentId);

    await updateDoc(docRef, {
      active: false,
    });

    console.log(`Funcionário com ID '${documentId}' desativado.`);
    return true; // Sucesso
  } catch (error) {
    console.error(
      `Erro ao desativar funcionário com ID '${documentId}' na coleção '${collectionName}':`,
      error,
    );
    return false; // Erro
  }
}

async function criarFuncionario(email, nome) {
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

listarFuncionarios();

export { criarFuncionario };