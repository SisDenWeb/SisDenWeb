import * as formMapper from "./helper/helper_form_mapper.js";

const clickMap = {
  ".btn-abrir-novo-caso": () => dispatchEvent("novoCaso"),
  ".btn-editar-caso": (el) =>
    dispatchEvent("editarCaso", { id: el.dataset.id }),
  ".btn-deletar-caso": (el) =>
    dispatchEvent("deletarCaso", { id: el.dataset.id }),
  ".btn-fechar-modal": () => dispatchEvent("fecharModal"),
  ".btn-salvar-caso": () =>
    dispatchEvent("salvarCaso", { data: formMapper.extractFormData() }),
  ".btn-editar-localizacao": () => dispatchEvent("editarLocalizacao"),
  ".btn-salvar-localizacao": () =>
    dispatchEvent("salvarLocalizacao", {
      id: formMapper.extractId(),
    }),
  ".btn-fechar-editar-localizacao": () =>
    dispatchEvent("fecharEditarLocalizacao"),
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
