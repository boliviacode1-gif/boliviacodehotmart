// ==========================================
// 1. CONFIGURACIÓN DE CONTACTO
// ==========================================
const TU_NUMERO_WHATSAPP = "+59163874666"; // Tu código de país y número

document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // 2. ENLACES DINÁMICOS A WHATSAPP
  // ==========================================
  const whatsappButtons = document.querySelectorAll(".btn-whatsapp");

  whatsappButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const courseName = button.getAttribute("data-course");
      const message = `¡Hola! Me gustaría inscribirme en el curso de "${courseName}". ¿Podrías brindarme los accesos y el enlace de pago con descuento?`;
      const encodedMessage = encodeURIComponent(message);
      const url = `https://wa.me/${TU_NUMERO_WHATSAPP}?text=${encodedMessage}`;

      window.open(url, "_blank", "noopener,noreferrer");
    });
  });

  // ==========================================
  // 3. PESTAÑAS DINÁMICAS (TABS) POR CURSO
  // ==========================================
  const courseCards = document.querySelectorAll(".course-card");

  courseCards.forEach((card) => {
    const tabButtons = card.querySelectorAll(".tab-btn");
    const tabPanes = card.querySelectorAll(".tab-pane");

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remover clase activa de botones en esta tarjeta
        tabButtons.forEach((b) => b.classList.remove("active"));
        // Ocultar todos los paneles de esta tarjeta
        tabPanes.forEach((p) => p.classList.remove("active"));

        // Activar el botón presionado
        btn.classList.add("active");

        // Mostrar el panel correspondiente
        const targetId = btn.getAttribute("data-target");
        const activePane = card.querySelector(`#${targetId}`);
        if (activePane) {
          activePane.classList.add("active");
        }
      });
    });
  });

  // ==========================================
  // 4. ANIMACIÓN AL HACER SCROLL (FADE IN UP)
  // ==========================================
  const observerOptions = {
    root: null,
    threshold: 0.15
  };

  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target); // Solo animar la primera vez
      }
    });
  }, observerOptions);

  courseCards.forEach((card) => {
    cardObserver.observe(card);
  });
});