(function () {
  "use strict";
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var header = document.querySelector('.site-header');
  if (!toggle || !nav || !header) return;

  function closeMenu(restoreFocus) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
    nav.classList.remove('is-open');
    if (restoreFocus) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open navigation menu' : 'Close navigation menu');
    nav.classList.toggle('is-open', !open);
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { closeMenu(false); });
  });

  header.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu(true);
    }
  });

  var desktop = window.matchMedia('(min-width: 768px)');
  function resetForViewport() {
    closeMenu(!desktop.matches && nav.contains(document.activeElement));
  }
  if (desktop.addEventListener) desktop.addEventListener('change', resetForViewport);
  else if (desktop.addListener) desktop.addListener(resetForViewport);

  // Collapse mobile links only after all toggle behavior has initialized.
  header.classList.add('is-nav-ready');
})();
