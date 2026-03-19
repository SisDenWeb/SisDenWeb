// auth.js

import { auth, db } from "./config-firebase.js";

import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

let authChecked = false;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    getDoc(doc(db, "users", user.uid)).then((snap) => {
      if (snap.exists()) {
        const role = snap.data().role;
        if (role === "admin")
          window.location.replace("/source/html/admin/admin-management.html");
        else if (role === "funcionario")
          window.location.replace("/source/html/employer/employer-cases.html");
        else window.location.replace("/source/html/paciente/dashboard.html"); // ou onde for
      }
    });
  }
});

// Função de LOGIN

window.fazerLogin = async () => {
  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-senha").value;
  const messageEl = document.getElementById("login-error");

  if (!email || !senha) {
    messageEl.textContent = "Preencha email e senha.";
    return;
  }

  messageEl.textContent = "Entrando...";

  try {
    await signInWithEmailAndPassword(auth, email, senha);

    const user = userCredential.user;
    const userDocRef = doc(db, "users", user.email || user.uid); // Usar email ou UID, dependendo de como você indexa
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData.primeiroLogin) {
        console.log(
          "É o primeiro login do usuário, redirecionando para a tela de boas-vindas/finalização.",
        );

        await updateDoc(userDocRef, {
          primeiroLogin: false,
        });
        console.log("Flag 'primeiroLogin' removida do Firestore.");
      } else {
        console.log("Usuário logado normalmente.");
      }
    }
  } catch (error) {
    messageEl.textContent =
      error.code === "auth/wrong-password"
        ? "Senha incorreta"
        : error.code === "auth/user-not-found"
          ? "Usuário não encontrado"
          : error.code === "auth/invalid-email"
            ? "Email inválido"
            : error.message;
    console.error(error);
  }
};

// Função de CADASTRO (paciente)
window.fazerCadastro = async () => {
  const nome = document.getElementById("signup-nome").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const senha = document.getElementById("signup-senha").value;
  const messageEl = document.getElementById("signup-error");

  if (!nome || nome.length < 2) {
    messageEl.textContent =
      "Nome completo é obrigatório (mínimo 2 caracteres).";
    return;
  }
  if (!email) {
    messageEl.textContent = "Email é obrigatório.";
    return;
  }
  if (senha.length < 6) {
    messageEl.textContent = "Senha deve ter pelo menos 6 caracteres.";
    return;
  }

  messageEl.textContent = "Criando conta...";

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, senha);

    // Cria o documento → as RULES forçam role == 'paciente'
    await setDoc(doc(db, "users", cred.user.uid), {
      uid: cred.user.uid,
      email: email,
      nome: nome,
      role: "paciente", // ← só aceito pelas rules
      active: true,
      createdAt: serverTimestamp(), // data do servidor (mais seguro)
    });

    // onAuthStateChanged mostra as infos automaticamente
  } catch (error) {
    messageEl.textContent =
      error.code === "auth/email-already-in-use"
        ? "Este email já está cadastrado"
        : error.code === "auth/weak-password"
          ? "Senha muito fraca"
          : error.code === "auth/invalid-email"
            ? "Email inválido"
            : error.message;
    console.error(error);
  }
};

// Logout
window.fazerLogout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error("Erro ao sair:", err);
  }
};

// Alternar entre login e cadastro (se preferir manter no JS)
window.toggleForms = () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  loginForm.classList.toggle("hidden");
  signupForm.classList.toggle("hidden");
};

window.toggleResetForms = () => {
  const loginForm = document.getElementById("login-form");
  const resetForm = document.getElementById("reset-password-form");

  loginForm.classList.toggle("hidden");
  resetForm.classList.toggle("hidden");
};


window.resetPassword = async () => {
  const email = document.getElementById("reset-email").value.trim();
  console.log("email para reset:", email);
  try {
    await sendPasswordResetEmail(auth, email);
    alert(
      "Um link para redefinir sua senha foi enviado para seu e-mail. Por favor, verifique sua caixa de entrada.",
    );
  } catch (error) {
    console.error(
      "Erro ao enviar e-mail de redefinição de senha:",
      error.code,
      error.message,
    );
    if (error.code === "auth/user-not-found") {
      alert(
        "Nenhuma conta encontrada com este e-mail. Verifique se o e-mail está correto.",
      );
    } else {
      alert("Ocorreu um erro. Tente novamente mais tarde.");
    }
  }
};


async function handleLoginUsuario(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    console.log("Usuário logado:", user.uid);

    // Verifique o documento do Firestore para a flag de primeiro login
    const userDocRef = doc(db, "users", user.email || user.uid); // Usar email ou UID, dependendo de como você indexa
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      if (userData.primeiroLogin) {
        console.log(
          "É o primeiro login do usuário, redirecionando para a tela de boas-vindas/finalização.",
        );
        // Redirecione o usuário para uma tela onde ele possa, por exemplo, aceitar termos,
        // preencher mais dados, etc.
        // Por exemplo: router.push('/onboarding');

        // Após a finalização (ou imediatamente, se não houver mais etapas),
        // atualize o documento para remover a flag.
        await updateDoc(userDocRef, {
          primeiroLogin: false,
          // Se você usou o email como ID no Firestore e agora tem o UID,
          // você pode querer criar um novo documento com o UID e excluir o antigo.
          // Isso envolve um pouco mais de complexidade e regras de segurança.
        });
        console.log("Flag 'primeiroLogin' removida do Firestore.");
      } else {
        console.log("Usuário logado normalmente.");
        // Redirecione para a página principal do app
        // Por exemplo: router.push('/dashboard');
      }
    } else {
      console.warn(
        "Documento de usuário não encontrado no Firestore para o UID:",
        user.uid,
      );
      // Isso pode acontecer se o Firestore for indexado por email e você buscou por UID,
      // ou se o documento foi excluído. Lide com isso conforme a lógica do seu app.
    }
  } catch (error) {
    console.error("Erro no login:", error.code, error.message);
    if (
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ) {
      alert("E-mail ou senha incorretos.");
    } else {
      alert("Ocorreu um erro ao fazer login. Tente novamente.");
    }
  }
}
