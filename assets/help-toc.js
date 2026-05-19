(function () {
  var article = document.querySelector(".help-article");
  if (!article) return;

  var headings = Array.prototype.slice.call(article.querySelectorAll("h2"));
  if (!headings.length) return;

  function slugify(s) {
    return s
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  var sections = headings
    .filter(function (h) {
      return !h.classList.contains("help-article__related-title");
    })
    .map(function (h) {
      if (!h.id) h.id = slugify(h.textContent || "");
      return { id: h.id, text: (h.textContent || "").trim() };
    });

  function renderToc(target) {
    if (!target) return;
    target.innerHTML = "";
    sections.forEach(function (s) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + s.id;
      a.textContent = s.text;
      a.dataset.tocLink = s.id;
      li.appendChild(a);
      target.appendChild(li);
    });
  }

  function renderRelated(target) {
    if (!target) return;
    var src = article.querySelector(".help-article__related");
    if (!src) return;
    target.innerHTML = "";
    Array.prototype.slice.call(src.children).forEach(function (li) {
      target.appendChild(li.cloneNode(true));
    });
  }

  document.querySelectorAll("[data-help-toc]").forEach(renderToc);
  document.querySelectorAll("[data-help-related]").forEach(renderRelated);

  var mobileDetails = document.getElementById("help-toc-mobile");
  if (mobileDetails) {
    mobileDetails.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") {
        mobileDetails.open = false;
      }
    });
  }

  if ("IntersectionObserver" in window) {
    var current = sections[0] ? sections[0].id : null;
    var visible = {};

    function setActive(id) {
      document.querySelectorAll('[data-toc-link]').forEach(function (link) {
        if (link.dataset.tocLink === id) link.classList.add("is-active");
        else link.classList.remove("is-active");
      });
    }
    if (current) setActive(current);

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          visible[e.target.id] = e.isIntersecting;
        });
        for (var i = 0; i < sections.length; i++) {
          if (visible[sections[i].id]) {
            if (sections[i].id !== current) {
              current = sections[i].id;
              setActive(current);
            }
            return;
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      var el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
  }
})();
