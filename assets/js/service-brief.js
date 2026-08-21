(function () {
  var INTENT_ALIASES = {
    'debug-and-drift': 'debug-and-drift',
    debug_and_drift: 'debug-and-drift',
    sites: 'sites',
    site: 'sites',
    'date-proposal': 'date-proposal',
    ask: 'date-proposal',
    documentation: 'documentation',
    docs: 'documentation',
    technology: 'documentation'
  };

  var SUBJECTS = {
    'debug-and-drift': 'Debug & Drift — Slipside Service / on-vessel support',
    sites: 'Docs site — Jekyll + GitHub Pages',
    'date-proposal': 'Ask — custom date proposal',
    documentation: 'Documentation — how-tos / KB / incident copy'
  };

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  function fieldLabel(el) {
    if (el.dataset.mailLabel) return el.dataset.mailLabel;
    var label = el.id ? document.querySelector('label[for="' + el.id + '"]') : null;
    if (label) return label.textContent.replace(/^\$\s*/, '').trim();
    return el.name;
  }

  function initWizard(form) {
    var presetRealm = form.getAttribute('data-brief-realm') || '';
    var emailTo = form.getAttribute('data-brief-email') || '';
    var steps = Array.prototype.slice.call(form.querySelectorAll('[data-brief-step]'));
    var progress = form.querySelector('[data-brief-progress]');
    var realmSelect = form.querySelector('select[name="realm"]');
    var subjectInput = form.querySelector('input[name="subject"]');
    var index = 0;

    function currentRealm() {
      if (presetRealm) return presetRealm;
      if (realmSelect) return realmSelect.value;
      return '';
    }

    function activeSteps() {
      var realm = currentRealm();
      return steps.filter(function (step) {
        var owned = step.getAttribute('data-realm');
        if (!owned) return true;
        return owned === realm;
      });
    }

    function syncSubject() {
      if (!subjectInput || subjectInput.type === 'hidden') return;
      var next = SUBJECTS[currentRealm()] || '';
      var known = false;
      Object.keys(SUBJECTS).forEach(function (key) {
        if (subjectInput.value === SUBJECTS[key]) known = true;
      });
      if (next && (!subjectInput.value || known)) {
        subjectInput.value = next;
        subjectInput.placeholder = next;
      }
    }

    function paint() {
      var active = activeSteps();
      if (index > active.length - 1) index = active.length - 1;
      if (index < 0) index = 0;

      steps.forEach(function (step) {
        step.classList.remove('is-active');
      });
      if (active[index]) active[index].classList.add('is-active');

      form.classList.toggle('is-first', index === 0);
      form.classList.toggle('is-last', index === active.length - 1);

      if (progress && active[index]) {
        var titleEl = active[index].querySelector('.section-label__title');
        var title = titleEl ? titleEl.textContent.trim() : '';
        var n = String(index + 1).padStart(2, '0');
        var total = String(active.length).padStart(2, '0');
        progress.textContent = 'section ' + n + ' / ' + total + (title ? ' · ' + title : '');
      }
    }

    function validateCurrent() {
      var step = activeSteps()[index];
      if (!step) return true;
      var fields = step.querySelectorAll('input, select, textarea');
      for (var i = 0; i < fields.length; i += 1) {
        var el = fields[i];
        if (el.disabled || el.type === 'hidden') continue;
        if (!el.checkValidity()) {
          el.reportValidity();
          return false;
        }
      }
      return true;
    }

    form.classList.add('is-ready');

    if (realmSelect) {
      var params = new URLSearchParams(window.location.search);
      var intent = params.get('intent') || params.get('realm');
      if (intent && INTENT_ALIASES[intent]) {
        realmSelect.value = INTENT_ALIASES[intent];
      }
      syncSubject();
      realmSelect.addEventListener('change', function () {
        syncSubject();
        paint();
      });
    }

    paint();

    form.querySelector('[data-brief-next]').addEventListener('click', function () {
      if (!validateCurrent()) return;
      index += 1;
      paint();
      var step = activeSteps()[index];
      if (step) {
        var focusable = step.querySelector('input, select, textarea');
        if (focusable) focusable.focus();
      }
    });

    form.querySelector('[data-brief-back]').addEventListener('click', function () {
      index -= 1;
      paint();
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var active = activeSteps();
      for (index = 0; index < active.length; index += 1) {
        if (!validateCurrent()) {
          paint();
          return;
        }
      }
      index = active.length - 1;
      paint();

      var data = new FormData(form);
      var realm = data.get('realm') || currentRealm() || 'other';
      var subjectRaw = data.get('subject') || SUBJECTS[realm] || 'collaboration';
      var fromName = data.get('name') || '';
      var fromEmail = data.get('email') || '';
      var message = data.get('message') || '';
      var skip = {
        name: true,
        email: true,
        subject: true,
        message: true,
        realm: true
      };
      var lines = [
        'From: ' + fromName + ' <' + fromEmail + '>',
        'Realm: ' + realm
      ];

      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name || skip[el.name] || el.disabled) return;
        if (el.closest('[data-realm]') && el.closest('[data-realm]').getAttribute('data-realm') !== realm) {
          return;
        }
        var value = data.get(el.name);
        if (!value) return;
        if (lines.some(function (line) { return line.indexOf(fieldLabel(el) + ': ') === 0; })) return;
        lines.push(fieldLabel(el) + ': ' + value);
      });

      lines.push('', message);

      var subject = encodeURIComponent('[jv] ' + subjectRaw);
      var body = encodeURIComponent(lines.join('\n'));
      window.location.href = 'mailto:' + emailTo + '?subject=' + subject + '&body=' + body;
    });
  }

  ready(function () {
    document.querySelectorAll('[data-brief-wizard]').forEach(initWizard);
  });
})();
