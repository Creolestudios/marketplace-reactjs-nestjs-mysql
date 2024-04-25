import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "antd";
import useWindowSize from "../../library/helpers/useWindowSize";
// import siteConfig from "@iso/config/site.config";
import appActions from "../../redux/app/action";

import ClientRoutes from "./ClientRoutes";
import { SpinCustom } from "@iso/components/uielements/spin";

import { DashboardContainer, DashboardGlobalStyles } from "./Dashboard.styles";

const { Content, Footer } = Layout;
const { toggleAll } = appActions;
const styles = {
  layout: { flexDirection: "row", overflowX: "hidden" },
  content: {
    padding: "70px 0 0",
    flexShrink: "0",
    background: "#f1f3f6",
    position: "relative",
  },
  footer: {
    background: "#ffffff",
    textAlign: "center",
    borderTop: "1px solid #ededed",
  },
};

export default function Dashboard() {
  const dispatch = useDispatch();

  const appHeight = useSelector((state) => state.App.height);
  const globalLoader = useSelector((state) => state.App.globalLoader);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    // dispatch(getMyAccount());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);

  return (
    <SpinCustom spinning={globalLoader > 0}>
      <ClientRoutes />
    </SpinCustom>
  );
}
