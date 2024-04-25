import actions from "./actions";

const initState = {
  chatData: {},
  chatMessages: {},
  chatMessagesRead:{},
  chatMedia: {},
  deleteChatRes: {},
  chatDataAdmin: {},
};

export default function chatReducer(state = initState, action) {
  switch (action.type) {
    case actions.VIEW_CHAT_LISTING_SUCCESS:
      return {
        ...state,
        chatData: action.data,
      };
    case actions.VIEW_CHAT_SUCCESS:
      return {
        ...state,
        chatMessages: action.data,
      };
      case actions.VIEW_CHAT_READ_SUCCESS:
        return {
          ...state,
          chatMessagesRead: action.data,
        };
    case actions.VIEW_MEDIA_SUCCESS:
      return {
        ...state,
        chatMedia: action.data,
      };
    case actions.DELETE_CHAT_SUCCESS:
      return {
        ...state,
        deleteChatRes: action.data,
      };
    case actions.VIEW_CHAT_LISTING_ADMIN_SUCCESS:
      return {
        ...state,
        chatDataAdmin: action.data,
      };
    default:
      return state;
  }
}
