const buttonConfig = {
  ".btn-login": handleLoginClick,
  ".btn-cadastro": handleSignupClick,
  ".btn-reset": handleResetPasswordClick,
  ".btn-logout": handleLogoutClick,
  ".btn-toggle-forms": toggleBetweenLoginAndSignup,
  ".btn-toggle-reset": toggleBetweenLoginAndResetPassword,
};

const messageStyles = {
  error: "text-red-600 font-medium",
  success: "text-green-600 font-medium",
  loading: "text-blue-600 font-medium",
  info: "text-blue-600 font-medium",
  warning: "text-yellow-600 font-medium",
};

export function initAuthUI() {
  setupAuthUIEvents();
}

export function showCurrentUserInfoInMenu(user) {
  if (fillUserInfo(user)) return;

  const observer = new MutationObserver((mutations, obs) => {
    if (fillUserInfo(user)) {
      obs.disconnect();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function fillUserInfo(user) {
  const elements = {
    initials: document.getElementById("user-initials"),
    name: document.getElementById("user-name"),
    email: document.getElementById("user-email")
  };

  const allFound = !!(elements.initials && elements.name && elements.email);

  if (allFound) {
    elements.initials.textContent = getInitials(user.nome);
    elements.name.textContent = user.nome;
    elements.email.textContent = user.email;
    return true;
  }

  return false;
}

function getInitials(name) {
  if (!name) return "??";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  const firstInitial = parts[0][0];
  const lastInitial = parts[parts.length - 1][0];

  return (firstInitial + lastInitial).toUpperCase();
}

export function setupAuthUIEvents() {
  document.addEventListener("click", (event) => {
    for (const [selector, handler] of Object.entries(buttonConfig)) {
      if (event.target.closest(selector)) {
        if (event.target.closest("form")) {
          event.preventDefault();
        }
        handler();
        return;
      }
    }
  });
}

export function showMessage(message, type = "info") {
  const messageEl = document.getElementById("login-error");
  if (!messageEl) return;

  messageEl.textContent = message;

  // Remove estilos anteriores
  messageEl.className = "block text-sm"; // mantém classes base se quiser

  // Adiciona estilo do Tailwind
  const styleClasses = messageStyles[type] || messageStyles.info;
  messageEl.classList.add(...styleClasses.split(" "));
}

function handleLoginClick() {
  const email = document.getElementById("login-email")?.value.trim();
  const senha = document.getElementById("login-senha")?.value;

  console.log("Tentando login com email:", email);
  
  if (!email || !senha) {
    showMessage("Email e senha são obrigatórios.", "error");
    return;
  }

  showMessage("Entrando...", "loading");

  document.dispatchEvent(
    new CustomEvent("loginAttempt", {
      detail: { email, senha },
    }),
  );
}

function handleSignupClick() {
  const nome = document.getElementById("signup-nome")?.value.trim();
  const email = document.getElementById("signup-email")?.value.trim();
  const senha = document.getElementById("signup-senha")?.value;

  if (!nome || nome.length < 2) {
    showMessage("Nome completo é obrigatório (mínimo 2 caracteres).", "error");
    return;
  }
  if (!email) {
    showMessage("Email é obrigatório.", "error");
    return;
  }
  if (senha.length < 6) {
    showMessage("Senha deve ter pelo menos 6 caracteres.", "error");
    return;
  }

  showMessage("Criando conta...", "loading");

  document.dispatchEvent(
    new CustomEvent("signupAttempt", {
      detail: { nome, email, senha },
    }),
  );
}

function handleResetPasswordClick() {
  const email = document.getElementById("reset-email")?.value.trim();
  if (!email) {
    showMessage("Email é obrigatório.", "error");
    return;
  }

  document.dispatchEvent(
    new CustomEvent("resetarSenhaAttempt", {
      detail: { email },
    }),
  );
}

function handleLogoutClick() {
  document.dispatchEvent(new CustomEvent("logoutAttempt"));
}

function toggleBetweenLoginAndSignup() {
  document.getElementById("login-form")?.classList.toggle("hidden");
  document.getElementById("signup-form")?.classList.toggle("hidden");
}

function toggleBetweenLoginAndResetPassword() {
  document.getElementById("login-form")?.classList.toggle("hidden");
  document.getElementById("reset-password-form")?.classList.toggle("hidden");
}
