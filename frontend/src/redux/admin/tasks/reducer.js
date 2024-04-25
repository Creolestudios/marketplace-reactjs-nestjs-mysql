import actions from "./actions";

const initState = {
  viewTaskData: {},
  viewTaskDetailData: {},
  taskProofData: {},
  getCategoryData: {},
  viewReportedTaskData: {},
  viewReportedTaskDetailData: {},
  viewProofData: {},
  placeBidData: {},
};

export default function adminTaskReducer(state = initState, action) {
  switch (action.type) {
    case actions.VIEW_TASK_SUCCESS:
      return {
        ...state,
        viewTaskData: action.data,
      };
    case actions.VIEW_TASK_DETAIL_SUCCESS:
      return {
        ...state,
        viewTaskDetailData: action.data,
      };
    case actions.TASK_PROOFS_SUCCESS:
      return {
        ...state,
        taskProofData: action.data,
      };
    case actions.VIEW_REPORTED_TASK_SUCCESS:
      return {
        ...state,
        viewReportedTaskData: action.data,
      };
    case actions.VIEW_REPORTED_TASK_DETAIL_SUCCESS:
      return {
        ...state,
        viewReportedTaskDetailData: action.data,
      };
    case actions.VIEW_PROOF_SUCCESS:
      return {
        ...state,
        viewProofData: action.data,
      };
    case actions.VIEW_PLACE_BID_SUCCESS:
      return {
        ...state,
        placeBidData: action.data,
      };
    default:
      return state;
  }
}
