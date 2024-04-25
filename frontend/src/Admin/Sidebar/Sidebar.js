import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Layout } from "antd";
import options from "./options";
import Scrollbars from "../../components/utility/customScrollBar";
import Menu from "../../components/uielements/menu";
// import siteConfig from '@iso/config/site.config';
import appActions from "../../redux/app/action";
import Logo from "../../components/utility/logo";
import SidebarWrapper from "./Sidebar.styles";
import SidebarMenu from "./SidebarMenu";
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
import { Link } from "react-router-dom";

const { Sider } = Layout;

const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} = appActions;

export default function Sidebar() {
  const dispatch = useDispatch();
  const history = useHistory();

  const checkRoute = React.useCallback(() => {
    options.map((singleOption) => {
      if (singleOption.children && singleOption.children.length > 0) {
        singleOption.children.map((data) => {
          if (
            data.key ===
            history.location.pathname.split("/").slice(3, 5).join("/")
          ) {
            dispatch(changeOpenKeys([singleOption.key]));
            dispatch(changeCurrent([data.key]));
          }
          return null;
        });
      }
      return null;
    });
  }, [dispatch, history]);

  React.useEffect(() => {
    checkRoute();
  }, [history.location.pathname, checkRoute]);

  const {
    view,
    openKeys,
    collapsed,
    openDrawer,
    current,
    height,
  } = useSelector((state) => state.App);
  const customizedTheme = useSelector(
    (state) => state?.ThemeSwitcher?.sidebarTheme
  );

  function handleClick(e) {
    dispatch(changeCurrent([e.key]));
    if (view === "MobileView") {
      setTimeout(() => {
        dispatch(toggleCollapsed());
        // dispatch(toggleOpenDrawer());
      }, 100);

      // clearTimeout(timer);
    }
  }
  function onOpenChange(newOpenKeys) {
    const latestOpenKey = newOpenKeys.find(
      (key) => !(openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = openKeys.find(
      (key) => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch(changeOpenKeys(nextOpenKeys));
  }
  const getAncestorKeys = (key) => {
    const map = {
      sub3: ["sub2"],
    };
    return map[key] || [];
  };

  const isCollapsed = collapsed && !openDrawer;
  const mode = isCollapsed === true ? "vertical" : "inline";
  const onMouseEnter = (event) => {
    if (collapsed && openDrawer === false) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const onMouseLeave = () => {
    if (collapsed && openDrawer === true) {
      dispatch(toggleOpenDrawer());
    }
    return;
  };
  const styling = {
    backgroundColor: customizedTheme?.backgroundColor,
  };
  const submenuStyle = {};

  const submenuColor = { color: "#fff" };
  return (
    <SidebarWrapper>
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={isCollapsed}
        width={240}
        className="isomorphicSidebar"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={styling}
      >
        <Link to={`/admin/dashboard/home`}>
          <Logo collapsed={isCollapsed} isAdmin />
        </Link>
        <Scrollbars style={{ height: height - 70 }}>
          <div className="menu-version-container">
            <Menu
              onClick={handleClick}
              theme="dark"
              className="isoDashboardMenu"
              mode={mode}
              openKeys={isCollapsed ? [] : openKeys}
              selectedKeys={current}
              onOpenChange={onOpenChange}
            >
              {options.map((singleOption) => (
                <SidebarMenu
                  key={singleOption.key}
                  submenuStyle={submenuStyle}
                  submenuColor={submenuColor}
                  singleOption={singleOption}
                />
              ))}
            </Menu>
            <div style={{ display: "flex" }}>
              <span
                style={{
                  paddingLeft: 24,
                  color: "white",
                  paddingBottom: 15,
                }}
              >
                version: a
              </span>
            </div>
          </div>
        </Scrollbars>
      </Sider>
    </SidebarWrapper>
  );
}
