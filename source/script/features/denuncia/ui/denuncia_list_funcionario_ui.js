const clickMap = {
  ".card-denuncia": (el) => {
    dispatchEvent("denunciaVisualizada", { id: el.dataset.id });
  },
  ".btn-voltar-listar-denuncias": () => {
    dispatchEvent("voltarParaListaDenuncias");
  },
  ".btn-marcar-como-em-analise": (el) => {
    dispatchEvent("marcarComoEmAnalise", {
      id: el.closest(".card-denuncia").dataset.id,
    });
  },
  ".btn-marcar-invalida": (el) => {
    dispatchEvent("marcarComoInvalida", {
      id: el.closest(".card-denuncia").dataset.id,
    });
  },
  "btn-atualizar-denuncias": () => {
    dispatchEvent("refreshDenuncias");
  },
};

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

export function init(denuncias, funcionarioId) {
  setupClickDelegation();
  renderDenunciasFuncionario(denuncias, funcionarioId);
}

export function updateUnviewedCount(count) {
  const badge = document.getElementById("alert-badge");
  const span = document.getElementById("unviewed-count");
  if (!badge) return;

  if (count > 0) {
    span.textContent = count;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

export function renderDenunciasFuncionario(denuncias, funcionarioId) {
  const listElement = document.getElementById("denuncias-funcionario-list");

  if (!listElement) {
    throw new Error(
      `Elemento #${"denuncias-funcionario-list"} não encontrado no DOM.`,
    );
  }

  // Limpa a lista
  listElement.innerHTML = "";

  if (!denuncias || denuncias.length === 0) {
    listElement.innerHTML = `
      <p class="text-gray-500 py-4 text-center">
        Nenhuma denuncia cadastrada.
      </p>`;
    return;
  }

  denuncias.forEach((denuncia) => {
    const status = getStatusInfo(denuncia.status);

    const jaVisualizada = denuncia.visualizadoPor.includes(funcionarioId);

    let bgColor = "bg-gray-100";

    if (!jaVisualizada) {
      bgColor = "bg-white";
    }

    const html = `
      <div class="${bgColor} card-denuncia border border-gray-200 rounded-3xl p-6 hover:shadow-md transition-all cursor-pointer" data-id="${denuncia.id}">
      <div class="flex justify-between">
        <div class="flex-1">
          <div class="flex items-center gap-3">
            <span class="text-2xl">${status.emoji}</span>
            <div>
              <p class="font-semibold">${denuncia.nomePaciente || "Anônimo"}</p>
              <p class="text-sm text-gray-500">${denuncia.tipoProblema || "Denúncia"}</p>
            </div>
          </div>

          <p class="mt-4 text-gray-700 line-clamp-3">
            ${denuncia.descricao}
          </p>

          ${
            denuncia.endereco
              ? `
            <p class="text-xs text-gray-500 mt-3 flex items-center gap-1">
              📍 ${denuncia.endereco}
            </p>
          `
              : ""
          }
        </div>

        <div class="text-right">
          <div class="${status.bg} ${status.text} text-xs font-medium px-4 py-2 rounded-2xl">
            ${status.label}
          </div>
          <p class="text-xs text-gray-400 mt-6">
            ${new Date(denuncia.createdAt?.seconds * 1000 || denuncia.createdAt).toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    </div>
    `;

    listElement.insertAdjacentHTML("beforeend", html);
  });
}

function getStatusInfo(status) {
  switch (status?.toLowerCase()) {
    case "pendente":
      return {
        label: "Pendente",
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        emoji: "⏳",
      };
    case "em_analise":
      return {
        label: "Em Análise",
        bg: "bg-blue-100",
        text: "text-blue-700",
        emoji: "🔍",
      };
    case "concluida":
      return {
        label: "Concluída",
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        emoji: "✅",
      };
    default:
      return {
        label: "Pendente",
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        emoji: "⏳",
      };
  }
}
