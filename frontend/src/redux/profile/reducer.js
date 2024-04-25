import actions from "./actions";

const initState = {
  idWiseMyCategoryData: {},
  profile: {},
  categoriesData: [],
  error: "",
  specialist: {},
  employer: {},
  updateProfileSuccess: "",
  updateProfileFailed: "",
};

export default function Profile(state = initState, action) {
  switch (action.type) {
    case actions.GET_PROFILE_SUCCESS:
      const idWiseMyCategoryData = {};
      action.payload.categoriesData.forEach((data) => {
        idWiseMyCategoryData[data.parentCategoryData.id] = data.subCategoryData;
      });

      return {
        ...state,
        ...action.payload,
        idWiseMyCategoryData,
      };
    case actions.GET_PROFILE_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    case actions.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileSuccess: action.payload,
        updateProfileFailed: "",
      };
    case actions.UPDATE_PROFILE_FAILED:
      return {
        ...state,
        updateProfileFailed: action.payload,
        updateProfileSuccess: "",
      };
    case actions.CLEAR_RESPONSE_MESSAGE:
      return {
        ...state,
        updateProfileFailed: "",
        updateProfileSuccess: "",
      };
    default:
      return state;
  }
}
