import styled from "styled-components";
import { size } from "../../size";

export const ForgotPasswordWrapper = styled.div`
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
  form {
    .ant-form-item {
      align-content: flex-start;
      /* margin-bottom: 35px; */
      span {
        color: #758287;
      }
      .info-ac {
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
    }
    .reset {
      height: 54px;
      font-weight: 700;
      border: 1px solid #fcae1d;
      margin-top: 20px;
      display: inline-flex;
      width: 100%;
      margin-bottom: 20px;
      @media ${size["xxl"]} {
        height: 45px !important;
      }
      @media ${size["md"]} {
        height: 40px !important;
      }
    }
  }
  .pera {
    max-width: 408px;
    margin: 0 auto 55px;
    text-align: left;
    @media ${size["xxl"]} {
      margin: 0 auto 40px;
    }
    @media ${size["lg"]} {
      max-width: 335px;
    }
  }
  &.forgot-wrapper {
    .form-inner-wrapper {
      display: flex;
      flex-direction : column;
      margin: 0;
      height: 100%;
      .section-title {
        margin-top: auto;
        @media ${size["md"]} {
          margin-top: 0;
        }
      }
      .forgot-section {
        margin-bottom: auto;
        @media ${size["md"]} {
          margin: auto;
        }
      }
    }
  }
`;

// export const PeraGraph = styled.p`
//   color: #758287;
//   font-size: 18px;
//   font-weight: 400;
//   max-width: 400px;
//   margin: 0 auto 40px;
//   text-align: left;
//   @media ${size["xxl"]} {
//     margin: 0 auto 20px;
//     font-size: 16px;
//   }
//   @media ${size["xs"]} {
//     margin: 0 auto 20px;
//     font-size: 14px;
//   }
// `;
