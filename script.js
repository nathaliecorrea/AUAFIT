/* ═══════════════════════════════════════════════════
   AUAFIT — Experiencia Aquaboard · script.js v3
   ═══════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Enable JS animations ── */
  document.body.classList.add('has-js');

  /* ── Language ── */
  const langBtn = document.getElementById('langBtn');
  let lang = localStorage.getItem('auafit-lang') || 'es';

  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l;
    localStorage.setItem('auafit-lang', l);
  }
  applyLang(lang);
  if (langBtn) {
    langBtn.addEventListener('click', () => applyLang(lang === 'es' ? 'en' : 'es'));
  }

  /* ── Nav scroll ── */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > 50);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Reveal on scroll ── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ── Stagger grid children ── */
  document.querySelectorAll('.cards-4, .cards-3, .days-grid, .mod-grid, .bens-grid').forEach(container => {
    container.querySelectorAll('.reveal').forEach((child, i) => {
      child.style.transitionDelay = (i * 0.09) + 's';
    });
  });

  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
      }
    });
  });

  /* ── Animate stat counters ── */
  const statNums = document.querySelectorAll('[data-count]');
  if (statNums.length) {
    const statIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          countUp(e.target);
          statIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    statNums.forEach(el => statIO.observe(el));
  }

  function countUp(el) {
    const target = parseInt(el.dataset.count);
    const dur = 1200;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

})();
