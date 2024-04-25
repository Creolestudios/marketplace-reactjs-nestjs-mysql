import { ServiceInstance, ServiceAuthInstance, apiUrl } from "./index";

// ANCHOR - Login
export const login = (payload, from) => {
  return ServiceInstance({
    method: "POST",
    url: from === "admin" ? apiUrl.ADMIN_LOGIN : apiUrl.LOGIN,
    data: {
      ...payload.type,
    },
  });
};
// ANCHOR - guest login
export const guestRequest = (payload, from) => {
  return ServiceInstance({
    method: "POST",
    url: apiUrl.GUEST,
    data: {
      ...payload.type,
    },
  });
};

// ANCHOR - Signup
export const signup = (payload) => {
  return ServiceInstance({
    method: "POST",
    url: apiUrl.SIGNUP,
    data: {
      ...payload.type,
    },
  });
};

//ANCHOR - USER STATUS_TEXT

export const getUserStatus = (payload) => {
  return ServiceAuthInstance({
    method: "GET",
    url: `${apiUrl.CHECK_USER_STATUS}/${payload}`,
  });
};

//google login
export const googleLogin = (payload) => {
  return ServiceInstance({
    method: "GET",
    url: payload.type.link,
  });
};
//facebook login
export const facebookLogin = (payload) => {
  return ServiceInstance({
    method: "GET",
    url: payload.type.link,
  });
};
// ANCHOR - Nemid
export const nemIdLogin = (payload) => {
  return ServiceInstance({
    method: "GET",
    url: payload.type.link,
    withCredentials: true,
  });
};

// ANCHOR - Forgot Password
export const forgotpassword = (payload) => {
  return ServiceInstance({
    method: "POST",
    url: apiUrl.FORGOT_PASSWORD,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - Verify
export const verify = (payload) => {
  return ServiceInstance({
    method: "POST",
    url: apiUrl.VERIFY_EMAIL,
    data: {
      ...payload.type,
    },
  });
};

// ANCHOR - Reset Password
export const resetpassword = (payload) => {
  return ServiceInstance({
    method: "POST",
    data: {
      ...payload,
    },
  });
};

//change password
export const changepassword = (payload) => {
  return ServiceAuthInstance({
    method: "POST",
    url: apiUrl.CHANGE_PASSWORD,
    data: {
      ...payload,
    },
  });
};

// ANCHOR - Logout
export const logout = () => {
  return ServiceAuthInstance({
    method: "POST",
  });
};

// ANCHOR - Reset Forgot Password
export const resetForgotPassword = (payload) => {
  return ServiceInstance({
    method: "POST",
    url: `${apiUrl.RESET_FORGOT_PASSWORD}${payload.link}`,
    data: {
      new_password: payload.new_password,
      new_confirm_password: payload.new_confirm_password,
    },
  });
};

export const verifyAccountLink = (payload) => {
  return ServiceInstance({
    method: "GET",
    url: `${apiUrl.VERIFY_ACCOUNT_LINK}${payload.link}`,
  });
};
