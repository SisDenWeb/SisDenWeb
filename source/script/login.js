const credenciais = {
    "admin": "admin123",
    "usuario1": "senha123",
    "joao": "123456"
  };

  document.getElementById("login-buttom").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita o envio real do formulário

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (credenciais[usuario] && credenciais[usuario] === senha) {
      alert("Login bem-sucedido!");
      // Redirecionar ou fazer algo após o login
    } else {
      alert("Usuário ou senha inválidos.");
    }
  });