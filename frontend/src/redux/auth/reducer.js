import actions from "./actions";

const initState = {
  idToken: null,
  loggedInUser: null, // User's data - Role and Redirection check
  authFlag: false,
  profileObj: {},
  userReport: {
    daily_report: false,
    weekly_report: false,
  },
  userNotification: {
    direct_message: true,
    document_upload: false,
    app_download_from_link: false,
  },
  userNotificationList: [],
  IntID: null,
  signUpMessage: null,
  userEmail:null,
  loginMessage: null,
  verificationMessage:null,
  forgotMessage:null,
  resetForgotPasswordMessage: null,
  signup :"",
  userStatus:null,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.SIGNUP_SUCCESS:
      return {
        ...state,
         userEmail: action.email,
        signUpMessage: action.payload,
      };
      case actions.LOGIN_REQUEST:
        return {
          ...state,
         
          loginMessage: null
        };
        case actions.SIGNUP:
          return {
            ...state,
           
            signUpMessage: null,
          };
      case actions.SIGNUP_FAILER:
        return {
          ...state,
          // userEmail: action.email,
          signUpMessage:action.payload
        };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        idToken: action.token,
        authFlag: true,
        profileObj: action.userData,
      };
      case actions.GUEST_SUCCESS:
        return {
          ...state,
          idToken: action.token,
          authFlag: true,
        };
      case actions.VERIFICATION_SUCCESS:
      return {
        ...state,
        verificationMessage:action.payload
      };
    case actions.SAT_INTERVAL:
      return {
        ...state,
        IntID: action.payload,
      };

    case actions.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        userEmail: action.email,
        forgotMessage: action.payload,
      };
      case actions.FORGOT_PASSWORD_FAILER:
        return {
          ...state,
          forgotMessage: action.payload,
        };
        case actions.RESET_FORGOT_PASSWORD_FAILER:
          return {
            ...state,
            resetForgotPasswordMessage: action.payload,
          };
    case actions.CHECK_AUTHORIZATION:
      return {
        ...state,
        idToken: action.token,
      };
    case actions.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profileObj: action.payload,
      };
    case actions.SAVE_BIO_STATE:
      return {
        ...state,
        profileObj: {
          ...state.profileObj,
          bio: action.payload.bio,
          welcome_text: action.payload.welcome_text,
        },
      };
    case actions.SAVE_BIO_STATE:
      return {
        ...state,
        profileObj: {
          ...state.profileObj,
          bio: action.payload.bio,
          welcome_text: action.payload.welcome_text,
        },
      };
    case actions.SAVE_IMAGE_STATE:
      return {
        ...state,
        profileObj: {
          ...state.profileObj,
          profile_photo: action.payload.profile_photo,
        },
      };
    case actions.SAVE_LOGO_STATE:
      return {
        ...state,
        profileObj: {
          ...state.profileObj,
          logo: action.payload.logo,
        },
      };
    case actions.SAVE_LINKS_SUCCESS:
      return {
        ...state,
        profileObj: {
          ...state.profileObj,
          social_links: {
            ...action.links,
          },
        },
      };
    case actions.GET_REPORT_SUCCESS:
      return {
        ...state,
        userReport: action.payload,
      };
    case actions.CHANGE_REPORT_SUCCESS:
      return {
        ...state,
        userReport: action.payload,
      };
    case actions.GET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        userNotification: action.payload,
      };

    case actions.GET_NOTIFICATION_LISTING_SUCCESS:
      return {
        ...state,
        userNotificationList: action.payload,
      };
    case actions.CHANGE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        userNotification: action.payload,
      };
    case actions.NEMID_SUCCESS:
      return {
        ...state,
        nemId_data: action.payload,
        sub_nemId: action.payload.sub_nemid,
        nemId_verified: action.payload.verified,
      };
      case actions.LOGIN_ERROR:
        return {
          ...state,
          loginMessage:action.payload
        };

      case actions.CHECK_USER_STATUS:
        return {
          ...state,
          userStatus:action.payload
        };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
