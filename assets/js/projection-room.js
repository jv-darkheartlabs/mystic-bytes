(function () {
  var grid = document.getElementById("film-grid");
  if (!grid) return;

  var searchInput = document.getElementById("film-search");
  var emptyState = document.getElementById("film-empty");
  var cards = Array.prototype.slice.call(grid.querySelectorAll(".film-card"));
  var filterButtons = document.querySelectorAll(".film-filter");
  var sortButtons = document.querySelectorAll(".film-sort .reading-sort__btn");

  var activeFilter = "all";
  var activeSort = "watched";

  function normalize(value) {
    return (value || "").trim().toLowerCase();
  }

  function cardMatchesSearch(card, query) {
    if (!query) return true;
    var title = card.getAttribute("data-title") || "";
    var director = card.getAttribute("data-director") || "";
    return title.indexOf(query) !== -1 || director.indexOf(query) !== -1;
  }

  function cardMatchesFilter(card) {
    if (activeFilter === "all") return true;
    return (
      card.getAttribute("data-category") === activeFilter ||
      card.getAttribute("data-format") === activeFilter ||
      card.getAttribute("data-era") === activeFilter
    );
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
    if (activeSort === "watched") {
      var watchedA = a.getAttribute("data-date-watched") || "";
      var watchedB = b.getAttribute("data-date-watched") || "";
      if (watchedA === watchedB) {
        return Number(b.getAttribute("data-sort-key") || 0) - Number(a.getAttribute("data-sort-key") || 0);
      }
      return watchedB.localeCompare(watchedA);
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
      card.classList.toggle("film-card--hidden", !show);
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
      activeSort = btn.getAttribute("data-sort") || "watched";
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
