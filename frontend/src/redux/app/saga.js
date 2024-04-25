import { all, takeEvery, put, fork } from "redux-saga/effects";

import actions from "./action";

export function* globalLoaderHandler() {
  yield takeEvery(actions.GLOBAL_LOADER, function* ({ isIncrement }) {
    if (isIncrement) {
      yield put({
        type: actions.GLOBAL_LOADER_INCREMENT,
      });
    } else {
      yield put({
        type: actions.GLOBAL_LOADER_DECREMENT,
      });
    }
  });
}

export default function* rootSaga() {
  yield all([fork(globalLoaderHandler)]);
}
