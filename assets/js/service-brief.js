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

  var MAX_FIELD = 2000;

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

  function setStatus(form, text, tone) {
    var status = form.querySelector('[data-brief-status]');
    if (!status) return;
    status.textContent = text || '';
    status.hidden = !text;
    status.classList.toggle('is-error', tone === 'error');
    status.classList.toggle('is-ok', tone === 'ok');
  }

  function formConfig(form) {
    return {
      formProvider: form.getAttribute('data-brief-form-provider') || 'formspree',
      formspreeId: form.getAttribute('data-brief-formspree-id') || '',
      formEndpoint: form.getAttribute('data-brief-form-endpoint') || '',
      formAccessKey: form.getAttribute('data-brief-form-access-key') || ''
    };
  }

  function sendConfigured(form) {
    return !!(window.DHLFormSubmit && window.DHLFormSubmit.endpointFor(formConfig(form)));
  }

  function initWizard(form) {
    var presetRealm = form.getAttribute('data-brief-realm') || '';
    var steps = Array.prototype.slice.call(form.querySelectorAll('[data-brief-step]'));
    var progress = form.querySelector('[data-brief-progress]');
    var realmSelect = form.querySelector('select[name="realm"]');
    var subjectInput = form.querySelector('input[name="subject"]');
    var submitBtn = form.querySelector('[data-brief-submit]');
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

    if (!sendConfigured(form)) {
      setStatus(
        form,
        'Email delivery is not configured. mailto is disabled — iCloud (MX for this domain) delays or junks mail from Gmail and iCloud, often for days. See docs/MAIL.md.',
        'error'
      );
      if (submitBtn) submitBtn.disabled = true;
    }

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

      var honey = form.querySelector('[data-honeypot]');
      if (honey && honey.value) {
        setStatus(form, 'Brief sent. JV will follow up.', 'ok');
        if (submitBtn) submitBtn.disabled = true;
        return;
      }

      if (!sendConfigured(form)) {
        setStatus(
          form,
          'Email delivery is not configured. mailto is disabled — iCloud junks visitor Gmail/iCloud mail.',
          'error'
        );
        return;
      }

      var data = new FormData(form);
      var realm = data.get('realm') || currentRealm() || 'other';
      var subjectRaw = data.get('subject') || SUBJECTS[realm] || 'collaboration';
      var fromName = String(data.get('name') || '').slice(0, 120);
      var fromEmail = String(data.get('email') || '').slice(0, 120);
      var message = String(data.get('message') || '').slice(0, MAX_FIELD);
      var skip = {
        name: true,
        email: true,
        subject: true,
        message: true,
        realm: true,
        website: true
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
        lines.push(fieldLabel(el) + ': ' + String(value).slice(0, MAX_FIELD));
      });

      lines.push('', message);

      if (submitBtn) submitBtn.disabled = true;
      setStatus(form, 'Sending…', null);

      window.DHLFormSubmit.submit(formConfig(form), {
        _subject: '[jv] ' + subjectRaw,
        name: fromName,
        email: fromEmail,
        realm: realm,
        source: 'darkheartlabs.technology',
        message: lines.join('\n')
      })
        .then(function () {
          setStatus(form, 'Brief sent. JV will follow up.', 'ok');
        })
        .catch(function () {
          setStatus(
            form,
            'Send failed. Try again, or write jv@darkheartlabs.technology directly.',
            'error'
          );
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  ready(function () {
    document.querySelectorAll('[data-brief-wizard]').forEach(initWizard);
  });
})();
