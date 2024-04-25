import styled from "styled-components";
import { size } from "../../size";
import inputIcon from "../../assets/images/error.svg";
import infoIcon from "../../assets/images/info.svg";

export const SignupWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  background: #fff;
  .ant-btn {
    .anticon {
      position: absolute;
      left: 20px;
      transform: translateY(-50%);
      top: 50%;
    }
  }
`;

export const LeftBlockImg = styled.img`
  height: 100%;
  /* width: 100%; */
  object-fit: contain;
`;

export const FormWrapper = styled.div`
  form {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
    padding: 0 40px;
    @media ${size["xl"]} {
      ${"" /* max-width: 375px; */}
      margin: 0 auto;
    }
    .birth-date {
      padding-left: 2.5vh;
    }
    @media ${size["lg"]} {
      padding: 0;
    }
    @media ${size["xs"]} {
      max-width: 335px;
      padding: 0;
    }
    .ant-form-item-label {
      padding: 0 0 3px;
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
    .ant-form-item {
      width: calc(50% - 24px);
      flex-wrap: wrap;
      margin-bottom: 20px;
      margin-left: 24px;
      margin-right: 0;
      align-content: flex-start;
      @media ${size["lg"]} {
        margin-bottom: 20px !important;
        width: calc(50% - 12px);
        margin-left: 12px;
      }
      @media ${size["sm"]} {
        /* margin-bottom: 10px !important; */
        width: calc(50% - 12px);
        margin-left: 12px;
      }
      @media ${size["xs"]} {
        margin-left: 0;
      }
      label {
        font-family: "Nunito Sans", sans-serif;
        font-size: 18px;
        color: #758287;
        font-weight: 400;
        line-height: 17px;
        @media ${size["xxl"]} {
          font-size: 16px;
        }
        @media ${size["md"]} {
          font-size: 14px;
        }
        &:after {
          display: none;
        }
      }
      @media ${size["xs"]} {
        width: 100%;
      }
      .select-items {
        display: flex;
        .item {
          border-radius: 14px;
          -webkit-border-radius: 14px;
          padding: 18px 0;
          border: 1px solid #cdcdcd;
          width: 192px !important;
          height: auto;
          width: 100%;
          cursor: pointer;
          @media ${size["lg"]} {
            width: 170px !important;
          }
          @media ${size["sm"]} {
            width: 140px !important;
          }
          & + .item {
            margin-left: 20px;
          }
          span {
            display: block;
            margin: 10px 0 0;
            font-size: 18px;
            color: #423f3f;
            @media ${size["xxl"]} {
              font-size: 16px;
            }
            @media ${size["sm"]} {
              font-size: 14px;
            }
          }
          &.active {
            background: #e9f9ff;
            border: 1px solid #2aabe1;
          }
          img {
            @media ${size["sm"]} {
              max-width: 60px;
              width: 100%;
            }
          }
        }
      }
      &.nem-id {
        input {
          padding-right: 45%;
          @media ${size["md"]} {
            padding-right: 40%;
          }
          @media ${size["xs"]} {
            padding-right: 32%;
          }
        }
      }
      &.w-100 {
        width: 100%;
        margin: 0 0 20px;
      }
      &.w-50 {
        margin-left: 0;
        margin-bottom: 20px;
        width: 50%;
        @media ${size["xs"]} {
          width: 100%;
        }
      }
      .ant-input-affix-wrapper {
        padding-right: 0 !important;
        .ant-input {
          border: 0;
        }
        .ant-input-suffix {
          margin-right: 20px;
        }
      }
      &.ant-form-item-has-error,
      &.ant-form-item-has-success {
        .ant-input {
          /* background-image: url(${inputIcon});
          background-repeat: no-repeat; */
          display: block;
          /* background-position: right;
          background-position: 95%;
          background-size: 5%; */
        }
        .ant-input-affix-wrapper {
          padding-right: 0 !important;
          .ant-input {
            border: 0;
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
      &.ant-form-item-has-error {
        .ant-input {
          border: 1px solid #ff4d4f;
        }
        .ant-input-affix-wrapper {
          border: 1px solid #ff4d4f;
        }
      }
    }
    .ant-checkbox-wrapper {
      margin: 0 0 20px;
      color: #758287;
      font-weight: 400;
      text-align: left;
      line-height: 25px;
      @media ${size["sm"]} {
        margin: 0 0 20px;
      }
    }
    .already-ac {
      display: flex;
      align-items: center;
      color: #758287;
      font-weight: 400;
      justify-content: center;
      width: 100%;
      font-size: 18px;
      @media ${size["xxl"]} {
        font-size: 16px;
      }
      @media ${size["sm"]} {
        font-size: 14px;
      }
      a {
        margin: 0 5px 0;
        transition: all 0.3s linear;
        &:hover {
          color: #0f8ec3;
        }
      }
    }
    .sign-up-btn {
      max-width: 408px;
      width: 100%;
      height: 54px;
      transition: all 0.3s linear;
      background: #fcae1d;
      margin: 20px auto;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      /* box-shadow: none; */
      border: 1px solid #fcae1d;
      &:hover {
        box-shadow: 0px 10px 25px rgba(252, 174, 29, 0.5) !important;
        /* background: #fcae1d; */
        /* color: #fff; */
      }
      @media ${size["xxl"]} {
        height: 45px;
      }
      @media ${size["md"]} {
        height: 40px;
      }
      &:hover {
        box-shadow: none;
      }
      @media ${size["sm"]} {
        font-size: 13px;
        margin: 10px auto 20px;
      }
    }
    .verify-btn {
      background: #fff;
      width: 38%;
      text-shadow: none;
      height: 46px;
      margin-bottom: 35px;
      position: absolute;
      right: 5px;
      top: 50%;
      color: #fcae1d;
      border: 1px solid #fcae1d;
      transform: translateY(-50%);
      font-size: 16px;
      letter-spacing: 1px;
      padding: 0;
      transition: all 0.3s linear;
      &:hover {
        box-shadow: 0px 10px 25px rgb(252 174 29 / 20%);
      }
      @media ${size["xxl"]} {
        height: 36px !important;
        width: 35%;
        font-size: 14px;
      }
      @media ${size["lg"]} {
        height: 36px !important;
        width: 40%;
      }
      @media ${size["md"]} {
        height: 32px !important;
        width: 35%;
        font-size: 12px;
      }
      @media ${size["sm"]} {
        width: 35%;
      }
      @media ${size["xs"]} {
        width: 20%;
        padding: 0 37px;
        font-size: 12px !important;
      }
    }
    .ant-input,
    .ant-picker {
      box-shadow: none;
      width: 100%;
      border-radius: 40px;
      -webkit-border-radius: 40px;
      height: 54px;
      /* &:hover {
        border-color: #cdcdcd;
      } */
      @media ${size["xxl"]} {
        height: 45px;
      }
      @media ${size["md"]} {
        height: 40px;
      }
      input::placeholder {
        font-style: italic;
        font-size: 18px;
        color: #cdcdcd;
        @media ${size["xxl"]} {
          font-size: 16px;
        }
        @media ${size["md"]} {
          font-size: 14px;
        }
      }
      &::placeholder {
        font-style: italic;
        font-size: 18px;
        color: #cdcdcd;
        @media ${size["xxl"]} {
          font-size: 16px;
        }
        @media ${size["md"]} {
          font-size: 14px;
        }
      }
    }
    .ant-input-affix-wrapper {
      input {
        border-radius: 0;
        -webkit-border-radius: 0;
        height: 100%;
        padding: 0 10px 0 20px;
      }
    }
    .ant-input-affix-wrapper {
      padding: 0 20px 0 0;
      border: 1px solid #cdcdcd;
      border-radius: 40px;
      -webkit-border-radius: 40px;
      height: 54px;
      overflow: hidden;
      &.ant-input-affix-wrapper-focused {
        border-color: #40a9ff;
        box-shadow: none;
      }
      @media ${size["xxl"]} {
        height: 45px;
      }
      @media ${size["md"]} {
        height: 40px;
      }
      .ant-input-suffix {
        .anticon-eye-invisible {
          &:before {
            content: "\\e91b";
            display: block;
            font-family: "icomoon" !important;
          }
          svg {
            display: none;
          }
        }
      }
    }
    button {
      height: 45px;
      font-weight: 700;
      text-transform: uppercase;
      outline: none;
      border: none;
      width: 100%;
      font-size: 16px;
      letter-spacing: 0.5px;
      border-radius: 40px;
      -webkit-border-radius: 40px;
      @media ${size["md"]} {
        height: 40px !important;
        margin-bottom: 25px !important;
      }
      @media ${size["xs"]} {
        height: 38px !important;
        margin-bottom: 15px !important;
      }
    }
    a {
      color: #2aabe1;
      font-weight: bold;
      &:hover {
        color: #0f8ec3;
      }
    }
  }
`;
export const Heading = styled.h1`
  margin-bottom: 40px;
  font-size: 36px;
  line-height: 38px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 700;
  color: #423f3f;
  text-transform: uppercase;
  @media ${size["xxl"]} {
    font-size: 34px;
    line-height: 36px;
  }
  @media ${size["lg"]} {
    font-size: 30px;
    line-height: 32px;
  }
  @media ${size["md"]} {
    font-size: 28px;
    line-height: 30px;
  }
  @media ${size["sm"]} {
    font-size: 22px;
    line-height: 24px;
    margin-bottom: 25px;
  }
`;
