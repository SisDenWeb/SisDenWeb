document.getElementById("login-buttom").addEventListener("click", function (e) {
  const usuario = document.getElementById("usuario").value;
  const senha = document.getElementById("senha").value;

  admin_db = JSON.parse(localStorage.getItem("sisdenData_admin_db"));
  employer_db = JSON.parse(localStorage.getItem("sisdenData_employer_db"));
  employer = find_employer_by_id(employer_db, usuario);

  if (admin_db[usuario] && admin_db[usuario] === senha) {
    window.location.href = "admin/admin-management.html";
  }else if(employer && employer.password == senha){
    window.location.href = "employer/employer-cases.html"
  }
});
