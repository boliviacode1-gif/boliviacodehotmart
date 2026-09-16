document.addEventListener("DOMContentLoaded", () => {
  // 1. CURSOR MAGNÉTICO DINÁMICO
  const dot = document.getElementById("cursor-dot");
  const circle = document.getElementById("cursor-circle");

  let mouseX = 0, mouseY = 0;
  let circleX = 0, circleY = 0;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function animateCursor() {
    circleX += (mouseX - circleX) * 0.15;
    circleY += (mouseY - circleY) * 0.15;
    circle.style.transform = `translate(${circleX}px, ${circleY}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Reacción interactiva en botones, acordeones y videos
  const interactives = document.querySelectorAll("[data-interactive], a, button, video");
  interactives.forEach((el) => {
    el.addEventListener("mouseenter", () => circle.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => circle.classList.remove("cursor-hover"));
  });

  // 2. BARRA DE PROGRESO DE LECTURA (SCROLL SUPERIOR)
  const scrollIndicator = document.getElementById("scroll-indicator");
  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollIndicator.style.width = `${progress}%`;
  });

  // 3. ANIMACIÓN DE ENTRADA CON OBSERVER (SCROLL REVEAL)
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((el) => revealObserver.observe(el));

  // 4. ACORDEÓN DESPLEGABLE PARA TEMARIOS
  const accordions = document.querySelectorAll(".accordion-trigger");
  accordions.forEach((btn) => {
    btn.addEventListener("click", function () {
      const panel = this.nextElementSibling;
      const icon = this.querySelector(".accordion-icon");

      if (panel.style.maxHeight && panel.style.maxHeight !== "0px") {
        panel.style.maxHeight = "0px";
        icon.textContent = "+";
        icon.style.transform = "rotate(0deg)";
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        icon.textContent = "−";
        icon.style.transform = "rotate(180deg)";
      }
    });
  });

  // 5. PAUSA INTELIGENTE DE VIDEOS (Solo uno reproduciendo a la vez)
  const allVideos = document.querySelectorAll("video");
  allVideos.forEach((video) => {
    video.addEventListener("play", () => {
      allVideos.forEach((otherVideo) => {
        if (otherVideo !== video) {
          otherVideo.pause();
        }
      });
    });
  });
});