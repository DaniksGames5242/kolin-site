/* Kolya site — страница /iphone */
(function () {
  'use strict';
  const mini = document.getElementById('miniIphone');
  if (!mini) return;
  window.addEventListener('mousemove', (e) => {
    const r = mini.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) / 20;
    const y = -((e.clientY - (r.top + r.height / 2)) / 20);
    mini.style.transform = 'rotateY(' + x + 'deg) rotateX(' + y + 'deg)';
  });
  document.querySelectorAll('.dots button').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.dots button').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      const parts = b.dataset.c.split(',');
      mini.style.setProperty('--b1', parts[0]);
      mini.style.setProperty('--b2', parts[1]);
      gsap.fromTo(mini, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' });
    });
  });
  gsap.utils.toArray('.glass,.specs li').forEach((el) => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%' }
    });
  });
})();
