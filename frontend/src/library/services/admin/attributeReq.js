import { ServiceAuthInstance, apiUrl } from "../index";
//view admin users
export const viewAllAttribute = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.VIEW_ATTRIBUTE,
    data: payload,
  });
};
//single user details
export const viewAttributeData = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.VIEW_ATTRIBUTE_DETAIL,
    data: payload,
  });
};

export const addAttributeData = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.ADD_ATTRIBUTE,
    data: payload,
  });
};
export const editAttributeData = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "PATCH",
    url: apiUrl.EDIT_ATTRIBUTE,
    data: payload,
  });
};
