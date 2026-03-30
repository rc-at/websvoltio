/**
 * WebsVoltio - Script Principal
 * Maneja el tema (claro/oscuro) y la navegación de documentos legales.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- LÓGICA DE TEMA (DARK/LIGHT MODE) ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  const setTheme = (activeTheme) => {
    document.documentElement.setAttribute('data-theme', activeTheme);
    if (themeIcon) {
      themeIcon.textContent = activeTheme === 'dark' ? 'light_mode' : 'dark_mode';
    }
    localStorage.setItem('theme', activeTheme);
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const hour = new Date().getHours();
    // Automático entre 6pm y 6am si no hay preferencia guardada
    const theme = savedTheme || ((hour >= 18 || hour < 6) ? 'dark' : 'light');
    setTheme(theme);
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }

  initTheme();
});

// --- LÓGICA DE PESTAÑAS LEGALES ---
// Se define fuera del DOMContentLoaded para que sea accesible desde el atributo 'onclick' del HTML
window.showDocument = (id) => {
  const sections = document.querySelectorAll('.legal-content');
  const buttons = document.querySelectorAll('.toggle-btn');

  // Ocultar todas las secciones y desactivar botones
  sections.forEach(sec => sec.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  // Activar la sección y el botón correspondiente
  const targetSection = document.getElementById(id);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  // event.currentTarget funciona cuando se llama desde el atributo onclick
  if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add('active');
  }
};

// Manejo de scroll suave sin cambiar la URL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});