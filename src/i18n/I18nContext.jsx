import { createContext, useContext, useState, useEffect } from "react";
import en from "./locales/en.json";
import te from "./locales/te.json";
import hi from "./locales/hi.json";

const translations = {
  english: en,
  telugu: te,
  hindi: hi,
};

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem("krishi_mitra_lang");
      if (saved && translations[saved]) {
        return saved;
      }
    } catch (e) {
      console.warn("localStorage is not available:", e);
    }
    return "english";
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const changeLanguage = (newLang) => {
    if (translations[newLang]) {
      setLanguage(newLang);
      try {
        localStorage.setItem("krishi_mitra_lang", newLang);
      } catch (e) {
        console.warn("Failed to save language in localStorage:", e);
      }
    }
  };

  const getNestedValue = (obj, path) => {
    if (!obj || !path) return null;
    return path.split(".").reduce((acc, part) => {
      return acc && acc[part] !== undefined ? acc[part] : null;
    }, obj);
  };

  const t = (key, variables = {}) => {
    let value = getNestedValue(translations[language], key);

    // Fallback to English
    if (value === null && language !== "english") {
      value = getNestedValue(translations.english, key);
    }

    // Fallback to raw key
    if (value === null || value === undefined) {
      return key;
    }

    // Replace variables
    return Object.entries(variables).reduce((acc, [varName, varVal]) => {
      return acc.replace(new RegExp(`\\{${varName}\\}`, "g"), String(varVal));
    }, value);
  };

  if (!isMounted) {
    // Return placeholder during hydration/first load to avoid flash
    return <>{children}</>;
  }

  return (
    <I18nContext.Provider value={{ t, language, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}