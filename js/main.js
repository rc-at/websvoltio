document.addEventListener("DOMContentLoaded", () => {
  console.log("WebsVoltio Premium: Iniciado.");

  // Animaciones de Scroll (Fade-in)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Acordeón FAQ Suave
  const faqSummaries = document.querySelectorAll('.faq-summary');
  faqSummaries.forEach(summary => {
    summary.addEventListener('click', () => {
      const item = summary.parentElement;
      // Cerrar otros abiertos (Opcional)
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      // Abrir/Cerrar el actual
      item.classList.toggle('active');
    });
  });

  // Botón Volver Arriba
  const btnTop = document.getElementById('btn-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btnTop.classList.add('show');
    } else {
      btnTop.classList.remove('show');
    }
  });

  btnTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});