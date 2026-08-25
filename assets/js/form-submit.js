(function (root) {
  "use strict";

  var MAX_FIELD = 2000;

  function allowHttpsUrl(url) {
    if (!url || typeof url !== "string") return "";
    try {
      var parsed = new URL(url);
      if (parsed.protocol !== "https:") return "";
      return parsed.href;
    } catch (err) {
      return "";
    }
  }

  function allowWiseUrl(url) {
    var href = allowHttpsUrl(url);
    if (!href) return "";
    try {
      var host = new URL(href).hostname;
      if (host === "wise.com" || host.endsWith(".wise.com")) return href;
    } catch (err) {
      return "";
    }
    return "";
  }

  function buildPayload(fields) {
    var payload = {};
    Object.keys(fields).forEach(function (key) {
      var val = fields[key];
      if (val === undefined || val === null || val === "") return;
      payload[key] = String(val).slice(0, MAX_FIELD);
    });
    return payload;
  }

  function endpointFor(config) {
    if (!config) return "";
    // Always prefer an explicit endpoint (Resend Worker, custom, etc.)
    if (config.formEndpoint) return String(config.formEndpoint);
    var provider = String(config.formProvider || "").toLowerCase();
    if (provider === "web3forms") return "https://api.web3forms.com/submit";
    if (provider === "formspree" && config.formspreeId) {
      return "https://formspree.io/f/" + config.formspreeId;
    }
    if (config.formspreeId) return "https://formspree.io/f/" + config.formspreeId;
    return "";
  }

  function submit(config, fields) {
    var endpoint = endpointFor(config);
    if (!endpoint) {
      return Promise.reject(new Error("FORM_NOT_CONFIGURED"));
    }

    var payload = buildPayload(fields);
    var provider = String(config.formProvider || "").toLowerCase();
    if (provider === "web3forms") {
      if (!config.formAccessKey) {
        return Promise.reject(new Error("FORM_NOT_CONFIGURED"));
      }
      payload.access_key = config.formAccessKey;
    }

    return fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().catch(function () {
        return {};
      }).then(function (body) {
        if (!res.ok) {
          var err = new Error(body.error || body.detail || "FORM_SUBMIT_FAILED");
          err.status = res.status;
          throw err;
        }
        return body;
      });
    });
  }

  var api = {
    allowHttpsUrl: allowHttpsUrl,
    allowWiseUrl: allowWiseUrl,
    buildPayload: buildPayload,
    endpointFor: endpointFor,
    submit: submit
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  root.DHLFormSubmit = api;
})(typeof window !== "undefined" ? window : globalThis);
