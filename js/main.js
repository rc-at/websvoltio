document.addEventListener("DOMContentLoaded", () => {
  console.log("WebsVoltio Premium: Iniciado.");

  /* ==========================================================================
     1. ANIMACIONES DE SCROLL (Fade-in)
     ========================================================================== */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  /* ==========================================================================
     2. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
     ========================================================================== */
  const faqSummaries = document.querySelectorAll('.faq-summary');
  
  faqSummaries.forEach(summary => {
    summary.addEventListener('click', () => {
      const item = summary.parentElement;
      
      // Cierra las demás opciones abiertas automáticamente
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      item.classList.toggle('active');
    });
  });

  /* ==========================================================================
     3. BOTÓN FLOTANTE "VOLVER ARRIBA"
     ========================================================================== */
  const btnTop = document.getElementById('btn-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btnTop.classList.add('show');
    } else {
      btnTop.classList.remove('show');
    }
  });

  if (btnTop) {
    btnTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     4. LÓGICA DE PAQUETES (Fijar / Expandir)
     ========================================================================== */
  
  // 4.1. Botón "Mantener expandido" (Versión PC)
  const pinButtons = document.querySelectorAll('.btn-pin');
  
  pinButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation(); 
      const card = this.closest('.package-card'); 
      card.classList.toggle('is-pinned');
      
      if (card.classList.contains('is-pinned')) {
        this.innerHTML = '<span class="material-symbols-outlined icon-pin">keep</span> Vista fijada';
      } else {
        this.innerHTML = '<span class="material-symbols-outlined icon-pin">push_pin</span> Mantener expandido';
      }
    });
  });

  // 4.2. Botón "Ver detalles" (Versión Móvil)
  const mobileToggleButtons = document.querySelectorAll('.mobile-toggle-btn');
  
  mobileToggleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.package-card');
      const icon = this.querySelector('.material-symbols-outlined');
      
      card.classList.toggle('is-pinned'); 
      
      if (card.classList.contains('is-pinned')) {
        icon.style.transform = 'rotate(180deg)';
        this.innerHTML = 'Ocultar detalles <span class="material-symbols-outlined" style="transform: rotate(180deg); transition: transform 0.4s">expand_more</span>';
      } else {
        icon.style.transform = 'rotate(0deg)';
        this.innerHTML = 'Ver detalles <span class="material-symbols-outlined" style="transition: transform 0.4s">expand_more</span>';
      }
    });
  });

  /* ================= 5. LÓGICA DEL MODAL CON BLOQUEO DE SCROLL ================= */
  const openModal = document.getElementById('open-modal');
  const closeModal = document.getElementById('close-modal');
  const modal = document.getElementById('modal-lp');

  if (openModal && modal) {
    openModal.addEventListener('click', () => {
      modal.classList.add('show');
      document.body.classList.add('modal-open'); // Bloquea scroll
    });

    const hideModal = () => {
      modal.classList.remove('show');
      document.body.classList.remove('modal-open'); // Libera scroll
    };

    closeModal.addEventListener('click', hideModal);
    
    // Cerrar al hacer clic fuera del card
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hideModal();
    });
  }

});