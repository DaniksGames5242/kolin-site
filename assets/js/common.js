/* Kolya site — общие эффекты: частицы, курсор, шапка */
(function () {
  'use strict';
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0;
    const dots = [];
    const COLORS = ['#2F6BFF', '#7C9EFF', '#C9A96A'];
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 90; i++) {
      dots.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.8,
        c: COLORS[i % COLORS.length]
      });
    }
    (function loop() {
      ctx.clearRect(0, 0, W, H);
      for (const p of dots) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(loop);
    })();
  }
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('[data-nav]').forEach((a) => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
  /* Переключалка «Моё фото»: 1/2, кнопки назад/дальше */
  document.querySelectorAll('.photo-card').forEach((card) => {
    const photos = Array.from(card.querySelectorAll('.my-photo'));
    if (photos.length < 2) return;
    const cur = card.querySelector('[data-photo-cur]');
    const prev = card.querySelector('.photo-prev');
    const next = card.querySelector('.photo-next');
    let i = 0;
    const show = (n) => {
      i = (n + photos.length) % photos.length;
      photos.forEach((p, k) => p.classList.toggle('is-active', k === i));
      if (cur) cur.textContent = String(i + 1);
    };
    if (prev) prev.addEventListener('click', () => show(i - 1));
    if (next) next.addEventListener('click', () => show(i + 1));
    /* свайп пальцем */
    const frame = card.querySelector('.photo-frame');
    let sx = null;
    if (frame) {
      frame.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
      frame.addEventListener('touchend', (e) => {
        if (sx === null) return;
        const dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 35) show(i + (dx < 0 ? 1 : -1));
        sx = null;
      });
    }
  });
})();
