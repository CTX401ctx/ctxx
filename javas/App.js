// Importar lo que necesites
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Configuración de Firebase que te dieron:
const firebaseConfig = {
  apiKey: "AIzaSyANzU0sPRyGdnHPeZ2Lqr2pio5eSvvDKaw",
  authDomain: "agencia-ctx.firebaseapp.com",
  projectId: "agencia-ctx",
  storageBucket: "agencia-ctx.firebasestorage.app",
  messagingSenderId: "981141252542",
  appId: "1:981141252542:web:88330078160793d9f271ef",
  measurementId: "G-SZQLZXMWP4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para guardar datos (ejemplo)
export async function guardarUsuario(usuario) {
  try {
    const docRef = await addDoc(collection(db, "usuarios"), usuario);
    console.log("Usuario guardado con ID:", docRef.id);
  } catch (e) {
    console.error("Error añadiendo documento: ", e);
  }
}
