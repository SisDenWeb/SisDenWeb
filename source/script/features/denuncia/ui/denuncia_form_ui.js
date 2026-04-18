// features/denuncia/ui/denuncia_form_ui.js

const VIEW_LISTA_DENUNCIAS_PACIENTE = "view-lista-denuncia-paciente";
const VIEW_FORM_DENUNCIA = "view-formulario-denuncia-paciente";

const clickMap = {
  ".btn-nova-denuncia": () => {
    console.log("click");
    document
      .getElementById(VIEW_LISTA_DENUNCIAS_PACIENTE)
      .classList.add("hidden");
    document.getElementById(VIEW_FORM_DENUNCIA).classList.remove("hidden");
    // Opcional: resetar formulário ao abrir
    document.getElementById("denuncia-form").reset();
    autofillDenunciaFields();
  },
  ".btn-cancelar-denuncia": (el) => {
    document.getElementById(VIEW_FORM_DENUNCIA).classList.add("hidden");
    document
      .getElementById(VIEW_LISTA_DENUNCIAS_PACIENTE)
      .classList.remove("hidden");
  },
  ".btn-enviar-denuncia": (el) => {
    const form = document.getElementById("denuncia-form");
    const data = extractDenunciaData(form);

    dispatchEvent("criarDenuncia", data);
    document
      .getElementById(VIEW_LISTA_DENUNCIAS_PACIENTE)
      .classList.remove("hidden");
    document.getElementById(VIEW_FORM_DENUNCIA).classList.add("hidden");
  },
  ".btn-mudar-status": () => {
    console.log("Botão de mudar status clicado");
    const denunciaId = document.getElementById("detalhe-denuncia-id").textContent;
    const novoStatus = document.getElementById("select-status").value;
    const motivo = document.getElementById("motivo-status").value.trim();

    if (!motivo) {
      alert("Por favor, informe o motivo da mudança de status.");
      return;
    }

    dispatchEvent("mudarStatusDenuncia", { denunciaId, novoStatus, motivo });
  }
};

export function hasContainer() {
  return !!document.getElementById(VIEW_LISTA_DENUNCIAS_PACIENTE);
}

export function init() {
  setupClickDelegation();
}

export function setupClickDelegation() {
  document.addEventListener("click", (e) => {
    for (const [selector, action] of Object.entries(clickMap)) {
      const element = e.target.closest(selector);
      if (element) {
        if (e.target.closest("form")) e.preventDefault();
        action(element);
        return;
      }
    }
  });
}


function dispatchEvent(name, detail = {}) {
  document.dispatchEvent(new CustomEvent(name, { detail }));
}

function extractDenunciaData(form) {
  return {
    nomePaciente: document.getElementById("nome-paciente").value.trim(),
    telefone: document.getElementById("telefone").value.trim(),
    tipoProblema: document.getElementById("tipo-problema").value,
    descricao: document.getElementById("descricao-denuncia").value.trim(),
    endereco: document.getElementById("endereco").value.trim(),
    createdAt: new Date().toISOString(),
  };
}

function autofillDenunciaFields() {
  const userName = document.getElementById("user-name").textContent;
  document.getElementById("nome-paciente").value = userName;
}

export function openDetalhesDenuncia(denuncia) {
  console.log("Abrindo detalhes da denúncia:", denuncia);
  document.getElementById("detalhes-da-denuncia").classList.remove("hidden");
  document.getElementById("lista-de-denuncias").classList.add("hidden");

  document.getElementById("detalhe-denuncia-id").textContent = denuncia.id;
  document.getElementById("detalhe-nome").textContent =
    denuncia.nomePaciente || "Anônimo";
  document.getElementById("detalhe-telefone").textContent =
    denuncia.telefone || "Anônimo";
  document.getElementById("detalhe-endereco").textContent =
    denuncia.endereco || "Endereço não informado";
  document.getElementById("detalhe-descricao").textContent =
    denuncia.descricao || "Sem descrição";
  document.getElementById("detalhe-tipo-problema").textContent =
    denuncia.tipoProblema || "Tipo de problema não informado";
    document.getElementById("select-status").value = denuncia.status || "em_analise";
    

  const data = denuncia.createdAt?.seconds
    ? new Date(denuncia.createdAt.seconds * 1000).toLocaleDateString("pt-BR")
    : "Data não disponível";
  document.getElementById("detalhe-data").textContent = data;

  renderHistorico(denuncia.historicoStatus)
  // Status badge
  const statusEl = document.getElementById("status-badge");
  //statusEl.textContent = getStatusLabel(denuncia.status);
  //  statusEl.className = `px-5 py-2 rounded-2xl text-sm font-medium ${getStatusClass(denuncia.status)}`;
}

function renderHistorico(historico) {
  const container = document.getElementById("historico-lista");
  const vazio = document.getElementById("historico-vazio");

  if (!historico || historico.length === 0) {
    container.innerHTML = "";
    vazio.classList.remove("hidden");
    return;
  }

  vazio.classList.add("hidden");

  let html = "";

  historico.forEach(entry => {
    const data = entry.data ? new Date(entry.data).toLocaleString('pt-BR') : "Data não disponível";
    
    html += `
      <div class="flex gap-4 border-l-4 border-gray-200 pl-6 py-1">
        <div class="flex-1">
          <p class="font-medium text-gray-800">${entry.status}</p>
          <p class="text-sm text-gray-600 mt-1">${entry.motivo}</p>
        </div>
        <div class="text-right text-xs text-gray-500">
          <p>${data}</p>
          <p class="mt-1">${entry.usuarioRole || ""}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}


export function closeModalDetalheDenuncia() {
  document.getElementById("detalhes-da-denuncia").classList.add("hidden");
  document.getElementById("lista-de-denuncias").classList.remove("hidden");
}
