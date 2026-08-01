/* Halden & Roe — shared interactions */
(function () {
  "use strict";

  /* Mobile nav toggle */
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".mainnav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      document.body.classList.toggle("nav-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        document.body.classList.remove("nav-open");
      });
    });
  }

  /* Active nav link based on current page */
  var here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".mainnav a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === here || (here === "" && href === "index.html")) a.classList.add("active");
  });

  /* Scroll reveal with stagger */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var delay = parseInt(e.target.getAttribute("data-delay") || "0", 10);
          setTimeout(function () { e.target.classList.add("in"); }, delay);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* Count-up figures */
  var stats = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && stats.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        so.unobserve(e.target);
        var el = e.target;
        var target = parseFloat(el.getAttribute("data-count"));
        var prefix = el.getAttribute("data-prefix") || "";
        var suffix = el.getAttribute("data-suffix") || "";
        var dur = 1500, start = null;
        var fmt = function (v) {
          return (target % 1 === 0 ? Math.round(v).toLocaleString("en-US") : v.toFixed(1));
        };
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + fmt(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    stats.forEach(function (el) { so.observe(el); });
  }

  /* Contact form (front-end demo) */
  var form = document.querySelector("#quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var ok = document.querySelector("#form-ok");
      if (ok) { ok.classList.add("show"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
      form.reset();
    });
  }

  /* Footer year */
  var year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
})();
