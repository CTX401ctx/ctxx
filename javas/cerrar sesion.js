document.addEventListener("DOMContentLoaded", () => {
  const tipo = localStorage.getItem("tipoCuenta");
  const estadoSesion = document.getElementById("estado-sesion");

  if (!tipo) {
    estadoSesion.innerHTML = `
      <a href="inicio de sesion.html">
        <i class="fa-solid fa-circle-user"></i> Iniciar sesión
      </a>
    `;
  } else {
    const nombre = localStorage.getItem("nombreUsuario") || "Usuario";
    estadoSesion.innerHTML = `
      <a href="#" onclick="cerrarSesion()">
        <i class="fa-solid fa-circle-user"></i> Cerrar sesión (${nombre})
      </a>
    `;
  }
});

function cerrarSesion() {
  localStorage.clear();
  window.location.href = "inicio de sesion.html";
}