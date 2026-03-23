/* ============================================
   Main JS — How To Automate My Business
   Nav toggle, form handler, smooth scroll
   ============================================ */
(function () {
  'use strict';

  // --- Mobile Navigation Toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // --- Contact Form (Formspree AJAX) ---
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var successEl = document.getElementById('form-success');
      var errorEl = document.getElementById('form-error');
      btn.disabled = true;
      btn.textContent = 'Sending\u2026';
      if (successEl) successEl.style.display = 'none';
      if (errorEl) errorEl.style.display = 'none';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (r) {
        if (r.ok) {
          form.reset();
          if (successEl) successEl.style.display = 'block';
          btn.textContent = 'Sent!';
        } else {
          throw new Error('Form submission failed');
        }
      }).catch(function () {
        if (errorEl) errorEl.style.display = 'block';
        btn.disabled = false;
        btn.textContent = 'Send Enquiry';
      });
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', link.getAttribute('href'));
    }
  });
})();
