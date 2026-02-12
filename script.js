(function () {
  var screens = {};
  document.querySelectorAll("[data-screen]").forEach(function (el) {
    screens[el.getAttribute("data-screen")] = el;
  });

  function setScreen(name) {
    Object.keys(screens).forEach(function (key) {
      screens[key].classList.toggle("is-active", key === name);
    });
  }

  var uikit = document.getElementById("uikit");
  var mapEl = document.getElementById("map");

  function navigate(hash) {
    location.hash = hash ? hash : "";
  }

  function onHashChange() {
    var hash = location.hash.replace("#", "");
    uikit.classList.toggle("is-open", hash === "uikit");
    mapEl.classList.toggle("is-open", hash === "map");

    document.querySelectorAll("[data-action='nav']").forEach(function (btn) {
      var btnHash = btn.getAttribute("data-hash");
      btn.classList.toggle("is-active", btnHash === hash);
    });
  }

  window.addEventListener("hashchange", onHashChange);
  onHashChange();

  function setTheme(value) {
    if (value) {
      document.body.setAttribute("data-theme", value);
    } else {
      document.body.removeAttribute("data-theme");
    }
    document.querySelectorAll("[data-action='set-theme']").forEach(function (btn) {
      var isActive = btn.getAttribute("data-theme-value") === value;
      btn.setAttribute("aria-checked", isActive ? "true" : "false");
      var icon = btn.querySelector(".select-icon");
      if (icon) icon.style.borderWidth = isActive ? "4px" : "";
    });
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    var action = btn.getAttribute("data-action");

    if (action === "to-success") setScreen("success");
    if (action === "to-error") setScreen("error");
    if (action === "to-default") setScreen("default");

    if (action === "nav") {
      navigate(btn.getAttribute("data-hash"));
    }

    if (action === "map-to") {
      var target = btn.getAttribute("data-map-to");
      setScreen(target);
      navigate("");
    }

    if (action === "set-theme") {
      setTheme(btn.getAttribute("data-theme-value"));
    }

    if (action === "shake-error") {
      setScreen("error");
      var card = screens["error"].querySelector(".card");
      if (!card) return;
      card.classList.remove("card--shake");
      void card.offsetWidth;
      card.classList.add("card--shake");
    }
  });
})();