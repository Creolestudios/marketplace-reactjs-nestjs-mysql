import styled from "styled-components";
import { size } from "./size";
import inputIcon from "@iso/assets/images/error.svg";
import infoIcon from "@iso/assets/images/info.svg";

export const PageWrapper = styled.div`
  width: 100%;
  .ant-checkbox {
    margin-top: 0 !important;
  }

  .checkboxFont {
    font-family: Nunito Sans !important;
    font-size: 18px;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #fcae1d !important;
    border-color: #fcae1d !important;
  }

  @media ${size["md"]} {
    .ant-checkbox + span {
      padding-left: 20px;
    }
    .ant-checkbox-group {
      padding: 0 0 0 13px !important;
    }
  }
  /* @media ${size["xs"]} {
    height: calc(100vh - 100px);
  } */
`;

export const PageContainer = styled.div`
  max-width: 1302px;
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
  @media ${size["sm"]} {
    padding: 0 10px;
  }
`;

export const Menu = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 100%;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  height: 100%;
  border-bottom: 3px solid transparent;
  position: relative;
  & + li {
    margin-left: 20px;
  }
  &:after {
    content: "";
    position: absolute;
    bottom: -3px;
    width: 100%;
    background: #2aabe1;
    height: 3px;
    border-radius: 5px 5px 0px 0px;
    opacity: 0;
    transition: all 0.3s linear;
  }
  &.active {
    a {
      color: #2aabe1;
      // font-weight: 700;
      text-shadow: 0 0 0.85px #2aabe1;
    }
    &:after {
      opacity: 1;
    }
  }
`;

export const MenuLink = styled.a`
  color: #423f3f;
  font-size: 16px;
  transition: all 0.3s linear;
  @media ${size["xl"]} {
    font-size: 15px;
  }
  a {
    color: #423f3f;
    transition: all 0.3s linear;
    &:hover {
      color: #2aabe1 !important;
    }
  }
  &:hover {
    color: #2aabe1 !important;
    text-shadow: 0 0 0.85px #2aabe1;
  }
  .icon-profile,
  .icon-pin,
  .icon-delete {
    margin-right: 10px;
    font-size: 14px;
    &:before {
      color: #423f3f;
    }
  }
  &.inbox-dropdown-item {
    &:hover {
      i {
        &::before {
          color: #2aabe1;
        }
      }
    }
  }
`;

export const Content = styled.div`
  padding: 40px 0;
  @media ${size["md"]} {
    padding: 30px 0;
  }
  @media ${size["sm"]} {
    padding: 10px 0 30px;
  }
`;

export const ContentBottom = styled.div`
  display: flex;
  margin-top: 40px;
  @media ${size["md"]} {
    flex-wrap: wrap;
    margin-top: 30px;
  }
  @media ${size["sm"]} {
    margin-top: 20px;
  }
`;

export const TaskTitle = styled.div`
  font-size: 20px;
  line-height: 22px;
  font-weight: 700;
  color: #423f3f;
  text-align: left;
  margin: 0 0 20px;
  cursor: pointer;
  @media ${size["xxl"]} {
    font-size: 18px;
    line-height: 20px;
  }
  @media ${size["md"]} {
    font-size: 16px;
    line-height: 18px;
  }
`;

export const Title = styled.div`
  font-size: 18px;
  margin: 0 0 10px;
  line-height: 18px;
  font-weight: 400;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["sm"]} {
    font-size: 14px;
  }
`;

// for card currunt information badges
export const SuccessSituation = styled.div`
  background: #e9ffef;
  color: #0fd346;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  text-align: center;
  display: inline-block;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
  @media ${size["sm"]} {
    padding: 10px 15px;
  }
`;

export const DangerSituation = styled.div`
  background: #ffe7e9;
  color: #ed4c5c;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: 18px;
  text-transform: capitalize;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  text-align: center;
  display: inline-block;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
  @media ${size["sm"]} {
    padding: 10px 15px;
  }
`;

export const DarkInfoSituation = styled.div`
  background: #e9f9ff;
  color: #0f6ad3;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: 18px;
  text-transform: capitalize;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  text-align: center;
  display: inline-block;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
  @media ${size["sm"]} {
    padding: 10px 15px;
  }
`;

export const InfoSituation = styled.div`
  background: #e7f2ff;
  color: #2aabe1;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: 25px;
  text-transform: capitalize;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  text-align: center;
  display: inline-block;
  @media ${size["xxl"]} {
    font-size: 16px;
    line-height: 23px;
  }
  @media ${size["md"]} {
    font-size: 14px;
    line-height: 21px;
  }
  @media ${size["sm"]} {
    padding: 10px 15px;
  }
