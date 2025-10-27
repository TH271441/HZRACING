// ========================================
// SCRIPTS COMUNES PARA HZ RACING ESPORT TEAM
// ========================================

// Función para toggle del menú hamburguesa
function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('active');
}

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', function(event) {
  const navMenu = document.getElementById('navMenu');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (navMenu && menuToggle && !navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
    navMenu.classList.remove('active');
  }
});

// Cerrar menú al hacer clic en un enlace (para móvil)
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
      navMenu.classList.remove('active');
    }
  });
});

// Animación suave para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
