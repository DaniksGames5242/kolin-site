/* Kolya site — страница /iphone */
(function () {
  'use strict';
  const mini = document.getElementById('miniIphone');
  if (!mini) return;
  const stage = document.getElementById('phoneStage');
  if (!stage) return;
  const glare = document.getElementById('scrGlare');
  const glow = document.getElementById('phoneGlow');
  const shadow = document.querySelector('.phone-shadow');
  let rotY = -24, rotX = 6, targetY = -24, targetX = 6, auto = true, dragging = false, sx = 0, sy = 0, sy0 = 0, sx0 = 0, flip = 0;
  const render = () => { mini.style.transform = 'rotateY(' + (rotY + flip) + 'deg) rotateX(' + rotX + 'deg)'; };
  const tick = () => {
    if (!dragging && auto) { targetY += 0.22; if (targetY > 180) { targetY -= 360; rotY -= 360; flip = 0; } }
    rotY += (targetY - rotY) * 0.08; rotX += (targetX - rotX) * 0.08;
    render();
    const ny = ((rotY + flip) % 360 + 360) % 360;
    if (glare) glare.style.transform = 'translateX(' + (-30 + (ny > 180 ? (360 - ny) : ny) * 0.5) + '%) skewX(-6deg)';
    if (shadow) { const k = Math.abs(rotX) / 90; shadow.style.transform = 'scaleX(' + (1 - k * 0.25).toFixed(3) + ')'; shadow.style.opacity = String(0.72 - k * 0.2); }
    requestAnimationFrame(tick);
  };
  tick();
  const setFromPoint = (cx) => {
    const r = mini.getBoundingClientRect();
    const px = (cx - (r.left + r.width / 2)) / r.width;
    if (glare) glare.style.transform = 'translateX(' + (px * 90 - 30) + '%) skewX(-6deg)';
  };
  window.addEventListener('mousemove', (e) => { if (!dragging) setFromPoint(e.clientX); });
  stage.addEventListener('pointerdown', (e) => { dragging = true; auto = false; sx = e.clientX; sy = e.clientY; sy0 = targetY; sx0 = targetX; stage.setPointerCapture(e.pointerId); });
  stage.addEventListener('pointermove', (e) => { if (!dragging) return; targetY = sy0 + (e.clientX - sx) * 0.45; targetX = Math.max(-28, Math.min(28, sx0 - (e.clientY - sy) * 0.3)); setFromPoint(e.clientX); });
  const stop = () => { dragging = false; setTimeout(() => { auto = true; }, 2500); };
  stage.addEventListener('pointerup', stop); stage.addEventListener('pointercancel', stop);
  stage.addEventListener('dblclick', () => { flip += 180; if (window.gsap) gsap.fromTo(mini, { scale: 0.96 }, { scale: 1, duration: 0.5, ease: 'back.out(2)' }); });
  document.querySelectorAll('.dots button').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.dots button').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      const parts = b.dataset.c.split(',');
      mini.style.setProperty('--b1', parts[0]);
      mini.style.setProperty('--b2', parts[1]);
      if (glow) glow.style.background = 'radial-gradient(circle,' + (parts[2] || parts[1] + '66') + ',transparent 65%)';
      if (window.gsap) gsap.fromTo(mini, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
    });
  });
  if (!window.gsap) return;
  gsap.utils.toArray('.glass,.specs li').forEach((el) => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%' }
    });
  });
})();
