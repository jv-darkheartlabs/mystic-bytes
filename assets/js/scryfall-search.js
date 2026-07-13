(function () {
  var API = "https://api.scryfall.com/cards/search";
  var RATE_MS = 500;

  var form = document.getElementById("scryfall-search-form");
  var input = document.getElementById("scryfall-search-input");
  var statusEl = document.getElementById("scryfall-search-status");
  var grid = document.getElementById("scryfall-results-grid");
  var pagination = document.getElementById("scryfall-pagination");
  var pageLabel = document.getElementById("scryfall-pagination-label");
  var prevBtn = pagination && pagination.querySelector('[data-page="prev"]');
  var nextBtn = pagination && pagination.querySelector('[data-page="next"]');

  if (!form || !input || !grid || !statusEl || !pagination) return;

  var debounceTimer = null;
  var lastQuery = "";
  var currentPage = 1;
  var totalCards = 0;
  var hasMore = false;
  var requestId = 0;
  var lastFetchAt = 0;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setStatus(message, tone) {
    statusEl.textContent = message;
    statusEl.dataset.tone = tone || "";
  }

  function cardImage(card) {
    if (card.image_uris && card.image_uris.normal) return card.image_uris.normal;
    if (card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris) {
      return card.card_faces[0].image_uris.normal;
    }
    return "";
  }

  function cardMana(card) {
    if (card.mana_cost) return card.mana_cost;
    if (card.card_faces && card.card_faces[0] && card.card_faces[0].mana_cost) {
      return card.card_faces[0].mana_cost;
    }
    return "";
  }

  function formatPrice(card) {
    var prices = card.prices || {};
    var usd = prices.usd || prices.usd_foil || prices.usd_etched;
    if (!usd) return "—";
    return "$" + usd;
  }

  function renderCard(card) {
    var image = cardImage(card);
    var name = escapeHtml(card.name || "unknown card");
    var mana = escapeHtml(cardMana(card));
    var typeLine = escapeHtml(card.type_line || "");
    var price = escapeHtml(formatPrice(card));
    var setCode = escapeHtml((card.set || "").toUpperCase());
    var artist = escapeHtml(card.artist || (card.card_faces && card.card_faces[0] && card.card_faces[0].artist) || "");

    var imageHtml = image
      ? '<img src="' + escapeHtml(image) + '" alt="" loading="lazy" width="245" height="342">'
      : '<div class="scryfall-card__placeholder" aria-hidden="true">no image</div>';

    return (
      '<a class="scryfall-card panel" href="' + escapeHtml(card.scryfall_uri) + '" target="_blank" rel="noreferrer">' +
        '<div class="scryfall-card__image">' + imageHtml + "</div>" +
        '<div class="scryfall-card__body">' +
          '<h2 class="scryfall-card__name">' + name + "</h2>" +
          (mana ? '<p class="scryfall-card__mana">' + mana + "</p>" : "") +
          (typeLine ? '<p class="scryfall-card__type">' + typeLine + "</p>" : "") +
          '<p class="scryfall-card__meta">' +
            '<span class="scryfall-card__price">' + price + "</span>" +
            (setCode ? '<span class="scryfall-card__set">' + setCode + "</span>" : "") +
          "</p>" +
          (artist ? '<p class="scryfall-card__artist">' + artist + "</p>" : "") +
        "</div>" +
      "</a>"
    );
  }

  function updatePagination() {
    var totalPages = totalCards > 0 ? Math.ceil(totalCards / 175) : 0;
    if (totalPages <= 1) {
      pagination.hidden = true;
      return;
    }

    pagination.hidden = false;
    pageLabel.textContent = "page " + currentPage + " of " + totalPages + " · " + totalCards + " cards";
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = !hasMore;
  }

  function waitForRateLimit() {
    var elapsed = Date.now() - lastFetchAt;
    var delay = Math.max(0, RATE_MS - elapsed);
    return new Promise(function (resolve) {
      setTimeout(resolve, delay);
    });
  }

  function runSearch(page) {
    var query = input.value.trim();
    if (!query) {
      grid.innerHTML = "";
      pagination.hidden = true;
      setStatus("");
      grid.removeAttribute("aria-busy");
      return;
    }

    var rid = ++requestId;
    setStatus("searching…", "loading");
    grid.setAttribute("aria-busy", "true");

    waitForRateLimit().then(function () {
      if (rid !== requestId) return null;

      var url =
        API +
        "?unique=cards&order=name&dir=asc&page=" +
        encodeURIComponent(String(page)) +
        "&q=" +
        encodeURIComponent(query);

      lastFetchAt = Date.now();
      return fetch(url, { headers: { Accept: "application/json" } }).then(function (response) {
        if (response.status === 404) {
          return { object: "list", data: [], total_cards: 0, has_more: false, page: 1 };
        }
        return response.json().then(function (body) {
          if (!response.ok) throw body;
          return body;
        });
      });
    }).then(function (data) {
      if (!data || rid !== requestId) return;

      grid.removeAttribute("aria-busy");

      if (data.object === "error") {
        grid.innerHTML = "";
        pagination.hidden = true;
        setStatus(data.details || "no cards matched that query", "error");
        return;
      }

      var cards = data.data || [];
      currentPage = data.page || page;
      totalCards = data.total_cards || cards.length;
      hasMore = Boolean(data.has_more);

      if (cards.length === 0) {
        grid.innerHTML = "";
        pagination.hidden = true;
        setStatus("no cards matched that query", "empty");
        return;
      }

      grid.innerHTML = cards.map(renderCard).join("");
      setStatus(totalCards + " card" + (totalCards === 1 ? "" : "s"), "ok");
      updatePagination();
    }).catch(function (err) {
      if (rid !== requestId) return;
      grid.innerHTML = "";
      pagination.hidden = true;
      grid.removeAttribute("aria-busy");
      var message =
        (err && err.details) ||
        (err && err.message) ||
        "search failed — wait a moment and try again";
      setStatus(message, "error");
    });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    lastQuery = input.value.trim();
    currentPage = 1;
    runSearch(1);
  });

  input.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      var query = input.value.trim();
      if (query === lastQuery) return;
      lastQuery = query;
      currentPage = 1;
      runSearch(1);
    }, RATE_MS);
  });

  pagination.addEventListener("click", function (event) {
    var button = event.target.closest("[data-page]");
    if (!button || button.disabled) return;

    if (button.dataset.page === "prev" && currentPage > 1) {
      runSearch(currentPage - 1);
      return;
    }

    if (button.dataset.page === "next" && hasMore) {
      runSearch(currentPage + 1);
    }
  });
})();
