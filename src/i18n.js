import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
    },
    detection: {
      order: ["querystring", "navigator"],
    },
    defaultNS: "app",
    lowerCaseLng: true,
    ns: ["app"],
    fallbackLng: "en",
    whitelist: ["en", "zh-tw"],
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p", "u", "span"],
    },
  });

export default i18n;
