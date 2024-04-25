const actions = {
  VIEW_TASK: "VIEW_TASK",
  VIEW_TASK_SUCCESS: "VIEW_TASK_SUCCESS",
  VIEW_TASK_DETAIL: "VIEW_TASK_DETAIL",
  VIEW_TASK_DETAIL_SUCCESS: "VIEW_TASK_DETAIL_SUCCESS",
  TASK_PROOFS: "TASK_PROOFS",
  TASK_PROOFS_SUCCESS: "TASK_PROOFS_SUCCESS",
  VIEW_REPORTED_TASK: "VIEW_REPORTED_TASK",
  VIEW_REPORTED_TASK_SUCCESS: "VIEW_REPORTED_TASK_SUCCESS",
  VIEW_REPORTED_TASK_DETAIL: "VIEW_REPORTED_TASK_DETAIL",
  VIEW_REPORTED_TASK_DETAIL_SUCCESS: "VIEW_REPORTED_TASK_DETAIL_SUCCESS",
  VIEW_PROOF: "VIEW_PROOF",
  VIEW_PROOF_SUCCESS: "VIEW_PROOF_SUCCESS",
  VIEW_PLACE_BID: "VIEW_PLACE_BID",
  VIEW_PLACE_BID_SUCCESS: "VIEW_PLACE_BID_SUCCESS",
  DISPUTE_SETTLE: "DISPUTE_SETTLE",
  DISPUTE_SETTLE_SUCCESS:"DISPUTE_SETTLE_SUCCESS",
  
  viewTask: (type, history, from) => ({
    type: actions.VIEW_TASK,
    payload: { type },
    history: history,
  }),
  viewTaskDetail: (type, history, from) => ({
    type: actions.VIEW_TASK_DETAIL,
    payload: { type },
    history: history,
  }),
  taskProofs: (type, history, from) => ({
    type: actions.TASK_PROOFS,
    payload: { type },
    history: history,
  }),
  viewReportedTask: (type, history, from) => ({
    type: actions.VIEW_REPORTED_TASK,
    payload: { type },
    history: history,
  }),
  viewReportedTaskDetail: (type, history, from) => ({
    type: actions.VIEW_REPORTED_TASK_DETAIL,
    payload: { type },
    history: history,
  }),
  viewProof: (type, history, from) => ({
    type: actions.VIEW_PROOF,
    payload: { type },
    history: history,
  }),
  viewPlaceBid: (type, history, from) => ({
    type: actions.VIEW_PLACE_BID,
    payload: { type },
    history: history,
  }),
  callDisputeSettle: (type, history, from) => ({
    type: actions.DISPUTE_SETTLE,
    payload: { type },
    history: history,
  }),
};
export default actions;
