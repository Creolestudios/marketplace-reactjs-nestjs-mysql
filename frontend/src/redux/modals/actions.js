const actions = {
  SET_MODAL_STATUS: "SET_MODAL_STATUS",

  setModalStatus: (payload) => ({
    type: actions.SET_MODAL_STATUS,
    payload: payload,
  }),
};
export default actions;
