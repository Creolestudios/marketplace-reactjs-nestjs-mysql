import { ServiceAuthInstance, apiUrl } from "../index";
//view admin tasks
export const viewAllTask = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.VIEW_TASK,
    data: payload,
  });
};
//single task details
export const viewTaskData = (payload) => {
  let id = payload.type.task_id;
  return ServiceAuthInstance({
    method: "GET",
    url: `${apiUrl.VIEW_TASK_DETAIL}/${id}`,
  });
};
//task proof detail
export const getTaskProofs = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.TASK_PROOFS,
    data: payload,
  });
};
//view admin reported tasks
export const viewAllReportedTasks = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.VIEW_REPORTED_TASK,
    data: payload,
  });
};

export const viewReportedTaskData = (payload) => {
  let id = payload.type.task_id;
  return ServiceAuthInstance({
    method: "GET",
    url: `${apiUrl.VIEW_TASK_DETAIL}/${id}`,
    data: { reported_task: 1 },
  });
};

export const viewProofData = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.VIEW_PROOF,
    data: payload,
  });
};
export const viewPlaceBidData = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.VIEW_PLACE_BID,
    data: payload,
  });
};
export const disputeSettle = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.DISPUTE_SETTLE_API,
    data: payload,
  });
};