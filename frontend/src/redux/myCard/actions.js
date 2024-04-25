const actions = {
  LIST_CARD: "LIST_CARD",
  LIST_CARD_SUCCESS: "LIST_CARD_SUCCESS",
  ADD_NEW_CARD: "ADD_NEW_CARD",
  ADD_NEW_CARD_SUCCESSS: "ADD_NEW_CARD_SUCCESSS",
  ADD_NEW_CARD_FAIL: "ADD_NEW_CARD_FAIL",
  LIST_CARD_SUCCESS: "LIST_CARD_SUCCESS",
  ACCEPT_REJECT_BID: "ACCEPT_REJECT_BID",
  DELETE_CARD: "DELETE_CARD",
  DELETE_CARD_SUCCESS: "DELETE_CARD_SUCCESS",
  DELETE_CARD_FAIL: "DELETE_CARD_FAIL",
  CLEAR_CARD_MESSAGE: "CLEAR_CARD_MESSAGE",
  SET_DEFAULT_CARD : "SET_DEFAULT_CARD",
  DEFAULT_CARD_SUCCESS : "DEFAULT_CARD_SUCCESS",
  addCard: (data) => ({
    type: actions.ADD_NEW_CARD,
    payload: data,
  }),
  listCard: () => ({
    type: actions.LIST_CARD,
  }),
  deleteSavedCard: (payload) => ({
    type: actions.DELETE_CARD,
    payload: payload,
  }),
  setDefaultCard: (payload) => ({
    type: actions.SET_DEFAULT_CARD,
    payload: payload,
  }),
  clearCardResponse: () => ({
    type: actions.CLEAR_CARD_MESSAGE,
  }),
};
export default actions;
