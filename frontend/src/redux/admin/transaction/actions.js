const actions = {
    VIEW_TRANSACTION: "VIEW_TRANSACTION",
    VIEW_TRANSACTION_SUCCESS: "VIEW_TRANSACTION_SUCCESS",
    VIEW_TRANSACTION_DETAIL: "VIEW_TRANSACTION_DETAIL",
    VIEW_TRANSACTION_DETAIL_SUCCESS: "VIEW_TRANSACTION_DETAIL_SUCCESS",
  
    viewTransaction: (type, history, from) => ({
      type: actions.VIEW_TRANSACTION,
      payload: { type },
      history: history,
    }),
    viewTransactionDetail: (type, history, from) => ({
      type: actions.VIEW_TRANSACTION_DETAIL,
      payload: { type },
      history: history,
    }),
  };
  export default actions;
  