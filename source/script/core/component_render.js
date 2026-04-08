/**
 * Component Renderer - Carrega HTML puro usando data-component
 * Mantém completa separação entre HTML e lógica.
 */

export async function renderComponent(element, componentName) {
  const componentPath = `/source/html/component/${componentName}.html`;

  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ao carregar ${componentPath}`);
    }

    const html = await response.text();
    element.innerHTML = html;
    return true;

  } catch (error) {
    console.error(`❌ Erro ao renderizar componente "${componentName}":`, error);
    element.innerHTML = `<p class="text-red-500 p-4">Erro ao carregar componente: ${componentName}</p>`;
    return false;
  }
}

/**
 * Inicializa automaticamente todos os componentes com data-component
 * e aguarda o carregamento de todos antes de continuar.
 */
export async function initAutoRender() {
  const elements = document.querySelectorAll("[data-component]");
  const promises = Array.from(elements).map(async (element) => {
    const componentName = element.dataset.component;
    if (!componentName) return false;

    return renderComponent(element, componentName);
  });
  await Promise.all(promises);
}