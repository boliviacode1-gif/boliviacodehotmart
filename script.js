document.addEventListener("DOMContentLoaded", () => {
  // =========================================================
  // 1. CURSOR DINÁMICO E INTERACTIVO
  // =========================================================
  const cursorDot = document.querySelector(".custom-cursor-dot");
  const cursorOutline = document.querySelector(".custom-cursor-outline");

  if (cursorDot && cursorOutline && window.matchMedia("(hover: hover)").matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Posiciona el punto de inmediato
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    // Bucle para animación suave del contorno
    const animateOutline = () => {
      outlineX += (mouseX - outlineX) * 0.18;
      outlineY += (mouseY - outlineY) * 0.18;
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      requestAnimationFrame(animateOutline);
    };
    animateOutline();

    // Reacción dinámica al hacer hover sobre interactivos
    const interactiveElements = document.querySelectorAll("a, button, .tab-btn, iframe, .video-box");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });

    // Ocultar si el puntero sale de la ventana del navegador
    document.addEventListener("mouseleave", () => {
      cursorDot.style.opacity = "0";
      cursorOutline.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      cursorDot.style.opacity = "1";
      cursorOutline.style.opacity = "1";
    });
  }

  // =========================================================
  // 2. CONTROL DE TABS DINÁMICOS (Módulos, Beneficios, Requisitos)
  // =========================================================
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".course-card");
      const targetId = btn.getAttribute("data-target");

      card.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      card.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const activePane = card.querySelector(`#${targetId}`);
      if (activePane) activePane.classList.add("active");
    });
  });

  // =========================================================
  // 3. TRACKING PROFESIONAL META PIXEL (InitiateCheckout)
  // =========================================================
  const botonCompra = document.getElementById("btn-compra-pc");
  if (botonCompra) {
    botonCompra.addEventListener("click", () => {
      if (typeof fbq === "function") {
        fbq("track", "InitiateCheckout", {
          content_name: "Técnico en Instalación, Reparación y Mantenimiento de PC y Laptops",
          content_category: "Educación Técnica",
          currency: "USD"
        });
      }
    });
  }

  // =========================================================
  // 4. ASESORÍA POR WHATSAPP (Evento Contact)
  // =========================================================
  const botonWhatsapp = document.querySelector(".btn-whatsapp");
  if (botonWhatsapp) {
    botonWhatsapp.addEventListener("click", function() {
      const curso = this.getAttribute("data-course") || "PC y Laptops";
      if (typeof fbq === "function") {
        fbq("track", "Contact", { content_name: curso });
      }
    });
  }
});