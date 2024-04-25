import actions from "./actions";

const initState = {
  addServiceModal: false,
  addMediaModal: false,
};

export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.SET_MODAL_STATUS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
