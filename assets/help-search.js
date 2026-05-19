window.LOOKN_HELP_ARTICLES = [
  { slug: "getting-started",   cat: "Getting started", emoji: "🌱", title: "Getting started with Lookn",       snippet: "What Lookn is, how to sign up, and what to do in your first 5 minutes.", tags: "start signup onboarding first new user account create" },
  { slug: "your-koko",         cat: "Your koko",       emoji: "🐨", title: "Meet your koko",                    snippet: "Your baby koala companion. Naming, mood animations, outfits, and the friendship-tier system.",            tags: "pet character mascot name koala mood happy thinking waving dancing petting clothes outfit hat bond friendship tier" },
  { slug: "tasks",             cat: "Tasks & quests",  emoji: "✅", title: "Tasks &amp; daily goals",          snippet: "Adding tasks, repeat cycles (daily/weekly/monthly), smart sort, undo (30s), and shared tasks with friends.", tags: "task goal habit daily routine add complete check off repeat schedule sort smart undo 30 second category easy wins mindfulness movement shared friend" },
  { slug: "quests",            cat: "Tasks & quests",  emoji: "🎯", title: "Quests &amp; rewards",              snippet: "Daily (2-3/day, reset 4 AM), weekly, and lifetime special quests. WishBox unlocks at 3/3 dailies.",        tags: "quest daily weekly special wishbox claim reward coin energy item drop progress tier 4am reset" },
  { slug: "streaks",           cat: "Streaks",         emoji: "🔥", title: "Understanding streaks",             snippet: "How streaks grow, the 4 AM rollover, and the 24/48/72-hour grace window before reset.",       tags: "streak day rollover 4am midnight reset missed gap pause grace hours window 24 48 72" },
  { slug: "streak-repair",     cat: "Streaks",         emoji: "🛟", title: "Repairing a missed streak",         snippet: "Everyone gets a monthly repair allowance. Plus members get more. Here's how it works.",     tags: "repair restore recover broken lost missed streak monthly allowance refill free plus" },
  { slug: "adventures",        cat: "Adventures",      emoji: "🗺️", title: "Adventures & journeys",             snippet: "Themed 30-day travel cycles. 8-hour days, 150 coins per day, savers from starts. Willow Woods, Paris, St. John's.", tags: "adventure journey travel destination paris stjohns willow woods 30 day energy picnic bar saver coin reward 8 hour" },
  { slug: "dome",              cat: "Your dome",       emoji: "🏠", title: "Your dome &amp; decorating",        snippet: "Tap-to-equip furniture across 12 fixed slots. Save favorite scenes, visit friend domes, special back-left items.",                   tags: "dome home house decorate furniture wall floor scene save layout equip slot back left plant koala bag guitar skis travel" },
  { slug: "shop",              cat: "Your dome",       emoji: "🛒", title: "The shop &amp; earning coins",      snippet: "How Today's Picks works, Essentials, premium row, travel destinations, and earning coins.",                   tags: "shop store buy coin glow gem currency money refresh furniture clothes daily inventory today picks essentials premium travel paris locked" },
  { slug: "friends",           cat: "Friends",         emoji: "💛", title: "Adding & managing friends",         snippet: "Invite codes, QR scanning, accepting requests, and unfriending.",                            tags: "friend add invite code qr scan accept decline unfriend remove block" },
  { slug: "feels",             cat: "Friends",         emoji: "✨", title: "Sending feels (boosts) & shared tasks", snippet: "Send positive energy to friends, share tasks, and build bond.",                          tags: "feel boost love positive energy high-five share task bond friend together encouragement" },
  { slug: "lookn-plus",        cat: "Lookn Plus",      emoji: "✨", title: "What is Lookn Plus?",               snippet: "$9.99/mo or $59.99/yr. Premium furniture, exclusive adventures, more saved scenes, Insights. Streak repair is the same for everyone.",    tags: "plus premium subscription upgrade pay paid features unlock insight monthly yearly trial 3 day" },
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
