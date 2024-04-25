const actions = {
  VIEW_CHAT_LISTING: "VIEW_CHAT_LISTING",
  VIEW_CHAT_LISTING_SUCCESS: "VIEW_CHAT_LISTING_SUCCESS",
  VIEW_CHAT: "VIEW_CHAT",
  VIEW_CHAT_SUCCESS: "VIEW_CHAT_SUCCESS",
  VIEW_CHAT_READ: "VIEW_CHAT_READ",
  VIEW_CHAT_READ_SUCCESS: "VIEW_CHAT_READ_SUCCESS",
  VIEW_MEDIA: "VIEW_MEDIA",
  VIEW_MEDIA_SUCCESS: "VIEW_MEDIA_SUCCESS",
  DELETE_CHAT: "DELETE_CHAT",
  DELETE_CHAT_SUCCESS: "DELETE_CHAT_SUCCESS",
  VIEW_CHAT_LISTING_ADMIN: "VIEW_CHAT_LISTING_ADMIN",
  VIEW_CHAT_LISTING_ADMIN_SUCCESS: "VIEW_CHAT_LISTING_ADMIN_SUCCESS",

  chatListingHistory: (type, history, from) => ({
    type: actions.VIEW_CHAT_LISTING,
    payload: { type },
    history: history,
  }),
  chatHistory: (type, history, from) => ({
    type: actions.VIEW_CHAT,
    payload: { type },
    history: history,
  }),
  chatRead: (type, history, from) => ({
    type: actions.VIEW_CHAT_READ,
    payload: { type },
    history: history,
  }),
  mediaHistory: (type, history, from) => ({
    type: actions.VIEW_MEDIA,
    payload: { type },
    history: history,
  }),

  deleteChatData: (type, history, from) => ({
    type: actions.DELETE_CHAT,
    payload: { type },
    history: history,
  }),
  chatListingAdminHistory: (type, history, from) => ({
    type: actions.VIEW_CHAT_LISTING_ADMIN,
    payload: { type },
    history: history,
  }),
};
export default actions;
