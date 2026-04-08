// features/caso/ui/caso_dashboard_ui.js
// UI Burra - Dashboard de Casos de Dengue

const DASHBOARD_CONTAINER_ID = "dashboard-container";

export function hasContainer() {
  return !!document.getElementById(DASHBOARD_CONTAINER_ID);
}

export function initDashboardUI(dashboardStats) {
  renderDashboard(dashboardStats);
}

// ==================== RENDERIZAÇÃO PRINCIPAL ====================

export function renderDashboard(dashboardStats) {
  const container = document.getElementById(DASHBOARD_CONTAINER_ID);
  if (!container) return;

  const stats = {
    totalCasos: dashboardStats.totalCasos || 0,
    casosConfirmados: dashboardStats.casosConfirmados || 0,
    casosGraves: dashboardStats.casosGraves || 0,
    casosEmInvestigacao: dashboardStats.casosEmInvestigacao || 0,
    topMunicipios: dashboardStats.topMunicipios || [],
    ultimosCasos: dashboardStats.ultimosCasos || [],
  };

  container.innerHTML = `
    <div class="space-y-8">

      <!-- Título -->
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p class="text-gray-500 mt-1">Visão geral dos casos de dengue</p>
      </div>

      <!-- Cards Estatísticos -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        ${createStatCard("Total de Casos", stats.totalCasos, "blue", "📋")}
        ${createStatCard("Casos Confirmados", stats.casosConfirmados, "emerald", "✅")}
        ${createStatCard("Casos Graves", stats.casosGraves, "red", "⚠️")}
        ${createStatCard("Em Investigação", stats.casosEmInvestigacao, "amber", "🔍")}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <!-- Top Municípios -->
        <div class="bg-white rounded-3xl shadow p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            🏙️ Top 5 Municípios
          </h2>
          <div class="space-y-4">
            ${stats.topMunicipios.length > 0 
              ? stats.topMunicipios.map((item, i) => `
                <div class="flex items-center justify-between py-2">
                  <div class="flex items-center gap-4">
                    <span class="text-2xl font-bold text-gray-300 w-8">${i + 1}</span>
                    <span class="font-medium text-gray-700">${item.nome}</span>
                  </div>
                  <span class="bg-gray-100 px-4 py-1.5 rounded-full text-sm font-semibold text-gray-700">
                    ${item.quantidade} casos
                  </span>
                </div>
              `).join('')
              : '<p class="text-gray-500 py-8 text-center">Nenhum dado disponível</p>'}
          </div>
        </div>

        <!-- Últimos Casos -->
        <div class="bg-white rounded-3xl shadow p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
            🕒 Últimos Casos Registrados
          </h2>
          <div class="space-y-4">
            ${stats.ultimosCasos.length > 0 
              ? stats.ultimosCasos.map(caso => `
                <div class="flex justify-between items-center border-b pb-4 last:border-none">
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-gray-900 truncate">
                      ${caso.notificacao_individual?.nome_paciente || "Sem nome"}
                    </p>
                    <p class="text-sm text-gray-500">
                      ${caso.residencia?.municipio || "—"} • 
                      ${caso.dados_gerais?.data_notificacao || "—"}
                    </p>
                  </div>
                  <button 
                    data-id="${caso.id}"
                    class="btn-editar-caso px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition">
                    Ver
                  </button>
                </div>
              `).join('')
              : '<p class="text-gray-500 py-8 text-center">Nenhum caso recente</p>'}
          </div>
        </div>

      </div>
    </div>
  `;
}

// ==================== COMPONENTE DE CARD ====================

function createStatCard(title, value, color, emoji) {
  const gradients = {
    blue: "from-blue-500 to-blue-600",
    emerald: "from-emerald-500 to-emerald-600",
    red: "from-red-500 to-red-600",
    amber: "from-amber-500 to-amber-600"
  };

  return `
    <div class="bg-white rounded-3xl shadow p-6 transition hover:shadow-lg">
      <div class="flex justify-between items-start">
        <div>
          <p class="text-sm font-medium text-gray-500">${title}</p>
          <p class="text-4xl font-bold text-gray-800 mt-3">${value.toLocaleString('pt-BR')}</p>
        </div>
        <div class="w-14 h-14 bg-gradient-to-br ${gradients[color]} text-white rounded-2xl flex items-center justify-center text-3xl shadow-inner">
          ${emoji}
        </div>
      </div>
    </div>
  `;
}