import { all } from "redux-saga/effects";
import appSagas from "../app/saga";
import authSagas from "../auth/saga";
import taskSagas from "../task/saga";
import profileSagas from "../profile/saga";
import categoriesSagas from "../categoriesAndServices/saga";
import portfolioSagas from "../portfolio/saga";
import myCardSaga from "../myCard/saga";
import paymentSaga from "../payment/saga";
import notificationSagas from "../notification/saga";
import adminDashboardSaga from "../admin/dashboard/saga";
import adminTaskSaga from "../admin/tasks/saga";
import adminUserSaga from "../admin/users/saga";
import adminProfileSaga from "../admin/profile/saga";
import adminAttributeSaga from "../admin/attribute/saga";
import adminTransactionSaga from "../admin/transaction/saga";
import chatSaga from "../chat/saga";
import stripeSaga from "../mystripeAccount/saga";

export default function* rootSaga(getState) {
  yield all([
    appSagas(),
    authSagas(),
    taskSagas(),
    notificationSagas(),
    categoriesSagas(),
    profileSagas(),
    portfolioSagas(),
    myCardSaga(),
    paymentSaga(),
    adminDashboardSaga(),
    adminTaskSaga(),
    adminUserSaga(),
    adminProfileSaga(),
    adminAttributeSaga(),
    adminTransactionSaga(),
    chatSaga(),
    stripeSaga()
  ]);
}
