 document.addEventListener("DOMContentLoaded", () => {
  const langButton = document.querySelector(".lang-switch");
  const translatable = document.querySelectorAll("[data-en][data-de]");
  const topbar = document.querySelector(".topbar");

  let currentLanguage = "en";

  function setLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;

    translatable.forEach((element) => {
      const translation = element.dataset[language];
      if (translation !== undefined) {
        element.textContent = translation;
      }
    });

    if (langButton) {
      langButton.textContent = language === "en" ? "DE" : "EN";
      langButton.setAttribute(
        "aria-label",
        language === "en" ? "Switch to German" : "Switch to English"
      );
    }
  }

  if (langButton) {
    langButton.addEventListener("click", () => {
      setLanguage(currentLanguage === "en" ? "de" : "en");
    });
  }

  function updateHeader() {
    if (topbar) {
      topbar.classList.toggle("scrolled", window.scrollY > 12);
    }
  }

  window.addEventListener("scroll", updateHeader, { passive: true });

  updateHeader();
  setLanguage("en");
});

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) return;

  root.classList.add("motion-ready");

  const selectors = [
    ".section-heading",
    ".service-grid article",
    ".trust-grid article",
    ".project-card",
    ".price-card",
    ".process-list > div",
    ".local-seo-intro",
    ".local-seo-copy",
    ".keyword-services",
    ".faq-list details",
    ".contact-section > p",
    ".contact-section h2",
    ".contact-actions",
    ".contact-details"
  ];

  const items = document.querySelectorAll(selectors.join(","));

  items.forEach((item, index) => {
    item.classList.add("reveal-target");
    item.dataset.delay = String(index % 4);
  });

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -5% 0px"
  });

  items.forEach((item) => observer.observe(item));

  requestAnimationFrame(() => {
    root.classList.add("hero-loaded");
  });
});
