// features/caso/ui/caso_filter_modal_ui.js
// UI Burra - Modal de Filtro Avançado

const FILTER_MODAL_ID = "modal-filtro-avancado";

const defaultFields = {
  nome: true,
  cartaoSus: false,
  municipio: false,
  agravo: false,
  dataNotificacao: false,
};

let currentFields = { ...defaultFields };

export function initFiltroAvancado() {
  setupFiltroButton();
}

function setupFiltroButton() {
  const btn = document.getElementById("btn-filtro-avancado");
  if (!btn) return;

  btn.addEventListener("click", openFiltroModal);
}

function openFiltroModal() {
  let modal = document.getElementById(FILTER_MODAL_ID);

  if (!modal) {
    modal = createFiltroModal();
    document.body.appendChild(modal);
  }

  modal.classList.remove("hidden");
  renderCheckboxes();
}

function createFiltroModal() {
  const modal = document.createElement("div");
  modal.id = FILTER_MODAL_ID;
  modal.className =
    "hidden fixed inset-0 bg-black/60 flex items-center justify-center z-[70]";

  modal.innerHTML = `
    <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
      <div class="px-6 py-5 border-b flex items-center justify-between">
        <h3 class="text-xl font-semibold text-gray-800">Filtros de Busca</h3>
        <button id="close-filtro-modal" class="text-2xl text-gray-400 hover:text-gray-600">✕</button>
      </div>

      <div class="p-6 space-y-5">
        <p class="text-sm text-gray-600">Selecione os campos que deseja incluir na busca:</p>
        
        <div id="filtro-campos" class="space-y-4">
          <!-- Checkboxes serão inseridos via JS -->
        </div>
        
        <p class="text-sm text-gray-600">Obs: Se nenhum campo for selecionado, ira fazer uma busca generica em todos os campos do formulario</p>
      </div>

        
      <div class="border-t px-6 py-5 flex gap-3">
        <button id="btn-reset-filtro" 
                class="flex-1 py-3 text-gray-700 font-medium border border-gray-300 rounded-2xl hover:bg-gray-50">
          Resetar
        </button>
        <button id="btn-aplicar-filtro" 
                class="flex-1 py-3 bg-blue-600 text-white font-medium rounded-2xl hover:bg-blue-700">
          Aplicar Filtros
        </button>
      </div>
    </div>
  `;

  // Event delegation para o modal
  modal.addEventListener("click", (e) => {
    if (e.target.id === "close-filtro-modal") {
      modal.classList.add("hidden");
    }
    if (e.target.id === "btn-reset-filtro") {
      currentFields = { ...defaultFields };
      renderCheckboxes();
    }
    if (e.target.id === "btn-aplicar-filtro") {
      applyFilters();
      modal.classList.add("hidden");
    }
  });

  return modal;
}

function renderCheckboxes() {
  const container = document.getElementById("filtro-campos");
  if (!container) return;

  const fieldsConfig = [
    { key: "nome", label: "Nome do Paciente" },
    { key: "cartaoSus", label: "Cartão SUS" },
    { key: "municipio", label: "Município" },
    { key: "agravo", label: "Agravo" },
    { key: "dataNotificacao", label: "Data de Notificação" },
  ];

  container.innerHTML = fieldsConfig
    .map(
      (field) => `
    <label class="flex items-center gap-3 cursor-pointer">
      <input type="checkbox" 
             class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
             data-field="${field.key}"
             ${currentFields[field.key] ? "checked" : ""}>
      <span class="text-gray-700">${field.label}</span>
    </label>
  `,
    )
    .join("");

  // Salvar mudanças nos checkboxes
  container.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const field = checkbox.dataset.field;
      currentFields[field] = checkbox.checked;
    });
  });
}

function applyFilters() {
  document.dispatchEvent(
    new CustomEvent("updateSearchFields", {
      detail: { fields: { ...currentFields } },
    }),
  );
}
