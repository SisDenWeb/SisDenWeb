import { auth, db } from './config-firebase.js'; // ajuste o path
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getDoc, doc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// Variável para evitar múltiplas execuções
let authChecked = false;

onAuthStateChanged(auth, async (user) => {
  if (authChecked) return; // evita loop ou re-execução desnecessária

  authChecked = true;

  if (!user) {
    // Não logado → vai para login
    window.location.replace('/source/html/index.html'); // use replace para não ficar no history
    return;
  }
});

// Função de LOGOUT
window.fazerLogout = async () => {
  await auth.signOut();
  window.location.replace('/source/html/index.html');
  // onAuthStateChanged cuida do redirecionamento
};