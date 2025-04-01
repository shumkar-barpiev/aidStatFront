import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "@/locales/en/translation.json";
import ruTranslations from "@/locales/ru/translation.json";
import kgTranslations from "@/locales/kg/translation.json";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      ru: { translation: ruTranslations },
      kg: { translation: kgTranslations },
    },
    fallbackLng: "ru",
    supportedLngs: ["en", "ru", "kg"],
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
