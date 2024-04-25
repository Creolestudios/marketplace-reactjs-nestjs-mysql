import styled from "styled-components";
import { size } from "../../../size";

export const InboxWrapper = styled.div`
  display: flex;
  width: 100%;
  @media ${size["md"]} {
    margin-top: 0px;
    flex-wrap: wrap;
  }
`;

export const MsgNameBox = styled.div`
  max-width: 400px;
  width: 100%;
  /* background: #fff; */
  border-radius: 14px;
  -webkit-border-radius: 14px;
  @media ${size["xxl"]} {
    max-width: 350px;
  }
  @media ${size["lg"]} {
    max-width: 300px;
  }
  @media ${size["md"]} {
    max-width: 100%;
    margin: 0 auto;
  }
`;
export const ChatSidebar = styled.div`
  max-height: 520px;
  overflow-y: auto;
`;

export const MsgBox = styled.div`
  position: relative;
  // overflow: hidden;
  width: 100%;
  display: inline-table;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
  .msg-status {
    line-height: 1px;
    img {
      width: 15px;
      height: auto;
    }
  }
  .msg-parent {
    position: relative;
    overflow: hidden;
    background: #fff;
    width: 100%;
    display: inline-table;
    border-radius: 14px;
    -webkit-border-radius: 14px;
  }
  @media ${size["md"]} {
    margin-left: 0;
    /* margin-top: 20px; */
  }
  .box-title {
    font-size: 20px;
    margin: 0 0 10px;
    @media ${size["xxl"]} {
      font-size: 18px;
    }
    @media ${size["lg"]} {
      font-size: 16px;
    }
    @media ${size["sm"]} {
      font-size: 14px;
      margin: 0 0 5px;
    }
  }
  .ant-divider {
    margin: -5px -20px 20px 0 !important;
    @media ${size["lg"]} {
      margin: 10px -20px 20px 0 !important;
    }
    @media ${size["md"]} {
      margin: 0px -20px 20px 0 !important;
    }
    &.header-divider {
      .ant-divider-inner-text {
        background: #fff8eb;
        border-radius: 14px;
        -webkit-border-radius: 14px;
        color: #fcae1d;
        padding: 10px;
        font-size: 18px;
        @media ${size["xxl"]} {
          font-size: 16px;
        }
        @media ${size["md"]} {
          font-size: 14px;
        }
      }
    }
    &.Msg-content-divider {
      .ant-divider-inner-text {
        font-size: 14px;
        @media ${size["sm"]} {
          font-size: 12px;
        }
      }
    }
  }
  form {
    padding: 0 20px;
    margin: 40px auto 40px;
    max-width: 100%;
    @media ${size["sm"]} {
      margin: 30px 0 30px;
      padding: 0 10px;
    }
    .ant-form-item {
      align-content: flex-start;
      width: 100%;
      margin: 0;
      .ant-input-group {
        border: 1px solid #cdcdcd;
        border-radius: 30px;
        -webkit-border-radius: 30px;
        input {
          width: 100%;
          border: none;
          padding: 0 20px;
          &:focus {
            box-shadow: none;
          }
          &::placeholder {
            font-size: 18px;
            color: #cdcdcd;
            @media ${size["xxl"]} {
              font-size: 16px;
            }
            @media ${size["sm"]} {
              font-size: 14px;
            }
          }
        }
      }
    }
    .ant-input-group-addon {
      border: none;
      /* padding: 0 70px 0 0; */
      display: flex;
      align-items: center;
      width: 100px;
      .anticon {
        font-size: 18px;
        cursor: pointer;
        &.anticon-link {
          color: #758287;
          &:before {
            content: "\\e920";
            display: block;
            font-family: "icomoon" !important;
          }
          svg {
            display: none;
          }
        }
        &.anticon-send {
          color: #fcae1d;
          background: #f8fafb;
          padding: 0 !important;
          width: 44px;
          height: 44px;
          align-items: center;
          display: flex;
          justify-content: center;
          border-radius: 50%;
          -webkit-border-radius: 50%;
          @media ${size["xxl"]} {
            width: 40px;
            height: 40px;
          }
          &:before {
            content: "\\e91f";
            display: block;
            font-family: "icomoon" !important;
          }
          svg {
            display: none;
          }
        }
      }
    }
  }
  .ant-drawer {
    top: 0;
    overflow: hidden;
    .ant-drawer-mask {
      border-radius: 14px;
      overflow: hidden;
    }
    .ant-drawer-content-wrapper {
      top: 0;
      height: 100%;
      width: 300px !important;
      @media ${size["xs"]} {
        width: 100% !important;
      }
      .ant-drawer-content {
        height: 100%;
        .ant-drawer-header {
          border-bottom: 0;
          padding: 20px;
          margin-bottom: 20px;
          @media ${size["xs"]} {
            padding: 20px 15px;
            margin-bottom: 0;
          }
          .ant-drawer-title {
            text-align: left;
            font-size: 20px;
            color: #423f3f;
            font-weight: 700;
            @media ${size["xxl"]} {
              font-size: 18px;
            }
            @media ${size["md"]} {
              font-size: 16px;
            }
          }
        }
        .ant-drawer-body {
          padding: 0 20px 0;
          margin-right: 10px;
          margin-bottom: 20px;
          @media ${size["xs"]} {
            padding: 0 15px 0;
          }
          &::-webkit-scrollbar-track {
            box-shadow: none;
            background: transparent;
          }
        }
      }
    }
  }
`;

