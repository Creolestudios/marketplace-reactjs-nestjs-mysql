import { getCurrentLanguage } from "./config";

import actions from "./actions";
const selectedlanguage =
  localStorage.getItem("selectedlanguage") ||
  sessionStorage.getItem("selectedlanguage");
const initState = {
  isActivated: false,
  language: getCurrentLanguage(
      (selectedlanguage && JSON.parse(selectedlanguage).locale) ||
      "en"
  ),
};

export default function (state = initState, action) {
  switch (action.type) {
    case actions.ACTIVATE_LANG_MODAL:
      return {
        ...state,
        isActivated: !state.isActivated,
      };
    case actions.CHANGE_LANGUAGE:
      if (localStorage.getItem("remember_me")) {
        localStorage.setItem(
          "selectedlanguage",
          JSON.stringify(action.language)
        );
      } else {
        sessionStorage.setItem(
          "selectedlanguage",
          JSON.stringify(action.language)
        );
      }
      return {
        ...state,
        language: action.language,
      };
    default:
      return state;
  }
}
