import styled from "styled-components";
import { size } from "../../size";

export const ModelContent = styled.div`
  .title {
    margin: 0 0 20px;
  }
  textarea {
    margin: 0 !important;
  }
`;

export const UploadTask = styled.div`
  margin: 0;
  @media ${size["xs"]} {
    margin: 0;
  }
  .title {
    margin: 0 0 20px;
  }
  .ant-upload-picture-card-wrapper {
    .ant-upload-list {
      .ant-upload-select-picture-card {
        border-radius: 15px;
        -webkit-border-radius: 15px;
        margin: 0 0 20px;
        border: none;
        padding: 10px;
        background: #f8fafb;
        @media ${size["md"]} {
          padding: 8px;
        }
        @media ${size["sm"]} {
          padding: 5px;
        }

        span {
          border: 1px dashed #cdcdcd;
          border-radius: 15px;
          -webkit-border-radius: 15px;
        }
        .upload-inner {
          position: relative;
          .img-bg {
            width: 100%;
            opacity: 0;
          }
          .upload-text {
            position: absolute;
            top: 60%;
            left: 0;
            right: 0;
            margin: auto;
            transform: translateY(-50%);
            @media ${size["sm"]} {
              font-size: 11px;
            }
          }
          .img {
            position: absolute;
            top: 40%;
            left: 0;
            right: 0;
            margin: auto;
            transform: translateY(-50%);
            @media ${size["xs"]} {
              width: 12px;
            }
          }
        }
      }
    }
    .ant-upload-list-picture-card-container,
    .ant-upload-select-picture-card {
      width: calc(25% - 18px);
      height: 192px;
      margin: 0 24px 20px 0;
      @media ${size["xl"]} {
        width: calc(25% - 18px);
        height: 160px;
        margin: 0 24px 20px 0;
      }
      @media ${size["md"]} {
        width: calc(25% - 12px);
        height: 160px;
        margin: 0 15px 15px 0;
      }
      @media ${size["xs"]} {
        width: calc(33.33% - 8px);
        max-height: 90px;
        margin: 0 12px 12px 0;
      }
      .ant-upload-list-item {
        padding: 0;
        border-radius: 15px;
        -webkit-border-radius: 15px;
        border: 0;
        overflow: hidden;
      }
      .ant-upload-list-item-actions {
        top: 10px;
        right: 10px;
        left: unset;
        transform: translate(0);
        @media ${size["xs"]} {
          top: 0;
          right: 5px;
        }
        .anticon-eye {
          display: block;
          position: absolute;
          top: 10px;
          right: 140px;
        }
        button {
          width: 24px;
          height: 24px;
          .anticon-delete {
            margin: 0;
            width: 22px;
            svg {
              display: none;
            }
            &::before {
              content: "\\e911";
              color: #fff;
              font-family: "icomoon" !important;
              display: block;
              font-size: 10px;
              border-radius: 50%;
              -webkit-border-radius: 50%;
              background: #ed4c5c;
              width: 22px;
              height: 22px;
              display: flex;
              align-items: center;
              justify-content: center;
              @media ${size["xs"]} {
                font-size: 5px;
                width: 15px;
                height: 15px;
              }
            }
          }
        }
      }
      &:nth-child(3n) {
        @media ${size["xs"]} {
          margin-right: 0;
        }
      }
      &:nth-child(4n) {
        margin-right: 0;
        @media ${size["xs"]} {
          margin-right: 12px;
        }
      }
    }
  }
`;
