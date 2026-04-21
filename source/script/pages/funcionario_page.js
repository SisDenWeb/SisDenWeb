import { setupSidebarToggle } from "../common/menu_sidebar_toggle.js";
import * as authFeature from "../features/auth/auth_feature.js";
import * as casoFeature from "../features/caso/caso_feature.js";
import * as componentRenderer from "../core/component_render.js";
import * as denunciaFeature from "../features/denuncia/denuncia_feature.js";

async function init() {
  await authFeature.init();
  await componentRenderer.initAutoRender();
  casoFeature.init();
  denunciaFeature.init();

  setupSidebarToggle();
}

document.addEventListener("DOMContentLoaded", init);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/scripts/core/service-worker.js")
        .then((reg) => console.log("SW registrado com sucesso"))
        .catch((err) => console.log("Erro ao registrar SW:", err));
    });
  }