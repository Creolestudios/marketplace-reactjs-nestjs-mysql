import styled, { keyframes } from "styled-components";
import { size } from "@iso/components/size";

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
  width: 40%;
  @media ${size["md"]} {
    display: none;
  }
`;

export const LeftBlockImg = styled.img`
  object-fit: contain;
  height: 100%;
  width: 100%;
`;

export const RightBlock = styled.div`
  width: 60%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  @media ${size["md"]} {
    width: 100%;
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
`;

export const LogoImg = styled.img`
  max-width: 210px;
  width: 100%;
  margin: 0 auto 40px;
  @media ${size["sm"]} {
    max-width: 200px;
    margin: 0 auto 20px;
  }
  @media ${size["xs"]} {
    max-width: 175px;
  }
`;

export const Heading = styled.h1`
  margin-bottom: 40px;
  font-size: 36px;
  line-height: 36px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 700;
  @media ${size["md"]} {
    margin-bottom: 25px;
    font-size: 32px;
    line-height: 35px;
  }
  @media ${size["sm"]} {
    font-size: 30px;
    line-height: 30px;
    margin-bottom: 60px;
  }
  @media ${size["xs"]} {
    font-size: 28px;
    line-height: 28px;
  }
`;

export const FormWrapper = styled.div`
  form {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    @media ${size["lg"]} {
      max-width: 375px;
      margin: 0 auto;
    }
    @media ${size["md"]} {
      padding: 0 15px;
    }
    @media ${size["xxs"]} {
      padding: 0;
    }
    .ant-form-item-label {
      padding: 0 0 3px;
    }
    .ant-form-item {
      margin-bottom: 20px;
      @media ${size["md"]} {
        margin-bottom: 20px !important;
      }
      @media ${size["xs"]} {
        margin-bottom: 15px !important;
      }
      label {
        font-family: "Nunito Sans", sans-serif;
        font-size: 16px;
        color: #758287;
        font-weight: 400;
        line-height: 17px;
        @media ${size["sm"]} {
          font-size: 14px;
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
      height: 45px;
      @media ${size["md"]} {
        height: 40px;
      }
      @media ${size["xs"]} {
        height: 38px;
      }
    }
    .ant-input-affix-wrapper {
      input {
        border-radius: 0;
        height: 100%;
      }
    }
    .ant-input-affix-wrapper {
      border-radius: 40px;
      height: 45px;
      @media ${size["md"]} {
        height: 40px;
      }
    }
  }
`;
