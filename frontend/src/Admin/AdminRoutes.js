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

const Dashboard = lazy(() => import("./Dashboard/Dashboard"));

const publicRoutes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("@iso/containers/Global/Admin/Login")),
  },
  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import("@iso/containers/Global/404/404")),
  },
  // {
  //   path: PUBLIC_ROUTE.PAGE_500,
  //   component: lazy(() => import('@iso/containers/Global/500/500')),
  // },
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import("@iso/containers/Global/Admin/Login")),
  },
  {
    path: PUBLIC_ROUTE.FORGET_PASSWORD,
    component: lazy(() => import("@iso/containers/Global/ForgotPassword")),
  },
  // {
  //   path: '/forgotpassword-admin',
  //   component: lazy(() =>
  //     import('@iso/containers/Global/ForgotPassword/ForgotPasswordAdmin')
  //   ),
  // },
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
  {
    path: PUBLIC_ROUTE.RESET_PASSWORD,
    component: lazy(() =>
      import('@iso/components/ResetPassword')
    ),
  },
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
              pathname: `/admin`,
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

  useEffect(() => {
    if (localStorage.getItem("type_role") === lo_role) {
      return history.push("/portal/dashboard/app-settings/profile");
    }
  }, [history]);
  const isLoggedIn =
    localStorage.getItem("id_token") || sessionStorage.getItem("id_token");

  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={`${url}${route.path}`} exact={route.exact}>
            {!isLoggedIn ? <route.component /> : <Redirect to="/admin/dashboard/home" />}
          </Route>
        ))}

        <PrivateRoute path={`/admin`}>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Suspense>
  );
}
