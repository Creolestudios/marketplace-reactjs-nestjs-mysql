import React, { useEffect } from "react";
import { Popover, Badge } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TopbarDropdownWrapper from "./TopbarDropdown.styles";
import IntlMessages from "../../components/utility/intlMessages";
import belIcon from "../../assets/images/icon/bel-icon.svg";
import profileAction from "@iso/redux/admin/profile/actions";
const { viewNotification, markNotification } = profileAction;

export default function TopbarNotification() {
  const [visible, setVisiblity] = React.useState(false);
  const customizedTheme = useSelector(
    (state) => state.ThemeSwitcher.topbarTheme
  );
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewNotification());
  }, []);
  let Notification = {};
  let unReadNotification = [];
  Notification = useSelector(
    (state) => state.AdminProfile.viewNotificationData
  );
  unReadNotification =
    Notification && Notification.notifications
      ? Notification.notifications.filter((dat) => dat.read_flag === 0)
      : [];
  function handleVisibleChange() {
    setVisiblity((visible) => !visible);
  }

  const callMarkRead = (data) => {
    handleVisibleChange()
    dispatch(
      markNotification({
        notification_id: [data.id],
        read_all: false,
      })
    );
    if(data.routes?.id){
      data.routes && data.routes.type === 8
      ? history.push(`/admin/alltasks/reported-tasks/${data.routes.id}`)
      : data.routes && data.routes.type === 11
      ? history.push(`/admin/users/view-user/${data.routes.id}`)
      : history.push(`/admin/alltasks/tasks/${data.routes.id}`);
    }
   
  };

  return (
    <>
      {unReadNotification && unReadNotification.length > 5 ? (
        <Badge
          count={unReadNotification && unReadNotification.length}
          overflowCount={unReadNotification && unReadNotification.length - 5}
        ></Badge>
      ) : (
        <Badge count={unReadNotification && unReadNotification.length}></Badge>
      )}
      <Popover
        className="notification-wrapper"
        content={
          <TopbarDropdownWrapper className="topbarNotification">
            <div className="isoDropdownHeader">
              <h3>
                <IntlMessages id="sidebar.notification" />
              </h3>
            </div>
            <div className="isoDropdownBody">
              {Notification &&
              Notification.notifications &&
              Notification.notifications.length !== 0 ? (
                Notification &&
                Notification.notifications &&
                Notification.notifications.map(
                  (notification, index) =>
                    index < 5 && (
                      <span
                        // className={
                        //   notification.read_flag === 0
                        //     ? "isoDropdownListItem Bold"
                        //     : "isoDropdownListItem"
                        // }
                        key={notification.id}
                        onClick={() => callMarkRead(notification)}
                      >
                        {/* <h5>{notification.name}</h5> */}
                        <p  className={
                          notification.read_flag === 0
                            ? "isoDropdownListItem Bold"
                            : "isoDropdownListItem"
                        }>{notification.notification_text}</p>
                      </span>
                    )
                )
              ) : (
                <p className="no-data">No data found</p>
              )}
            </div>
            <a className="isoViewAllBtn" href="/portal/admin/notification" onClick={  () =>  {dispatch(
      markNotification({
        "notification_id": [
       
      ],
        read_all: true,
      })
    )}}>
              <IntlMessages id="topbar.viewAll" />
            </a>
          </TopbarDropdownWrapper>
        }
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
        placement="bottomLeft"
      >
        <div className="belicon">
          <img
            className="profileDropdownImage"
            src={belIcon}
            alt="dropdown icon"
          />
        </div>
      </Popover>
    </>
  );
}