export const MsgNameHeader = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  .ant-select {
    max-width: 300px;
    width: 100%;
    height: 60px;
    border-radius: 14px;
    -webkit-border-radius: 14px;
    overflow: hidden;
    box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
    margin: 0 15px 0 0;
    @media ${size["xxl"]} {
      height: 55px;
      margin: 0 30px 0 0;
    }
    @media ${size["md"]} {
      height: 52px;
    }
    @media ${size["xs"]} {
      height: 48px;
    }
    .ant-select-selector {
      border: none;
      height: 100%;
      display: flex;
      align-items: center;
      text-align: left;
      padding: 0 20px;
      box-shadow: none;
      @media ${size["lg"]} {
        padding: 0 10px;
      }
      .ant-select-selection-item {
        color: #758287;
        font-size: 18px;
        font-weight: 700;
        @media ${size["xxl"]} {
          font-size: 16px;
        }
        @media ${size["sm"]} {
          font-size: 14px;
        }
      }
    }
    .ant-select-arrow {
      .anticon-down {
        &:before {
          content: "\\e910";
          font-family: "icomoon" !important;
          display: block;
          font-size: 7px;
          color: #758287;
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }
        svg {
          display: none;
        }
      }
    }
  }
  .btn-trash {
    color: #758287;
    background: none;
    border: none;
    text-align: right;
    padding: 0;
    margin: 0 0 0 auto;
    width: auto;
    font-weight: 700;
    &:hover {
      color: #fcae1d;
    }
  }
  .trash-left-icon {
    margin-right: 10px;
    cursor: pointer;
  }
`;

export const MsgContent = styled.div`
  max-height: 615px;
  overflow-y: auto;
`;

export const NameBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 40px 0;
  @media ${size["lg"]} {
    margin: 20px 0;
  }
`;
export const Avtar = styled.div`
  margin-right: 35px;
  @media ${size["xxl"]} {
    margin-right: 25px;
  }
  @media ${size["lg"]} {
    margin-right: 15px;
  }
`;
export const Figure = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;
export const NameBox = styled.div`
  text-align: left;
  width: 100%;
  overflow: hidden;
  &.chat-img {
    margin-top: 10px;
    @media ${size["md"]} {
      margin-top: 0;
    }
  }
`;
export const Name = styled.div`
  margin: 20px 0 5px;
  font-size: 10px;
  line-height: 20px;
  font-weight: 400;
  text-transform: uppercase;
  @media ${size["sm"]} {
    margin: 0 0 5px;
  }
  &.active {
    color: #fcae1d;
  }
`;

export const Time = styled.div`
  margin: 0px 0 5px;
  font-size: 10px !important;
  line-height: 20px;
  font-weight: 400;
`;

