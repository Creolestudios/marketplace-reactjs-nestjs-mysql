import { ServiceAuthInstance, apiUrl } from "./index";

// get profile data request sent after login and session
export const getProfileReq = (payload) => {
  return ServiceAuthInstance({
    method: "GET",
    url: sessionStorage.getItem("is_guest") ? `/users/guest/profile/${payload}` : `${apiUrl.USER_PROFILE}/${payload}`,
  });
};

export const updateProfileReq = (payload) => {
  return ServiceAuthInstance({
    method: "PATCH",
    url: apiUrl.UPDATE_PROFILE,
    data: payload,
  });
};
