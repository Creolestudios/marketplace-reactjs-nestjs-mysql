import React, { lazy, Suspense, useEffect } from "react";
import {
  Route,
  Redirect,
  Switch,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import { PUBLIC_ROUTE } from "../route.constants";
import Loader from "@iso/components/utility/loader";
import jwt_decode from "jwt-decode";
import { socket } from "../socket";
const Dashboard = lazy(() => import("../Client/Dashboard/Client"));

const publicRoutes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("@iso/containers/Global/Login/Login.js")),
  },

  {
    path: "/auth/google",
    component: lazy(() => import("@iso/containers/Global/Google")),
  },

  {
    path: "/auth/facebook",
    component: lazy(() => import("@iso/containers/Global/Facebook")),
  },

  {
    path: "/auth/oidc",
    component: lazy(() => import("@iso/containers/Global/NemId")),
  },

  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import("@iso/containers/Global/404/404")),
  },
  {
    path: PUBLIC_ROUTE.INVALID_LINK,
    component: lazy(() =>
      import("@iso/containers/Global/InvalidLink/InvalidLink")
    ),
  },
  // {
  //   path: PUBLIC_ROUTE.PAGE_500,
  //   component: lazy(() => import('@iso/containers/Global/500/500')),
  // },
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import("@iso/containers/Global/Login/Login")),
  },
  {
    path: PUBLIC_ROUTE.FORGET_PASSWORD,
    component: lazy(() => import("@iso/containers/Global/ForgotPassword")),
  },
  {
    path: PUBLIC_ROUTE.SIGN_UP,
    component: lazy(() => import("@iso/containers/Global/SignUp")),
  },

  {
    path: PUBLIC_ROUTE.VERIFY_ACCOUNT,
    component: lazy(() => import("@iso/components/VerifyAccount")),
  },
  {
    path: PUBLIC_ROUTE.VERIFY_FORGET_PASSWORD,
    component: lazy(() => import("@iso/components/ResetPassword")),
  },
  {
    path: PUBLIC_ROUTE.FORGET_PASSWORD_EMAIL_SENT,
    component: lazy(() => import("@iso/components/ForgetPasswordEmailsent")),
  },
  {
    path: PUBLIC_ROUTE.RESET_PASSWORD_SUCESS,
    component: lazy(() => import("@iso/components/ResetPasswordSucess")),
  },
  {
    path: PUBLIC_ROUTE.SIGNUP_SUCESS,
    component: lazy(() => import("@iso/components/SignupSucess")),
  },
  // {
  //   path: PUBLIC_ROUTE.VERIFICATION,
  //   component: lazy(() =>
  //     import('@iso/containers/Global/Verification/Verification')
  //   ),
  // },
  // {
  //   path: '/verification-admin',
  //   component: lazy(() =>
  //     import('@iso/containers/Global/Verification/VerificationAdmin')
  //   ),
  // },
  // {
  //   path: PUBLIC_ROUTE.RESET_PASSWORD,
  //   component: lazy(() =>
  //     import('@iso/containers/Global/ResetPassword/ResetPassword')
  //   ),
  // },
  // {
  //   path: '/resetpassword-admin',
  //   component: lazy(() =>
  //     import('@iso/containers/Global/ResetPassword/ResetpasswordAdmin')
  //   ),
  // },
];

function PrivateRoute({ children, ...rest }) {
  const isLoggedIn =
    localStorage.getItem("id_token") || sessionStorage.getItem("id_token");

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `/client`,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function AdminRoutes() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const lo_role = "2";
  const isLoggedIn =
    localStorage.getItem("id_token") || sessionStorage.getItem("id_token");
  useEffect(() => {
    if (localStorage.getItem("type_role") === lo_role) {
      return history.push("/portal/dashboard/app-settings/profile");
    }
  }, [history]);
  if (isLoggedIn) {
    const token =
      localStorage.getItem("id_token") || sessionStorage.getItem("id_token");
    const { user_id } = token ? jwt_decode(token) : {};
    user_id && socket.emit("connectUser", user_id);
    
  }
  // socket.on("disconnect", (userId) => {
  //   user_id && socket.emit("connectUser", user_id);
  // });
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={`${url}${route.path}`} exact={route.exact}>
            {!isLoggedIn ? <route.component /> : <Redirect to="/client/task" />}
          </Route>
        ))}
        <PrivateRoute path={`/client`}>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Suspense>
  );
}

// REACT_APP_API_URL=http://139.59.65.130:5050
