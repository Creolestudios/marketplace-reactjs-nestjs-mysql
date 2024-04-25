import { all, takeEvery, put, fork, call, select } from "redux-saga/effects";
import { message, notification } from "antd";
import { viewChatListingHistory,viewChatHistory,chatMsgRead, viewMediaHistory, deleteChat, viewChatListingHistoryAdmin } from "../../library/services/chatReq";
import actions from "./actions";
export const getUserstatus = (state) => state.Auth.userStatus

export function* chatListingHistory() {
  yield takeEvery(actions.VIEW_CHAT_LISTING, function* ({ payload }) {
    
    try {
      let userStatus=yield select(getUserstatus)
      if(userStatus ===1){
      const response = yield call(viewChatListingHistory, payload);
      if (response.status) {
        yield put({
          type: actions.VIEW_CHAT_LISTING_SUCCESS,
          data: response.data.data,
        });
      }
    }
    } catch (error) {
      message.error(error?.data?.error);
      console.log("error", error);
    }
  });
}
export function* chatHistory() {
  yield takeEvery(actions.VIEW_CHAT, function* ({ payload }) {
    try {
      const response = yield call(viewChatHistory, payload);
      if (response.status) {
        yield put({
          type: actions.VIEW_CHAT_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.error);
      console.log("error", error);
    }
  });
}
export function* chatRead() {
  yield takeEvery(actions.VIEW_CHAT_READ, function* ({ payload }) {
    try {
      const response = yield call(chatMsgRead, payload);
      if (response.status) {
        yield put({
          type: actions.VIEW_CHAT_READ_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.error);
      console.log("error", error);
    }
  });
}
export function* mediaHistory() {
    yield takeEvery(actions.VIEW_MEDIA, function* ({ payload }) {
      try {
        const response = yield call(viewMediaHistory, payload);
        if (response.status) {
          yield put({
            type: actions.VIEW_MEDIA_SUCCESS,
            data: response.data.data,
          });
        }
      } catch (error) {
        message.error(error.data.error);
        console.log("error", error);
      }
    });
  }

  export function* deleteChatData() {
    yield takeEvery(actions.DELETE_CHAT, function* ({ payload }) {
      try {
        const response = yield call(deleteChat, payload);
        if (response.status) {
          yield put({
            type: actions.DELETE_CHAT_SUCCESS,
            data: response.data.data,
          });
        }
      } catch (error) {
        message.error(error.data.error);
        console.log("error", error);
      }
    });
  }

  export function* chatListingAdminHistory() {
    yield takeEvery(actions.VIEW_CHAT_LISTING_ADMIN, function* ({ payload }) {
      try {
        const response = yield call(viewChatListingHistoryAdmin, payload);
        if (response.status) {
          yield put({
            type: actions.VIEW_CHAT_LISTING_ADMIN_SUCCESS,
            data: response.data.data,
          });
        }
      } catch (error) {
        message.error(error.data.error);
        console.log("error", error);
      }
    });
  }
export default function* rootSaga() {
  yield all([fork(chatListingHistory), fork(chatHistory), fork(chatRead), fork(mediaHistory), fork(deleteChatData), fork(chatListingAdminHistory)]);
}