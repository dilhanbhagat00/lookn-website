window.LOOKN_HELP_ARTICLES = [
  { slug: "getting-started",   cat: "Getting started", emoji: "🌱", title: "Getting started with Lookn",       snippet: "What Lookn is, how to sign up, and what to do in your first 5 minutes.", tags: "start signup onboarding first new user account create" },
  { slug: "your-koko",         cat: "Your koko",       emoji: "🐨", title: "Meet your koko",                    snippet: "Your fluffy companion. Naming, mood, outfits, animations, and how to pet them.",            tags: "pet character mascot name mood happy sad bond petting clothes outfit hat" },
  { slug: "tasks",             cat: "Tasks & quests",  emoji: "✅", title: "Tasks &amp; daily goals",          snippet: "Adding habits, completing them, repeat cycles, smart sort, and what counts toward streaks.", tags: "task goal habit daily routine add complete check off repeat schedule sort smart undo" },
  { slug: "quests",            cat: "Tasks & quests",  emoji: "🎯", title: "Quests &amp; rewards",              snippet: "Daily, weekly, and special quests. Claiming, WishBox, item drops, and coin rewards.",        tags: "quest daily weekly special wishbox claim reward coin energy item drop progress" },
  { slug: "streaks",           cat: "Streaks",         emoji: "🔥", title: "Understanding streaks",             snippet: "How streaks grow, when they reset, the 4am rollover, and what counts as a check-in.",       tags: "streak day rollover 4am midnight reset missed gap pause grace" },
  { slug: "streak-repair",     cat: "Streaks",         emoji: "🛟", title: "Repairing a missed streak",         snippet: "Everyone gets a monthly repair allowance. Plus members get more. Here's how it works.",     tags: "repair restore recover broken lost missed streak monthly allowance refill free plus" },
  { slug: "adventures",        cat: "Adventures",      emoji: "🗺️", title: "Adventures & journeys",             snippet: "Themed wellness journeys — sleep, anxiety, gratitude, focus, self-kindness. How they work.", tags: "adventure journey theme sleep anxiety gratitude focus self-kindness story week travel" },
  { slug: "dome",              cat: "Your dome",       emoji: "🏠", title: "Your dome &amp; decorating",        snippet: "Your koko's home. Decorate it, save layouts, and switch between scenes.",                   tags: "dome home house decorate furniture wall floor scene save layout edit move" },
  { slug: "shop",              cat: "Your dome",       emoji: "🛒", title: "The shop &amp; earning coins",      snippet: "How to earn coins, what's in the shop, and how the daily refresh works.",                   tags: "shop store buy coin currency money refresh furniture clothes daily inventory" },
  { slug: "friends",           cat: "Friends",         emoji: "💛", title: "Adding & managing friends",         snippet: "Invite codes, QR scanning, accepting requests, and unfriending.",                            tags: "friend add invite code qr scan accept decline unfriend remove block" },
  { slug: "feels",             cat: "Friends",         emoji: "✨", title: "Sending feels (boosts) & shared tasks", snippet: "Send positive energy to friends, share tasks, and build bond.",                          tags: "feel boost love positive energy high-five share task bond friend together encouragement" },
  { slug: "lookn-plus",        cat: "Lookn Plus",      emoji: "✨", title: "What is Lookn Plus?",               snippet: "What the subscription unlocks: furniture, scenes, insights, adventures, streak repair.",    tags: "plus premium subscription upgrade pay paid features unlock insight" },
  { slug: "cancel-plus",       cat: "Lookn Plus",      emoji: "🧾", title: "Canceling or restoring Lookn Plus", snippet: "Cancel on iOS, cancel on Android, free trial behavior, restoring on a new device.",         tags: "cancel unsubscribe stop refund free trial restore purchase ios android plus subscription" },
  { slug: "privacy",           cat: "Privacy",         emoji: "🔒", title: "Privacy & your data",               snippet: "What we collect, what we don't, where it lives, and how to delete it.",                     tags: "privacy data collect security encrypt journal private gdpr ccpa cookie clarity" },
  { slug: "delete-account",    cat: "Account",         emoji: "🗑️", title: "Deleting your account",             snippet: "How account deletion works, what gets removed, and how long it takes.",                     tags: "delete account remove erase wipe cognito dynamodb gdpr ccpa erasure" },
  { slug: "notifications",     cat: "Account",         emoji: "🔔", title: "Notifications & reminders",         snippet: "Turning reminders on and off, fine-tuning categories, and OS-level controls.",              tags: "notification reminder push alert nudge mute silence ios android system" },
  { slug: "sync",              cat: "Account",         emoji: "🔁", title: "Multi-device sync & offline",       snippet: "Using Lookn on more than one device, what works offline, and how syncing handles conflicts.", tags: "sync offline multi-device ipad iphone android cross-platform conflict cloud" },
];

(function () {
  function buildResultsList(input, results, container) {
    var listEl = document.createElement("ul");
    listEl.className = "help-search__results";
    if (!results.length) {
      var empty = document.createElement("li");
      empty.className = "help-search__empty";
      empty.innerHTML = 'No results. Try a different word or email <a href="mailto:support@looknapp.com">support@looknapp.com</a>.';
      listEl.appendChild(empty);
    } else {
      results.forEach(function (a) {
        var li = document.createElement("li");
        li.innerHTML =
          '<a href="/help/' + a.slug + '.html">' +
            '<span class="help-search__cat"><span class="rel-emo">' + a.emoji + '</span>' + a.cat + '</span>' +
            '<span class="help-search__title">' + a.title + '</span>' +
            '<span class="help-search__snippet">' + a.snippet + '</span>' +
          '</a>';
        listEl.appendChild(li);
      });
    }
    container.innerHTML = "";
    container.appendChild(listEl);
    container.hidden = false;
  }

  function setupSearch(input, container) {
    if (!input || !container) return;
    var articles = window.LOOKN_HELP_ARTICLES;

    function filter() {
      var term = input.value.trim().toLowerCase();
      if (!term) { container.hidden = true; container.innerHTML = ""; return; }
      var hits = articles.filter(function (a) {
        var hay = (a.title + " " + a.snippet + " " + a.tags + " " + a.cat).toLowerCase();
        return term.split(/\s+/).every(function (t) { return hay.indexOf(t) !== -1; });
      });
      buildResultsList(input, hits.slice(0, 8), container);
    }

    input.addEventListener("input", filter);
    input.addEventListener("focus", function () { if (input.value.trim()) filter(); });
    document.addEventListener("click", function (e) {
      if (!container.contains(e.target) && e.target !== input) container.hidden = true;
    });
  }

  function init() {
    document.querySelectorAll('[data-help-search]').forEach(function (input) {
      var resultsId = input.getAttribute("data-help-search");
      var container = document.getElementById(resultsId);
      setupSearch(input, container);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
