
  // Abre el sidebar del comprador
  function abrirSidebarComprador() {
    document.getElementById("sidebar-comprador").style.display = "block";
  }

  // Cierra el sidebar del comprador
  function closeNav() {
    document.getElementById("sidebar-comprador").style.display = "none";
  }

  // Abre/cierra submenús
  function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    if (submenu.style.display === "none") {
      submenu.style.display = "block";
    } else {
      submenu.style.display = "none";
    }
  }

