import { criarFuncionario } from "./funcionarios-firebase.js";

document
  .getElementById("cadastrar-button")
  .addEventListener("click", function () {
    document.getElementById("cadastro-modal").classList.remove("hidden");
  });

document.getElementById("close-cadastro-modal").addEventListener("click", function () {
  document.getElementById("cadastro-modal").classList.add("hidden");
});

document.getElementById("close-error").addEventListener("click", () => {
  document.getElementById("error-modal").classList.add("hidden");
});

// Função utilitária para mostrar modal de erro
function mostrarErro(msg) {
  document.getElementById("error-message").innerText = msg;
  document.getElementById("error-modal").classList.remove("hidden");
}

// Submeter cadastro
document.getElementById("submit-cadastro").addEventListener("click", () => {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nome || !email) {
    mostrarErro("Por favor, preencha todos os campos.");
    return;
  }

  // Fecha modal de cadastro
  document.getElementById("cadastro-modal").classList.add("hidden");

  // Limpa os campos
  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";

  criarFuncionario(email, nome);
});
