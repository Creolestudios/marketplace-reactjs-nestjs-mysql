import { ServiceInstance, ServiceAuthInstance, apiUrl } from "./index";
//create Task
export const task = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.CREATE_TASK,

    data: payload,
  });
};
//get task My task
export const allTask = (payload) => {
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.MY_TASK,
    data: payload,
  });
};
//single task details
export const singleTaskDetials = (payload) => {
  let userType = payload.type.user_type;
  let id = payload.type.task_id;
  return ServiceAuthInstance({
    method: "GET",
    url: sessionStorage.getItem("is_guest") ? `/tasks/guest/task-detail/${id}` :`${apiUrl.SINGLE_TASK}${userType}/${id}`,
  });
};
//single task Bid details
export const singleTaskBids = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.SINGLE_BID,
    data: payload,
  });
};
//cancel task

export const taskActionRequest = (payload) => {
  return ServiceAuthInstance({
    method: "POST",
    url:
      payload.actionType === "cancel"
        ? apiUrl.CANCEL_TASK
        : payload.actionType === "report"
        ? apiUrl.REPORT_TASK
        : payload.actionType === "complete" && apiUrl.COMPLETE_TASK,
    data: payload.formData,
  });
};

//bidRequest
export const bidRequest = (payload) => {
  payload = payload.type;

  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.PLACE_BID,
    data: payload,
  });
};

//reported task

//review task
export const reviewTask = (payload) => {
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.REVIEW_TASK,
    data: payload,
  });
};
//review task

export const findTask = (payload) => {
  payload = payload.type;

  return ServiceAuthInstance({
    method: "POST",
    url: sessionStorage.getItem("is_guest") ? '/tasks/guest/find': apiUrl.FIND_TASK,
    data: payload,
  });
};

//findSpecialist
export const findSpecialist = (payload) => {
  return ServiceAuthInstance({
    method: "POST",
    url: sessionStorage.getItem("is_guest") ? '/users/guest/specialists' :apiUrl.FIND_SPECIALIST,
    data: payload,
  });
};
//getInvitedReq
export const getInvitedReq = () => {
  return ServiceAuthInstance({
    method: "GET",
    url: apiUrl.GET_INVITED,
  });
};
//acceptAndRejectReq

export const acceptAndRejectReq = (payload) => {
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.ACCEPT_REJECT,
    data: payload,
  });
};

// inviteTaskSpecialist
export const inviteTaskSpecialist = (payload) => {
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.INVITE_TASK_TO_SPECIALIST,
    data: payload,
  });
};

export const taskAcceptRejectFunc = (payload) => {
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.TASK_ACCEPT_REJECT,
    data: payload.formData,
  });
};
export const getCheckoutBidDetailFunc = (payload) => {
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.CHECKOUT_BID_DETAIL,
    data: payload,
  });
};
//report Profile
export const reportProfileReq = (payload) => {
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.REPORT_PROFILE,
    data: payload,
  });
};
