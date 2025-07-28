 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
    import { getFirestore, collection, getDocs, query, where, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

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
    const tablaBody = document.querySelector("tbody");

    async function cargarEmpleados() {
      try {
        const q = query(collection(db, "usuarios"), where("tipo", "==", "Empleado"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const row = `
            <tr data-id="${docSnap.id}">
              <td>${docSnap.id}</td>
              <td>${data.nombre}</td>
              <td>${data.apellido}</td>
              <td>${data.email}</td>
              <td>${data.telefono}</td>
              <td>${data.direccion}</td>
              <td>${data.tipo}</td>
              <td>
                <button class="btn btn-success btn-sm btn-editar" data-id="${docSnap.id}"><i class="fas fa-pencil-alt"></i></button>
                <button class="btn btn-danger btn-sm btn-eliminar" data-id="${docSnap.id}"><i class="fas fa-trash"></i></button>
              </td>
            </tr>
          `;
          tablaBody.insertAdjacentHTML("beforeend", row);
        });
      } catch (error) {
        console.error("❌ Error al cargar empleados:", error);
        tablaBody.innerHTML = `<tr><td colspan="8" class="text-danger text-center">Error al cargar datos</td></tr>`;
      }
    }

    document.addEventListener("click", async (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      const id = btn.dataset.id;

      if (btn.classList.contains("btn-eliminar")) {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
          try {
            await deleteDoc(doc(db, "usuarios", id));
            btn.closest("tr").remove();
            alert("✅ Usuario eliminado");
          } catch (err) {
            alert("❌ Error eliminando");
            console.error(err);
          }
        }
      }

      if (btn.classList.contains("btn-editar")) {
        const fila = btn.closest("tr").children;
        const nuevoNombre = prompt("Nuevo nombre:", fila[1].textContent);
        const nuevoApellido = prompt("Nuevo apellido:", fila[2].textContent);
        const nuevoEmail = prompt("Nuevo email:", fila[3].textContent);
        const nuevoTelefono = prompt("Nuevo teléfono:", fila[4].textContent);
        const nuevaDireccion = prompt("Nueva dirección:", fila[5].textContent);
        const nuevoTipo = prompt("Nuevo Tipo:", fila[6].textContent);

        if (nuevoNombre && nuevoApellido && nuevoEmail) {
          try {
            await updateDoc(doc(db, "usuarios", id), {
              nombre: nuevoNombre,
              apellido: nuevoApellido,
              email: nuevoEmail,
              telefono: nuevoTelefono,
              direccion: nuevaDireccion,
              tipo: nuevoTipo
            });
            alert("✅ Usuario actualizado");
            location.reload();
          } catch (err) {
            alert("❌ Error actualizando");
            console.error(err);
          }
        }
      }
    });

    cargarEmpleados();