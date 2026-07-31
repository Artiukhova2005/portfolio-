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
