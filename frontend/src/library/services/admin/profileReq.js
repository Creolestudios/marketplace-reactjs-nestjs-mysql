import { ServiceAuthInstance, apiUrl } from "../index";

export const viewUserProfile = (payload) => {
  return ServiceAuthInstance({
    method: "GET",
    url: apiUrl.VIEW_USER_PROFILE,
  });
};

export const saveUserProfile = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "PUT",
    url: apiUrl.SAVE_USER_PROFILE,
    data: payload,
  });
};

export const viewAllNotification = (payload) => {
  return ServiceAuthInstance({
    method: "GET",
    url: apiUrl.VIEW_NOTIFICATION,
  });
};

export const markReadNotification = (payload) => {
  return ServiceAuthInstance({
    method: "PATCH",
    url: apiUrl.MARK_NOTIFICATION,
    data: payload.type,
  });
};
