  function abrirSidebarJefe() {
    document.getElementById("sidebar-jefe").style.display = "block";
  }

  function closeNav() {
    document.getElementById("sidebar-jefe").style.display = "none";
  }

  function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    if (submenu.style.display === "none") {
      submenu.style.display = "block";
    } else {
      submenu.style.display = "none";
    }
  }