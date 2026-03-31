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

  const initTheme = async () => {
    const savedTheme = localStorage.getItem('theme');

    // 1. Si el usuario ya eligió un tema antes, lo respetamos inmediatamente
    if (savedTheme) {
      setTheme(savedTheme);
      return;
    }

    // 2. Si es su primera visita, consultamos la hora exacta de internet
    let currentHour;
    try {
      const response = await fetch('https://worldtimeapi.org/api/ip');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      // Extraemos la hora local basada en la IP desde la API
      const dateStr = data.datetime;
      currentHour = new Date(dateStr).getHours();
    } catch (error) {
      // 3. Fallback: Si la API falla o hay mala red, usamos la hora de su celular/PC
      console.warn("Usando hora local como respaldo.");
      currentHour = new Date().getHours();
    }

    // Automático: oscuro entre las 18:00 (6 PM) y las 05:59 (5 AM)
    const theme = (currentHour >= 18 || currentHour < 6) ? 'dark' : 'light';
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
window.showDocument = (id) => {
  const sections = document.querySelectorAll('.legal-content');
  const buttons = document.querySelectorAll('.toggle-btn');

  sections.forEach(sec => sec.classList.remove('active'));
  buttons.forEach(btn => btn.classList.remove('active'));

  const targetSection = document.getElementById(id);
  if (targetSection) {
    targetSection.classList.add('active');
  }

  if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add('active');
  }
};

// --- SCROLL SUAVE Y URL LIMPIA ---
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