`;

export const PurpleSituation = styled.div`
  background: #ffedfc;
  color: #d30fb4;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: 18px;
  text-transform: capitalize;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  text-align: center;
  display: inline-block;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
  @media ${size["sm"]} {
    padding: 10px 15px;
  }
`;

export const PlaceBidSituation = styled.div`
  background: #effeff;
  color: #0fc8d3;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: 18px;
  text-transform: capitalize;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  text-align: center;
  display: inline-block;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
  @media ${size["sm"]} {
    padding: 10px 15px;
  }
`;

export const SuggestedTaskSituation = styled.div`
  background: #e7f2ff;
  color: #0f6ad3;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 400;
  line-height: 18px;
  text-transform: capitalize;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  text-align: center;
  display: inline-block;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
  @media ${size["sm"]} {
    padding: 10px 15px;
  }
`;

export const SuccessText = styled.div`
  color: #0fd346;
  font-weight: 700;
  font-size: 18px;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
`;
export const DangerText = styled.div`
  color: #ed4c5c;
  font-weight: 700;
  font-size: 18px;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
`;

// date
export const Date = styled.div`
  font-size: 18px;
  font-weight: 400;
  white-space: nowrap;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
`;
export const DateView = styled.div`
  font-size: 18px;
  font-weight: 400;
  white-space: nowrap;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
`;

export const Time = styled.div`
  font-size: 18px;
  font-weight: 400;
  white-space: nowrap;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
`;

// button
export const ButtonLink = styled.a`
  padding: 0 30px;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 700;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  background: #fcae1d;
  color: #fff;
  background: #fcae1d;
  border: 1px solid #fcae1d;
  text-transform: uppercase;
  cursor: pointer;
  height: 44px;
  display: flex;
  line-height: 44px;
  transition: all 0.3s linear;
  width: auto;
  @media ${size["xxl"]} {
    font-size: 14px;
  }
  @media ${size["lg"]} {
    padding: 0 20px;
  }
  @media ${size["md"]} {
    height: 38px;
    line-height: 38px;
    font-size: 13px;
  }
  @media ${size["xs"]} {
    padding: 0 16px;
  }
  &:hover {
    background: #fcae1d;
    color: #fff;
    border: 1px solid #fcae1d;
    box-shadow: 0px 10px 25px rgba(252, 174, 29, 0.5);
  }
  &.btn-border {
    background-color: #fff !important;
    background: none;
    color: #fcae1d;
    width: auto;
    &:hover {
      background: none !important;
      color: #fcae1d !important;
      box-shadow: 0px 10px 25px rgba(252, 174, 29, 0.2);
    }
  }
  &.blue-btn-border {
    background-color: #fff !important;
    border: 1px solid #2aabe1 !important;
    color: #2aabe1 !important;
    &:hover {
      box-shadow: 0px 10px 25px rgba(42, 171, 225, 0.2);
    }
  }
  &.danger-btn-border {
    background: none;
    border: 1px solid #ed4c5c !important;
    color: #ed4c5c;
    width: auto;
    &:hover {
      background: none !important;
      color: #ed4c5c !important;
      box-shadow: 0px 10px 25px rgba(237, 76, 92, 0.2);
    }
  }
  &.info-btn-border {
    background: none;
    border: 1px solid #2aabe1 !important;
    color: #2aabe1;
    width: auto;
    &:hover {
      background: none !important;
      color: #2aabe1 !important;
      box-shadow: 0px 10px 25px rgba(42, 171, 225, 0.2);
    }
  }
  &.silver-btn-border {
    background: none;
    border: 1px solid #cdcdcd !important;
    color: #cdcdcd;
    width: auto;
    cursor: not-allowed;
    &:hover {
      background: none !important;
      color: #cdcdcd !important;
      box-shadow: 0px 10px 25px rgba(205, 205, 205, 0.2);
    }
  }
`;

// for text
export const TextDanger = styled.div`
  color: #ed4c5c;
  font-size: 18px;
  font-weight: 700;
  text-transform: capitalize;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
`;

export const TextDarkInfo = styled.div`
  color: #0f6ad3;
  font-size: 18px;
  font-weight: 700;
  text-transform: capitalize;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
`;

export const TextInfo = styled.div`
  color: #2aabe1;
  font-size: 18px;
  font-weight: 700;
  text-transform: capitalize;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
`;

export const SmallTitle = styled.div`
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  margin: 0 0 10px;
  text-align: left;
  color: #758287;
  @media ${size["xxl"]} {
    font-size: 14px;
    line-height: 17px;
  }
  @media ${size["md"]} {
    font-size: 13px;
    line-height: 15px;
    margin: 0 0 5px;
  }
