import { ServiceAuthInstance, apiUrl } from "../index";
//view admin users
export const viewAllUser = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.VIEW_USER,
    data: payload,
  });
};
//single user details
export const viewUserData = (payload) => {
  let id = payload.type.user_id;
  return ServiceAuthInstance({
    method: "GET",
    url: `${apiUrl.VIEW_USER_DETAIL}/${id}`,
  });
};
//userReportedHistoryData
export const userReportedHistoryData = (payload) => {
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.REPORTED_HISTORY,
    data: payload,
  });
};
export const suspendUserCall = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.SUSPEND_USER,
    data: payload,
  });
};

export const activateUserCall = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.ACTIVATE_USER,
    data: payload,
  });
};

export const viewReportProfile = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.VIEW_REPORTED_PROFILE,
    data: payload,
  });
};

//removeReportProfile
export const removeReportProfile = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "PATCH",
    url: apiUrl.REMOVE_REPORTED_PROFILE,
    data: payload,
  });
};