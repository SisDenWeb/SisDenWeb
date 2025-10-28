(function () {
  fetch("../component/menu.html")
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

  const login_info = get_login_info();
  document.querySelectorAll(".logged_as_username").forEach((text) => {
    text.innerHTML = login_info.username;
  });
  document.querySelectorAll(".logged_as_id").forEach((text) => {
    text.innerHTML = login_info.id;
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
    const info_db = recuperarDados("info");
    var employers_db = recuperarDados("employer");
    var employer = find_employer_by_id(employers_db, info_db.login_info.id);

    if (employer.password != old_password) {
      return false;
    }

    employer.password = new_password;

    const index = employers_db.findIndex((e) => e.id === employer.id);
    if (index !== -1) {
      employers_db[index] = employer;
    }

    salvarDados(employers_db, "employer");
    return true;
  }
}
