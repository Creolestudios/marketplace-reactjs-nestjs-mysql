import styled from "styled-components";
import { size } from "../../../size";
import infoIcon from "@iso/assets/images/info.svg";

export const RightSide = styled.div`
  margin-left: 24px;
  position: relative;
  z-index: 1;
  @media ${size["md"]} {
    margin-left: 0;
    margin-top: 15px;
    margin-bottom: -57px;
  }
  @media ${size["xs"]} {
    width: calc(50% - 10px);
  }
  .ant-select {
    height: 100%;
    outline: none;
    border: none;
    min-width: 190px !important;
    width: 100% !important;
    @media ${size["xs"]} {
      min-width: 135px !important;
    }
    .ant-select-selector {
      height: 100% !important;
      align-items: center;
      border-radius: 14px;
      -webkit-border-radius: 14px !important;
      border: none !important;
      background: #fcae1d !important;
      color: #fff;
      font-weight: 700;
      font-size: 18px;
      outline: none;
      text-align: left;
      padding: 0 20px;
      box-shadow: none !important;
      @media ${size["xxl"]} {
        font-size: 17px;
      }
      @media ${size["lg"]} {
        padding: 6px 20px;
        font-size: 16px;
      }
      @media ${size["xs"]} {
        font-size: 14px;
        padding: 5px 10px;
      }
      .ant-select-selection-item {
        color: #fff !important;
      }
    }
    .ant-select-arrow {
      color: #fff;
      display: flex;
      align-items: center;
      margin-right: 10px;
      @media ${size["xs"]} {
        margin-right: 0;
      }
      &:after {
        content: "\\e910";
        display: block;
        font-family: "icomoon" !important;
        font-size: 7px;
      }
      svg {
        display: none;
      }
    }
  }
  // &.task-detail-rigth-side {
  //   @media ${size["md"]} {
  //     margin-bottom: 0;
  //   }
  //   @media ${size["xs"]} {
  //     width: 100%;
  //     margin: 10px 0 0;
  //   }
  //   .ant-select-selector {
  //     padding: 8px 20px;
  //     box-shadow: none !important;
  //     @media ${size["xs"]} {
  //       padding: 5px 10px;
  //     }
  //   }
  // }

  &.search-task {
    max-width: 408px;
    width: 100%;
    height: 60px;
    box-shadow: 0px 0px 8px rgb(42 171 225 / 10%);
    border-radius: 14px;
    -webkit-border-radius: 14px;
    @media ${size["xxl"]} {
      height: 54px;
    }
    @media ${size["xl"]} {
      height: auto;
    }
    @media ${size["lg"]} {
      max-width: 300px;
    }
    @media ${size["md"]} {
      height: 40px;
      max-width: 250px;
      margin-bottom: -55px;
      margin-top: 15px;
    }
    /* @media ${size["sm"]} {
      max-width: calc(100% - 180px);
    } */
    @media ${size["xs"]} {
      width: calc(50% - 10px);
      max-width: initial;
    }
    .ant-input-group-wrapper {
      &.ant-input-search {
        height: 100%;
        border-radius: 14px;
        -webkit-border-radius: 14px;
        overflow: hidden;
        .ant-input-group {
          height: 100%;
          .ant-input {
            height: 100%;
            border: none;
            padding: 0 20px;
            font-size: 18px;
            @media ${size["xxl"]} {
              font-size: 16px;
            }
            @media ${size["md"]} {
              font-size: 14px;
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
            &:focus {
              box-shadow: none;
            }
          }
          .ant-btn {
            height: 100%;
            width: 50px;
            border: none;
            .anticon-search {
              &:before {
              }
              // svg {
              //   display: none;
              // }
            }
          }
        }
      }
    }
    &.inbox-search {
      @media ${size["md"]} {
        margin-top: 10px;
        margin-bottom: 0px;
        height: 52px;
      }
      @media ${size["sm"]} {
        max-width: 100%;
        width: 100%;
      }
      @media ${size["xs"]} {
        height: 48px;
      }
    }
  }
  &.usermenu-rightside {
    @media ${size["md"]} {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      margin: 10px 0 -20px;
    }
    .btn {
      margin: 0 0 10px 0;
      text-transform: capitalize;
      justify-content: center;
      @media ${size["xxl"]} {
        margin: 0 0 6px 0;
      }
      @media ${size["md"]} {
        margin: 0 0 0 10px;
      }
    }
    .task-select-indi {
      font-size: 14px;
      line-height: 14px;
      color: #758287;
      margin-bottom: -8px;
      white-space: nowrap;
      @media ${size["xxl"]} {
        margin-bottom: -10px;
        font-size: 13px;
      }
    }
  }
`;

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
