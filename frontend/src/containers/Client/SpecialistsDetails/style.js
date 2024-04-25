import styled from "styled-components";
import { size } from "../../../size";
import infoIcon from "@iso/assets/images/info.svg";

export const UserDetail = styled.div`
  .user-pera {
    text-align: center;
    word-break: break-word;
  }
  .mtop-5 {
    margin-top: 5px;
  }
`;

export const UserImg = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  margin: 0 auto 15px;
  overflow: hidden;
  @media ${size["xxl"]} {
    width: 130px;
    height: 130px;
  }
  @media ${size["md"]} {
    width: 110px;
    height: 110px;
  }
  @media ${size["xs"]} {
    width: 100px;
    height: 100px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;

export const UserNumberPos = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 0 0 15px;
  @media ${size["md"]} {
    margin: 0 0 10px;
  }
  i {
    margin: 0 5px 0 0;
    font-size: 16px;
    @media ${size["md"]} {
      font-size: 15px;
    }
  }
`;

export const NumberPos = styled.div`
  color: #423f3f;
  font-size: 18px;
  font-weight: 700;
  @media ${size["xxl"]} {
    font-size: 16px;
    line-height: 18px;
  }
  @media ${size["md"]} {
    font-size: 14px;
    line-height: 16px;
  }
`;

export const ConfirmModal = styled.div`
  .from-wrapper {
    display: flex;
    margin-top: 20px;
    .ant-checkbox-wrapper {
      font-size: 18px;
      color: #758287;
      line-height: 24px;
      @media ${size["xxl"]} {
        font-size: 16px;
      }
      @media ${size["sm"]} {
        font-size: 14px;
      }
    }
    form {
      .ant-form-item {
        align-content: flex-start;
        flex-wrap: nowrap;
        .ant-form-item-label {
          padding: 0;
          label {
            &:after {
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
    }
  }
`;

export const RatingWrapper = styled.div`
  margin-right: auto;
`;
