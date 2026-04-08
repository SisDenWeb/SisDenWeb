export function setupSidebarToggle() {
  document.addEventListener("click", (e) => {
    if (window.innerWidth < 768 && e.target.closest(".btn-toggle-sidebar")) {
      toggleSidebar();
    }
  });
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  // Alterna a classe de translação do menu
  const isOpen = sidebar.classList.toggle("-translate-x-full");

  // Se o menu NÃO tem a classe -translate-x-full, significa que ele está visível
  if (!isOpen) {
    overlay.classList.remove("hidden");
    // Pequeno hack para a animação de fade-in funcionar
    setTimeout(() => overlay.classList.add("opacity-100"), 10);
  } else {
    overlay.classList.add("hidden");
    overlay.classList.remove("opacity-100");
  }
}
