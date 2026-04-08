const CASOS_LIST_ID = "casos-list";
const SEARCH_INPUT_ID = "search-casos";

// ==================== RENDERIZAÇÃO ====================

export function initCasoListUI(casos) {
  renderCasosList(casos);
  setupSearchInput();
}

export function renderCasosList(casos) {
  const container = document.getElementById(CASOS_LIST_ID);
  if (!container) return;

  container.innerHTML = "";

  if (!casos || casos.length === 0) {
    const message = document.getElementById(SEARCH_INPUT_ID)?.value.trim()
      ? "Nenhum caso encontrado com esse termo de busca."
      : "Nenhum caso cadastrado ainda.";

    container.innerHTML = `
      <li class="text-gray-500 py-12 text-center">
        ${message}
      </li>`;
    return;
  }

  casos.forEach((caso) => {
    const html = `
      <div class="flex items-start justify-between border-b pb-4 mb-4 last:border-none last:mb-0" data-id="${caso.id}">
        <div class="flex-1 min-w-0">
          <p class="font-medium text-gray-900 truncate">${caso.notificacao_individual?.nome_paciente || "Sem nome"}</p>
          <p class="text-sm text-gray-600">Cartão SUS: ${caso.notificacao_individual?.cartao_sus || "—"}</p>
        </div>
        <div class="flex flex-col gap-2 ml-4">
          <button data-id="${caso.id}" class="btn-editar-caso px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition">
            Editar
          </button>
          <button data-id="${caso.id}" class="btn-deletar-caso px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition">
            Deletar
          </button>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  });
}

export function removeCasoFromList(casoId) {
  const elemento = document.querySelector(`div[data-id="${casoId}"]`);
  if (!elemento) return;

  elemento.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  elemento.style.opacity = "0";
  elemento.style.transform = "translateX(-20px)";

  setTimeout(() => elemento.remove(), 300);
}

export function hasContainer() {
  return !!document.getElementById(CASOS_LIST_ID);
}

function setupSearchInput() {
  const searchInput = document.getElementById(SEARCH_INPUT_ID);
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    document.dispatchEvent(new CustomEvent("searchCasos", {
      detail: { term: e.target.value }
    }));
  });
}