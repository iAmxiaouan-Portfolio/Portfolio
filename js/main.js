/* ============================================
   IAMXIAOXUAN — Interactions
   ============================================ */

(function () {
  'use strict';

  /* --- Mobile Menu --- */
  var menuToggle = document.querySelector('.menu-toggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var menuClose = document.querySelector('.mobile-menu-close');

  function openMenu() {
    mobileMenu.classList.add('active');
    menuToggle.classList.add('hidden');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    menuClose.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('hidden');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    menuToggle.focus();
  }

  if (menuToggle && mobileMenu && menuClose) {
    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  /* --- Scroll Reveal (staggered, organic) --- */
  var reveals = document.querySelectorAll('.showcase-item, .reveal');
  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = Math.random() * 180 + 40;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* --- Project page image reveal --- */
  var projImgs = document.querySelectorAll('.proj-img');
  if (projImgs.length > 0 && 'IntersectionObserver' in window) {
    var imgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          imgObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    projImgs.forEach(function (el) { imgObserver.observe(el); });
  }

  /* --- Lightbox --- */
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var lightboxImg = lightbox.querySelector('img');
  var closeBtn = lightbox.querySelector('.lightbox-close');
  var prevBtn = lightbox.querySelector('.lightbox-nav.prev');
  var nextBtn = lightbox.querySelector('.lightbox-nav.next');
  var items = Array.from(document.querySelectorAll('.thumbnail-item[data-full]'));
  var currentIndex = 0;

  function showImage(index) {
    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;
    currentIndex = index;
    lightboxImg.setAttribute('src', items[index].getAttribute('data-full'));
    lightboxImg.setAttribute('alt', items[index].querySelector('img').getAttribute('alt') || '');
  }

  function openLightbox(index, e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    showImage(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.setAttribute('src', '');
  }

  items.forEach(function (item, i) {
    item.addEventListener('click', function (e) { openLightbox(i, e); });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', function (e) { e.stopPropagation(); showImage(currentIndex - 1); });
  nextBtn.addEventListener('click', function (e) { e.stopPropagation(); showImage(currentIndex + 1); });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
      if (e.key === 'ArrowRight') showImage(currentIndex + 1);
      return;
    }
    if (mobileMenu && e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
})();
