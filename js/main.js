(() => {
  document.documentElement.classList.add("js");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const year = document.getElementById("year");

  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile menu
  const closeMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    mobileMenu.hidden = true;
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Open navigation menu" : "Close navigation menu",
      );
      mobileMenu.hidden = isOpen;
    });

    mobileMenu
      .querySelectorAll("a")
      .forEach((link) => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // Header scroll
  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // View toggle
  document.querySelectorAll("[data-view-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const view = tab.dataset.viewTab;
      document.querySelectorAll("[data-view-tab]").forEach((item) => {
        item.setAttribute("aria-pressed", String(item === tab));
      });
      document.querySelectorAll("[data-view-panel]").forEach((panel) => {
        const active = panel.dataset.viewPanel === view;
        panel.hidden = !active;
        panel.classList.toggle("is-active", active);
      });
    });
  });

  // Copy email
  const copyButton = document.querySelector("[data-copy-email]");
  const copyStatus = document.querySelector("[data-copy-status]");

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const email = copyButton.getAttribute("data-copy-email") || "";
      try {
        await navigator.clipboard.writeText(email);
        if (copyStatus) copyStatus.textContent = "Email copied.";
      } catch {
        if (copyStatus) copyStatus.textContent = email;
      }
    });
  }

  // Scroll reveal (with stagger support)
  const revealItems = document.querySelectorAll("[data-reveal]");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
      if (item.hasAttribute("data-stagger")) {
        item.querySelectorAll(":scope > *").forEach((child) => {
          child.style.opacity = "1";
          child.style.transform = "none";
        });
      }
    });
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }
})();
