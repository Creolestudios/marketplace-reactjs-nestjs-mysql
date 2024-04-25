import styled from "styled-components";
import { size } from "../../../size";
import infoIcon from "../../../assets/images/info.svg";


export const FormInput = styled.div`
  display: flex;
  @media ${size["sm"]} {
    flex-wrap: wrap;
  }
  .ant-form-item {
    align-content: flex-start;
    margin: 0 24px 20px 0;
    width: calc(50% - 10px);
    @media ${size["md"]} {
      margin: 0 15px 20px 0;
      width: calc(50% - 5px);
    }
    @media ${size["sm"]} {
      width: 100%;
      margin: 0 0 20px 0;
    }
    &:last-child {
      margin: 0 0 20px 0;
    }
    &.w-100 {
      width: 100%;
    }
    &.started {
      max-width: 264px;
      @media ${size["sm"]} {
        max-width: initial;
        margin-right: 21px;
        width: calc(50% - 11px);
      }
      @media ${size["xs"]} {
        margin-right: 12px;
        width: calc(50% - 6px);
      }
    }
    &.date-time-mng {
      max-width: 264px;
      @media ${size["sm"]} {
        max-width: initial;
        width: calc(50% - 10px);
      }
      @media ${size["xs"]} {
        align-content: flex-end;
        width: calc(50% - 6px);
      }
      & label {
        visibility: hidden;
      }
      & .today-indi {
        position: absolute;
        bottom: -25px;
      }
      .ant-form-item-label {
        @media ${size["xs"]} {
          display: none;
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
      .ant-picker {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          right: 0;
          height: calc(100% - 15px);
          width: 1px;
          top: 50%;
          bottom: 0;
          background: #cdcdcd;
          transform: translateY(-50%);
          @media ${size["md"]} {
            height: calc(100% - 10px);
          }
        }
        .ant-picker-input {
          input {
            padding-right: 0;
          }
        }
        @media ${size["sm"]} {
          width: calc(100% - 50px) !important;
        }
        @media ${size["xs"]} {
          padding: 0 0 0 5px !important;
        }
      }
      .ant-input {
        border-left: 0;
        @media ${size["xs"]} {
          padding: 0 5px;
        }
      }
      .ant-form-item {
        margin: 0;
        width: auto;
        @media ${size["sm"]} {
          width: 53%;
          .ant-picker {
            width:100% !important;
          }
        }
      }
      .time-wrapper {
        width:100%;
        .time-section {
          @media ${size["sm"]} {
            width: 47%;
          }
        }
      }
   
      .ant-input-number {
        border-left: 0;
        border-radius: 30px;
        border-color: #cdcdcd;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        height:54px;
        width:100%;
        &.ant-input-number-focused {
          box-shadow: none !important;
          border: 1px solid #40a9ff;
          margin-left: -1px;
        }
        .ant-input-number-handler-wrap{
          border-top-right-radius: 30px;
          border-bottom-right-radius: 30px;
        }
        input {
          width:100%;
        }
        @media ${size["xxl"]} {
          height: 45px;
        }
        @media ${size["md"]} {
          height: 40px;
        }
      }
    }
    .ant-input-group {
      display: flex;
      align-items: center;
      .ant-picker {
        border: 1px solid #cdcdcd;
        border-radius: 30px 0 0 30px;
        -webkit-border-radius: 30px 0 0 30px;
        padding: 0 0 0 10px;
        width: 100%;
        height: 54px;
        border-right: 0;
        box-shadow: none;
        &.ant-picker-focused {
          border: 1px solid #40a9ff;
          box-shadow: none !important;
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
          width: auto;
          input::placeholder {
            font-style: italic;
            color: #cdcdcd;
          }
        }
      }
      input {
        padding: 0 10px;
        width: 165px;
        input::placeholder {
          font-style: italic;
          color: #cdcdcd;
        }
      }
    }

    textarea {
      margin: 0 !important;
    }
  }
  &.mb {
    margin-bottom: 15px;
  }
`;

export const FormArea = styled.div`
  background: #fff;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  width: 100%;
  margin: 0;
  box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
  padding: 40px 20px;
  @media ${size["md"]} {
    padding: 20px 10px;
  }
  .ant-form {
    max-width: 840px;
    margin: 0 auto;

    .ant-select {
      &:not(.ant-select-customize-input) {
        .ant-select-selector {
          height: 54px;
          padding: 0 20px;
          border-radius: 30px;
          -webkit-border-radius: 30px;
          box-shadow: none;
          @media ${size["xxl"]} {
            height: 45px;
          }
          @media ${size["md"]} {
            height: 40px;
          }
          .ant-select-selection-placeholder {
            line-height: 50px;
            text-align: left;
            @media ${size["xxl"]} {
              line-height: 40px;
            }
          }
        }
      }
    }
  }
  .share-contact-checkbox {
    margin: 20px 0 20px;
    text-align: left;
  }
  .checkbox-title {
    text-align: left;
    margin: 0 0 15px;
    color: #758287;
  }
  .task-checkbox {
    margin: 0 0 25px;
    label {
      margin-bottom: 15px;
    }
    @media ${size["sm"]} {
      margin: 0 0 15px;
      label {
        min-width: 110px;
      }
    }
  }
  .from-btn {
    display: flex;
    .btn {
      height: 44px;
      display: flex;
      align-items: center;
      @media ${size["md"]} {
        height: 38px;
      }
      & + .btn {
        margin-left: 10px;
      }
      &.btn-clear {
        border: none;
        background-color: #fff !important;
        padding-left: 10px;
        @media ${size["md"]} {
          padding-left: 20px;
        }
      }
    }
  }
  .publish-btn {
    color: #fff !important;
    &:focus {
      background: #fcae1d;
      border: 1px solid #fcae1d;
      color: #fff;
    }
  }
  .upload-btn {
    margin: 0 0 40px;
    background: #fff !important;
    @media ${size["xs"]} {
      margin: 0 0 30px;
    }
  }
  .photos-videos-wrapper {
    text-align: left;
    .title {
      font-size: 18px;
      color: #758287;
      font-weight: 400;
      margin-bottom: 10px;
      @media ${size["xxl"]} {
        font-size: 16px;
      }
      @media ${size["md"]} {
        font-size: 14px;
      }
    }
    .photos-videos-item {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 5px;
      .img-list {
        width: 123px;
        height: 123px;
        border-radius: 14px;
        -webkit-border-radius: 14px;
        margin-bottom: 15px;
        overflow: hidden;
        margin-right: 15px;
        @media ${size["md"]} {
          width: 100px;
          height: 100px;
        }
        @media ${size["xs"]} {
          width: 80px;
          height: 80px;
          margin-right: 10px;
          margin-bottom: 10px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      @media ${size["xs"]} {
        margin-bottom: 10px;
      }
    }
  }
`;
