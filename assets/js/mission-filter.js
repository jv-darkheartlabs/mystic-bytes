(function () {
  // Mission control timeline search + multi-tag filters (pinned + chronological sections)
  var searchInput = document.getElementById("mission-search");
  var timelines = [
    document.getElementById("mission-timeline-pinned"),
    document.getElementById("mission-timeline"),
  ].filter(Boolean);
  var activeTag = "all";

  function entryTags(entry) {
    var raw = entry.getAttribute("data-tags") || "";
    return raw.split(",").map(function (t) {
      return t.trim();
    }).filter(Boolean);
  }

  function filterTimeline() {
    var query = (searchInput && searchInput.value || "").trim().toLowerCase();

    timelines.forEach(function (timeline) {
      timeline.querySelectorAll(".timeline-entry").forEach(function (entry) {
        var tags = entryTags(entry);
        var hay = (entry.getAttribute("data-search") || "").toLowerCase();
        var tagMatch = activeTag === "all" || tags.indexOf(activeTag) !== -1;
        var textMatch = !query || hay.indexOf(query) !== -1;
        entry.style.display = tagMatch && textMatch ? "" : "none";
      });
    });
  }

  document.querySelectorAll(".mission-filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeTag = btn.getAttribute("data-tag") || "all";
      document.querySelectorAll(".mission-filter").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      filterTimeline();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", filterTimeline);
  }
})();
