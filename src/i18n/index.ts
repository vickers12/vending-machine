import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./en/en-CA.json";
export const defaultNS = "enTranslation";

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en-CA",
        resources: {
            "en-CA": { enTranslation }
        },
        interpolation: {
            escapeValue: false
        },
        defaultNS
    });

export default i18n;
