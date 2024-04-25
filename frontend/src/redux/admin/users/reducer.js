import actions from "./actions";

const initState = {
  viewUserData: {},
  viewUserDetailData: {},
  suspendUserRes: {},
  activateUserRes:{},
  viewReportedProfileData: {},
  userHistoryData:{}
};

export default function adminUserReducer(state = initState, action) {
  switch (action.type) {
    case actions.VIEW_USER_SUCCESS:
      return {
        ...state,
        viewUserData: action.data,
      };
    case actions.VIEW_USER_DETAIL_SUCCESS:
      return {
        ...state,
        viewUserDetailData: action.data,
      };
      case actions.USER_REPORTED_HISTORY_SUCCESS:
        return {
          ...state,
          userHistoryData: action.data,
        };  
    case actions.SUSPEND_USER_SUCCESS:
      return {
        ...state,
        suspendUserRes: action.data,
      };
      case actions.ACTIVATE_USER_SUCCESS:
        return {
          ...state,
          activateUserRes: action.data,
        };

    case actions.VIEW_REPORTED_PROFILE_SUCCESS:
      return {
        ...state,
        viewReportedProfileData: action.data,
      };

    default:
      return state;
  }
}