export const MsgNameMsg = styled.div`
  font-size: 16px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media ${size["xxl"]} {
    font-size: 14px;
  }
  @media ${size["md"]} {
    font-size: 13px;
  }
  &.name-special {
    @media ${size["md"]} {
      font-size: 12px;
    }
  }
`;
export const MsgInfo = styled.div`
  margin: 0 0 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  &.chat-date {
    margin-top: 10px;
    @media ${size["sm"]} {
      margin-top: 5px;
    }
  }
  .time {
    font-size: 14px;
    margin: 0 0 10px;
    @media ${size["xxl"]} {
      font-size: 12px;
    }
    @media ${size["sm"]} {
      margin: 0 0 5px;
    }
  }
`;
export const MsgCount = styled.div`
  background: #fcae1d;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  @media ${size["xxl"]} {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
`;

export const MsgBoxHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 20px 0;
  @media ${size["md"]} {
    padding: 20px 10px;
  }
  .anticon-more {
    font-size: 30px;
  }
  .header-right-drop {
    .ant-dropdown-link {
      svg {
        fill: #758287;
      }
    }
  }
  .back-btn {
    display: none;
    // @media ${size["sm"]} {
    //   display: block;
    //   margin-right: 20px;
    // }
  }
`;
export const MsgBoxContent = styled.div`
  .msg-box-pera {
    background: #f8fafb;
    padding: 10px 50px;
    text-align: center;
    border-radius: 14px;
    -webkit-border-radius: 14px;
    font-size: 14px;
    line-height: 19px;
    margin: 0 20px 30px;
    @media ${size["xxl"]} {
      font-size: 12px;
      padding: 10px 50px;
      margin: 0 20px 20px;
    }
    @media ${size["md"]} {
      padding: 10px 5px;
      margin: 0 10px 20px;
    }
  }
`;

export const MsgText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0 20px;
  @media ${size["md"]} {
    padding: 0 10px;
  }
  &.right {
    margin: 20px 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .msg {
      border-radius: 4px 4px 0 4px;
      -webkit-border-radius: 4px 4px 0 4px;
      background: #2aabe1;
      color: #fff;
    }
  }
  .time {
    font-size: 14px;
    @media ${size["xxl"]} {
      font-size: 12px;
    }
  }
`;

export const Msg = styled.div`
  border-radius: 4px 4px 4px 0;
  -webkit-border-radius: 4px 4px 4px 0;
  padding: 15px;
  font-size: 16px;
  background: #e9f9ff;
  color: #423f3f;
  width: fit-content;
  margin: 0 0 10px;
  @media ${size["xxl"]} {
    font-size: 14px;
  }
  @media ${size["lg"]} {
    padding: 10px;
  }
  @media ${size["md"]} {
    font-size: 13px;
  }
`;

export const Img = styled.img`
  border-radius: 14px 14px 0 14px;
  -webkit-border-radius: 14px 14px 0 14px;
  width: 200px;
  height: 140px;
  margin: 0 0 10px;
  object-fit: cover;
`;

export const PastAttachmentWrapper = styled.div``;

export const AttachmentBox = styled.div`
  margin: 0 0 20px;
`;

export const AttachmentClient = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 5px;

  .name {
    color: #758287;
    margin: 0;
    font-weight: 400;
    font-size: 14px;
    @media ${size["xxl"]} {
      font-size: 12px;
    }
  }
  .date,
  .time {
    margin-left: 5px;
    font-size: 14px;
    @media ${size["xxl"]} {
      font-size: 12px;
    }
  }
`;

export const AttachmentElement = styled.div``;

export const ImgElement = styled.div`
  text-align: left;
  img {
    max-width: 240px;
    width: 100%;
    height: 170px;
    border-radius: 14px;
    -webkit-border-radius: 14px;
  }
`;

export const PdfElement = styled.div`
  background: #f8fafb;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  width: fit-content;
  padding: 20px;
  font-size: 16px;
  line-height: 16px;
  color: #423f3f;
  @media ${size["xxl"]} {
    font-size: 14px;
    line-height: 14px;
  }
  @media ${size["md"]} {
    font-size: 13px;
    line-height: 13px;
  }
  .anticon {
    margin-right: 5px;
    font-size: 16px;
    @media ${size["sm"]} {
      font-size: 13px;
    }
  }
`;

export const Nodata = styled.div`
  height: 100%;
  display: flex;
  padding: 15px;
  p {
    margin: auto;
  }
`;
