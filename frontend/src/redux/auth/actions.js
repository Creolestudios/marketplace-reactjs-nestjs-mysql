const actions = {
  CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
  CHECK_USER_STATUS: "CHECK_USER_STATUS",
  LOGIN_REQUEST: "LOGIN_REQUEST",
  GUEST_REQUEST: "GUEST_REQUEST",
  LOGOUT: "LOGOUT",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  GUEST_SUCCESS: "GUEST_SUCCESS",
  GUEST_FAILED: "GUEST_FAILED",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGIN_WITH_OTHER: "LOGIN_WITH_OTHER",
  SIGNUP: "SIGNUP",
  VERIFICATION: "VERIFICATION",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNUP_FAILER : "SIGNUP_FAILER",
  VERIFICATION_SUCCESS: "VERIFICATION_SUCCESS",
  RESET_PASSWORD: "RESET_PASSWORD",
  RESET_FORGOT_PASSWORD: "RESET_FORGOT_PASSWORD",
  VERIFY_ACCOUNT_LINK: "VERIFY_ACCOUNT_LINK",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  CHANGE_PASSWORD_SUCCESS: "CHANGE_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAILER: "FORGOT_PASSWORD_FAILER",
  CHANGE_REPORT: "CHANGE_REPORT",
  CHANGE_REPORT_SUCCESS: "CHANGE_REPORT_SUCCESS",
  RESET_FORGOT_PASSWORD_FAILER:"RESET_FORGOT_PASSWORD_FAILER",
  GET_REPORT: "GET_REPORT",
  GET_REPORT_SUCCESS: "GET_REPORT_SUCCESS",

  GET_NOTIFICATION: "GET_NOTIFICATION",
  GET_NOTIFICATION_SUCCESS: "GET_NOTIFICATION_SUCCESS",

  GET_NOTIFICATION_LISTING: "GET_NOTIFICATION_LISTING",
  GET_NOTIFICATION_LISTING_SUCCESS: "GET_NOTIFICATION_LISTING_SUCCESS",

  CHANGE_NOTIFICATION: "CHANGE_NOTIFICATION",
  CHANGE_NOTIFICATION_SUCCESS: "CHANGE_NOTIFICATION_SUCCESS",

  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  RESEND: "RESEND",
  SAVE_PROFILE: "SAVE_PROFILE",
  GET_PROFILE: "GET_PROFILE",
  GET_PROFILE_SUCCESS: "GET_PROFILE_SUCCESS",
  SAVE_BIO: "SAVE_BIO",
  SAVE_BIO_STATE: "SAVE_BIO_STATE",
  SAVE_LINKS: "SAVE_LINKS",
  SAVE_LINKS_SUCCESS: "SAVE_LINK_SUCCESS",
  SAVE_IMAGE: "SAVE_IMAGE",
  SAVE_IMAGE_STATE: "SAVE_IMAGE_STATE",
  SAVE_LOGO: "SAVE_LOGO",
  SAVE_LOGO_STATE: "SAVE_LOGO_STATE",

  SAT_INTERVAL: "SAT_INTERVAL",
  GOOGLE_LOGIN: "GOOGLE_LOGIN",
  FACEBOOK_LOGIN: "FACEBOOK_LOGIN",
  NEMID_LOGIN: "NEMID_LOGIN",
  NEMID_SUCCESS: "NEMID_SUCCESS",
  checkAuthorization: () => {
    return { type: actions.CHECK_AUTHORIZATION };
  },
  checkUserStatus: (payload) => {
    return {type: actions.CHECK_USER_STATUS,payload:payload}
  },
  login: (type, history, from) => ({
    type: actions.LOGIN_REQUEST,
    payload: { type },
    history: history,
    from: from,
  }),
  googleLogin: (type, history, from) => ({
    type: actions.GOOGLE_LOGIN,
    payload: { type },
    history: history,
  }),
  facebookLogin: (type, history, from) => ({
    type: actions.FACEBOOK_LOGIN,
    payload: { type },
    history: history,
  }),
  logout: (type, history) => ({
    type: actions.LOGOUT,
    payload: { type },
    history: history,
  }),
  signup: (type, history) => ({
    type: actions.SIGNUP,
    payload: { type },
    history: history,
  }),
  verify: (type, history) => ({
    type: actions.VERIFICATION,
    payload: { type },
    history: history,
  }),
  resend: (type) => ({
    type: actions.RESEND,
    payload: { type },
  }),
  nemIdLogin: (type, history) => ({
    type: actions.NEMID_LOGIN,
    payload: { type },
    history: history,
  }),
  forgotPassword: (type, history) => ({
    type: actions.FORGOT_PASSWORD,
    payload: type,
    history: history,
  }),
  changePassword: (type) => ({
    type: actions.CHANGE_PASSWORD,
    payload: type,
  }),
  changeReport: (type) => ({
    type: actions.CHANGE_REPORT,
    payload: type,
  }),
  getReport: (type) => ({
    type: actions.GET_REPORT,
  }),
  changeNotification: (type) => ({
    type: actions.CHANGE_NOTIFICATION,
    payload: type,
  }),
  getNotification: (type) => ({
    type: actions.GET_NOTIFICATION,
  }),
  getNotificationListing: (type) => ({
    type: actions.GET_NOTIFICATION_LISTING,
  }),
  resetPassword: (type, history) => ({
    type: actions.RESET_PASSWORD,
    payload: type,
    history: history,
  }),

  resetForgotPassword: (type, history) => ({
    type: actions.RESET_FORGOT_PASSWORD,
    payload: type,
    history: history,
  }),

  verifyAccountLink: (type, history) => ({
    type: actions.VERIFY_ACCOUNT_LINK,
    payload: type,
    history: history,
  }),

  setIntID: (type) => ({
    type: actions.SAT_INTERVAL,
    payload: type,
  }),

  saveProfile: (type) => ({
    type: actions.SAVE_PROFILE,
    payload: type,
  }),
  getProfile: () => ({
    type: actions.GET_PROFILE,
  }),
  saveBio: (type) => ({
    type: actions.SAVE_BIO,
    payload: type,
  }),
  saveLinks: (type) => ({
    type: actions.SAVE_LINKS,
    payload: type,
  }),
  saveImage: (type) => ({
    type: actions.SAVE_IMAGE,
    payload: type,
  }),
  saveLogo: (type) => ({
    type: actions.SAVE_LOGO,
    payload: type,
  }),
  guest: (type, history, from) => ({
    type: actions.GUEST_REQUEST,
    payload: { type },
    history: history,
    from: from,
  }),
};
export default actions;
