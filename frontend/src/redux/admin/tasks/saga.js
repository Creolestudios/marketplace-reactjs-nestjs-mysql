import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { message, notification } from "antd";
import {
  viewAllTask,
  viewTaskData,
  getTaskProofs,
  viewAllReportedTasks,
  viewReportedTaskData,
  viewProofData,
  viewPlaceBidData,
  disputeSettle,
} from "../../../library/services/admin/tasksReq";
import actions from "./actions";

export function* viewTask() {
  yield takeEvery(actions.VIEW_TASK, function* ({ payload }) {
    try {
      const response = yield call(viewAllTask, payload);

      if (response.status) {
        yield put({
          type: actions.VIEW_TASK_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}

export function* viewTaskDetail() {
  yield takeEvery(actions.VIEW_TASK_DETAIL, function* ({ payload }) {
    try {
      const response = yield call(viewTaskData, payload);
      if (response.status) {
        yield put({
          type: actions.VIEW_TASK_DETAIL_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}
export function* taskProofs() {
  yield takeEvery(actions.TASK_PROOFS, function* ({ payload }) {
    try {
      const response = yield call(getTaskProofs, payload);
      if (response.status) {
        yield put({
          type: actions.TASK_PROOFS_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}
export function* viewReportedTask() {
  yield takeEvery(actions.VIEW_REPORTED_TASK, function* ({ payload }) {
    try {
      const response = yield call(viewAllReportedTasks, payload);

      if (response.status) {
        yield put({
          type: actions.VIEW_REPORTED_TASK_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}
export function* viewReportedTaskDetail() {
  yield takeEvery(actions.VIEW_REPORTED_TASK_DETAIL, function* ({ payload }) {
    console.log('sdsds', payload)
    try {
      const response = yield call(viewReportedTaskData, payload);
      if (response.status) {
        console.log('55555')
        yield put({
          type: actions.VIEW_REPORTED_TASK_DETAIL_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}
export function* viewProof() {
  yield takeEvery(actions.VIEW_PROOF, function* ({ payload }) {
    try {
      const response = yield call(viewProofData, payload);
      if (response.status) {
        yield put({
          type: actions.VIEW_PROOF_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}
export function* viewPlaceBid() {
  yield takeEvery(actions.VIEW_PLACE_BID, function* ({ payload }) {
    try {
      const response = yield call(viewPlaceBidData, payload);
      if (response.status) {
        yield put({
          type: actions.VIEW_PLACE_BID_SUCCESS,
          data: response.data.data,
        });
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}
export function* callDisputeSettle() {
  yield takeEvery(actions.DISPUTE_SETTLE, function* ({ payload,history }) {
    try {
      const response = yield call(disputeSettle, payload);
      let a=payload.task_id
      let data = {
        task_id: a,
      };
      if (response.status) {
        // yield put({
        //   type: actions.VIEW_REPORTED_TASK_DETAIL,
        //   payload: payload.type,
        // });
      history.push("/admin/alltasks/reported-tasks")
      }
    } catch (error) {
      message.error(error.data.message);
      console.log("error", error);
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(viewTask),
    fork(viewTaskDetail),
    fork(taskProofs),
    fork(viewReportedTask),
    fork(viewReportedTaskDetail),
    fork(viewProof),
    fork(viewPlaceBid),
    fork(callDisputeSettle),
  ]);
}
