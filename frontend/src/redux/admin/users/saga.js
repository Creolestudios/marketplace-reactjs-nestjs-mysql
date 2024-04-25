import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { message, notification } from "antd";
import {
  viewAllUser,
  viewUserData,
  suspendUserCall,
  activateUserCall,
  viewReportProfile,
  removeReportProfile,
  userReportedHistoryData
} from "../../../library/services/admin/userReq";
import actions from "./actions";

export function* viewUser() {
  yield takeEvery(actions.VIEW_USER, function* ({ payload }) {
    try {
      const response = yield call(viewAllUser, payload);
       
      if (response.status) {
        yield put({
          type: actions.VIEW_USER_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}

export function* viewUserDetail() {
  yield takeEvery(actions.VIEW_USER_DETAIL, function* ({ payload }) {
    try {
      const response = yield call(viewUserData, payload);
      if (response.status) {
        yield put({
          type: actions.VIEW_USER_DETAIL_SUCCESS,
          data: response.data.data,
        });
        yield put({
          type: actions.USER_REPORTED_HISTORY,
          payload: {
            "user_id": parseInt(payload.type.user_id),
            "page": 1,
            "limit": 5
          },
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}
export function* userReportedHistory() {
  yield takeEvery(actions.USER_REPORTED_HISTORY, function* ({ payload }) {
    try {
      const response = yield call(userReportedHistoryData, payload);
      if (response.status) {
        yield put({
          type: actions.USER_REPORTED_HISTORY_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}
export function* suspendUser() {
  yield takeEvery(actions.SUSPEND_USER, function* ({ payload }) {
    try {
      const response = yield call(suspendUserCall, payload);
      if (response.status) {
        message.success(response.data.message)
        yield put({
          type: actions.SUSPEND_USER_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}


export function* activateUser() {
  yield takeEvery(actions.ACTIVATE_USER, function* ({ payload }) {
    try {
      const response = yield call(activateUserCall, payload);
      if (response.status) {
        message.success(response.data.message)
        yield put({
          type: actions.ACTIVATE_USER_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}

export function* viewReportedProfile() {
  yield takeEvery(actions.VIEW_REPORTED_PROFILE, function* ({ payload }) {
    console.log("view again",payload)
    try {
      const response = yield call(viewReportProfile, payload);
      console.log("response captured",response)
      if (response.status) {
        yield put({
          type: actions.VIEW_REPORTED_PROFILE_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}
export function* removeReportedProfile() {
  yield takeEvery(actions.REMOVE_REPORTED_PROFILE, function* ({ payload }) {
    let type = {
      type :{
        search: "",
        reported_profile: 1,
        page: 1,
        limit: 10,
      }
    };
    try {
      const response = yield call(removeReportProfile, payload);
      if (response.status) {
        yield put({
          type: actions.REMOVE_REPORTED_PROFILE_SUCCESS,
          data: response.data.data,
        });
        yield put({
          type: actions.VIEW_REPORTED_PROFILE,
          payload: {...type},
        }
        );
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(viewUser),
    fork(viewUserDetail),
    fork(userReportedHistory),
    fork(suspendUser),
    fork(activateUser),
    fork(viewReportedProfile),
    fork(removeReportedProfile),

  ]);
}
