import { ServiceAuthInstance, apiUrl } from "../index";
//view admin users
export const viewAllTransaction = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.VIEW_TRANSACTION,
    data: payload,
  });
};
//single user details
export const viewTransactionData = (payload) => {
  let id = payload.type.user_id;
  return ServiceAuthInstance({
    method: "GET",
    url: `${apiUrl.VIEW_TRANSACTION_DETAIL}/${id}`,
  });
};

