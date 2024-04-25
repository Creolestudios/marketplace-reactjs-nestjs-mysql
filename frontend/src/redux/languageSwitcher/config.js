import language from "../../config/language.config";

import englishLang from "../../assets/images/flag/uk.svg";
import denmarkLang from "../../assets/images/flag/denmark.svg";
const selectedlanguage =
  localStorage.getItem("selectedlanguage") ||
  sessionStorage.getItem("selectedlanguage");
const config = {
  defaultLanguage: language,
  options: [
    {
      languageId: "en",
      locale: "en",
      text: "English",
      icon: englishLang,
    },
    {
      languageId: "de",
      locale: "de",
      text: "Denmark",
      icon: denmarkLang,
    },
  ],
};

export function getCurrentLanguage(lang) {
  let selecetedLanguage = config.options[0];
  config.options.forEach((language) => {
    if (language.languageId === lang) {
      selecetedLanguage = language;
    }
  });
  return selecetedLanguage;
}
export default config;
