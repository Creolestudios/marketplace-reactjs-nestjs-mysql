import { ServiceInstance, ServiceAuthInstance, apiUrl } from "./index";

//get all cards
export const getMyCard = (payload) => {
  return ServiceAuthInstance({
    method: "GET",
    url: apiUrl.LIST_CARD,
  });
};

//add new card
export const addNewCard = (payload) => {
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.ADD_NEW_CARD,
    data: payload,
  });
};

//Delete card
export const deleteCard = (payload) => {
  return ServiceAuthInstance({
    method: "DELETE",
    url: apiUrl.DELETE_CARD,
    data: payload,
  });
};

//defaultCard
export const defaultCard = (payload) => {
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.DEFAULT_CARD,
    data: payload,
  });
};