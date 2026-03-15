document.addEventListener("DOMContentLoaded", () => {
  console.log("WebsVoltio Premium: Iniciado.");

  // ================= ANIMACIONES DE SCROLL (FADE-IN) =================
  // Utiliza IntersectionObserver para detectar cuándo un elemento entra en pantalla.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 }); // Se activa cuando el 10% del elemento es visible

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ================= ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ) =================
  const faqSummaries = document.querySelectorAll('.faq-summary');
  
  faqSummaries.forEach(summary => {
    summary.addEventListener('click', () => {
      const item = summary.parentElement;
      
      // Opcional: Cierra las demás preguntas cuando abres una nueva
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Alterna la clase activa en la pregunta clickeada
      item.classList.toggle('active');
    });
  });

  // ================= BOTÓN "VOLVER ARRIBA" ESTABILIZADO =================
  const btnTop = document.getElementById('btn-top');
  
  // Muestra u oculta el botón basado en la posición del scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btnTop.classList.add('show');
    } else {
      btnTop.classList.remove('show');
    }
  });

  // Evento de clic para hacer el scroll suave hacia arriba
  if (btnTop) {
    btnTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

// ================= LÓGICA DEL CARRUSEL DE PORTAFOLIO Y DIFUMINADOS =================
  const track = document.getElementById('portfolio-track');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');

  if (track) {
    const wrapper = track.closest('.carousel-wrapper');
    
    const updateCarouselUI = () => {
      // Manejo del borde izquierdo (Difuminado y Flecha)
      if (track.scrollLeft <= 5) { // Un pequeño margen de 5px
        wrapper.classList.remove('show-left');
        if (btnPrev) { btnPrev.style.opacity = '0'; btnPrev.style.pointerEvents = 'none'; }
      } else {
        wrapper.classList.add('show-left');
        if (btnPrev) { btnPrev.style.opacity = '1'; btnPrev.style.pointerEvents = 'auto'; }
      }
      
      // Manejo del borde derecho (Difuminado y Flecha)
      if (Math.ceil(track.scrollLeft + track.clientWidth) >= track.scrollWidth - 2) {
        wrapper.classList.remove('show-right');
        if (btnNext) { btnNext.style.opacity = '0'; btnNext.style.pointerEvents = 'none'; }
      } else {
        wrapper.classList.add('show-right');
        if (btnNext) { btnNext.style.opacity = '1'; btnNext.style.pointerEvents = 'auto'; }
      }
    };

    // Ejecutar al cargar la página y cada vez que se hace scroll en el carrusel
    updateCarouselUI();
    track.addEventListener('scroll', updateCarouselUI);

    // Controles de flechas (PC)
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        track.scrollBy({ left: 380, behavior: 'smooth' });
      });
    }
    
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        track.scrollBy({ left: -380, behavior: 'smooth' });
      });
    }
  }
});