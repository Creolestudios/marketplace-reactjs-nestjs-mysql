import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import authActions from "../app/action";
import categoriesActions from "../categoriesAndServices/actions";
import profileActions from "../profile/actions";
import notificationActions from "../notification/actions";

import { getToken, getActiveApp, clearToken } from "@iso/lib/helpers/utility";
import { message, notification } from "antd";
import {
  signup,
  login,
  forgotpassword,
  resetpassword,
  logout,
  googleLogin,
  facebookLogin,
  changepassword,
  verify,
  nemIdLogin,
  resetForgotPassword,
  verifyAccountLink,
  getUserStatus,
  guestRequest
} from "../../library/services/auth";
import actions from "./actions";
import jwt_decode from "jwt-decode";
const fakeApiCall = true; // auth0 or express JWT

export function* loginRequest() {
  yield takeEvery(
    actions.LOGIN_REQUEST,
    function* ({ payload, history, from }) {
      try {
        yield put(authActions.globalLoaderHandler(true));
        const response = yield call(login, payload, from);
        if (from === "admin") {
          yield put({
            type: actions.LOGIN_SUCCESS,
            token: response.data.access_token,
            userData: response.data.user,
            activeApp: from,
          });
          history.push(`/admin`);
        }
        else if (response.data.user.verified===1) {
        //if (response.data) {
          const res= yield call(getUserStatus,response.data.user.id)
          yield put({
            type:actions.CHECK_USER_STATUS,
            payload : res.data.user_status})
          yield put({
            type: actions.LOGIN_SUCCESS,
            token: response.data.access_token,
            userData: response.data.user,
            userStatus:res.data.user_status,
            activeApp: from,
          });
            history.push(`/client/task`);      
        } else {
          message.error("Please verify your email");

        
        }
      } catch (error) {
        console.log(error);
        
        yield put({ type: actions.LOGIN_ERROR , payload: error});
      }
      yield put(authActions.globalLoaderHandler(false));
    }
  );
}
export function* google() {
  yield takeEvery(actions.GOOGLE_LOGIN, function* ({ payload, history, from }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(googleLogin, payload);
      if (response.data.user) {
        yield put({
          type: actions.LOGIN_SUCCESS,
          token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          profile: "Profile",
          email: payload.type.email,
          type_role: 1,
        });
        // yield put({
        //   type: action.GET_ADMIN_MY_ACCOUNT,
        // });
        // message.success(response.message);
        history.push(`/client/home`);
      } else {
        if (!response.data.is_email_verified) {
          history.push({
            pathname: `/portal/verification`,
            search: `?type=VERIFY&email=${payload.type.email}`,
          });
        } else {
          yield put({
            type: actions.LOGIN_SUCCESS,
            token: response.data.access_token,
            refresh_token: response.data.refresh_token,
            profile: "Profile",
            email: payload.type.email,
            type_role: 2,
          });
          yield put({
            type: authActions.CHANGE_CURRENT,
            current: "app-settings/profile",
          });
          history.push(`/portal/dashboard/app-settings/profile`);
        }
      }
    } catch (error) {
      console.log(error);
      yield put({ type: actions.LOGIN_ERROR });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export function* facebook() {
  yield takeEvery(
    actions.FACEBOOK_LOGIN,
    function* ({ payload, history, from }) {
      try {
        yield put(authActions.globalLoaderHandler(true));
        const response = yield call(facebookLogin, payload);
        if (response.data.user) {
          yield put({
            type: actions.LOGIN_SUCCESS,
            token: response.data.access_token,
          });

          // message.success(response.message);
          history.push(`/client/home`);
        } else {
          if (!response.data.is_email_verified) {
            history.push({
              pathname: `/portal/verification`,
              search: `?type=VERIFY&email=${payload.type.email}`,
            });
          } else {
            yield put({
              type: actions.LOGIN_SUCCESS,
              token: response.data.access_token,
              refresh_token: response.data.refresh_token,
              profile: "Profile",
              email: payload.type.email,
              type_role: 2,
            });
            yield put({
              type: authActions.CHANGE_CURRENT,
              current: "app-settings/profile",
            });
            history.push(`/portal/dashboard/app-settings/profile`);
          }
        }
      } catch (error) {
        console.log(error);
        yield put({ type: actions.LOGIN_ERROR });
      }
      yield put(authActions.globalLoaderHandler(false));
    }
  );
}

export function* nemId() {
  yield takeEvery(actions.NEMID_LOGIN, function* ({ payload, history }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      if (payload.type.link) {
        const response = yield call(nemIdLogin, payload);
        if (response.verified) {
          yield put({
            type: actions.NEMID_SUCCESS,
            payload: response,
          });
          history.push(`/client/SignUp`);
        } else {
          history.push(`/client/SignUp`);
        }
      }
      yield put(authActions.globalLoaderHandler(false));
    } catch (error) {
      console.log(error);
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    console.log("first success loo")
    if (localStorage.getItem("remember_me")) {
      yield sessionStorage.clear();
      yield localStorage.setItem("id_token", payload.token);
      yield localStorage.setItem("refresh_token", payload.refresh_token);
      yield localStorage.setItem("type_role", payload.type_role);
      yield localStorage.setItem("activeApp", payload.activeApp);
    } else {
      yield localStorage.removeItem("id_token");
      yield localStorage.removeItem("refresh_token");
      yield localStorage.removeItem("activeApp");
      yield sessionStorage.setItem("id_token", payload.token);
      yield sessionStorage.setItem("refresh_token", payload.refresh_token);
      yield sessionStorage.setItem("activeApp", payload.activeApp);
    }
    const token = getToken().get("idToken");
    const { user_id, email  , user_role} = token ? jwt_decode(token) : {};
  let res;

 if(sessionStorage.getItem("is_guest") === null){
   res= yield call(getUserStatus,sessionStorage.getItem("is_guest") === null ? user_id : user_role)
  yield put({
    type:actions.CHECK_USER_STATUS,
    payload:res.data.data.user_status
  })
 }
   
    // res.data.data.user_status === 3 && message.warning('User Suspended! Please Activate your account');

    if(res.data.data.user_status === 1 && sessionStorage.getItem("is_guest") === null){
    yield put({
      type: profileActions.GET_PROFILE_REQUEST,
      payload: user_id
    });
    yield put({
      type: categoriesActions.GET_CATEGORIES,
    });
    yield put({
      type: notificationActions.GET_NOTIFICATION,
    });
  }
  });
}
export function* guestSuccess() {
  yield takeEvery(actions.GUEST_SUCCESS, function* (payload) {
    
      yield sessionStorage.setItem("id_token", payload.token);
      yield sessionStorage.setItem("refresh_token", payload.refresh_token);
      yield sessionStorage.setItem("activeApp", payload.activeApp);
      yield sessionStorage.setItem("is_guest", true);

    const token = getToken().get("idToken");
    const { user_id, email ,user_role } = token ? jwt_decode(token) : {};


    yield put({
      type: categoriesActions.GET_CATEGORIES,
    });
    // res.data.data.user_status === 3 && message.warning('User Suspended! Please Activate your account');
    

    // yield put({
    //   type: profileActions.GET_PROFILE_REQUEST,
    //   payload: user_role
    // });
 
    // yield put({
    //   type: notificationActions.GET_NOTIFICATION,
    // });
  
  
  });
}
// export function* loginError() {
//   yield takeEvery(actions.LOGIN_ERROR, function* () {});
// }

export function* checkLogout() {
  yield takeEvery(actions.LOGOUT, function* ({ payload, history }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      yield call(logout);
      yield clearToken();
      yield localStorage.clear();
      if (payload.type === "LO") {
        history.push(`/portal/signin`);
      } else {
        history.push(`/admin/signin`);
      }
    } catch (error) {
      console.log(error);
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}

export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    //const res= yield call(getUserStatus,user_id)
    // yield put({
    //   type:actions.CHECK_USER_STATUS,
    //   payload:res.data.user_status
    // })
    const token = getToken().get("idToken");
    const activeApp = getActiveApp().get("activeApp");
    if (token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token,
        activeApp,
      });
    }
  });
}

