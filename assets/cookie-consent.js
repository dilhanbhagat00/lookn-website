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

  function showBanner() {
    var banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-labelledby", "cookie-title");
    banner.setAttribute("aria-describedby", "cookie-msg");
    banner.innerHTML = [
      '<p id="cookie-title" class="cookie-banner__title">Cookies &amp; analytics</p>',
      '<p id="cookie-msg" class="cookie-banner__msg">',
        "We use Microsoft Clarity to see anonymous, aggregated usage so we can fix what's broken. ",
        "No ads, no cross-site tracking. ",
        '<a href="/privacy.html">Privacy</a>.',
      "</p>",
      '<div class="cookie-banner__actions">',
        '<button type="button" class="btn--primary" data-cookie="accept">Accept</button>',
        '<button type="button" class="btn--chip" data-cookie="decline">Decline</button>',
      "</div>"
    ].join("");
    document.body.appendChild(banner);

    banner.querySelector('[data-cookie="accept"]').addEventListener("click", function () {
      persist("accepted");
      banner.remove();
      loadClarity();
    });
    banner.querySelector('[data-cookie="decline"]').addEventListener("click", function () {
      persist("declined");
      banner.remove();
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
