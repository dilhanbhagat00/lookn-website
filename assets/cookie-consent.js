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

  function dismiss(el) {
    if (!el) return;
    el.classList.add("cookie-banner--leaving");
    setTimeout(function () { el.remove(); }, 220);
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
        '<p id="cookie-title" class="cookie-banner__title">We use cookies</p>',
      '</div>',
      '<p id="cookie-msg" class="cookie-banner__msg">',
        "A few anonymous cookies help us see how the site is used so we can keep making it better. No ads, no tracking across other sites, no selling your data. ",
        '<a href="/privacy.html">Read more</a>',
      "</p>",
      '<div class="cookie-banner__actions">',
        '<button type="button" class="cookie-btn cookie-btn--ghost" data-cookie="decline">Reject all</button>',
        '<button type="button" class="cookie-btn cookie-btn--ghost" data-cookie="settings">Cookie settings</button>',
        '<button type="button" class="cookie-btn cookie-btn--primary" data-cookie="accept">Accept all</button>',
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
    banner.querySelector('[data-cookie="settings"]').addEventListener("click", function () {
      showSettings(banner);
    });
  }

  function showSettings(banner) {
    var existing = document.getElementById("cookie-settings");
    if (existing) return;

    var saved = read();
    var analyticsOn = saved !== "declined";

    var overlay = document.createElement("div");
    overlay.id = "cookie-settings";
    overlay.className = "cookie-settings";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "cookie-settings-title");
    overlay.innerHTML = [
      '<div class="cookie-settings__sheet">',
        '<header class="cookie-settings__head">',
          '<h2 id="cookie-settings-title" class="cookie-settings__title">Cookie settings</h2>',
          '<button type="button" class="cookie-settings__close" aria-label="Close cookie settings">×</button>',
        '</header>',
        '<p class="cookie-settings__intro">Pick what\'s okay with you. You can change this any time by clearing your site data and reloading.</p>',

        '<section class="cookie-row">',
          '<div class="cookie-row__copy">',
            '<h3 class="cookie-row__title">Strictly necessary</h3>',
            '<p class="cookie-row__desc">Required for the site to load and function — hosting, content delivery, basic security. These can\'t be turned off.</p>',
          '</div>',
          '<span class="cookie-pill cookie-pill--locked" aria-hidden="true">Always on</span>',
        '</section>',

        '<section class="cookie-row">',
          '<div class="cookie-row__copy">',
            '<h3 class="cookie-row__title">Analytics &amp; insights</h3>',
            '<p class="cookie-row__desc">Anonymous usage signals via Microsoft Clarity. Helps us see what\'s working and what breaks. No ads, no cross-site tracking, no selling your data.</p>',
          '</div>',
          '<label class="cookie-toggle" aria-label="Toggle analytics cookies">',
            '<input type="checkbox" data-cookie-toggle="analytics"' + (analyticsOn ? ' checked' : '') + ' />',
            '<span class="cookie-toggle__track"><span class="cookie-toggle__thumb"></span></span>',
          '</label>',
        '</section>',

        '<footer class="cookie-settings__foot">',
          '<button type="button" class="cookie-btn cookie-btn--ghost" data-cookie-action="cancel">Cancel</button>',
          '<button type="button" class="cookie-btn cookie-btn--primary" data-cookie-action="save">Save preferences</button>',
        '</footer>',
      '</div>'
    ].join("");
    document.body.appendChild(overlay);

    function close() {
      overlay.classList.add("cookie-settings--leaving");
      setTimeout(function () { overlay.remove(); }, 180);
    }

    overlay.querySelector('.cookie-settings__close').addEventListener("click", close);
    overlay.querySelector('[data-cookie-action="cancel"]').addEventListener("click", close);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });

    overlay.querySelector('[data-cookie-action="save"]').addEventListener("click", function () {
      var on = overlay.querySelector('[data-cookie-toggle="analytics"]').checked;
      persist(on ? "accepted" : "declined");
      if (on) loadClarity();
      close();
      dismiss(banner);
    });

    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        close();
        document.removeEventListener("keydown", escHandler);
      }
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
