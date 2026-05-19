(function () {
  var KEY = "lookn-cookie-consent";
  var CLARITY_PROJECT_ID = "wnht8j467c";

  function loadClarity() {
    if (window.__clarityLoaded) return;
    window.__clarityLoaded = true;
    (function (c, l, a, r, i, t, y) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      t = l.createElement(r); t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
    })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
  }

  function persist(choice) {
    try { localStorage.setItem(KEY, choice); } catch (e) {}
  }

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function dismiss(banner) {
    banner.classList.add("cookie-banner--leaving");
    setTimeout(function () { banner.remove(); }, 220);
  }

  function showBanner() {
    var banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-labelledby", "cookie-title");
    banner.setAttribute("aria-describedby", "cookie-msg");
    banner.innerHTML = [
      '<div class="cookie-banner__head">',
        '<span class="cookie-banner__icon" aria-hidden="true">🍪</span>',
        '<p id="cookie-title" class="cookie-banner__title">A few cookies?</p>',
      '</div>',
      '<p id="cookie-msg" class="cookie-banner__msg">',
        "Anonymous usage analytics via Microsoft Clarity. No ads, no cross-site tracking. ",
        '<a href="/privacy.html">Learn more</a>',
      "</p>",
      '<div class="cookie-banner__actions">',
        '<button type="button" class="btn--chip" data-cookie="decline">Decline</button>',
        '<button type="button" class="btn--primary" data-cookie="accept">Accept</button>',
      "</div>"
    ].join("");
    document.body.appendChild(banner);

    banner.querySelector('[data-cookie="accept"]').addEventListener("click", function () {
      persist("accepted");
      dismiss(banner);
      loadClarity();
    });
    banner.querySelector('[data-cookie="decline"]').addEventListener("click", function () {
      persist("declined");
      dismiss(banner);
    });
  }

  function init() {
    var consent = read();
    if (consent === "accepted") { loadClarity(); return; }
    if (consent === "declined") return;
    showBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
