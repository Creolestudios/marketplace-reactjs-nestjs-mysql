import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import appActions from "../../redux/app/action";
import TopbarUser from "./TopbarUser";
import TopbarWrapper from "./Topbar.styles";
import TopbarNotification from "./TopbarNotification";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";

const { Header } = Layout;
const { toggleCollapsed } = appActions;

export default function Topbar() {
  const [selectedItem, setSelectedItem] = React.useState("");
  const customizedTheme = useSelector(
    (state) => state?.ThemeSwitcher?.topbarTheme
  );
  const { collapsed, openDrawer } = useSelector((state) => state.App);
  const dispatch = useDispatch();

  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [
    dispatch,
  ]);

  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: customizedTheme?.backgroundColor,
    position: "fixed",
    width: "100%",
    height: 70,
  };
  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? "isomorphicTopbar collapsed" : "isomorphicTopbar"
        }
      >
        <div className="isoLeft">
          <button
            className={
              isCollapsed ? "triggerBtn menuCollapsed" : "triggerBtn menuOpen"
            }
            style={{ color: "#758287" }}
            onClick={handleToggle}
          >
            <MenuIcon />
          {/* <span className="nav-line"></span> */}
          </button>
        </div>

        <ul className="isoRight">
          {/* <li className="isoSearch">
            <TopbarSearch />
          </li> */}

          <li
            onClick={() => setSelectedItem("notification")}
            className={selectedItem ? "isoNotify active belicon" : "isoNotify belicon"}
          >
            <TopbarNotification />
          </li>

          <li
            onClick={() => setSelectedItem("user")}
            className="isoUser isoMainUserPopoverContainer"
          >
            <TopbarUser />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
}
