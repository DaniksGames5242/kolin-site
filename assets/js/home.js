/* Kolya site — интро iPhone 12 + эффекты главной */
(function () {
  'use strict';
  gsap.registerPlugin(ScrollTrigger);
  const intro = document.getElementById('intro');
  const site = document.getElementById('site');
  const pct = document.getElementById('load-pct');
  const iphoneBack = document.getElementById('iphoneBack');
  let mouseX = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
  });
  gsap.ticker.add(() => {
    gsap.to('#iphone3d', { rotationY: '+=' + mouseX * 0.02, duration: 0.5, overwrite: 'auto' });
  });
  const counter = { v: 0 };
  const tl = gsap.timeline({ onComplete: enterSite });
  tl.from('#iphone-scene', { scale: 0, rotationY: 540, duration: 1.6, ease: 'back.out(1.4)' })
    .to(counter, { v: 100, duration: 1.6, onUpdate: () => { pct.textContent = Math.round(counter.v) + '%'; } }, '<')
    .to('.iphone-3d', { rotationY: 0, rotationX: 0, duration: 0.8, ease: 'power3.inOut' })
    .to('.wallpaper', { opacity: 1, duration: 0.6 }, '-=0.3')
    .to('#lockScreen', { opacity: 1, duration: 0.5 }, '-=0.2')
    .to('.lock-time', { scale: 1.1, duration: 0.3, yoyo: true, repeat: 1 }, '-=0.1')
    .to('#notif1', { opacity: 1, y: 0, duration: 0.5, ease: 'back.out' }, '-=0.1')
    .to('#notif2', { opacity: 1, y: 0, duration: 0.5, ease: 'back.out' }, '-=0.3')
    .to('.intro-title', { scale: 1.12, duration: 0.4, yoyo: true, repeat: 1 }, '-=0.4')
    .to('.iphone-3d', {
      rotationY: 180, duration: 1, ease: 'power2.inOut',
      onStart: () => { if (iphoneBack) iphoneBack.style.boxShadow = '0 0 120px #2F6BFF'; }
    }, '+=0.4')
    .to('.iphone-3d', { rotationY: 360, scale: 1.2, duration: 0.8, ease: 'power2.in' })
    .to('#homeScreen', { display: 'block', duration: 0 })
    .to('#lockScreen', { opacity: 0, duration: 0.3 })
    .to('.flash', { opacity: 1, duration: 0.1, yoyo: true, repeat: 1 })
    .to('.app', { scale: 1, stagger: 0.06, duration: 0.4, ease: 'back.out(2)' })
    .to('#intro', { scale: 3, opacity: 0, filter: 'blur(20px)', duration: 1, ease: 'power4.in', delay: 0.6 });
  document.getElementById('skip').addEventListener('click', () => tl.progress(1));
  function enterSite() {
    intro.style.display = 'none';
    site.style.visibility = 'visible';
    gsap.to(site, { opacity: 1, duration: 0.8 });
    startTyped();
    initScroll();
  }
  const words = ['мне 14 лет', 'люблю iPhone 12', 'снимаю видео', 'учусь и развиваюсь'];
  let wi = 0, ci = 0, del = false;
  function startTyped() {
    const el = document.getElementById('typed');
    if (!el) return;
    (function tick() {
      const w = words[wi];
      el.textContent = w.slice(0, ci);
      if (!del) {
        ci++;
        if (ci > w.length + 8) del = true;
      } else {
        ci--;
        if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(tick, del ? 40 : 90);
    })();
  }
  function initScroll() {
    gsap.utils.toArray('.glass,.fact,.proj').forEach((el) => {
      gsap.from(el, {
        y: 50, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });
  }
})();
