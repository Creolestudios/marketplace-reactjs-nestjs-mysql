import styled from "styled-components";
import { palette } from "styled-theme";

const AntTab = (ComponentName) => styled(ComponentName)`
  &.ant-tabs {
    &:not(.ant-tabs-vertical) {
      > .ant-tabs-content-animated {
        display: ${(props) => (props["data-rtl"] === "rtl" ? "block" : "flex")};
      }
    }

    .ant-tabs-nav {
      .ant-tabs-tab {
        margin: ${(props) =>
          props["data-rtl"] === "rtl" ? "0 0 0 24px" : "0 24px 0 0"};

        .anticon:not(.anticon-close) {
          margin: ${(props) =>
            props["data-rtl"] === "rtl" ? "0 0 0 8px" : "0 8px 0 0"};

          &.anticon-close {
            right: ${(props) =>
              props["data-rtl"] === "rtl" ? "inherit" : "2px"};
            left: ${(props) =>
              props["data-rtl"] === "rtl" ? "2px" : "inherit"};
          }
        }
      }
    }

    .ant-tabs-tab-prev {
      left: 0;
      right: inherit;
      transform: ${(props) =>
        props["data-rtl"] === "rtl" ? "rotate(180deg)" : "rotate(0)"};
    }

    .ant-tabs-tab-next {
      left: inherit;
      right: 2px;
      transform: rotate(0);
    }

    &.ant-tabs-vertical {
      .ant-tabs-tab-prev,
      .ant-tabs-tab-next {
        transform: rotate(0);
      }
    }
  }
`;

export const CustomTabsHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 30px 20px 0;
  background: #fff;
  // border-bottom: 1px solid #cdcdcd;
  
  @media (max-width: 600px) {
    padding: 20px 20px 0;
  }
  .customTabHeaderItems {
    border-bottom: 1px solid #cdcdcd;
    width:100%;
    display: flex;
    margin: 0 0px;
    overflow: auto;
    .customTabHeaderItem {
      cursor: pointer;
      padding: 0px 0px 11px;
      margin-right: 30px ;
      
      color: ${palette("grayscale", 12)};
      white-space: nowrap;
      &.activeTabKey {
        position: relative;
        color: #2aabe1;
        border-bottom: 2px solid #2aabe1;
        text-shadow: 0 0 1.2px #2aabe1;
        // border-radius:2px;
        &:after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
        }
      }
    }

    @media (max-width: 400px) {
      width: 100%;
      margin: 0px;
      .customTabHeaderItem {
        padding: 0 0 10px;
        margin: 10px 10px 0px;

        &:first-child {
          margin-left: 0px;
        }
      }
    }
  }
`;

export const CustomTabsPanelWrapper = styled.div`
  display: flex;
  width: 100%;
`;

export const CustonTabPanelWrapper = styled.div`
  display: block !important;
  width: 100%;
`;

export default AntTab;
