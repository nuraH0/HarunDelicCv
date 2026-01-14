// i18n.js (ROOT)
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  bs: {
    translation: {
      // Tvoj postojeći kod...
      role_web: "👨‍💻 Web developer",
      role_mobile: "📱 Mobile developer",
      role_problem: "🧩 Rješavanje problema",
      // ... ostatak
    },
  },
  en: {
    translation: {
      // Tvoj postojeći kod...
      role_web: "👨‍💻 Web Developer",
      role_mobile: "📱 Mobile Developer",
      role_problem: "🧩 Problem Solver",
      // ... ostatak
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "bs", // Default jezik
    fallbackLng: "en",
    supportedLngs: ["bs", "en"], // ✅ Dodato
    debug: true, // ✅ Debug mode
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false, // ✅ Važno za Next.js
    },
  });

export default i18n;
