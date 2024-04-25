import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import authActions from "../app/action";
import {
  getMyCard,
  addNewCard,
  deleteCard,
  defaultCard,
} from "../../library/services/myCard";
import listCardAction from "../myCard/actions";
import actions from "./actions";

export function* listCard() {
  yield takeEvery(actions.LIST_CARD, function* ({ payload }) {
    yield put(authActions.globalLoaderHandler(true));
    try {
      const response = yield call(getMyCard, payload);
      if (response.status) {
        yield all([
          put({
            type: actions.LIST_CARD_SUCCESS,
            data: response.data.data,
          }),
        ]);
      }
    } catch (error) {
      console.log("error", error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* addCard() {
  yield takeEvery(actions.ADD_NEW_CARD, function* ({ payload }) {
    yield put(authActions.globalLoaderHandler(true));
    try {
      const response = yield call(addNewCard, payload);
      if (response.status) {
        yield all([
          put({
            type: listCardAction.ADD_NEW_CARD_SUCCESSS,
            data: response.data,
          }),
          put({ type: listCardAction.LIST_CARD }),
        ]);
      }
    } catch (error) {
      yield put({
        type: listCardAction.ADD_NEW_CARD_FAIL,
        data: error.data.message,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* deleteSavedCard() {
  yield takeEvery(actions.DELETE_CARD, function* ({ payload }) {
    yield put(authActions.globalLoaderHandler(true));
    try {
      const response = yield call(deleteCard, payload);
      if (response.status) {
        yield all([
          put({
            type: listCardAction.DELETE_CARD_SUCCESS,
            data: response.data.message,
          }),
          put({ type: listCardAction.LIST_CARD }),
        ]);
      }
    } catch (error) {
      yield put({
        type: listCardAction.DELETE_CARD_FAIL,
        data: error.response.data.message,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* setDefaultCard() {
  yield takeEvery(actions.SET_DEFAULT_CARD, function* ({ payload }) {
    yield put(authActions.globalLoaderHandler(true));
    console.log("saga for default called")
    try {
      const response = yield call(defaultCard, payload);
      if (response.status) {
        yield all([
          put({
            type: listCardAction.DEFAULT_CARD_SUCCESS,
            data: response.data.message,
          }),
          put({ type: listCardAction.LIST_CARD }),
        ]);
      }
    } catch (error) {
      yield put({
        type: listCardAction.DEFAULT_CARD_SUCCESS,
        data: error.response.data.message,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export default function* rootSaga() {
  yield all([
    fork(listCard),
    fork(addCard),
    fork(deleteSavedCard),
    fork(setDefaultCard),
  ]);
}
