import styled from "styled-components";
import { palette } from "styled-theme";
import { transition, borderRadius } from "../../library/helpers/style_utils";
import WithDirection from "../../library/helpers/rtl";
import DashboardIcon from "../../assets/images/icon/billing-icon.svg";
import BillingIcon from "../../assets/images/icon/billing-icon.svg";
import BrandappIcon from "../../assets/images/icon/branded-app-icon.svg";
import AppDefaultIcon from "../../assets/images/icon/app-defaults-icon.svg";
import DiscountsIcon from "../../assets/images/icon/discounts-icon.svg";
import SubscriptionPlanIcon from "../../assets/images/icon/subscription-plans-icon.svg";
import SupportIcon from "../../assets/images/icon/support-white-icon.svg";
import UserIcon from "../../assets/images/icon/users-icon.svg";
import MessageIcon from "../../assets/images/icon/messages-icon.svg";

const SidebarWrapper = styled.div`
  .isomorphicSidebar {
    z-index: 1000;
    background: #fcae1d;
    width: 280px;
    flex: 0 0 280px;

    .menu-version-container {
      position: absolute;
      inset: 0px;
      margin-right: 0px;
      margin-bottom: 0px;
      align-content: space-between;
      display: flex;
      flex-wrap: wrap;
    }
    .scrollarea {
      height: calc(100vh - 70px);
    }

    @media only screen and (max-width: 767px) {
      width: 240px !important;
      flex: 0 0 240px !important;
    }

    &.ant-layout-sider-collapsed {
      @media only screen and (max-width: 767px) {
        width: 0;
        min-width: 0 !important;
        max-width: 0 !important;
        flex: 0 0 0 !important;
      }
    }

    .isoLogoWrapper {
      height: 70px;
      margin: 0;
      padding: 0 10px;
      text-align: center;
      overflow: hidden;
      ${borderRadius()};
      background: #e09811;

      h3 {
        a {
          font-size: 21px;
          font-weight: 300;
          line-height: 70px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: ${palette("text", 5)};
          display: block;
          text-decoration: none;
        }
      }
    }

    &.ant-layout-sider-collapsed {
      .isoLogoWrapper {
        padding: 0;

        h3 {
          a {
            font-size: 27px;
            font-weight: 500;
            letter-spacing: 0;
          }
        }
      }
    }

    .isoDashboardMenu {
      padding-top: 35px;
      padding-bottom: 35px;
      background: transparent;

      a {
        text-decoration: none;
        font-weight: 400;
      }

      .ant-menu-item {
        width: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        padding: 0 24px;
        margin: 0;
      }

      .isoMenuHolder {
        display: flex;
        align-items: center;

        i {
          width: 20px;
          height: 25px;
          background-size: 100% 100%;
          color: inherit;
          margin: ${(props) =>
            props["data-rtl"] === "rtl" ? "0 0 0 30px" : "0 30px 0 0"};
          ${transition()};
          &.dashboard-icon {
            background: url(${DashboardIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.billing-icon {
            background: url(${BillingIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.appdefault-icon {
            background: url(${AppDefaultIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.brandapp-icon {
            background: url(${BrandappIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.discount-icon {
            background: url(${DiscountsIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.subscription-plans-icon {
            background: url(${SubscriptionPlanIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.user-icon {
            background: url(${UserIcon}) center no-repeat;
            background-size: 100% 100%;
            filter: brightness(2);
          }
          &.messages-icon {
            background: url(${MessageIcon}) center no-repeat;
            background-size: 100% 100%;
          }
          &.support-icon {
            background: url(${SupportIcon}) center no-repeat;
            background-size: 100% 100%;
          }
        }
      }

      .anticon {
        font-size: 18px;
        margin-right: 30px;
        color: inherit;
        ${transition()};
      }

      .nav-text {
        font-size: 14px;
        color: inherit;
        font-weight: 400;
        ${transition()};
      }

      .ant-menu-item-selected {
        background-color: #e09811;
        .anticon {
          color: #fff;
        }

        i {
          color: #fff;
        }

        .nav-text {
          color: #fff;
        }
      }

      > li {
        &:hover {
          i,
          .nav-text {
            color: #ffffff;
          }
        }
      }
    }

    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      background: ${palette("secondary", 5)};
    }

    .ant-menu-submenu-inline,
    .ant-menu-submenu-vertical {
      > .ant-menu-submenu-title {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0 24px;

        > span {
          display: flex;
          align-items: center;
        }

        .ant-menu-submenu-arrow {
          left: ${(props) => (props["data-rtl"] === "rtl" ? "25px" : "auto")};
          right: ${(props) => (props["data-rtl"] === "rtl" ? "auto" : "25px")};
          opacity: 1;

          &:before,
          &:after {
            width: 8px;
            ${transition()};
          }

          &:before {
            transform: rotate(-45deg) translateX(3px);
          }

          &:after {
            transform: rotate(45deg) translateX(-3px);
          }

          ${
            "" /* &:after {
            content: '\f123';
            font-family: 'Ionicons' !important;
            font-size: 16px;
            color: inherit;
            left: ${props => (props['data-rtl'] === 'rtl' ? '16px' : 'auto')};
            right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '16px')};
            ${transition()};
          } */
          };
        }

        &:hover {
          .ant-menu-submenu-arrow {
            opacity: 1;
            &:before,
            &:after {
              color: #ffffff;
            }
          }
        }
      }

      .ant-menu-inline,
      .ant-menu-submenu-vertical {
        > li:not(.ant-menu-item-group) {
          padding-left: ${(props) =>
            props["data-rtl"] === "rtl" ? "0px !important" : "74px !important"};
          padding-right: ${(props) =>
            props["data-rtl"] === "rtl" ? "74px !important" : "0px !important"};
          font-size: 13px;
          font-weight: 400;
          margin: 0;
          color: inherit;
          ${transition()};

          &:hover {
            a {
              color: #ffffff !important;
            }
          }
        }

        .ant-menu-item-group {
          padding-left: 0;

          .ant-menu-item-group-title {
            padding-left: 100px !important;
          }
          .ant-menu-item-group-list {
            .ant-menu-item {
              padding-left: 125px !important;
            }
          }
        }
      }

      .ant-menu-sub {
        box-shadow: none;
        background-color: transparent !important;
      }

      &.ant-menu-submenu-open {
        .ant-menu-submenu-arrow {
          transform: rotate(180deg);
          opacity: 1;
        }
      }
    }

    &.ant-layout-sider-collapsed {
      .nav-text {
        display: none;
      }

      .ant-menu-submenu-inline > {
        .ant-menu-submenu-title:after {
          display: none;
        }
      }

      .ant-menu-submenu-vertical {
        > .ant-menu-submenu-title:after {
          display: none;
        }

        .ant-menu-sub {
          background-color: transparent !important;

          .ant-menu-item {
            height: 35px;
          }
        }
      }
    }
  }
`;

export default WithDirection(SidebarWrapper);
