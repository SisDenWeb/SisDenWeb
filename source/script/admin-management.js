/////////////////////////////////
// carregar lista funcionarios //
/////////////////////////////////

var employers_db = [];

function refresh_data() {
  employers_db = recuperarDados("employer");

  const employersList = document.getElementById("employers-list");
  employersList.innerHTML = "";

  employers_db.forEach((employer) => {
    const employerHTML = `
    <div class="flex items-start justify-between border-b pb-2">
      <div>
        <p class="font-medium">${employer.name}</p>
        <p class="text-sm text-gray-700">ID: ${employer.id}</p>
      </div>
      <div class="flex flex-col space-y-2">
        <button data-id="${employer.id}" class="deletar-funcionario bg-gray-400 text-black px-4 py-1 rounded">
          Deletar
        </button>
        <button data-id="${employer.id}" class="redefinir-senha bg-gray-400 text-black px-4 py-1 rounded">
          Redefinir senha
        </button>
      </div>
    </div>
  `;
    employersList.insertAdjacentHTML("beforeend", employerHTML);

    event_delete_employer();
    event_reset_password();
  });
}

refresh_data();

/////////////////////
// update employer //
/////////////////////

function update_employer_list(employer) {
  // employer = {
  //     name: nome,
  //     id: id,
  //     cpf: cpf,
  //     password: senhaProvisoria,
  //   };

  const index = employers_db.findIndex((e) => e.id === employer.id);

    console.log(index);
    console.log(employer)
  if (index !== -1) {
    employers_db[index] = employer;
  } else {
    employers_db.push(employer);
  }

  salvarDados(employers_db, "employer");
  refresh_data();

}

////////////////////////////////////
// botao de cadastrar funcionario //
////////////////////////////////////

document
  .getElementById("cadastrar-button")
  .addEventListener("click", function () {
    document.getElementById("modal").classList.remove("hidden");
  });

document.getElementById("close-modal").addEventListener("click", function () {
  document.getElementById("modal").classList.add("hidden");
});

// Fecha modais
document.getElementById("close-success").addEventListener("click", () => {
  document.getElementById("success-modal").classList.add("hidden");
});

document.getElementById("close-error").addEventListener("click", () => {
  document.getElementById("error-modal").classList.add("hidden");
});

// Função utilitária para mostrar modal de erro
function mostrarErro(msg) {
  document.getElementById("error-message").innerText = msg;
  document.getElementById("error-modal").classList.remove("hidden");
}

// Gera uma senha alfanumérica de 8 caracteres
function gerarSenha() {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let senhaProvisoria = "";
  for (let i = 0; i < 8; i++) {
    senhaProvisoria += caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
  }
  return senhaProvisoria;
}

// Submeter cadastro
document.getElementById("submit-cadastro").addEventListener("click", () => {
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();

  if (!nome || !cpf) {
    mostrarErro("Por favor, preencha todos os campos.");
    return;
  }

  // Gera um ID de 0 a 99999
  const id = Math.floor(Math.random() * 100000);

  const senhaProvisoria = gerarSenha();

  // Exibe dados no modal de sucesso
  document.getElementById("success-nome").innerText = `Nome: ${nome}`;
  document.getElementById("success-id").innerText = `id de usuario: ${id}`;
  document.getElementById(
    "success-senha"
  ).innerText = `Senha provisoria: ${senhaProvisoria}`;
  document.getElementById("success-modal").classList.remove("hidden");

  // Fecha modal de cadastro
  document.getElementById("modal").classList.add("hidden");

  // Limpa os campos
  document.getElementById("nome").value = "";
  document.getElementById("cpf").value = "";

  update_employer_list({
    name: nome,
    id: id,
    cpf: cpf,
    password: senhaProvisoria,
  });
});

///////////////////////////////////
// botao reset senha funcionario //
///////////////////////////////////

function event_reset_password(){
    document.querySelectorAll(".redefinir-senha").forEach((botao) => {
        botao.addEventListener("click", () => {
          const id = botao.dataset.id;
          const novaSenha = gerarSenha();
      
          employer = find_employer_by_id(employers_db, id);
      
          document.getElementById(
            "success-nome"
          ).innerText = `Nome: ${employer.name}`;
          document.getElementById(
            "success-id"
          ).innerText = `id de usuario: ${employer.id}`;
          document.getElementById(
            "success-senha"
          ).innerText = `Senha provisoria: ${novaSenha}`;
          document.getElementById("success-modal").classList.remove("hidden");
      
          // Fecha modal de cadastro
          document.getElementById("modal").classList.add("hidden");
      
          update_employer_list({
            name: employer.name,
            id: employer.id,
            cpf: employer.cpf,
            password: novaSenha,
          });
        });
      });
}

///////////////////////////////////
// botao deletar funcionario //
///////////////////////////////////

function event_delete_employer(){
    document.querySelectorAll(".deletar-funcionario").forEach((botao) => {
        botao.addEventListener("click", () => {
          console.log("click delete")
          const id = botao.dataset.id;
          delete_employer_by_id(id);
          refresh_data();
        });
      });
}
