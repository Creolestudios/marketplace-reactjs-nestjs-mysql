import styled from "styled-components";
import { size } from "../../size";
import inputIcon from "../../assets/images/error.svg";
import infoIcon from "../../assets/images/info.svg";

export const LoginWrapper = styled.div`
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

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  overflow: hidden;
  @media ${size["xl"]} {
    width: 50%;
  }
  @media ${size["md"]} {
    display: none;
  }
  &.sign-up-left {
    width: 30%;
    @media ${size["md"]} {
      display: none;
    }
    img {
      @media ${size["xl"]} {
        width: 100%;
      }
    }
  }
`;

export const LeftBlockImg = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
  padding: 80px 0;
  @media ${size["lg"]} {
    padding: 0;
  }
  &.sign-up-img {
    width: 100% !important;
  }
`;

export const RightBlock = styled.div`
  width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  /* // justify-content: center; */
  margin: auto 0;
  overflow-y: auto;
  padding: 40px 20px;
  height: 100vh;
  @media ${size["xl"]} {
    height: 100vh;
    width: 50%;
  }
  @media ${size["md"]} {
    width: 100%;
    height: 100vh;
  }
  @media ${size["xs"]} {
    padding: 20px;
    height: 100vh;
    overflow-y: auto;
    display: block;
  }
  button {
    font-weight: 700;
    @media ${size["lg"]} {
      height: 42px !important;
      margin-bottom: 20px !important;
    }
    @media ${size["md"]} {
      height: 40px !important;
      margin-bottom: 20px !important;
    }
    @media ${size["xs"]} {
      height: 38px !important;
      margin-bottom: 15px !important;
      font-size: 14px !important;
    }
  }
  .form-inner-wrapper {
    margin: auto 0;
    /* // overflow-y: auto; */
  }
  &.sign-up-right {
    width: 70%;
    @media ${size["md"]} {
      width: 100%;
    }
  }
`;

export const LogoImg = styled.img`
  max-width: 230px;
  width: 100%;
  margin: 0 auto 35px;
  @media ${size["xxl"]} {
    max-width: 200px;
  }
  @media ${size["lg"]} {
    max-width: 180px;
  }
  @media ${size["md"]} {
    max-width: 150px;
  }
  @media ${size["sm"]} {
    max-width: 130px;
    margin: 0 auto 40px;
  }
  @media ${size["xs"]} {
    max-width: 105px;
  }
`;

export const Heading = styled.h1`
  margin-bottom: 40px;
  font-size: 36px;
  line-height: 38px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 700;
  color: #423f3f;
  // text-transform: uppercase;
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

export const FormWrapper = styled.div`
  &.admin-form-wrapper {
    max-width: 410px;
    width: 100%;
    margin: 0 auto;
    @media screen and (max-width: 991px) {
      max-width: 350px;
    }
    .ant-alert {
      .ant-alert-icon {
        margin: 3px 8px auto 0;
        @media screen and (max-width: 991px) {
          margin: 5px 8px auto 0;
        }
      }
      .ant-alert-content {
        text-align: left;
      }
      .ant-alert-close-icon {
        margin-bottom: 0 !important;
        height: auto !important;
      }
    }
  }
  form {
    max-width: 410px;
    width: 100%;
    margin: 0 auto;
    @media ${size["lg"]} {
      max-width: 335px;
      margin: 0 auto;
    }
    @media ${size["md"]} {
      padding: 0 15px;
    }
    @media ${size["xxs"]} {
      padding: 0;
    }
    .ant-form-item-label {
      padding: 0 0 5px;
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
      margin-bottom: 20px;
      @media ${size["md"]} {
        margin-bottom: 20px;
      }
      @media ${size["xs"]} {
        /* margin-bottom: 15px !important; */
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
        @media ${size["sm"]} {
          font-size: 14px;
        }
      }
      .info-ac {
        display: block;
        font-size: 18px;
        font-weight: 400;
        color: #758287;
        @media ${size["xxl"]} {
          font-size: 16px;
        }
        @media ${size["sm"]} {
          font-size: 14px;
        }
        a {
          font-weight: 700;
          color: #2aabe1;
          &:hover {
            color: #0f8ec3;
          }
        }
      }
      .login-form-forgot {
        font-weight: 700;
        color: #2aabe1;
        font-size: 18px;
        @media ${size["xxl"]} {
          font-size: 16px;
        }
        @media ${size["sm"]} {
          font-size: 14px;
        }
        &:hover {
          color: #0f8ec3;
        }
      }
      .btn-login {
        border: 1px solid #fcae1d;
        box-shadow: none;
        &:hover {
          box-shadow: 0px 10px 25px rgba(252, 174, 29, 0.5);
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
          // background-image: url(${inputIcon});
          // background-repeat: no-repeat;
          display: block;
          // background-position: 95%;
          // background-size: 5%;
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
      .ant-form-item-label {
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
      &.remember-text {
        @media ${size["md"]} {
          margin-bottom: 20px !important;
        }
      }
      button {
        &.admin-btn-login {
          border-radius: 4px !important;
        }
      }
    }
    .ant-input {
      border-radius: 40px;
      -webkit-border-radius: 40px;
      height: 54px;
      padding: 0 20px;
      @media ${size["xxl"]} {
        height: 45px;
      }
      @media ${size["md"]} {
        height: 40px;
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
      input {
        border-radius: 0;
        -webkit-border-radius: 0;
        height: 100%;
        padding: 0 10px 0 20px;
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
    .btn {
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-shadow: none;
      @media ${size["xxl"]} {
        height: 45px;
      }
      @media ${size["md"]} {
        height: 40px;
      }
      &.btn-social-fb {
        background: #395185 !important;
        border: 1px solid #395185;
        &:hover {
          color: #fff !important;
          background: #395185;
          box-shadow: 0px 10px 25px rgba(57, 81, 133, 0.5);
          i {
            &:before {
              color: #fff;
            }
          }
        }
        &:focus {
          background: #395185;
          color: #fff;
          i {
            &:before {
              color: #fff;
            }
          }
        }
      }
      &.btn-social-google {
        background: #4285f4 !important;
        border: 1px solid #4285f4;
        &:hover {
          color: #fff !important;
          background: #4285f4;
          box-shadow: 0px 10px 25px rgba(66, 133, 244, 0.5);
          i {
            &:before {
              color: #fff;
            }
          }
        }
        &:focus {
          background: #4285f4;
          color: #fff;
          i {
            &:before {
              color: #fff;
            }
          }
        }
      }
      &:focus {
        background: #fcae1d;
        color: #fff;
      }
    }
    a {
      color: #2aabe1;
      font-weight: bold;
    }
    .continue-login {
      font-weight: 700;
      color: #2aabe1;
      font-size: 18px;
      margin-top: 20px;
      display: inline-block;
      @media ${size["xxl"]} {
        font-size: 16px;
      }
      @media ${size["md"]} {
        font-size: 14px;
        margin-top: 10px;
      }
      &:hover {
        color: #0f8ec3;
      }
    }
    .btn {
      font-size: 16px;
      margin: 0 0 20px;
      position: relative;
      border: none;
      color: #fff;
      @media ${size["sm"]} {
        font-size: 13px;
      }
      i {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`;
