const actions = {
  VIEW_USER: "VIEW_USER",
  VIEW_USER_SUCCESS: "VIEW_USER_SUCCESS",
  VIEW_USER_DETAIL: "VIEW_USER_DETAIL",
  VIEW_USER_DETAIL_SUCCESS: "VIEW_USER_DETAIL_SUCCESS",
  SUSPEND_USER: "SUSPEND_USER",
  ACTIVATE_USER: "ACTIVATE_USER",
  SUSPEND_USER_SUCCESS: "SUSPEND_USER_SUCCESS",
  ACTIVATE_USER_SUCCESS: "ACTIVATE_USER_SUCCESS",
  VIEW_REPORTED_PROFILE: "VIEW_REPORTED_PROFILE",
  VIEW_REPORTED_PROFILE_SUCCESS: "VIEW_REPORTED_PROFILE_SUCCESS",
  REMOVE_REPORTED_PROFILE: "REMOVE_REPORTED_PROFILE",
  REMOVE_REPORTED_PROFILE_SUCCESS: "REMOVE_REPORTED_PROFILE_SUCCESS",
  USER_REPORTED_HISTORY: "USER_REPORTED_HISTORY",
  USER_REPORTED_HISTORY_SUCCESS:"USER_REPORTED_HISTORY_SUCCESS",

  viewUser: (type, history, from) => ({
    type: actions.VIEW_USER,
    payload: { type },
    history: history,
  }),
  viewUserDetail: (type, history, from) => ({
    type: actions.VIEW_USER_DETAIL,
    payload: { type },
    history: history,
  }),
  userReportedHistory: (type, history, from) => ({
    type: actions.USER_REPORTED_HISTORY,
    payload: { type },
    history: history,
  }),
  suspendUser: (type, history, from) => ({
    type: actions.SUSPEND_USER,
    payload: { type },
    history: history,
  }),
  activateUser: (type, history, from) => ({
    type: actions.ACTIVATE_USER,
    payload: { type },
    history: history,
  }),

  viewReportedProfile: (type, history, from) => ({
    type: actions.VIEW_REPORTED_PROFILE,
    payload: { type },
    history: history,
  }),

  removeReportedProfile: (type, history, from) => ({
    type: actions.REMOVE_REPORTED_PROFILE,
    payload: { type },
    history: history,
  }),
};
export default actions;