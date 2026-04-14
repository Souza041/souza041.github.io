const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const languageToggle = document.querySelector(".language-toggle");
const revealTargets = document.querySelectorAll(".section, .project-card, .service-card, .contact-card");
const languageCache = {};

async function loadTranslations(language) {
  if (languageCache[language]) {
    return languageCache[language];
  }

  const response = await fetch(`./lang/${language}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load translation file for ${language}`);
  }

  const dictionary = await response.json();
  languageCache[language] = dictionary;
  return dictionary;
}

function applyLanguage(dictionary, language) {
  document.documentElement.lang = language === "en" ? "en" : "pt-BR";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.textContent = dictionary[key];
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
    const [attribute, key] = element.dataset.i18nAttr.split(":");
    if (attribute && key && dictionary[key]) {
      element.setAttribute(attribute, dictionary[key]);
    }
  });

  document.title = dictionary["meta.title"];

  if (languageToggle) {
    languageToggle.textContent = language === "en" ? "Versão em português" : "English version";
    languageToggle.setAttribute("aria-label", language === "en" ? "Mudar para português" : "Switch to English");
  }

  localStorage.setItem("portfolio-language", language);
}

async function setLanguage(language) {
  try {
    const dictionary = await loadTranslations(language);
    applyLanguage(dictionary, language);
  } catch (error) {
    if (language !== "pt") {
      const fallbackDictionary = await loadTranslations("pt");
      applyLanguage(fallbackDictionary, "pt");
      return;
    }

    console.error(error);
  }
}

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    const currentLanguage = localStorage.getItem("portfolio-language") || "pt";
    const nextLanguage = currentLanguage === "pt" ? "en" : "pt";
    setLanguage(nextLanguage);
  });
}

setLanguage(localStorage.getItem("portfolio-language") || "pt");

revealTargets.forEach((element) => element.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16
  }
);

revealTargets.forEach((element) => observer.observe(element));
