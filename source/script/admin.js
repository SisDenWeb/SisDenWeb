////////////////////////////////////////////////
// fazer mudanca de url ( não quis usar <a>) //
////////////////////////////////////////////////

document.querySelectorAll(".gestao-funcionarios").forEach((botao) => {
  botao.addEventListener("click", () => {
    window.location.href = "admin-management.html";
  });
});

document.querySelectorAll(".casos-notificados").forEach((botao) => {
  botao.addEventListener("click", () => {
    window.location.href = "admin-cases.html";
  });
});
