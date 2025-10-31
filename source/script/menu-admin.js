(function () {
  fetch("../component/menu-admin.html")
    .then((res) => res.text())
    .then((html) => {
      //   tratamento anti "code injected by live-server"
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      html = doc.body.innerHTML;

      document.body.insertAdjacentHTML("afterbegin", html);
      init_menu();
      init_password_change();
    });
})();

function init_menu() {
  // Mobile Menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("max-h-60");
    mobileMenu.classList.toggle("max-h-60");
    mobileMenu.classList.toggle("opacity-100");
    mobileMenu.classList.toggle("max-h-0");
    mobileMenu.classList.toggle("opacity-0");
  });
}

function init_password_change() {
  const btnChangePassword = document.querySelectorAll(".btn-change-password");
  const cancelBtn = document.getElementById("cancel-change-password");
  const modal = document.getElementById("change-password-modal");
  const form = document.getElementById("change-password-form");
  const saveBtn = document.getElementById("save-change-password");

  if (btnChangePassword) {
    btnChangePassword.forEach((btn) => {
      btn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");
      });
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      console.log("btn cancelar");
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      form.reset();
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", (e) => {
      const currentPassword = document.getElementById("current-password").value;
      const newPassword = document.getElementById("new-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;

      if (newPassword !== confirmPassword) {
        alert("As senhas novas não coincidem!");
        return;
      }

      var result = change_password(newPassword, currentPassword);
      if (result) {
        alert("Senha alterada com sucesso!");
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        form.reset();
      } else {
        alert("Senha atual incorreta!");
      }
    });
  }

  function change_password(new_password, old_password) {
    var admin = recuperarDados("admin");
    
    if (admin.password != old_password) {
      return false;
    }

    admin.password = new_password;

    salvarDados(admin, "admin");
    return true;
  }
}
