(function () {
  "use strict";

  // Preloader
  window.addEventListener("load", function () {
    document.body.classList.add("is-loaded");
  });

  // Keep --topbar-h in sync with the real topbar height (it wraps on small screens)
  var topbar = document.querySelector(".topbar");
  function syncTopbarHeight() {
    if (!topbar) return;
    document.documentElement.style.setProperty("--topbar-h", topbar.offsetHeight + "px");
  }
  syncTopbarHeight();
  window.addEventListener("resize", syncTopbarHeight);

  // Sticky header solid background after scroll
  var header = document.querySelector("[data-header]");
  var backTop = document.querySelector("[data-back-top]");
  function onScroll() {
    var scrolled = window.scrollY > 40;
    if (header) header.classList.toggle("is-solid", scrolled);
    if (backTop) backTop.classList.toggle("is-visible", window.scrollY > 600);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Mobile navigation
  var navToggle = document.querySelector("[data-nav-toggle]");
  var mobileNav = document.querySelector("[data-mobile-nav]");
  var navClose = document.querySelector("[data-nav-close]");

  function openNav() {
    if (mobileNav) mobileNav.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeNav() {
    if (mobileNav) mobileNav.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  if (navToggle) navToggle.addEventListener("click", openNav);
  if (navClose) navClose.addEventListener("click", closeNav);
  if (mobileNav) {
    mobileNav.addEventListener("click", function (e) {
      if (e.target === mobileNav) closeNav();
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Footer year
  var yearEls = document.querySelectorAll("[data-year]");
  yearEls.forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Cimprina gallery thumbnail swap
  var galleryMainImg = document.querySelector("[data-gallery-main]");
  var galleryThumbs = document.querySelectorAll("[data-gallery-thumb]");
  if (galleryMainImg && galleryThumbs.length) {
    galleryThumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var fullSrc = thumb.getAttribute("data-full");
        galleryMainImg.style.opacity = 0;
        setTimeout(function () {
          galleryMainImg.src = fullSrc;
          galleryMainImg.style.opacity = 1;
        }, 180);
        galleryThumbs.forEach(function (t) { t.classList.remove("is-active"); });
        thumb.classList.add("is-active");
      });
    });
  }
})();
