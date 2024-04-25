import { all, takeEvery, put, fork, call } from "redux-saga/effects";

import {
  task,
  allTask,
  singleTaskDetials,
  singleTaskBids,
  taskActionRequest,
  reviewTask,
  findTask,
  bidRequest,
  findSpecialist,
  getInvitedReq,
  acceptAndRejectReq,
  reportProfileReq,
  inviteTaskSpecialist,
  taskAcceptRejectFunc,
  getCheckoutBidDetailFunc
} from "../../library/services/taskReq";
import actions from "./actions";
import authActions from "../app/action";

export function* createTask() {
  yield takeEvery(actions.CREATE_TASK, function* ({ payload, history }) {
    yield put(authActions.globalLoaderHandler(true));

    try {
      const response = yield call(task, payload);
      if (response.status) {
        // notification.success({
        //   message: response.data.message,
        // });
      }
      history.push(`/client/task-details/employer/${response.data.data.task.id}`);
    } catch (error) {
      console.log("error", error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getTask() {
  yield takeEvery(actions.GET_TASK, function* ({ payload }) {
    try {
      yield put(authActions.globalLoaderHandler(true));

      const response = yield call(allTask, payload);

      if (response.status) {
        yield put({
          type: actions.GET_TASK_SUCCESS,
          data: response.data,
        });
        // notification.success({
        //   message: response.data.message,
        // });
      }
    } catch (error) {
      console.log("error", error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* singleTask() {
  yield takeEvery(actions.SINGLE_TASK_DETAILS, function* ({ payload, history }) {
    yield put(authActions.globalLoaderHandler(true));
    try {
      const response = yield call(singleTaskDetials, payload);
      if (response.status) {
        yield put({
          type: actions.SINGLE_TASK_SUCCESS,
          data: response.data.data,
        });
        // notification.success({
        //   message: response.data.message,
        // });
      }
    } catch (error) {
      console.log("error", error);
      history.push(`/client/task`);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* singleBid() {
  yield takeEvery(actions.BID_DETAILS, function* ({ payload }) {
    yield put(authActions.globalLoaderHandler(true));

    try {
      const response = yield call(singleTaskBids, payload);
      if (response.status) {
        yield put({
          type: actions.SINGLE_BID_SUCCESS,
          data: response.data.data,
        });
        // notification.success({
        //   message: response.data.message,
        // });
      }
    } catch (error) {
      console.log("error", error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* taskAction() {
  yield takeEvery(actions.TASK_ACTION, function* ({ payload }) {
    yield put(authActions.globalLoaderHandler(true));

    try {
      const response = yield call(taskActionRequest, payload);

      if (response.status) {
        yield put({
          type: actions.TASK_ACTION_SUCCESS,
          data: response.data,
        });
        yield put({
          type: actions.SINGLE_TASK_DETAILS,
          payload: payload,
        });
      } else {
        yield put({
          type: actions.TASK_ACTION_FAILED,
          data: response.message,
        });
      }
    } catch (error) {
      yield put({
        type: actions.TASK_ACTION_FAILED,
        data: error.data.message,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* review() {
  yield takeEvery(actions.REVIEW_TASK, function* ({ payload, history }) {
    yield put(authActions.globalLoaderHandler(true));

    try {
      const response = yield call(reviewTask, payload);

      if (response.status) {
        yield put({
          type: actions.REVIEW_TASK_SUCCESS,
          data: response.data.data,
        });
        // notification.success({
        //   message: response.data.message,
        // });
        history.push(`/client/task`);
      }
    } catch (error) {
      yield put({
        type: actions.REVIEW_TASK_FAILED,
        payload: error.data.message,
      });
      console.log("error", error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* placeBid() {
  yield takeEvery(actions.PLACE_BID, function* ({ payload, history }) {
    yield put(authActions.globalLoaderHandler(true));

    try {
      const response = yield call(bidRequest, payload);
      if (response.status) {
        payload.type.user_type = "specialist";
        yield put({
          type: actions.PLACE_BID_SUCCESS,
          payload: payload,
        });
      }
      window.location.reload()
    } catch (error) {
      yield put({
        type: actions.PLACE_BID_FAILED,
        payload: error.data.message,
      });
      console.log("error", error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
// export function* addCatAndServiceEffect() {
//   yield takeEvery(actions.ADD_CAT_AND_SERVICES, function* ({ payload }) {
//     try {
//       const response = yield call(addCatAndServiceReq, payload);
//       if (response.data.message === "success") {
//         const token = getToken().get("idToken");
//         const { user_id } = token ? jwt_decode(token) : {};
//         yield put({
//           type: profileActions.GET_PROFILE_REQUEST,
//           payload: user_id,
//         });
//       } else {
//         yield put({
//           type: actions.ADD_CAT_AND_SERVICES_FAILED,
//           payload: response.data.message,
//         });
//       }
//     } catch (error) {
//       yield put({
//         type: actions.ADD_CAT_AND_SERVICES_FAILED,
//         payload: error.message,
//       });
//     }
//   });
// }
export function* find() {
  yield takeEvery(actions.FIND_TASK, function* ({ payload }) {
    yield put(authActions.globalLoaderHandler(true));

    try {
      const response = yield call(findTask, payload);
      if (response.status) {
        yield put({
          type: actions.FIND_TASK_SUCCESS,
          payload: response.data.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* getSpecialist() {
  yield takeEvery(actions.GET_SPECIALIST_LIST, function* ({ payload }) {
    yield put(authActions.globalLoaderHandler(true));

    try {
      const response = yield call(findSpecialist, payload);
      if (response.status) {
        yield put({
          type: actions.GET_SPECIALIST_SUCCESS,
          payload: response.data.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* getInvitedTask() {
  yield takeEvery(actions.GET_INVITED, function* () {
    yield put(authActions.globalLoaderHandler(true));
    try {
      const response = yield call(getInvitedReq);

      if (response.data.message === "success") {
        yield put({
          type: actions.GET_INVITED_SUCCESS,
          payload: response.data.data.tasks,
        });
      } 
    } catch (error) {
      // yield put({
      //   type: actions.GET_CATEGORIES_FAILED,
      //   payload: error,
      // });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* acceptAndRejectEffect() {
  yield takeEvery(actions.ACCEPT_REJECT_BID, function* ({ payload, history }) {
    yield put(authActions.globalLoaderHandler(true));
    try {
      const response = yield call(acceptAndRejectReq, payload);
      if (response.data.status) {
        yield put({
          type: actions.ACCEPT_REJECT_BID_SUCCESS,
          payload: response.data.message,
        });
        yield put({
          type: actions.BID_DETAILS,
          payload : {type :{task_id: response.data.data.bid.task_id, page: 1, limit: 10}}
        });      
       // history.push(`/client/task-details/employer/${payload.task_id}`);
      } else {
        yield put({
          type: actions.ACCEPT_REJECT_BID_FAILED,
          payload: response.data.message,
        });
      }
    } catch (error) {
      console.log("catch");
      yield put({
        type: actions.ACCEPT_REJECT_BID_FAILED,
        payload: error.data.message,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* inviteTaskToSpecialist() {
  yield takeEvery(actions.INVITE_TASK_TO_SPECIALIST, function* ({ payload }) {
    yield put(authActions.globalLoaderHandler(true));
    try {
      const response = yield call(inviteTaskSpecialist, payload);
      if (response.status) {
        yield put({
          type: actions.INVITE_TASK_TO_SPECIALIST_SUCCESS,
          payload: response.data.message,
        });
      }
    } catch (error) {
      yield put({
        type: actions.INVITE_TASK_TO_SPECIALIST_FAILED,
        payload: error.data.message,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* taskAcceptReject() {
  yield takeEvery(actions.TASK_ACCEPT_REJECT, function* ({ payload }) {
    yield put(authActions.globalLoaderHandler(true));
    try {
      const response = yield call(taskAcceptRejectFunc, payload);
      let data={type:payload.type}
      if (response.status) {
        yield put({
          type: actions.SINGLE_TASK_DETAILS,
          payload: data,
        });
      }
    } catch (error) {
      yield put({
        type: actions.TASK_ACCEPT_REJECT_FAILED,
        payload: error.data.message,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* getCheckoutBidDetail() {
  yield takeEvery(actions.CHECKOUT_BID_DETAIL, function* ({ payload }) {
    yield put(authActions.globalLoaderHandler(true));
    try {
      const response = yield call(getCheckoutBidDetailFunc, payload);
      if (response.status) {
        yield put({
          type: actions.CHECKOUT_BID_DETAIL_SUCCESS,
          payload: response.data.data,
        });
      }
    } catch (error) {
      yield put({
        type: actions.CHECKOUT_BID_DETAIL_FAILED,
        payload: error.data.message,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
// export function* reportProfileEffect() {
//   yield takeEvery(actions.REPORT_PROFILE, function* ({ payload }) {
//     yield put(authActions.globalLoaderHandler(true));
//     try {
//       const response = yield call(reportProfileReq, payload);
//       console.log("report specialist",response)
//       if (response) {
//         yield put({
//           type: actions.REPORT_PROFILE_SUCCESS,
//           payload: response.data.message,
//         });
//       }
//     } catch (error) {
//       yield put({
//         type: actions.REPORT_PROFILE_FAILER,
//         payload: error,
//       });
//     }
//     yield put(authActions.globalLoaderHandler(false));
//   });
// }
export function* reportProfileEffect() {
  yield takeEvery(actions.REPORT_PROFILE, function* ({ payload }) {
    try {
      const response = yield call(reportProfileReq, payload);
      if (response) {
        yield put({
          type: actions.REPORT_PROFILE_SUCCESS,
          payload: response.data.message,
        });
      } else {
        yield put({
          type: actions.REPORT_PROFILE_FAILER,
          payload: response.data.message,
        });
      }
    } catch (error) {
      yield put({
        type: actions.REPORT_PROFILE_FAILER,
        payload: error,
      });
    }
  });
}


export default function* rootSaga() {
  yield all([
    fork(createTask),
    fork(getTask),
    fork(singleTask),
    fork(singleBid),
    fork(reportProfileEffect),
    fork(taskAction),
    fork(review),
    fork(find),
    fork(placeBid),
    fork(getSpecialist),
    fork(getInvitedTask),
    fork(acceptAndRejectEffect),
    fork(inviteTaskToSpecialist),
    fork(taskAcceptReject),
    fork(getCheckoutBidDetail)
  ]);
}
