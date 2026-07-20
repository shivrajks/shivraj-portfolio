// animations.js — Scroll reveals, mobile menu, header, copy email
(function () {
  // Scroll reveal
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && "IntersectionObserver" in window) {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => observer.observe(el));
    }
  }

  // Header scroll state
  const header = document.querySelector("[data-header]");
  if (header) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle("is-scrolled", window.scrollY > 8);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Mobile menu
  const toggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  if (toggle && mobileMenu) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      if (expanded) {
        mobileMenu.hidden = true;
      } else {
        mobileMenu.hidden = false;
      }
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        mobileMenu.hidden = true;
      });
    });
  }

  // Copy email
  const copyBtn = document.querySelector("[data-copy-email]");
  const copyStatus = document.querySelector("[data-copy-status]");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const email = copyBtn.getAttribute("data-copy-email");
      if (email && navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          if (copyStatus) copyStatus.textContent = "Email copied!";
          setTimeout(() => {
            if (copyStatus) copyStatus.textContent = "";
          }, 2000);
        });
      }
    });
  }

  // Year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
