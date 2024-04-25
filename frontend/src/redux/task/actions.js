const actions = {
  GET_TASK: "GET_TASK",
  GET_TASK_SUCCESS: "GET_TASK_SUCCESS",
  CREATE_TASK: "CREATE_TASK",
  SINGLE_TASK_DETAILS: "SINGLE_TASK_DETAILS",
  SINGLE_TASK_SUCCESS: "SINGLE_TASK_SUCCESS",
  BID_DETAILS: "BID_DETAILS",
  SINGLE_BID_SUCCESS: "SINGLE_BID_SUCCESS",
  TASK_ACTION: "TASK_ACTION",
  TASK_ACTION_SUCCESS: "TASK_ACTION_SUCCESS",
  TASK_ACTION_FAILED: "TASK_ACTION_FAILED",

  REVIEW_TASK: "REVIEW_TASK",
  REVIEW_TASK_SUCCESS: "REVIEW_TASK_SUCCESS",
  REVIEW_TASK_FAILED: "REVIEW_TASK_FAILED",
  FIND_TASK: "FIND_TASK",
  FIND_TASK_SUCCESS: "FIND_TASK_SUCCESS",
  PLACE_BID: "PLACE_BID",
  PLACE_BID_FAILED : "PLACE_BID_FAILED",
  PLACE_BID_SUCCESS : "PLACE_BID_SUCCESS",
  GET_SPECIALIST_LIST: "GET_SPECIALIST_LIST",
  GET_SPECIALIST_SUCCESS: "GET_SPECIALIST_SUCCESS",
  GET_TITLE_VALUE: "GET_TITLE_VALUE",
  GET_INVITED: "GET_INVITED",
  GET_INVITED_SUCCESS: "GET_INVITED_SUCCESS",
  ACCEPT_REJECT_BID: "ACCEPT_REJECT_BID",
  ACCEPT_REJECT_BID_SUCCESS: "ACCEPT_REJECT_BID_SUCCESS",
  ACCEPT_REJECT_BID_FAILED: "ACCEPT_REJECT_BID_FAILED",
  INVITE_TASK_TO_SPECIALIST: "INVITE_TASK_TO_SPECIALIST",
  INVITE_TASK_TO_SPECIALIST_SUCCESS: "INVITE_TASK_TO_SPECIALIST_SUCCESS",
  INVITE_TASK_TO_SPECIALIST_FAILED: "INVITE_TASK_TO_SPECIALIST_FAILED",
  CLEAR_MESSAGES: "CLEAR_MESSAGES",
  TASK_ACCEPT_REJECT: "TASK_ACCEPT_REJECT",
  TASK_ACCEPT_REJECT_SUCCESS:"TASK_ACCEPT_REJECT_SUCCESS",
  TASK_ACCEPT_REJECT_FAILED: "TASK_ACCEPT_REJECT_FAILED",

  CHECKOUT_BID_DETAIL:"CHECKOUT_BID_DETAIL",
  CHECKOUT_BID_DETAIL_SUCCESS: "CHECKOUT_BID_DETAIL_SUCCESS",
  CHECKOUT_BID_DETAIL_FAILED: "CHECKOUT_BID_DETAIL_FAILED",
  
  REPORT_PROFILE : "REPORT_PROFILE",
  REPORT_PROFILE_SUCCESS: "REPORT_PROFILE_SUCCESS",
  REPORT_PROFILE_FAILER : "REPORT_PROFILE_FAILER",
  clearMessages: () => ({
    type: actions.CLEAR_MESSAGES,
  }),
  getTask: (type, history, from) => ({
    type: actions.GET_TASK,
    payload: type,
    history: history,
  }),
  createTask: (type, history, from) => ({
    type: actions.CREATE_TASK,
    payload: { type },
    history: history,
  }),
  placeBid: (type, history, from) => ({
    type: actions.PLACE_BID,
    payload: { type },
    history: history,
  }),

  reviewTask: (type, history, from) => ({
    type: actions.REVIEW_TASK,
    payload: type,
    history: history,
  }),
  reportProfile: (type, history, from) => ({
    type: actions.REPORT_PROFILE,
    payload: type,
    history: history,
  }),
  taskAction: (type, formData, history, from) => ({
    type: actions.TASK_ACTION,
    payload: { type, actionType: type.actionType, formData },
    history: history,
  }),

  singleTaskDetails: (type, history, from) => ({
    type: actions.SINGLE_TASK_DETAILS,
    payload: { type },
    history: history,
  }),
  bidDetails: (type, history, from) => ({
    type: actions.BID_DETAILS,
    payload: { type },
    history: history,
  }),
  findTask: (type, history, from) => ({
    type: actions.FIND_TASK,
    payload: { type },
    history: history,
  }),
  getSpecialist: (data, history, from) => ({
    type: actions.GET_SPECIALIST_LIST,
    payload: data,
    history: history,
  }),
  getTitleValue: (data, history) => ({
    type: actions.GET_TITLE_VALUE,
    payload: data,
    history: history,
  }),
  getInvitedTask: (data, history) => ({
    type: actions.GET_INVITED,
    payload: data,
    history: history,
  }),
  acceptRejectBid: (data, history) => ({
    type: actions.ACCEPT_REJECT_BID,
    payload: data,
    history: history,
  }),
  inviteTaskToSpecialist: (data) => ({
    type: actions.INVITE_TASK_TO_SPECIALIST,
    payload: data,
  }),

  taskAcceptReject: (type, formData, history,) => ({
    type: actions.TASK_ACCEPT_REJECT,
    payload: { type, actionType: type.task_action, formData },
    history: history,
  }),
  getCheckoutBidDetail: (data, history) => ({
    type: actions.CHECKOUT_BID_DETAIL,
    payload: data,
    history: history,
  }),
};
export default actions;
