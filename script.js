document.addEventListener('DOMContentLoaded', () => {
  // 1. Sistema de Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');

      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));

      button.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // 2. Dinamismo en Botones (Efecto Magnético 3D + Ripple)
  const dynamicButtons = document.querySelectorAll('.btn');

  dynamicButtons.forEach(btn => {
    // Micro-inclinación magnética hacia el cursor
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const tiltX = (y / (rect.height / 2)) * -6;
      const tiltY = (x / (rect.width / 2)) * 6;

      btn.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });

    // Efecto Onda (Ripple) al hacer click
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) existingRipple.remove();

      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // 3. Cursor Dinámico Cinemático
  const dot = document.querySelector('.custom-cursor-dot');
  const outline = document.querySelector('.custom-cursor-outline');

  if (dot && outline && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      outline.style.left = `${outlineX}px`;
      outline.style.top = `${outlineY}px`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const hoverElements = document.querySelectorAll('a, button, .tab-btn');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => outline.classList.add('hovered'));
      el.addEventListener('mouseleave', () => outline.classList.remove('hovered'));
    });
  }

  // 4. Meta Pixel Track
  const btnCompra = document.getElementById('btn-compra-pc');
  if (btnCompra) {
    btnCompra.addEventListener('click', () => {
      if (typeof fbq === 'function') {
        fbq('track', 'InitiateCheckout', {
          content_name: 'Técnico en PC y Laptops',
          currency: 'USD',
          value: 31.89
        });
      }
    });
  }
});