export function* signupSuccess() {
  yield takeEvery(actions.SIGNUP, function* ({ payload, history }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(signup, payload);
      //message.success(response.message);
      if (response.message) {
        yield put({
          type: actions.SIGNUP_SUCCESS,
          email: response.data.user.email,
          payload: response.message,
        });
         history.push(`/client/signup-sucess`);
      } else {
      }
    } catch (error) {
      yield put({
        type: actions.SIGNUP_FAILER,
        payload: error,
      });
      console.log(error);

    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
// {
//   "data": {
//     "message": "Verification Link has been sent"
//   },
//   "message": "success"
// }
export function* verification() {
  yield takeEvery(actions.VERIFICATION, function* ({ payload, history }) {
    try {
      const response = yield call(verify, payload);
      if (response.message == "success") {
        yield put({
          type: actions.VERIFICATION_SUCCESS,
          payload: response.data.message,
        });
      }
    } catch (error) {
      console.log(error);
      yield put({
        type: actions.VERIFICATION_SUCCESS,
        payload: error,
      });
    }
  });
}

// export function* loginWithOtherFunction() {
//   yield takeEvery(actions.LOGIN_WITH_OTHER, function* ({ payload }) {
//     yield put({
//       type: actions.LOGIN_SUCCESS,
//       token: payload.data.access_token,
//       refresh_token: payload.data.refresh_token,
//       profile: "Profile",
//     });

//     yield put({
//       type: authActions.CHANGE_CURRENT,
//       current: "app-settings/profile",
//     });

//     history.push(`/portal/dashboard/app-settings/profile`);
//   });
// }

// export function* resend() {
//   yield takeEvery(actions.RESEND, function* ({ payload }) {
//     try {
//       yield put(authActions.globalLoaderHandler(true));
//       const response = yield call(resendCode, payload);

//       if (response.status) {
//         message.success(response.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//     yield put(authActions.globalLoaderHandler(false));
//   });
// }
export function* forgotPassword() {
  yield takeEvery(actions.FORGOT_PASSWORD, function* ({ payload, history }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const is_admin = payload.is_admin;
      const response = yield forgotpassword(payload);
      // message.success(response.message);
if(response){
  yield put({
    type: actions.FORGOT_PASSWORD_SUCCESS,
    email: payload.email,
    
  });
  history.push({
    pathname: `/client/forgot-password-emailsent`,
  });
}
     
      if (is_admin) {
        history.push({
          pathname: `/admin/verification-admin`,
          search: `?type=RESET&email=${payload.email}`,
        });
      } else {
        // history.push({
        //   pathname: `/portal/verification`,
        //   search: `?type=RESET&email=${payload.email}`,
        // });
      }
    } catch (error) {
      console.log(error);
      yield put({
        type: actions.FORGOT_PASSWORD_FAILER,
        payload: error,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}


export function* resetPassword() {
  yield takeEvery(
    actions.RESET_FORGOT_PASSWORD,
    function* ({ payload, history }) {
      try {
        const response = yield resetForgotPassword(payload);
        if (response.message) {
          history.push(`/client/reset-password-sucess`);
        }
      } catch (error) {
        yield put({
          type: actions.RESET_FORGOT_PASSWORD_FAILER,
          payload: error,
         
        });
      }
    }
  );
}

export function* verifyAccount() {
  yield takeEvery(
    actions.VERIFY_ACCOUNT_LINK,
    function* ({ payload, history }) {
      try {
        const response = yield verifyAccountLink(payload);
        if (response) {
          // history.push(`/`);
        }
      } catch (error) {

        console.log(error);
        history.push(`/client`);
      }
    }
  );
}





export function* changePassword() {
  yield takeEvery(actions.CHANGE_PASSWORD, function* ({ payload }) {
    try {
      const response = yield call(changepassword, payload);

      if (response.status) {
        notification.success({
          message: response.data.message,
        });
      }
    } catch (error) {
      message.error(error.response.data.message);
      console.log("error", error);
    }
  });
}


export function* guest() {
  yield takeEvery(actions.GUEST_REQUEST, function* ({ payload ,history, from }) {
    try {
      yield put(authActions.globalLoaderHandler(true));
      const response = yield call(guestRequest, payload);
      console.log("guest response",response)
      if (response) {
        console.log("first loop")
        yield put({
          type: actions.GUEST_SUCCESS,
          token: response.data.access_token,
          // userData: response.data.user,
          // userStatus:res.data.user_status,
          activeApp: from,
        });
      history.push(`/client/find-task`);
      } else {
        yield put({
          type: actions.GUEST_FAILED,
          payload: response.data.message,
        });
      }
    } catch (error) {
      yield put({
        type: actions.GUEST_FAILED,
        payload: error.message,
      });
    }
    yield put(authActions.globalLoaderHandler(false));
  });
}
export default function* rootSaga() {
  yield all([
    // fork(resend),
    fork(verification),
    // fork(loginWithOtherFunction),
    fork(signupSuccess),
    fork(forgotPassword),
    fork(nemId),
    // fork(resetPassword),
    fork(checkAuthorization),
    fork(loginRequest),
    fork(google),
    fork(facebook),
    fork(loginSuccess),
    // fork(loginError),
    fork(checkLogout),
    fork(resetPassword),
    fork(verifyAccount),
    fork(changePassword),
    fork(guest),
    fork(guestSuccess),
  ]);
}