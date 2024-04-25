import actions from "./actions";

const initState = {
  viewTransactionData: {},
  viewTransactionDetailData: {},
};

export default function adminTransactionReducer(state = initState, action) {
  switch (action.type) {
    case actions.VIEW_TRANSACTION_SUCCESS:
      return {
        ...state,
        viewTransactionData: action.data,
      };
    case actions.VIEW_TRANSACTION_DETAIL_SUCCESS:
      return {
        ...state,
        viewTransactionDetailData: action.data,
      };

    default:
      return state;
  }
}
