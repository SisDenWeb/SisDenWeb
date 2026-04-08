import { setupSidebarToggle } from "../common/menu_sidebar_toggle.js";
import * as authFeature from "../features/auth/auth_feature.js";
import * as casoFeature from "../features/caso/caso_feature.js";
import * as componentRenderer from "../core/component_render.js";

async function init() {
  authFeature.init();
  await componentRenderer.initAutoRender();
  casoFeature.init();
  setupSidebarToggle();
}

document.addEventListener("DOMContentLoaded", init);
