import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDg33oW1iVRwyjQP0IwGfk38uxWEBLylv8",
  authDomain: "sisdenweb3sos.firebaseapp.com",
  databaseURL: "https://sisdenweb3sos-default-rtdb.firebaseio.com",
  projectId: "sisdenweb3sos",
  storageBucket: "sisdenweb3sos.firebasestorage.app",
  messagingSenderId: "733600976284",
  appId: "1:733600976284:web:ee8b357592dbc11bc50c59",
  measurementId: "G-C4QJ12G24V"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);

export { app };

