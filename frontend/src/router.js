import React, { lazy, Suspense } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { history } from "@iso/lib/helpers/history";
import ErrorBoundary from "./ErrorBoundary";
// import { GLOBAL_ROUTE, PUBLIC_ROUTE } from './route.constants';
import Loader from "@iso/components/utility/loader";

const globalRoutes = [
  {
    path: "/",
    component: lazy(() => import("./containers/Global/Login/Login")),
    exact: true,
  },
];
const globalAdminRoutes = [
  {
    path: "/admin",
    component: lazy(() => import("../src/Admin/Admin")),
  },
];
const globalClientRoutes = [
  {
    path: "/client",
    component: lazy(() => import("../src/Client/Client")),
  },
  {
    path: "/termsAndConditions",
    component: lazy(() => import("@iso/containers/Global/TermsAndCondition")),
  },
  {
    path: "/about-us",
    component: lazy(() => import("@iso/components/AboutUs")),
  },
  {
    path: "/FAQ",
    component: lazy(() => import("@iso/components/Faq")),
  },
  {
    path: "/contact-us",
    component: lazy(() => import("@iso/components/ContactUs")),
  },
  {
    path: "/privacy-policy",
    component: lazy(() => import("@iso/components/PrivacyPolicy")),
  },
  {
    path: "/fb",
    component: lazy(() => {
      window.location.href =
        'https://www.facebook.com/Marketplacedk-104854671569255/';
      return null;
    }),
  },
  {
    path: "/insta",
    component: lazy(() => {
      window.location.href =
        'https://instagram.com/Marketplace.dk?utm_medium=copy_link';
      return null;
    }),
  },
];

export default function Routes() {
  const activeApp =
    localStorage.getItem("activeApp") || sessionStorage.getItem("activeApp");
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router history={history} basename={"/portal"}>
          <Switch>
            {globalRoutes.map((route, index) => (
              <Route key={index} path={`${route.path}`} exact={route.exact}>
                {!activeApp ? (
                  <route.component />
                ) : activeApp === "admin" ? (
                  <Redirect to="/admin" />
                ) : (
                  <Redirect to="/client/task" />
                )}
              </Route>
            ))}
            {globalAdminRoutes.map((route, index) => (
              <Route key={index} path={`${route.path}`} exact={route.exact}>
                {!activeApp ? (
                  <route.component />
                ) : activeApp === "admin" ? (
                  <route.component />
                ) : (
                  <Redirect to="/client/task" />
                )}
              </Route>
            ))}
            {globalClientRoutes.map((route, index) => (
              <Route key={index} path={`${route.path}`} exact={route.exact}>
                {!activeApp ? (
                  <route.component />
                ) : activeApp === "admin" ? (
                  <Redirect to="/portal/admin" />
                ) : (
                  <route.component />
                )}
              </Route>
            ))}
            <Route
              path="*"
              exact={true}
              component={lazy(() => import("./containers/Global/404/404"))}
            />
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
}
