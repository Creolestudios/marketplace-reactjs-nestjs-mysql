import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import authActions from "../app/action";
import { message } from "antd";
import {
  getProfileReq,
  updateProfileReq,
} from "../../library/services/profileReq";
import actions from "./actions";

export function* getProfileEffect() {
  yield takeEvery(actions.GET_PROFILE_REQUEST, function* ({ payload }) {
    yield put(authActions.globalLoaderHandler(true));
    try {
      const response = yield call(getProfileReq, payload);
      //if (response.data.user.verified) {
      if (response.data) {
        yield put({
          type: actions.GET_PROFILE_SUCCESS,
          payload: response.data.data,
        });
        // message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.GET_PROFILE_FAILED, payload: error.message });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* updateProfileEffect() {
  yield takeEvery(actions.UPDATE_PROFILE, function* ({ payload, user_id }) {
    yield put(authActions.globalLoaderHandler(true));
    try {
      const response = yield call(updateProfileReq, payload);
      if (response.data) {
        yield all([
          put({
            type: actions.UPDATE_PROFILE_SUCCESS,
            payload: response.data.message,
          }),
          put({
            type: actions.GET_PROFILE_REQUEST,
            payload: user_id,
          }),
        ]);
      } else {
        console.log("Error");
      }
    } catch (error) {
      if (error && error.data.error) {
        yield put({
          type: actions.UPDATE_PROFILE_FAILED,
          payload: error.data.message,
        });
      }
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export default function* rootSaga() {
  yield all([fork(getProfileEffect), fork(updateProfileEffect)]);
}
