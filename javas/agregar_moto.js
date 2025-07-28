    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
    import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyANzU0sPRyGdnHPeZ2Lqr2pio5eSvvDKaw",
      authDomain: "agencia-ctx.firebaseapp.com",
      projectId: "agencia-ctx",
      storageBucket: "agencia-ctx.firebasestorage.app",
      messagingSenderId: "981141252542",
      appId: "1:981141252542:web:88330078160793d9f271ef",
      measurementId: "G-SZQLZXMWP4"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    document.getElementById("form-registro").addEventListener("submit", async (e) => {
      e.preventDefault();

      const docData = {
        nombre: document.getElementById("nombre").value,
        modelo: document.getElementById("modelo").value,
        precio: parseFloat(document.getElementById("precio").value),
        marca: document.getElementById("marca").value,
        tipo: document.getElementById("tipo").value,
        descripcion_corta: document.getElementById("descripcionCorta").value,
        descripcion_larga: document.getElementById("descripcionLarga").value,
        imagen_fondo: document.getElementById("imagenFondo").value,
        imagenes: document.getElementById("imagenes").value.split(",").map(img => img.trim()),
        especificaciones: [
          { nombre: "Suspensión delantera", valor: document.getElementById("suspensionDelantera").value },
          { nombre: "Suspensión trasera", valor: document.getElementById("suspensionTrasera").value },
          { nombre: "Freno delantero", valor: document.getElementById("frenoDelantero").value },
          { nombre: "Freno trasero", valor: document.getElementById("frenoTrasero").value },
          { nombre: "Neumático delantero", valor: document.getElementById("neumaticoDelantero").value },
          { nombre: "Neumático trasero", valor: document.getElementById("neumaticoTrasero").value }
        ]
      };

      try {
        await addDoc(collection(db, "productos"), docData);
        alert("Producto guardado correctamente.");
        document.getElementById("form-registro").reset();
      } catch (error) {
        console.error("Error al guardar:", error);
        alert("Error al guardar el producto.");
      }
    });