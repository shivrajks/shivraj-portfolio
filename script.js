(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const header = document.querySelector("[data-header]");
    const progress = document.querySelector(".scroll-progress");
    const menuToggle = document.querySelector("[data-menu-toggle]");
    const mobileMenu = document.querySelector("[data-mobile-menu]");
    const roleSwitcher = document.getElementById("role-switcher");
    const year = document.getElementById("year");

    if (year) {
        year.textContent = String(new Date().getFullYear());
    }

    if (roleSwitcher && !reducedMotion) {
        const roles = [
            "Java Backend Developer",
            "QA Automation Engineer",
            "Software Tester",
            "Problem Solver"
        ];
        let roleIndex = 0;

        window.setInterval(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            roleSwitcher.textContent = roles[roleIndex];
        }, 2200);
    }

    const closeMenu = () => {
        if (!menuToggle || !mobileMenu) return;
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        mobileMenu.classList.remove("is-open");
    };

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", String(!isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
            mobileMenu.classList.toggle("is-open", !isOpen);
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });
    }

    let ticking = false;
    const updateScrollState = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

        if (progress) {
            progress.style.width = `${Math.min(100, Math.max(0, scrolled))}%`;
        }

        if (header) {
            header.classList.toggle("is-scrolled", window.scrollY > 12);
        }

        ticking = false;
    };

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollState);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener("resize", updateScrollState, { passive: true });
    updateScrollState();

    const revealItems = document.querySelectorAll("[data-reveal]");

    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
    });

    revealItems.forEach((item) => revealObserver.observe(item));
})();
