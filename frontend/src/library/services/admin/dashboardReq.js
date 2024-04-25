import { ServiceAuthInstance, apiUrl } from "../index";
//view admin users
export const viewAllDashbaord = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.VIEW_DASHBOARD,
    data: payload,
  });
};
