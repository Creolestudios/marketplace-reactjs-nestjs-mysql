import axios from "axios";
import { clearToken } from "@iso/lib/helpers/utility";
import { history } from "@iso/lib/helpers/history";

// SECTION - AXIOS INSTANCE

// Axios NoAuth Instance
export const ServiceInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
});

// Axios Auth Instance
export const ServiceAuthInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
});

// SECTION - API URLS
export const apiUrl = {
  LOGIN: "/auth/login",
  GUEST: "/auth/guest/login",
  ADMIN_LOGIN: "/admin/login",
  SIGNUP: "/auth/signup",
  FORGOT_PASSWORD: "/auth/forgotpassword",
  CHANGE_PASSWORD: "/auth/changepassword",
  RESET_PASSWORD: "/resetpassword",
  RESET_FORGOT_PASSWORD: "/auth/verify/forgotPassword/",
  VERIFY_ACCOUNT_LINK: "auth/verify/account/",
  USER_PROFILE: "users/profile",
  LOGOUT: "/logout",
  GOOGLE_LOGIN: "/auth/google",
  FACEBOOK_LOGIN: "/auth/facebook",
  VERIFY_EMAIL: "/auth/resend/verificationLink",
  NEMID_LOGIN: "/auth/oidc",
  CREATE_TASK: "/tasks/create-update-repost",
  MY_TASK: "/tasks/my-tasks",
  SINGLE_TASK: "/tasks/my-tasks/",
  SINGLE_BID: "/tasks/bid/details/",
  CANCEL_TASK: "tasks/cancel",
  COMPLETE_TASK: "tasks/complete",
  REPORT_TASK: "tasks/report",
  REVIEW_TASK: "/tasks/review",
  FIND_TASK: "/tasks/find",
  INVITE_TASK_TO_SPECIALIST: "/tasks/invite",
  TASK_ACCEPT_REJECT: "/tasks/cancellation/accept-reject",
  GET_CATEGORIES: "users/view/categories",
  ADD_CATEGORY: "/add-category", // : userid
  CHECK_USER_STATUS:"users/status",// :userid
  ADD_SUBCATEGORY: "/add-sub-category",
  ADD_TYPEOF_SERVICE: "/add-type-of-service",
  ADD_SERVICES: "/albums/add-services", // : service id
  GET_ALBUMS: "/albums/list", // :userid
  CREATE_ALBUM: "/albums/create",
  ADD_ALBUM_MEDIA: "/albums/media",
  DELETE_ALBUM: "/albums/delete", // albumid
  GET_ALBUM_DETAILS: "/albums", // albumid
  CHANGE_ALBUM_VISIBILITY: "/visibility", // /:albumid
  PLACE_BID: "tasks/bid/create-update",
  ADD_NEW_CARD: "/users/stripe/create/card",
  LIST_CARD: "/users/stripe/view/cards",
  DELETE_CARD: "/users/stripe/remove/card",
  DEFAULT_CARD: "/users/stripe/default/card",
  GET_PAYMENT_HISTORY: "users/payment/history",
  FIND_SPECIALIST: "users/specialists",
  ADD_TYPE_OF_SERVICE: "/add-type-of-service",
  UPDATE_PROFILE: "/users/profile/settings",
  GET_INVITED: "tasks/invited",
  ACCEPT_REJECT: "tasks/bid/accept-reject",
  REPORT_PROFILE: "users/report/profile",
  TRANSFER_PAYMENT: "users/stripe/transfer/payment",
  //admin
  VIEW_DASHBOARD: "admin/view/dashboard",
  VIEW_TASK: "/admin/view/tasks",
  VIEW_TASK_DETAIL: "/admin/view/task",
  TASK_PROOFS: "/admin/view/task/proofs",
  GET_CATEGORY: "/users/view/categories",
  VIEW_REPORTED_TASK: "/admin/view/tasks",
  VIEW_PROOF: "/admin/view/task/proofs",
  VIEW_PLACE_BID: "/tasks/bid/details",

  VIEW_USER: "/admin/view/users",
  VIEW_USER_DETAIL: "users/profile",
  REPORTED_HISTORY:"/admin/report-history",
  SUSPEND_USER: "admin/suspend/user",
  ACTIVATE_USER: "admin/reactive/user",
  VIEW_USER_PROFILE: "admin/my-account",
  SAVE_USER_PROFILE: "admin/my-account",
  VIEW_ATTRIBUTE: "admin/view/attributes",
  VIEW_ATTRIBUTE_DETAIL: "admin/view/category",
  ADD_ATTRIBUTE: "admin/add/category",
  EDIT_ATTRIBUTE: "admin/edit/category",
  VIEW_TRANSACTION: "admin/view/transactions",
  VIEW_TRANSACTION_DETAIL: "",
  VIEW_REPORTED_PROFILE: "admin/view/users",
  REMOVE_REPORTED_PROFILE:"admin/review/user",

  VIEW_NOTIFICATION: "users/view/notifications",
  MARK_NOTIFICATION: "users/update/notification",
  CHAT_HISTORY_LISTING: "chat/list",
  CHAT_HISTORY: "chat/history",
  CHAT_READ: "chat/mark/read",
  MEDIA_HISTORY: "chat/view/attachments",
  DELETE_CHAT: "chat/move/trash",
  CHAT_HISTORY_LISTING_ADMIN: "admin/chat/list",
  GET_NOTIFICATION: "users/view/notifications",
  READ_NOTIFICATION: "users/update/notification",
  CHECKOUT_BID_DETAIL: "tasks/checkout/details",
  LIST_STRIPE_CARD: "users/stripe/check/connect",
  ADD_NEW_CARD_STRIPE: "users/stripe/create/connect",
  REFRESH_STRIPE_CARD: "users/stripe/refresh/connect-link",
  DISPUTE_SETTLE_API: "admin/transactions/dispute",
};

