import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { message, notification } from "antd";
import {
  viewAllTransaction,
  viewTransactionData,
} from "../../../library/services/admin/transactionReq";
import actions from "./actions";

export function* viewTransaction() {
  yield takeEvery(actions.VIEW_TRANSACTION, function* ({ payload }) {
    try {
      const response = yield call(viewAllTransaction, payload);
      if (response.status) {
        yield put({
          type: actions.VIEW_TRANSACTION_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}

export function* viewTransactionDetail() {
  yield takeEvery(actions.VIEW_TRANSACTION_DETAIL, function* ({ payload }) {
    try {
      const response = yield call(viewTransactionData, payload);
      if (response.status) {
        yield put({
          type: actions.VIEW_TRANSACTION_DETAIL_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}

export default function* rootSaga() {
  yield all([fork(viewTransaction), fork(viewTransactionDetail)]);
}
