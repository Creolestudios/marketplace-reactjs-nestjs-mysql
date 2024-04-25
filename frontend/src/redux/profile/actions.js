const actions = {
  GET_PROFILE_REQUEST: "GET_PROFILE_REQUEST",
  GET_PROFILE_SUCCESS: "GET_PROFILE_SUCCESS",
  GET_PROFILE_FAILED: "GET_PROFILE_FAILED",
  UPDATE_PROFILE: "UPDATE_PROFILE",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_FAILED: "UPDATE_PROFILE_FAILED",
  CLEAR_RESPONSE_MESSAGE: "CLEAR_RESPONSE_MESSAGE",
  getProfile: (payload) => ({
    type: actions.GET_PROFILE_REQUEST,
    payload,
  }),
  updateProfile: (payload, user_id) => ({
    type: actions.UPDATE_PROFILE,
    payload: payload,
    user_id: user_id,
  }),
  clearResponseMessages: () => ({
    type: actions.CLEAR_RESPONSE_MESSAGE,
  }),
};
export default actions;
