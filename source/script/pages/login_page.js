import * as authFeature from "../features/auth/auth_feature.js";

function init() {
  authFeature.init();
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