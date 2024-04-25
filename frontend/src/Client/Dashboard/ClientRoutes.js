import React, { lazy, Suspense, useState, useEffect } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import noificationActions from "@iso/redux/notification/actions";
import { Drawer, Button } from "antd";
import Notification from "@iso/components/Notification";
import Loader from "@iso/components/utility/loader";
import Header from "@iso/components/Header";
import { Link } from "react-router-dom";
import IntlMessages from "@iso/components/utility/intlMessages";
import {useSelector} from "react-redux";
const routes = [
  {
    path: "home",
    component: lazy(() => import("@iso/containers/Client/SpecialistsDetails")),
    exact: true,
  },
  {
    path: "all-reviews",
    component: lazy(() => import("@iso/containers/Client/AllReviews")),
    exact: true,
  },
  {
    path: "bids/:id",
    component: lazy(() => import("@iso/containers/Client/Bids")),
    exact: true,
  },
  {
    path: "payment-card/:task_id/:bid_id",
    component: lazy(() => import("@iso/containers/Client/PaymentCard")),
    exact: true,
  },
  {
    path: "create-task",
    component: lazy(() => import("@iso/containers/Client/CreateTask")),
    exact: true,
  },
  {
    path: "create-task/:id",
    component: lazy(() => import("@iso/containers/Client/EditTask")),
    exact: true,
  },
  {
    path: "find-task",
    component: lazy(() => import("@iso/containers/Client/FindTask")),
    exact: true,
  },
  {
    path: "find-task-detail",
    component: lazy(() => import("@iso/containers/Client/FindTaskDetail")),
    exact: true,
  },
  {
    path: "inbox/:roomId",
    component: lazy(() => import("@iso/containers/Client/Inbox")),
    exact: true,
  },
  {
    path: "my-card",
    component: lazy(() => import("@iso/containers/Client/MyCards")),
    exact: true,
  },
  {
    path: "checkout",
    component: lazy(() => import("@iso/containers/Client/Checkout")),
    exact: true,
  },
  {
    path: "my-portfolio-delete-album",
    component: lazy(() =>
      import("@iso/containers/Client/MyPortfolioDeleteAlbum")
    ),
    exact: true,
  },
  {
    path: "my-profile/:tabkey",
    component: lazy(() => import("@iso/containers/Client/MyProfile")),
    exact: true,
  },
  {
    path: "payment-history",
    component: lazy(() => import("@iso/containers/Client/PaymentHistory")),
    exact: true,
  },
  {
    path: "portfolio",
    component: lazy(() => import("@iso/containers/Client/Portfolio")),
    exact: true,
  },
  {
    path: "profile-setting",
    component: lazy(() => import("@iso/containers/Client/ProfileSetting")),
    exact: true,
  },
  {
    path: "specialists",
    component: lazy(() => import("@iso/containers/Client/Specialists")),
    exact: true,
  },

  {
    path: "user-profile/:id/:tabkey",
    component: lazy(() => import("@iso/containers/Client/UserProfile")),
    exact: true,
  },
  {
    path: "task",
    component: lazy(() => import("@iso/containers/Client/Task")),
    exact: true,
  },
  {
    path: "task-cancelled",
    component: lazy(() => import("@iso/containers/Client/TaskCancelled")),
    exact: true,
  },
  {
    path: "task-detail-reported",
    component: lazy(() => import("@iso/containers/Client/TaskDetailReported")),
    exact: true,
  },
  {
    path: "task-details/:userType/:id",
    component: lazy(() => import("@iso/containers/Client/TaskDetails")),
    exact: true,
  },
  {
    path: "task-details-specialists/:userType/:id",
    component: lazy(() =>
      import("@iso/containers/Client/TaskDetailsSpecialists")
    ),
    exact: true,
  },

  {
    path: "task-specialists/:id",
    component: lazy(() => import("@iso/containers/Client/TaskSpecialists")),
    exact: true,
  },
  {
    path: "create-album",
    component: lazy(() => import("@iso/containers/Client/CreateAlbum")),
    exact: true,
  },
  {
    path: "all-notifications",
    component: lazy(() => import("@iso/containers/Client/AllNotifications")),
    exact: true,
  },
  {
    path: "password-setting",
    component: lazy(() => import("@iso/containers/Client/PasswordSetting")),
    exact: true,
  },
  // {
  //   path: "forgot-password",
  //   component: lazy(() => import("@iso/components/ForgetPassword")),
  //   exact: true,
  // },
  {
    path: "setup-bankac",
    component: lazy(() => import("@iso/containers/Client/SetupBankAccount")),
    exact: true,
  },
];

export default function AppRouter({ pp }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState();
  const { url } = useRouteMatch();
  const { getNotification } = noificationActions;
  let userStatus = useSelector(
    (state) => state?.Auth?.userStatus
  );



  useEffect(() => {

    if(userStatus && userStatus ===1){
      sessionStorage.getItem("is_guest") === null && dispatch(getNotification());
    }
  }, []);

  const onMarkAllAsRead = () => {
    dispatch(
      noificationActions.readNotification({
        read_all: true,
      })
    );
  };

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <Suspense fallback={<Loader />}>
      <Header visibleSidebar={showDrawer} />
      <Switch>
        {routes.map((route, idx) => (
          <Route
            exact={route.exact}
            key={idx}
            path={`${url}/${route.path}`}
            render={(props) => <route.component {...props} />}
          />
        ))}
      </Switch>
      <Drawer
        width={410}
        title={
          <>
            <IntlMessages id="sidebar.notification" />  
            <p
              className="btn btn-clear drawer-link"
              onClick={onMarkAllAsRead}
              // to="/client/task"
            >
            <IntlMessages id="markAsRead" />  
            </p>
          </>
        }
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
        footer={
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Button className="btn btn-border" style={{ marginRight: 8 }}>
            <Link onClick={onClose} to={`/client/all-notifications`}> <IntlMessages id="page.global.viewAll" /></Link>
            </Button>
          </div>
        }
      >
        <Notification onClose={onClose} />
      </Drawer>
    </Suspense>
  );
}