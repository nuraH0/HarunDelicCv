// LanguageSwitcher.tsx (u istom folderu gdje je Home)
"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "bs" ? "en" : "bs";
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider
        shadow-xl shadow-black/50 border-2 border-white/30
        backdrop-blur-md bg-gradient-to-r ${
          i18n.language === "bs" 
            ? "from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500" 
            : "from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500"
        }
        text-black hover:shadow-cyan-500/50 transition-all duration-300
      `}
      title={`Switch to ${i18n.language === "bs" ? "English" : "Bosanski"}`}
    >
      {i18n.language === "bs" ? "EN" : "BS"}
    </motion.button>
  );
}
