const DENUNCIAS_PACIENTE_LIST_ID = "denuncias-paciente-list";

export function hasDenunciaPacienteListContainer() {
  return !!document.getElementById(DENUNCIAS_PACIENTE_LIST_ID);
}

export function setupDenunciaPacienteListListeners() {
  // Aqui podemos adicionar event delegation se houver botões de ação no futuro
  console.log("✅ Listeners da lista de denúncias do paciente configurados");
}

// ==================== RENDERIZAÇÃO ====================

export function renderDenunciasPaciente(denuncias) {
  const container = document.getElementById(DENUNCIAS_PACIENTE_LIST_ID);
  if (!container) return;

  container.innerHTML = "";

  if (!denuncias || denuncias.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16">
        <div class="text-6xl mb-6">📭</div>
        <p class="text-gray-500 text-lg">Você ainda não fez nenhuma denúncia.</p>
        <p class="text-gray-400 text-sm mt-2">Suas denúncias aparecerão aqui.</p>
      </div>
    `;
    return;
  }

  denuncias.forEach((denuncia) => {
    const statusInfo = getStatusInfo(denuncia.status);

    const html = `
      <div class="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-md transition-all" data-id="${denuncia.id}">
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <span class="text-2xl">${statusInfo.emoji}</span>
              <div>
                <p class="font-semibold text-gray-900">${denuncia.tipoProblema || "Denúncia"}</p>
                <p class="text-sm text-gray-500">${new Date(denuncia.createdAt?.seconds * 1000 || denuncia.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>

            <p class="mt-4 text-gray-700 line-clamp-2">
              ${denuncia.descricao || "Sem descrição"}
            </p>

            ${denuncia.endereco ? `
              <p class="text-xs text-gray-500 mt-3">
                📍 ${denuncia.endereco}
              </p>
            ` : ''}
          </div>

          <!-- Status Badge -->
          <div class="${statusInfo.bg} ${statusInfo.text} text-xs font-medium px-4 py-2 rounded-2xl">
            ${statusInfo.label}
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center text-xs">
          <span class="text-gray-500">
            Enviado em ${new Date(denuncia.createdAt?.seconds * 1000 || denuncia.createdAt).toLocaleDateString('pt-BR')}
          </span>
          
          ${denuncia.status === "concluida" ? 
            `<span class="text-emerald-600 font-medium">✅ Concluído</span>` : 
            `<button class="text-blue-600 hover:text-blue-700 font-medium">
              Ver detalhes
            </button>`
          }
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", html);
  });
}

// ==================== HELPERS DE STATUS ====================

function getStatusInfo(status) {
  switch (status?.toLowerCase()) {
    case "pendente":
      return {
        label: "Pendente",
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        emoji: "⏳"
      };
    case "em_analise":
      return {
        label: "Em Análise",
        bg: "bg-blue-100",
        text: "text-blue-700",
        emoji: "🔍"
      };
    case "concluida":
      return {
        label: "Concluída",
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        emoji: "✅"
      };
    default:
      return {
        label: "Pendente",
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        emoji: "⏳"
      };
  }
}