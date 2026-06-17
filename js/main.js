// ===== Lenis smooth scroll =====
const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

gsap.registerPlugin(ScrollTrigger);

// ===== Splitting (per-char text reveal for opening) =====
Splitting();
gsap.set("#l1 .char, #l2 .char", { opacity: 0, y: '0.4em' });
gsap.to("#l1 .char", { opacity: 1, y: 0, duration: 0.6, stagger: 0.02, delay: 0.5, ease: 'power2.out' });
gsap.to("#l2 .char", { opacity: 1, y: 0, duration: 0.6, stagger: 0.02, delay: 2.4, ease: 'power2.out' });
gsap.set("#l1, #l2", { opacity: 1, y: 0 });

// ===== tsParticles — soft floating petals =====
tsParticles.load("particles", {
  fpsLimit: 60,
  particles: {
    number: { value: 22 },
    color: { value: ["#f9a8d4", "#fbcfe8", "#fed7aa"] },
    shape: { type: "circle" },
    opacity: { value: 0.35 },
    size: { value: { min: 2, max: 5 } },
    move: { enable: true, speed: 0.4, direction: "bottom", outModes: "out", random: true },
    links: { enable: false },
    wobble: { enable: true, distance: 8, speed: 4 }
  },
  detectRetina: true
});

// ===== Cursor-following soft glow (desktop only) =====
if (window.matchMedia("(pointer: fine)").matches) {
  const glow = document.createElement('div');
  glow.classList.add('cursor-glow');
  document.body.appendChild(glow);
  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.opacity = '1';
  });
}

// ===== Vanilla Tilt =====
if (window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
}

// ===== Swiper gallery =====
const gallerySwiper = new Swiper(".gallerySwiper", {
  slidesPerView: 'auto',
  spaceBetween: 16,
  centeredSlides: true,
  loop: true,
  observer: true,
  observeParents: true,
  pagination: { el: '.swiper-pagination', clickable: true },
});

window.addEventListener('load', () => gallerySwiper.update());

// ===== Sections & nav dots =====
const sections = document.querySelectorAll('[data-sec]');
const dots = document.querySelectorAll('.navdot');
const endingSection = sections[sections.length - 1];

// ===== Confetti on ending section =====
ScrollTrigger.create({
  trigger: endingSection,
  start: 'top 60%',
  once: true,
  onEnter: () => {
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#a855f7', '#f472b6', '#f9a8d4']
    });
  }
});

// ===== Fade-up reveal for everything else =====
gsap.utils.toArray('.gsap-fade').forEach((el) => {
  if (el.id === 'l1' || el.id === 'l2') return;
  gsap.to(el, {
    opacity: 1, y: 0, duration: 1,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' }
  });
});

// ===== Progress bar =====
const progress = document.getElementById('progress');
lenis.on('scroll', ({ scroll, limit }) => {
  progress.style.width = (scroll / limit) * 100 + '%';
});

// ===== Nav dots active state + click to scroll =====
sections.forEach((sec, i) => {
  ScrollTrigger.create({
    trigger: sec, start: 'top center', end: 'bottom center',
    onToggle: (self) => {
      if (self.isActive) {
        dots.forEach(d => d.classList.remove('active'));
        dots[i].classList.add('active');
      }
    }
  });
});
dots.forEach((d, i) => d.addEventListener('click', () => {
  lenis.scrollTo(sections[i], { duration: 1.2 });
}));

// ===== Howler music =====
const sound = new Howl({
  src: ['about-you.mp3'],
  loop: true,
  volume: 0.5
});
const musicBtn = document.getElementById('musicBtn');
musicBtn.addEventListener('click', () => {
  if (sound.playing()) {
    sound.pause();
    musicBtn.classList.remove('playing');
  } else {
    sound.play();
    musicBtn.classList.add('playing');
  }
});
