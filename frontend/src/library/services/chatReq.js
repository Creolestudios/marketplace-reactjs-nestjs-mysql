import { ServiceAuthInstance, apiUrl } from "./index";
//view admin users
export const viewChatListingHistory = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.CHAT_HISTORY_LISTING,
    data: payload,
  });
};
export const viewChatHistory = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.CHAT_HISTORY,
    data: payload,
  });
};
export const chatMsgRead = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "PATCH",
    url: apiUrl.CHAT_READ,
    data: payload,
  });
};
export const viewMediaHistory = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.MEDIA_HISTORY,
    data: payload,
  });
};

export const deleteChat = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "PATCH",
    url: apiUrl.DELETE_CHAT,
    data: payload,
  });
};
export const viewChatListingHistoryAdmin = (payload) => {
  payload = payload.type;
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.CHAT_HISTORY_LISTING_ADMIN,
    data: payload,
  });
};
