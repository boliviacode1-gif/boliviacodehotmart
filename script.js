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