`;

export const PeraGraph = styled.div`
  text-align: left;
  margin: 0;
  font-size: 18px;
  line-height: 25px;
  @media ${size["xxl"]} {
    font-size: 16px;
    line-height: 23px;
  }
  @media ${size["sm"]} {
    font-size: 14px;
    line-height: 20px;
  }
  &.inbox-pera {
    font-size: 18px;
    color: #758287;
    line-height: 25px;
    text-align: center;
    @media ${size["xxl"]} {
      font-size: 16px;
      line-height: 23px;
    }
    @media ${size["sm"]} {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

export const Text = styled.div`
  font-size: 18px;
  text-transform: capatalize;
  text-align: left;
  color: #423f3f;
  font-weight: 400;
  @media ${size["xxl"]} {
    font-size: 17px;
  }
  @media ${size["md"]} {
    font-size: 15px;
  }
  @media ${size["xs"]} {
    font-size: 14px;
  }
  &.yellow {
    color: #fcae1d;
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 10px;
    @media ${size["md"]} {
      font-size: 14px;
    }
    @media ${size["xs"]} {
      font-size: 13px;
    }
  }
  &.task-completed {
    font-weight: 700;
  }
`;
export const TextBg = styled.div`
  color: #758287;
  font-size: 18px;
  font-weight: 400;
  padding: 10px 20px;
  background: #f8fafb;
  border-radius: 30px;
  -webkit-border-radius: 30px;
  @media ${size["xxl"]} {
    font-size: 16px;
    padding: 10px 15px;
  }
  @media ${size["md"]} {
    font-size: 15px;
  }
  @media ${size["xs"]} {
    font-size: 14px;
  }
  &.service {
    margin-bottom: 10px;
    & + .service {
      margin-left: 10px;
    }
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  .btn {
    & + .btn {
      margin-left: 10px;
    }
    &.btn-cancel {
      background: none !important;
      border: none;
      color: #758287;
      &:hover {
        color: #fcae1d !important;
      }
    }
  }
  &.Category-btn {
    justify-content: space-between;
    margin: 0 0 40px;
    @media ${size["md"]} {
      margin: 0 0 20px;
    }
    .btn {
      &.sub-category {
        @media ${size["xs"]} {
          position: absolute;
          top: 260px;
          margin: 0;
        }
      }
    }
    &.head-Category {
      margin-bottom: 0;
      flex-wrap: wrap;
      align-items: baseline;
      .btn {
        margin-bottom: 0;
        margin-right: 10px;
        @media ${size["xs"]} {
          margin-bottom: 15px;
        }
        &.sub-category {
          position: unset;
        }
        &:last-child {
          margin: 0;
        }
      }
    }
  }
`;

export const FormWrapper = styled.div`
  &.service-modal {
    form {
      padding: 0 0 20px;
      .btn-wrapper {
        margin-bottom: 0;
        .btn-cancel {
          padding: 0 10px;
          &:hover {
            box-shadow: none;
            color: #758287;
          }
          &:after {
            display: none;
          }
        }
      }
    }
  }
  form {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0;
    @media ${size["md"]} {
      padding: 0 0 20px;
    }
    .ant-form-item {
      width: calc(50% - 12px);
      margin-left: 24px;
      margin-bottom: 20px;
      align-content: flex-start;
      @media ${size["sm"]} {
        margin-left: 20px;
        width: calc(50% - 10px);
      }
      @media ${size["xs"]} {
        width: 100%;
        margin-left: 0;
      }
      &:first-child {
        margin-left: 0;
      }
      &:nth-child(2n + 1) {
        margin-left: 0;
      }
      &.w-100 {
        width: 100%;
        margin-left: 0;
      }
      &.w-50 {
        width: calc(50% - 12px);
        margin-right: 24px;
        margin-left: 0;
        @media ${size["sm"]} {
          width: calc(50% - 10px);
          margin-left: 0;
          margin-right: 20px;
        }
        @media ${size["xs"]} {
          width: 100%;
          margin-left: 0;
          margin-right: 0;
        }
      }
      &.m-50 {
        @media ${size["sm"]} {
          width: calc(50% - 5px);
          margin-right: 10px;
          margin-left: 0;
        }
        &.m-remove {
          margin-right: 0;
        }
      }
      &.label-remove {
        label {
          @media ${size["xs"]} {
            display: none;
          }
        }
      }
      .ant-form-item-control {
        justify-content: flex-end;
      }

      &.btn-wrapper {
        margin-top: 20px;
        @media ${size["md"]} {
          margin: 0 0 0;
        }
        .ant-form-item-control-input-content {
          display: flex;
          .btn {
            margin-right: 10px;
            width: auto;
            &:focus {
              background: #fcae1d;
              border: 1px solid #fcae1d;
              color: #fff;
            }
            &.btn-cancel {
              background: none;
              border: none;
              color: #758287;
              &:hover {
                box-shadow: none;
                color: #fcae1d;
              }
            }
          }
        }
      }
      .ant-input-group {
        display: flex;
        align-items: center;
        .ant-picker {
          box-shadow: none;
          &.ant-picker-focused {
            border: 1px solid #40a9ff;
            box-shadow: none !important;
          }
          &:hover {
            border: 1px solid #cdcdcd !important;
          }
          @media ${size["xxl"]} {
            height: 45px;
          }
          @media ${size["md"]} {
            height: 40px;
          }
          .ant-picker-suffix {
            margin-right: 10px;
            position: absolute;
            color: #758287 !important;
            .anticon-calendar {
              display: flex;
              &::before {
                content: "\\e91e";
                color: #758287;
                display: block;
                font-family: "icomoon" !important;
                font-size: 15px;
              }
              svg {
                display: none;
              }
            }
          }
          .ant-picker-clear {
            right: 10px;
          }
          input {
            padding: 0 25px;
            input::placeholder {
              font-style: italic;
              color: #cdcdcd;
            }
          }
        }
        input {
          padding: 0 10px;
          /* width: 140px; */
          input::placeholder {
            font-style: italic;
            color: #cdcdcd;
          }
        }
      }
      &.ant-form-item-has-error,
      &.ant-form-item-has-success {
        .ant-input {
          /* background-image: url(${inputIcon});
          background-repeat: no-repeat; */
          display: block;
          /* background-position: 95%;
          background-size: 5%; */
          &:focus {
            box-shadow: none;
          }
        }
        .ant-input-affix-wrapper {
          border: 1px solid #ff4d4f;
          padding-right: 0 !important;
          .ant-input {
            border: 0;
            border-radius: 30px;
            -webkit-border-radius: 30px;
          }
          .ant-input-suffix {
            margin-right: 20px;
          }
        }
        .ant-form-item-explain {
          text-align: left;
          padding-left: 25px;
          margin-top: 10px;
          font-size: 16px;
          background-image: url(${inputIcon});
          background-repeat: no-repeat;
          background-size: 16px;
          background-position: left top 3px;
          @media ${size["xxl"]} {
            font-size: 14px;
          }
          @media ${size["md"]} {
            font-size: 13px;
          }
        }
      }
      &.label-remove {
        .ant-form-item-label {
          padding: 0;
          @media ${size["xs"]} {
            display: none;
          }
        }
      }
      .ant-form-item-label {
        padding: 0 0 5px;
        .ant-form-item-required {
          &::before {
            display: none;
          }
        }
        label {
          .ant-form-item-tooltip {
            margin-left: 10px !important;
            background-image: url(${infoIcon});
            background-repeat: no-repeat;
            background-size: 16px;
            background-position: left top;
            svg {
              opacity: 0;
              height: 16px;
              width: 16px;
            }
            @media ${size["xxl"]} {
              background-size: 14px;
              background-position: left top;
              svg {
                opacity: 0;
                height: 14px;
                width: 14px;
              }
            }
            @media ${size["sm"]} {
              margin-left: 4px !important;
            }
          }
        }
      }
    }
    .ant-divider {
      border-top: 1px solid #cdcdcd;
      @media ${size["sm"]} {
        margin: 0 0 10px;
      }
    }
    .ant-input-group-addon {
      background: none;
      border-radius: 30px 0 0 30px;
      -webkit-border-radius: 30px 0 0 30px;
      width: 95px;
      height: 54px;
      @media screen and (max-width: 991px) {
        width: 82px;
      }
      @media ${size["xxl"]} {
        height: 45px;
      }
      @media ${size["md"]} {
        height: 40px;
      }

      .ant-select {
        width: 95px;
        margin: 0 -11px;
        @media ${size["xs"]} {
          width: 80px;
        }
        .ant-select-arrow {
          margin-right: 10px;
          @media screen and (max-width: 480px) {
            margin-right: 0;
          }
        }
      }
    }
    .ant-input-affix-wrapper {
      border-radius: 30px;
      -webkit-border-radius: 30px;
      height: 54px;
      padding: 0 20px;
      border: 1px solid #cdcdcd;
      .ant-input {
        height: 100%;
      }
      &.ant-input-affix-wrapper-focused {
        border-color: #40a9ff;
        box-shadow: none !important;
      }
      @media ${size["xxl"]} {
        height: 45px;
      }
      @media ${size["md"]} {
        height: 40px;
      }
    }
  }
`;

export const UserTitle = styled.div`
  font-size: 20px;
  color: #423f3f;
  font-weight: 700;
  margin: 0 0 10px;
  line-height: normal;
  @media ${size["xxl"]} {
    font-size: 18px;
  }
  @media ${size["md"]} {
    font-size: 16px;
  }
`;
