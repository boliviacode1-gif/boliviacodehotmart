document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initVideoPlayer();
  initFAQ();
  initHotmartTracking();
});

// 1. REPRODUCTOR DE VIDEO PUBLICITARIO CON OVERLAY DINÁMICO
function initVideoPlayer() {
  const video = document.getElementById('promo-video');
  const overlay = document.getElementById('video-overlay');

  if (!video || !overlay) return;

  overlay.addEventListener('click', () => {
    overlay.classList.add('hidden');
    video.controls = true;

    // Forzar la carga y reproducir manejando permisos del navegador
    video.load();
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Reproducción iniciada con éxito");
        })
        .catch(error => {
          console.warn("Autoplay bloqueado con audio, intentando en silencio:", error);
          // Si el navegador bloquea el audio al primer clic, inicia silenciado para destrabar el 00:00
          video.muted = true;
          video.play();
        });
    }
  });

  video.addEventListener('ended', () => {
    overlay.classList.remove('hidden');
    video.controls = false;
  });
}

// 2. TEMPORIZADOR DE URGENCIA DINÁMICO (15 MINUTOS)
function initCountdown() {
  const display = document.getElementById('countdown');
  if (!display) return;

  let totalSeconds = 15 * 60;

  const timerInterval = setInterval(() => {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    display.textContent = `00:${minutes}:${seconds}`;

    if (--totalSeconds < 0) {
      clearInterval(timerInterval);
      display.textContent = '¡ÚLTIMOS CUPOS CON 50% DCTO!';
    }
  }, 1000);
}

// 3. ACORDEÓN DINÁMICO PARA FAQ
function initFAQ() {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      const isOpen = parent.classList.contains('active');

      // Cierra las demás preguntas para mantener el diseño limpio
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isOpen) {
        parent.classList.add('active');
      }
    });
  });
}

// 4. SEGUIMIENTO DE EVENTOS (META PIXEL) AL HACER CLIC EN EL HOTLINK
function initHotmartTracking() {
  const buttons = document.querySelectorAll('.track-checkout');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Dispara el evento InitiateCheckout en tu pixel de Meta (998687499837422)
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout');
      }
    });
  });
}