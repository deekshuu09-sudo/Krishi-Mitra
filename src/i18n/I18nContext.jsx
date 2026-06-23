import { createContext, useContext, useEffect, useState } from "react";
import en from "./locales/en.json";
import te from "./locales/te.json";
import hi from "./locales/hi.json";

const translations = {
  english: en,
  telugu: te,
  hindi: hi,
};

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState("english");

  useEffect(() => {
    const saved = localStorage.getItem("krishi_mitra_lang");
    if (saved && translations[saved]) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("krishi_mitra_lang", lang);
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <I18nContext.Provider
      value={{ language, changeLanguage, t }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => useContext(I18nContext);