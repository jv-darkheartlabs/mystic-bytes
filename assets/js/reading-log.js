(function () {
  var grid = document.getElementById("reading-grid");
  if (!grid) return;

  var searchInput = document.getElementById("reading-search");
  var emptyState = document.getElementById("reading-empty");
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".reading-card"));
  var filterButtons = document.querySelectorAll(".reading-filter");
  var sortButtons = document.querySelectorAll(".reading-sort__btn");

  var activeFilter = "all";
  var activeSort = "date";

  function normalize(value) {
    return (value || "").trim().toLowerCase();
  }

  function cardMatchesSearch(card, query) {
    if (!query) return true;
    var title = card.getAttribute("data-title") || "";
    var author = card.getAttribute("data-author") || "";
    return title.indexOf(query) !== -1 || author.indexOf(query) !== -1;
  }

  function cardMatchesFilter(card) {
    if (activeFilter === "all") return true;
    return card.getAttribute("data-category") === activeFilter;
  }

  function compareCards(a, b) {
    if (activeSort === "title") {
      var titleA = a.getAttribute("data-title") || "";
      var titleB = b.getAttribute("data-title") || "";
      if (titleA === titleB) {
        return Number(b.getAttribute("data-sort-key") || 0) - Number(a.getAttribute("data-sort-key") || 0);
      }
      return titleA.localeCompare(titleB);
    }
    if (activeSort === "read") {
      var readA = a.getAttribute("data-date-read") || "";
      var readB = b.getAttribute("data-date-read") || "";
      if (readA === readB) {
        return Number(b.getAttribute("data-sort-key") || 0) - Number(a.getAttribute("data-sort-key") || 0);
      }
      return readB.localeCompare(readA);
    }
    return Number(b.getAttribute("data-sort-key") || 0) - Number(a.getAttribute("data-sort-key") || 0);
  }

  function applyState() {
    var query = normalize(searchInput ? searchInput.value : "");
    var visible = 0;

    cards.sort(compareCards).forEach(function (card) {
      grid.appendChild(card);
    });

    cards.forEach(function (card) {
      var show = cardMatchesFilter(card) && cardMatchesSearch(card, query);
      card.classList.toggle("reading-card--hidden", !show);
      card.toggleAttribute("hidden", !show);
      if (show) visible += 1;
    });

    if (emptyState) {
      var showEmpty = visible === 0;
      emptyState.classList.toggle("reading-empty--hidden", !showEmpty);
      emptyState.toggleAttribute("hidden", !showEmpty);
    }
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeFilter = btn.getAttribute("data-filter") || "all";
      filterButtons.forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      applyState();
    });
  });

  sortButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeSort = btn.getAttribute("data-sort") || "date";
      sortButtons.forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      applyState();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", applyState);
  }

  applyState();
})();
