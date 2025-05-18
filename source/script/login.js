const erroMsg = document.getElementById("erro-login");

document.getElementById("login-buttom").addEventListener("click", function () {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  const admin_db =
    JSON.parse(localStorage.getItem("sisdenData_admin_db")) || {};
  const employer_db =
    JSON.parse(localStorage.getItem("sisdenData_employer_db")) || [];
  const employer = find_employer_by_id(employer_db, usuario);

  if (admin_db[usuario] && admin_db[usuario] === senha) {
    window.location.href = "admin/admin-management.html";
  } else if (employer && employer.password === senha) {
    window.location.href = "employer/employer-cases.html";
  } else {
    erroMsg.classList.remove("hidden");

    // Oculta após 4 segundos
    setTimeout(() => {
      erroMsg.classList.add("hidden");
    }, 4000);
  }
});

// Oculta a mensagem de erro quando o usuário começa a digitar novamente
["usuario", "senha"].forEach((id) => {
  document.getElementById(id).addEventListener("input", () => {
    erroMsg.classList.add("hidden");
  });
});

// Alternar visibilidade da senha
document
  .getElementById("toggle-password")
  .addEventListener("click", function () {
    const senhaInput = document.getElementById("senha");
    const slash = document.getElementById("eye-slash");

    const isPasswordVisible = senhaInput.getAttribute("type") === "text";
    senhaInput.setAttribute("type", isPasswordVisible ? "password" : "text");

    // Mostra ou esconde a linha cortando o olho
    if (isPasswordVisible) {
      slash.classList.add("hidden");
    } else {
      slash.classList.remove("hidden");
    }
  });
