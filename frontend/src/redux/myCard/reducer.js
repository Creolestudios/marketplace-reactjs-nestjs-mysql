import actions from "./actions";

const initState = {
  cardDetails: [],
  cardAdded: false,
  cardAddedResponse: {},
  addCardSuccessMessage: "",
  addCardFailedMessage: "",
  deleteCardSuccessMessage: "",
  deleteCardFailedMessage: "",
};

export default function cardReducer(state = initState, action) {
  switch (action.type) {
    case actions.LIST_CARD_SUCCESS:
      return {
        ...state,
        cardDetails: action.data.cardDetails,
      };
    case actions.DELETE_CARD_SUCCESS:
      return {
        ...state,
        deleteCardSuccessMessage: action.data,
        deleteCardFailedMessage: "",
      };
    case actions.DELETE_CARD_FAIL:
      return {
        ...state,
        deleteCardFailedMessage: action.data,
        deleteCardSuccessMessage: "",
      };
    case actions.ADD_NEW_CARD_SUCCESSS: {
      return {
        ...state,
        cardAdded: true,
        cardAddedResponse:action.data,
        addCardSuccessMessage: action.data.message,
        addCardFailedMessage: "",
      };
    }
    case actions.ADD_NEW_CARD_FAIL: {
      return {
        ...state,
        cardAdded: false,
        cardAddedResponse:{},
        addCardFailedMessage: action.data,
        addCardSuccessMessage: "",
      };
    }

    case actions.CLEAR_CARD_MESSAGE: {
      return {
        ...state,
        cardAdded: false,
        addCardSuccessMessage: "",
        addCardFailedMessage: "",
        deleteCardSuccessMessage: "",
        deleteCardFailedMessage: "",
      };
    }
    default:
      return state;
  }
}
