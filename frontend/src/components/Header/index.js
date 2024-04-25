import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Menu, Dropdown } from "antd";
import logo from "../../assets/images/logo.svg";
import {
  HeaderContainer,
  Logo,
  MenuWrapper,
  HeaderRightBlock,
  HumbergerMenu,
} from "./style";
import { Link, useHistory, useLocation } from "react-router-dom";
import { MenuLink } from "../../CommonStyle";
import IntlMessages from "@iso/components/utility/intlMessages";
import chatAction from "@iso/redux/chat/actions";
import languageAction from "@iso/redux/languageSwitcher/actions";
import { AppConstant } from "@iso/config/constant";
import noificationActions from "@iso/redux/notification/actions";
import filterAction from "@iso/redux/userTypeAndFilter/actions";

const { chatListingHistory, markNotification } = chatAction;
const { changeLanguage } = languageAction;
const Header = (props) => {
  const { getNotification } = noificationActions;

  const dispatch = useDispatch();
  useEffect(() => {
    sessionStorage.getItem("is_guest") === null && dispatch(
      chatListingHistory({
        chat_by: 2,
        chat_type: 1,
        search: "",
      })
    );
  }, []);
  let chatData = {};
  chatData = useSelector((state) => state.Chat.chatData);
  let selectedLanguage = useSelector(
    (state) => state?.LanguageSwitcher?.language
  );
  let count =
    chatData &&
    chatData.chatData &&
    chatData.chatData.reduce((a, b) => a + b.unreadCount, 0);
  const location = useLocation();
  const { pathname } = location;
  let testPath = pathname.split("/");
  let selectedPath = pathname.split("/").slice(-1)[0];
  const history = useHistory();
  const filterRef = useRef();

  const [humbergerActive, sethumbergerActive] = useState(false);
  const {  clearAllPages  } = filterAction;

  const { unReadNotification } = useSelector((state) => state.Notification);
  const userStatus = useState((state) => state?.Auth?.userStatus);
  const handleLogout = () => {
    dispatch(
      clearAllPages()
    );
    dispatch(changeLanguage("en"));
    localStorage.clear()
    sessionStorage.clear()
    history.push("/client");
  };
 const handleSidebar = () => {
  sethumbergerActive(false);
  filterRef.current.style.display = "block";
  document.body.style.overflow = humbergerActive ? "" : "block";
 }
  const menu = (
    <Menu className="user-dropdown">
      <Menu.Item key={AppConstant.key.Zero}>
        <Link to="/client/my-profile/profile">
          <MenuLink value="My Account">
            <IntlMessages id="page.myAccountTitle" />
          </MenuLink>
        </Link>
      </Menu.Item>
      <Menu.Item key={AppConstant.key.One}>
        <Link to="/client/profile-setting">
          <IntlMessages id="page.profile" />
        </Link>
      </Menu.Item>
      <Menu.Item key={AppConstant.key.Two}>
        <Link to="/client/my-card">
          <IntlMessages id="page.mycard" />
        </Link>
      </Menu.Item>
      <Menu.Item key={AppConstant.key.Three}>
        <Link to="/client/setup-bankac">
          <IntlMessages id="page.mystripe" />
        </Link>
      </Menu.Item>
      <Menu.Item key={AppConstant.key.Four}>
        <Link to="/client/payment-history">
          <IntlMessages id="page.payment" />
        </Link>
      </Menu.Item>
      <Menu.Item key={AppConstant.key.Five}>
        <Link to="/client/password-setting">
          <IntlMessages id="page.setting" />
        </Link>
      </Menu.Item>
      <Menu.Item key={AppConstant.key.Six}>
        <MenuLink onClick={handleLogout}>
          <IntlMessages id="page.logout" />
        </MenuLink>
      </Menu.Item>
    </Menu>
  );
  const handleLanguage = (e) => {
    sessionStorage.getItem("is_guest") === null && userStatus === 1 && dispatch(getNotification());
    dispatch(changeLanguage(e));
  };

  const menuFlag = (
    <Menu className="user-dropdown">
      <Menu.Item
        key={AppConstant.key.Zero}
        onClick={() => handleLanguage("en")}
      >
        <MenuLink value="en">English</MenuLink>
      </Menu.Item>
      <Menu.Item key={AppConstant.key.One} onClick={() => handleLanguage("de")}>
        <MenuLink value="de">Danish</MenuLink>
      </Menu.Item>
    </Menu>
  );

  const chatRoomid =
  
    chatData?.chatData?.[0]?.room_id
  return (
    <HeaderContainer>
      <HumbergerMenu
        className={
          humbergerActive
            ? "humberger-menu active-humberger-menu"
            : "humberger-menu"
        }
        onClick={() => {
          sethumbergerActive(!humbergerActive);
          filterRef.current.style.display = humbergerActive ? "" : "block";
          document.body.style.overflow = humbergerActive ? "" : "hidden";
        }}
      >
        <span className="bar"> </span> <span className="bar"> </span>
        <span className="bar"> </span>
      </HumbergerMenu>
      <Link to="/client/home">
        {" "}
        <Logo src={logo} alt="logo" />{" "}
      </Link>
      <MenuWrapper
        className={humbergerActive ? "mobile-menu" : ""}
        ref={filterRef}
      >
        <Menu mode="horizontal">
          <Menu.Item className={testPath.includes("home") ? "active" : ""}>
            <MenuLink>
              <Link
                to="/client/home"
                onClick={handleSidebar}
              >
                <IntlMessages id="Header.Home" />
              </Link>
            </MenuLink>
          </Menu.Item>
          <Menu.Item
            className={
              testPath.includes("task") || testPath.includes("task-details")
                ? "active"
                : ""
            }
          >
            <MenuLink>
              <Link
                to="/client/task"
                onClick={handleSidebar}
              >
                <IntlMessages id="Header.MyTask" />
              </Link>
            </MenuLink>
          </Menu.Item>
          <Menu.Item
            className={testPath.includes("Specialists") ? "active" : ""}
          >
            <MenuLink>
              <Link
                to="/client/Specialists"
                onClick={handleSidebar}
              >
                <IntlMessages id="Header.Specialists" />
              </Link>
            </MenuLink>
          </Menu.Item>
        </Menu>
      </MenuWrapper>
      <HeaderRightBlock>
        <Menu>
          <Menu.Item>
            <Dropdown overlay={menuFlag} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <img src={selectedLanguage.icon} className="selected-flag" />
              </a>
            </Dropdown>
          </Menu.Item>
          {sessionStorage.getItem("is_guest") === null && <>
          <Menu.Item>
            <Link
              to={
                chatRoomid || userStatus === 3
                  ? `/client/inbox/${chatRoomid}`
                  : "/client/inbox/1"
              }
            >
              <MenuLink className="icon-message">
                <i className="icon-envelop"> </i>
                <Badge
                  count={count}
                  overflowCount={count > 9 ? count - 9 : count}
                ></Badge>
              </MenuLink>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <MenuLink onClick={props.visibleSidebar}>
              <i className="icon-notification"> </i>
              {unReadNotification.length > 1 ? (
                <Badge
                  count={
                    unReadNotification.length + 1 > 9
                      ? "9+"
                      : unReadNotification.length - 1 + "+"
                  }
                  overflowCount={unReadNotification.length}
                ></Badge>
              ) : unReadNotification.length == 1 ? (
                <Badge count="1"></Badge>
              ) : (
                ""
              )}
            </MenuLink>
          </Menu.Item>
          <Menu.Item>
            <Dropdown
              overlayClassName="header-menu-dropdown"
              overlay={menu}
              trigger={["click"]}
            >
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <i className="icon-Union"></i>
              </a>
            </Dropdown>
          </Menu.Item>
          </>}
      
        </Menu>
      </HeaderRightBlock>
    </HeaderContainer>
  );
};
export default Header;
