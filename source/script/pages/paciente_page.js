import { setupSidebarToggle } from "../common/menu_sidebar_toggle.js";
import * as authFeature from "../features/auth/auth_feature.js";
import * as componentRenderer from "../core/component_render.js";
import * as denunciaFeature from "../features/denuncia/denuncia_feature.js";

async function init() {
  authFeature.init();
  await componentRenderer.initAutoRender();
  await denunciaFeature.init();
  setupSidebarToggle();
}

document.addEventListener("DOMContentLoaded", init);
