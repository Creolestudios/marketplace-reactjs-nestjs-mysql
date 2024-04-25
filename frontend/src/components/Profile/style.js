import styled from "styled-components";
import { size } from "../../size";
import infoIcon from "@iso/assets/images/info.svg";

export const ProfileWrapper = styled.div`
  display: flex;
  padding-top: 20px;
  @media ${size["md"]} {
    flex-direction: column;
  }
  @media ${size["sm"]} {
    padding-top: 0;
  }
  .user-title {
    text-align: center;
    margin: 0 0 20px;
  }
  .user-checkbox {
    color: #758287;
    font-size: 18px;
    display: block;
    text-align: center;
    @media ${size["xxl"]} {
      font-size: 16px;
    }
    @media ${size["sm"]} {
      font-size: 14px;
    }
  }
  .user-pera {
    // margin-top: 20px;
    color: #758287;
    font-size: 18px;
    @media ${size["xxl"]} {
      font-size: 16px;
    }
    @media ${size["sm"]} {
      font-size: 14px;
    }
  }
`;
export const ProfileLeft = styled.div`
  .task-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0 0;
    .ant-form-item-label > label
      {
        height: 44px!important;
        
      }
      .ant-form-item-tooltip
      {
        &.ant-tooltip-open 
        {
          &::after {
            
            top: 3px!important;
            
          }
        }
      }
    @media ${size["md"]} {
      justify-content: center;
      margin: 0 0 20px;
    }
    label {
      &:after {
        display: none;
      }
    }
    @media ${size["lg"]} {
      padding: 20px 0 0;
    }
    .ant-form-item {
      align-content: flex-start;
      @media ${size["xs"]} {
        margin: 0 10px 0 0 !important;
      }
      .ant-form-item-label {
        padding: 0;
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
      &:last-child {
        margin: 0 !important;
      }
    }
    .btn {
      @media ${size["xs"]} {
        margin: 0 !important;
      }
    }
    .task-icon {
      cursor: pointer;
      i {
        background: #f8fafb;
        border-radius: 50%;
        -webkit-border-radius: 50%;
        padding: 13px;
        line-height: inherit;
        font-size: 18px;
      }
    }
  }
`;
export const ProfileRight = styled.div`
  margin-left: 85px;
  width: 100%;
  @media ${size["xl"]} {
    margin-left: 30px;
  }
  @media ${size["md"]} {
    margin: 0;
  }
`;
export const ProfileImg = styled.div`
  width: 260px;
  height: 260px;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  overflow: hidden;
  margin: 0 auto 20px;
  @media ${size["xl"]} {
    width: 200px;
    height: 200px;
    margin: 0 auto 20px;
  }
  @media ${size["md"]} {
    width: 150px;
    height: 150px;
    margin: 0 auto 20px;
  }
  @media ${size["sm"]} {
    width: 120px;
    height: 120px;
  }
  img {
    width: 100%;
  }
`;

export const WorkProfile = styled.div`
  display: flex;
  flex-wrap: wrap;
  .box-wrapper-left {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    @media ${size["xl"]} {
      width: auto;
    }
    @media ${size["sm"]} {
      width: 100%;
    }
    .box {
      width: 50%;
      margin-bottom: 40px;
      @media ${size["lg"]} {
        margin-bottom: 20px;
      }
    }
  }
  .box-wrapper-right {
    width: 50%;
    @media ${size["sm"]} {
      width: 100%;
    }
    @media ${size["xl"]} {
      width: auto;
    }
  }
`;

export const Box = styled.div`
  margin-bottom: 10px;
  .service-wrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 10px;
    width: 100%;
  }
`;
