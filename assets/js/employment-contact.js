(function () {
  "use strict";
  var form = document.querySelector('[data-employment-form]');
  if (!form) return;
  var steps = Array.from(form.querySelectorAll('[data-form-step]'));
  var next = form.querySelector('[data-form-next]');
  var back = form.querySelector('[data-form-back]');
  var submit = form.querySelector('[data-form-submit]');
  var progress = form.querySelector('[data-form-progress]');
  var status = form.querySelector('[data-form-status]');
  var index = 0;
  var config = {formProvider: form.dataset.formProvider, formEndpoint: form.dataset.formEndpoint};
  function paint(focus) {
    steps.forEach(function (step, i) { step.hidden = i !== index; });
    back.hidden = index === 0;
    next.hidden = index === steps.length - 1;
    submit.hidden = index !== steps.length - 1;
    progress.textContent = 'Section ' + (index + 1) + ' of ' + steps.length;
    if (focus) steps[index].querySelector('input, textarea').focus();
  }
  function valid(step) {
    return Array.from(step.querySelectorAll('input, textarea')).every(function (field) {
      field.setCustomValidity(field.required && !field.value.trim() ? 'Please complete this field.' : '');
      if (field.checkValidity()) return true;
      field.reportValidity(); return false;
    });
  }
  function message(text, error) {
    status.hidden = false;
    status.textContent = text;
    status.classList.toggle('is-error', !!error);
  }
  next.addEventListener('click', function () { if (valid(steps[index])) { index++; paint(true); } });
  back.addEventListener('click', function () { index--; paint(true); });
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Enter in an earlier section moves forward; it never silently sends the form.
    if (index < steps.length - 1) { next.click(); return; }
    for (var i = 0; i < steps.length; i++) {
      index = i; paint(false);
      if (!valid(steps[i])) return;
    }
    index = steps.length - 1; paint(false);
    var data = new FormData(form);
    if (data.get('website')) { message('Inquiry received.'); submit.disabled = true; return; }
    if (!window.DHLFormSubmit || !window.DHLFormSubmit.endpointFor(config)) {
      message('The form is unavailable. Please use the email or phone above.', true); return;
    }
    var token = data.get('cf-turnstile-response');
    if (form.querySelector('[data-turnstile-site-key]') && !token) {
      message('Complete the security check below, then try again.', true); return;
    }
    // The existing mail worker renders message, not arbitrary metadata fields.
    // Bound the complete message below the worker helper's 2,000-character limit.
    var lines = ['Employment inquiry'];
    [['organization', 'Organization'], ['role', 'Role or opportunity'], ['location', 'Location']].forEach(function (pair) {
      var value = String(data.get(pair[0]) || '').trim().slice(0, 200);
      if (value) lines.push(pair[1] + ': ' + value);
    });
    lines.push('', String(data.get('message') || '').trim().slice(0, 1200));
    var payload = {_subject: 'Contact · Employment inquiry', name: String(data.get('name')).trim(), email: String(data.get('email')).trim(), realm: 'employment', source: 'darkheartlabs.technology', message: lines.join('\n')};
    if (token) payload['cf-turnstile-response'] = token;
    submit.disabled = true; message('Sending…');
    window.DHLFormSubmit.submit(config, payload).then(function () {
      message('Inquiry sent. Thank you for getting in touch.');
    }).catch(function (err) {
      submit.disabled = false;
      if (err.message === 'captcha_required' || err.message === 'captcha_failed') message('Complete the security check below, then try again.', true);
      else if (err.message === 'rate_limited') message('Too many attempts. Wait a minute and try again.', true);
      else message('Send failed. Please try again or email ' + form.dataset.contactEmail + ' directly.', true);
    });
  });
  form.querySelectorAll('input, textarea').forEach(function (field) { field.addEventListener('input', function () { field.setCustomValidity(''); }); });
  submit.disabled = false;
  paint(false);
})();
