/* 4D Travel — interações da landing page */
import { CONFIG, whatsappUrl } from './config.js';

var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- WhatsApp (número vem do config.js) ---------- */
document.querySelectorAll('a[href^="https://wa.me/"]').forEach(function (a) { a.href = whatsappUrl(); });

/* ---------- Nav ---------- */
var nav = document.querySelector('.nav');
var toggle = document.querySelector('.nav__toggle');

function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 40); }
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toggle.addEventListener('click', function () {
  var open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
nav.querySelectorAll('.nav__links a').forEach(function (a) {
  a.addEventListener('click', function () {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Revelar ao rolar ---------- */
var toReveal = document.querySelectorAll('.reveal');
document.querySelectorAll('.pains__list, .it__list, .about__proofs, .impact, .hero__copy').forEach(function (group) {
  group.querySelectorAll('.reveal').forEach(function (el, i) { el.style.setProperty('--d', (i * 0.09) + 's'); });
});

if ('IntersectionObserver' in window && !reduceMotion) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  toReveal.forEach(function (el) { io.observe(el); });
} else {
  toReveal.forEach(function (el) { el.classList.add('is-in'); });
}

/* ---------- Itinerário: avião percorre a rota conforme a rolagem ---------- */
var list = document.querySelector('.it__list');
var route = document.querySelector('.it__route');
var stops = document.querySelectorAll('.it__item');

function updateRoute() {
  var r = route.getBoundingClientRect();
  var mark = window.innerHeight * 0.55;
  var p = Math.min(1, Math.max(0, (mark - r.top) / r.height));
  route.style.setProperty('--p', p.toFixed(4));
  stops.forEach(function (s) {
    s.classList.toggle('is-passed', s.getBoundingClientRect().top + 46 < mark);
  });
}
if (list && route) {
  if (reduceMotion) { route.style.setProperty('--p', 1); stops.forEach(function (s) { s.classList.add('is-passed'); }); }
  else {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { updateRoute(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', updateRoute);
    updateRoute();
  }
}

/* ---------- Vídeo do case ---------- */
var player = document.querySelector('.player');
var screen = player.querySelector('.player__screen');
var poster = screen.querySelector('.player__poster');

poster.addEventListener('click', function () {
  var v = CONFIG.caseVideo.trim();
  if (!v) {
    player.classList.add('is-soon');
    setTimeout(function () { player.classList.remove('is-soon'); }, 2600);
    return;
  }
  screen.classList.add('is-playing');
  if (/\.(mp4|webm)$/i.test(v)) {
    screen.innerHTML = '<video src="' + v + '" controls autoplay playsinline></video>';
  } else {
    screen.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v) +
      '?autoplay=1&rel=0&modestbranding=1" title="Vídeo do case CREDFRANCO Te Leva" ' +
      'allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
  }
});

/* ---------- Formulário ---------- */
var form = document.getElementById('form-viagem');
var status = form.querySelector('.form__status');
var phone = form.querySelector('[name="your-phone"]');

phone.addEventListener('input', function () {
  var d = phone.value.replace(/\D/g, '').slice(0, 11);
  var out = d;
  if (d.length > 2) out = '(' + d.slice(0, 2) + ') ' + d.slice(2);
  if (d.length > 7) out = '(' + d.slice(0, 2) + ') ' + d.slice(2, d.length - 4) + '-' + d.slice(-4);
  phone.value = out;
});

function fieldOf(el) { return el.closest('.field') || el.closest('.check'); }

form.addEventListener('change', function (e) {
  var f = fieldOf(e.target);
  if (f) f.classList.remove('is-invalid');
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var firstBad = null;
  var seen = {};
  form.querySelectorAll('[required]').forEach(function (el) {
    var ok;
    if (el.type === 'radio') {
      if (seen[el.name]) return;
      seen[el.name] = true;
      ok = !!form.querySelector('[name="' + el.name + '"]:checked');
    } else if (el.type === 'checkbox') {
      ok = el.checked;
    } else {
      ok = el.value.trim() !== '' && el.checkValidity();
    }
    var f = fieldOf(el);
    if (f) f.classList.toggle('is-invalid', !ok);
    if (!ok && !firstBad) firstBad = el;
  });

  if (firstBad) {
    status.className = 'form__status is-err';
    status.textContent = 'Confira os campos destacados para continuar.';
    firstBad.focus({ preventScroll: true });
    fieldOf(firstBad).scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    return;
  }

  var btn = form.querySelector('[type="submit"]');
  btn.disabled = true;
  status.className = 'form__status';
  status.textContent = 'Enviando…';

  var done = function () { window.location.href = CONFIG.thankYouPage; };
  var fail = function () {
    status.className = 'form__status is-err';
    status.textContent = 'Não foi possível enviar agora. Tente novamente ou fale com a gente pelo WhatsApp.';
    btn.disabled = false;
  };

  if (!CONFIG.formEndpoint) { setTimeout(done, 600); return; }
  fetch(CONFIG.formEndpoint, { method: 'POST', body: new FormData(form) })
    .then(function (r) { r.ok ? done() : fail(); })
    .catch(fail);
});

/* ---------- Ano no rodapé ---------- */
var y = document.querySelector('[data-year]');
if (y) y.textContent = new Date().getFullYear();
