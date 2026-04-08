import * as authFeature from "../features/auth/auth_feature.js";

function init() {
  authFeature.init();
}

document.addEventListener("DOMContentLoaded", init);