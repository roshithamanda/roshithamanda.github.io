(function () {
  "use strict";

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("nav");

  function setNav(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNav(!nav.classList.contains("open"));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setNav(false);
    });
  }

  /* ---------- Demo security assessment ---------- */
  var scan = document.getElementById("scan");
  var statusEl = document.getElementById("scan-status");
  var scanBtn = document.getElementById("scan-btn");
  var cleanBtn = document.getElementById("clean-btn");
  var items = Array.prototype.slice.call(document.querySelectorAll("#files li"));
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var busy = false;

  function wait(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, reduceMotion ? 0 : ms);
    });
  }

  function setPhase(phase, text) {
    scan.setAttribute("data-phase", phase);
    statusEl.textContent = text;
  }

  function tag(li, text) {
    li.querySelector(".tag").textContent = text;
  }

  function reset() {
    items.forEach(function (li) {
      li.setAttribute("data-state", "unknown");
      tag(li, "");
    });
    cleanBtn.disabled = true;
    setPhase("idle", "Not started");
  }

  async function runScan() {
    if (busy) return;
    busy = true;
    reset();
    scanBtn.disabled = true;
    setPhase("scanning", "Assessing...");

    var found = 0;
    for (var i = 0; i < items.length; i++) {
      var li = items[i];
      li.setAttribute("data-state", "checking");
      await wait(380);
      if (li.dataset.bad === "true") {
        li.setAttribute("data-state", "infected");
        tag(li, li.dataset.why);
        found++;
      } else {
        li.setAttribute("data-state", "ok");
        tag(li, "no issue found");
      }
    }

    setPhase("infected", found + " issues found");
    scanBtn.textContent = "Run again";
    scanBtn.disabled = false;
    cleanBtn.disabled = false;
    busy = false;
  }

  async function runClean() {
    if (busy) return;
    busy = true;
    scanBtn.disabled = true;
    cleanBtn.disabled = true;
    setPhase("scanning", "Applying fixes...");

    var bad = items.filter(function (li) { return li.dataset.bad === "true"; });
    for (var i = 0; i < bad.length; i++) {
      await wait(650);
      bad[i].setAttribute("data-state", "cleaned");
      tag(bad[i], "fixed and verified");
    }

    setPhase("clean", "All issues closed");
    scanBtn.textContent = "Run demo assessment";
    scanBtn.disabled = false;
    busy = false;
  }

  if (scan && scanBtn && cleanBtn) {
    scanBtn.addEventListener("click", runScan);
    cleanBtn.addEventListener("click", runClean);
  }

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  var form = document.getElementById("contact-form");
  var msgEl = document.getElementById("form-msg");
  var TO = "cityroshsupport@gmail.com";

  function say(text, kind) {
    msgEl.textContent = text;
    msgEl.className = "form-msg " + (kind || "");
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.elements.name;
      var email = form.elements.email;
      var site = form.elements.site;
      var need = form.elements.need;
      var msg = form.elements.msg;

      [name, email, msg].forEach(function (f) {
        f.removeAttribute("aria-invalid");
      });

      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      var problem = null;

      if (!name.value.trim()) {
        problem = [name, "Enter your name."];
      } else if (!emailOk) {
        problem = [email, "Enter a valid email address so we can reply."];
      } else if (!msg.value.trim()) {
        problem = [msg, "Describe what you need tested or fixed."];
      }

      if (problem) {
        problem[0].setAttribute("aria-invalid", "true");
        problem[0].focus();
        say(problem[1], "error");
        return;
      }

      var subject = "Cityrosh enquiry: " + need.value;
      var body =
        "Name: " + name.value.trim() + "\n" +
        "Email: " + email.value.trim() + "\n" +
        "Website / server: " + (site.value.trim() || "not given") + "\n" +
        "Service: " + need.value + "\n\n" +
        msg.value.trim();

      window.location.href =
        "mailto:" + TO +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      say("Your email app should open with the message ready. Press send there to finish.", "ok");
    });
  }
})();