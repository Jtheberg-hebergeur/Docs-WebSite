/**
 * Client module Jtheberg - Animations au scroll + Navbar effet
 * Ce module est chargé automatiquement par Docusaurus sur chaque page
 */

(function () {
  'use strict';

  // === Navbar Sticky avec effet de scroll ===
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    var ticking = false;

    var handleScroll = function () {
      if (window.scrollY > 30) {
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
      }
      ticking = false;
    };

    var onScroll = function () {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial check
    handleScroll();
  }

  // === Scroll Reveal Animations (Intersection Observer) ===
  function initScrollReveal() {
    // Auto-add reveal classes to common elements if not already present
    var autoRevealSelectors = [
      '.card',
      '.jb-feature-card',
      '.jb-stat-card',
      'article h2',
      'article h3',
      'article p',
      'article table',
      'article ul',
      'article ol',
      'article pre',
      'article blockquote',
      '.theme-admonition',
      '.advantages-grid',
      '.contributorCard'
    ];

    document.querySelectorAll(autoRevealSelectors.join(',')).forEach(function (el) {
      if (!el.classList.contains('jb-reveal') &&
          !el.classList.contains('jb-reveal-left') &&
          !el.classList.contains('jb-reveal-right') &&
          !el.classList.contains('jb-reveal-scale')) {
        el.classList.add('jb-reveal');
      }
    });

    // Add reveal to all elements with explicit jb-reveal class
    var allRevealElements = document.querySelectorAll(
      '.jb-reveal, .jb-reveal-left, .jb-reveal-right, .jb-reveal-scale'
    );

    if (!('IntersectionObserver' in window)) {
      // Fallback - just show all
      allRevealElements.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
      }
    );

    allRevealElements.forEach(function (el) { observer.observe(el); });
  }

  // === Smooth anchor scroll ===
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var navbarHeight = 80;
          var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // === Initialize on DOM ready ===
  function init() {
    initNavbarScroll();
    initScrollReveal();
    initSmoothAnchors();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-init on route change (Docusaurus SPA navigation)
  var lastUrl = location.href;
  new MutationObserver(function () {
    var url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      setTimeout(function () {
        initScrollReveal();
        initSmoothAnchors();
      }, 100);
    }
  }).observe(document, { subtree: true, childList: true });
})();
