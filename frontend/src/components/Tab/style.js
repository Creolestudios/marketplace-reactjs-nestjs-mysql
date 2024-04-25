import styled from "styled-components";
import { size } from "../../size";

export const TabWrapper = styled.div`
  .ant-tabs {
    color: #423f3f;
    @media ${size["xs"]} {
      margin: 0 0 0;
    }
    .ant-tabs-nav {
      margin: 0;
      .ant-tabs-nav-wrap {
        background: #fff;
        border: none;
        .ant-tabs-tab {
          margin: 0;
          padding: 14px 10px;
          font-size: 16px;
          border-radius: 15px;
          -webkit-border-radius: 15px;
          transition: all 0.3s linear;
          .ant-tabs-tab-btn {
            line-height: 22px;
          }
          @media ${size["xxl"]} {
            font-size: 15px;
            padding: 11px 10px;
          }
          @media ${size["xl"]} {
            padding: 10px;
          }
          @media ${size["md"]} {
            margin: 0;
            font-size: 14px;
          }
          @media ${size["sm"]} {
            margin: 0;
          }
          @media ${size["xs"]} {
            font-size: 13px;
            margin: 0 8px 0 0;
            .ant-tabs-tab-btn {
              line-height: normal;
            }
          }
          &.ant-tabs-tab-active {
            background: #e9f9ff;
            color: #2aabe1;
            @media ${size["xs"]} {
              padding: 10px;
            }
            .ant-tabs-tab-btn {
              color: #2aabe1;
            }
          }
          &:hover {
            color: #2aabe1;
          }
        }
        .ant-tabs-ink-bar {
          display: none;
        }
      }
    }
    .ant-tabs-content-holder {
      position: absolute;
      top: 75px;
    }
  }
`;