// Axios NoAuth Instance - Response
ServiceInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const { data } = error.response;
    if (data && data.message) {
    }
    return Promise.reject(data.message);
  }
);
ServiceInstance.interceptors.request.use((config) => {
  const selectedlanguage =
    localStorage.getItem("selectedlanguage") ||
    sessionStorage.getItem("selectedlanguage");
  config.headers["Accept-Language"] = selectedlanguage
    ? selectedlanguage
    : "en";

  return config;
});
ServiceAuthInstance.interceptors.request.use((config) => {
  const accessToken =
    localStorage.getItem("id_token") || sessionStorage.getItem("id_token");
  const selectedlanguage =
    localStorage.getItem("selectedlanguage") ||
    sessionStorage.getItem("selectedlanguage");
  config.headers["Authorization"] = accessToken ? `Bearer ${accessToken}` : "";
  config.headers["Accept-Language"] = selectedlanguage
    ? JSON.parse(selectedlanguage).locale
    : "en";

  return config;
});

function _getRefreshToken() {
  const refreshToken =
    localStorage.getItem("refresh_token") ||
    sessionStorage.getItem("refresh_token");
  return refreshToken;
}

function _setToken(tokenObj) {
  if (localStorage.getItem("remember_me")) {
    sessionStorage.clear();
    localStorage.setItem("id_token", tokenObj.access_token);
    localStorage.setItem("refresh_token", tokenObj.refresh_token);
  } else {
    localStorage.clear();
    sessionStorage.setItem("id_token", tokenObj.access_token);
    sessionStorage.setItem("refresh_token", tokenObj.refresh_token);
  }
}

/* Axios refresh token logic - will be used auth instance of axios */

ServiceAuthInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    // Reject promise if usual error
    if (error.response.status !== 401) {
      return Promise.reject(error.response);
    }
    /*
     * When response code is 401, try to refresh the token.
     * Eject the interceptor so it doesn't loop in case
     * token refresh causes the 401 response
     */
    ServiceAuthInstance.interceptors.response.eject(ServiceAuthInstance);
    return ServiceInstance.post(`/refreshtoken`, {
      refresh_token: _getRefreshToken(),
    })
      .then((response) => {
        _setToken(response.data);
        error.response.config.headers["Authorization"] =
          "Bearer " + response.data.access_token;
        return axios(error.response.config);
      })
      .catch((error) => {
        clearToken();
        localStorage.clear()
        sessionStorage.clear()
        history.push(`/`);
        return Promise.reject(error);
      });
  }
);