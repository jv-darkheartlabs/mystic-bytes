/**
 * Optional Cloudflare Turnstile widget for DHL forms.
 * Mount with data-turnstile-site-key on a container element.
 */
(function (root) {
  "use strict";

  var SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js";

  function loadScript() {
    if (document.querySelector('script[src="' + SCRIPT + '"]')) {
      return Promise.resolve();
    }
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = SCRIPT;
      script.async = true;
      script.defer = true;
      script.onload = function () {
        resolve();
      };
      script.onerror = function () {
        reject(new Error("TURNSTILE_SCRIPT_FAILED"));
      };
      document.head.appendChild(script);
    });
  }

  function mount(container) {
    var siteKey = container.getAttribute("data-turnstile-site-key");
    if (!siteKey) return;

    loadScript()
      .then(function () {
        if (!window.turnstile) throw new Error("TURNSTILE_UNAVAILABLE");
        window.turnstile.render(container, {
          sitekey: siteKey,
          theme: "dark"
        });
      })
      .catch(function () {
        container.setAttribute("data-turnstile-error", "true");
      });
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    document.querySelectorAll("[data-turnstile-site-key]").forEach(mount);
  });

  root.DHLTurnstile = { mount: mount };
})(typeof window !== "undefined" ? window : globalThis);
