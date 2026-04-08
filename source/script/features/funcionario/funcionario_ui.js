/**
 * Funcionários UI Handler
 * Responsável apenas pela interface: renderização da lista, eventos de clique
 * e manipulação visual. Não conhece lógica de negócio nem Firebase.
 */

export function setupFuncionariosUI() {
  setupDesativarButtonEvents();
}

export function renderFuncionariosList(funcionarios) {
  const listElement = document.getElementById("container-funcionarios-list");

  if (!listElement) {
    throw new Error(`Elemento #${"container-funcionarios-list"} não encontrado no DOM.`);
  }

  // Limpa a lista
  listElement.innerHTML = "";

  if (!funcionarios || funcionarios.length === 0) {
    listElement.innerHTML = `
      <p class="text-gray-500 py-4 text-center">
        Nenhum funcionário ativo cadastrado.
      </p>`;
    return;
  }

  funcionarios.forEach((funcionario) => {
    // Filtra apenas funcionários ativos
    if (funcionario.role !== "funcionario" || !funcionario.active) return;

    const html = `
      <div data-id="${funcionario.id}" class="flex items-start justify-between border-b pb-3 mb-3">
        <div>
          <p class="font-medium text-gray-900">${funcionario.nome}</p>
          <p class="text-sm text-gray-600">${funcionario.email}</p>
        </div>
        <div class="flex flex-col gap-2">
          <button 
            data-id="${funcionario.id}" 
            data-nome="${funcionario.nome}" 
            class="desativar-funcionario px-4 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded transition">
            Desativar
          </button>
          <button 
            data-id="${funcionario.id}" 
            class="redefinir-senha px-4 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition">
            Redefinir senha
          </button>
        </div>
      </div>
    `;

    listElement.insertAdjacentHTML("beforeend", html);
  });
}

function setupDesativarButtonEvents() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".desativar-funcionario");

    if (button) {
      const id = button.dataset.id;
      const nome = button.dataset.nome;

      if (!id) return;

      const confirmou = confirm(
        `Tem certeza que deseja desativar o funcionário "${nome}"?`
      );

      if (confirmou) {
        document.dispatchEvent(
          new CustomEvent("desativarFuncionario", {
            detail: { funcionarioId: id }
          })
        );
      }
    }
  });
}

export function removeFuncionarioFromList(funcionarioId) {
  const elemento = document.querySelector(`div[data-id="${funcionarioId}"]`);

  if (!elemento) return;

  // Animação de saída
  elemento.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  elemento.style.opacity = "0";
  elemento.style.transform = "translateX(-20px)";

  setTimeout(() => {
    elemento.remove();
  }, 300);
}

export function hasFuncionariosListContainer() {
  return !!document.getElementById("container-funcionarios-list");
}