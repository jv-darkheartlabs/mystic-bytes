(function () {
  var toggle = document.getElementById("search-toggle");
  var panel = document.getElementById("site-search");
  var mount = document.getElementById("pagefind-search");
  if (!toggle || !panel || !mount) return;

  var uiReady = false;

  function initPagefind() {
    if (uiReady || typeof PagefindUI === "undefined") return;
    uiReady = true;
    new PagefindUI({ element: "#pagefind-search", showImages: false });
  }

  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    panel.hidden = open;
    if (!open) {
      initPagefind();
      var input = panel.querySelector("input");
      if (input) input.focus();
    }
  });
})();
