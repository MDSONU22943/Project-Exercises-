/**
 * main.js  —  served statically via express.static('public')
 * Handles: mobile nav, scroll animations, and stack bar reveals.
 */

/* ── Mobile nav toggle ── */
const hamburger = document.getElementById('hamburger');
const nav       = document.querySelector('.nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close nav when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

/* ── Intersection Observer: stack bars & items ── */
const stackItems = document.querySelectorAll('.stack-item');

// Transfer inline width → CSS custom property so we can animate with JS toggle
stackItems.forEach(item => {
  const bar = item.querySelector('.stack-bar span');
  if (bar) {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    item.style.setProperty('--target-width', targetWidth);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger each bar reveal
        setTimeout(() => {
          entry.target.classList.add('visible');
          const bar = entry.target.querySelector('.stack-bar span');
          if (bar) {
            const target = entry.target.style.getPropertyValue('--target-width');
            bar.style.width = target;
          }
        }, i * 120);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

stackItems.forEach(item => observer.observe(item));

/* ── Feature cards: subtle parallax tilt on hover ── */
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);
    const dy     = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-4px) rotateX(${-dy * 4}deg) rotateY(${dx * 4}deg)`;
    card.style.transition = 'transform .05s';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .35s ease, border-color .25s';
  });
});

/* ── Console greeting ── */
console.log(
  '%c🚀 DevShelf\n%cStatic files served by Express.js · Project Exercise 36',
  'color:#c8f04d;font-size:18px;font-weight:bold;',
  'color:#7a7570;font-size:12px;'
);