import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANzU0sPRyGdnHPeZ2Lqr2pio5eSvvDKaw",
  authDomain: "agencia-ctx.firebaseapp.com",
  projectId: "agencia-ctx",
  storageBucket: "agencia-ctx.appspot.com",
  messagingSenderId: "981141252542",
  appId: "1:981141252542:web:88330078160793d9f271ef",
  measurementId: "G-SZQLZXMWP4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const contenedor = document.getElementById("productos-Kawasaki");

async function cargarMotosDeportivas() {
  try {
    const productosRef = collection(db, "productos");
    const snapshot = await getDocs(productosRef);

    if (snapshot.empty) {
      contenedor.innerHTML = '<p class="text-center text-muted">No hay productos registrados.</p>';
      return;
    }

    contenedor.innerHTML = ""; // Limpio el contenedor antes de insertar

    snapshot.forEach((doc) => {
      const data = doc.data();
      const idProducto = doc.id;

      // Validamos si el tipo es deportiva (ignorando mayúsculas/minúsculas)
      const marca = data.marca?.toLowerCase();
      if (marca !== "kawasaki") return;

      const imagen = (() => {
        if (typeof data.imagen_fondo === "string" && data.imagen_fondo.trim() !== "") {
          return data.imagen_fondo.trim();
        } else if (Array.isArray(data.imagenes) && data.imagenes.length > 0 && typeof data.imagenes[0] === "string") {
          return data.imagenes[0].trim();
        } else {
          return "https://via.placeholder.com/400x200";
        }
      })();

      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";

      card.innerHTML = `
        <a href="vista general de productos.html?id=${idProducto}" class="card h-100 shadow-sm text-decoration-none text-dark">
          <img src="${imagen}" class="card-img-top" alt="${data.nombre || 'Producto'}" loading="lazy" onerror="this.onerror=null;this.src='https://via.placeholder.com/400x200';" />
          <div class="card-body">
            <h5 class="card-title">${data.nombre || "Nombre no disponible"}</h5>
            <p class="card-text"><strong>Marca:</strong> ${data.marca || 'N/A'}</p>
            <p class="card-text"><strong>Precio:</strong> $${data.precio ? data.precio.toLocaleString() : '0.00'}</p>
            <p class="card-text text-muted">${data.descripcionCorta || ''}</p>
          </div>
        </a>
      `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    contenedor.innerHTML = `<div class="alert alert-danger">Hubo un error al cargar los productos.</div>`;
  }
}

cargarMotosDeportivas();
