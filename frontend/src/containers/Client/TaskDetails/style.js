import styled from "styled-components";
import { size } from "../../../size";
import infoIcon from "../../../assets/images/info.svg";

export const Detail = styled.div`
  background: #fff;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  width: 100%;
  margin: 0 0 0;
  box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
  @media ${size["md"]} {
    margin: 0 0 0;
  }
  @media ${size["xs"]} {
    margin: 0 0 0;
  }
  .cancel {
    background: #fff !important;
  }
  .report {
    background: #fff !important;
  }

  &.profile {
    .already-ac {
      padding: 20px;
      margin: 0;
      text-align: center;
    }
    .detail-text {
      padding: 10px 0;
      @media ${size["md"]} {
        padding: 0;
      }
    }
    .profile-details {
      @media ${size["md"]} {
        padding: 10px 10px 20px;
      }
      &.all-reviews {
        .ant-tabs {
          overflow: visible;
          .title {
            margin-bottom: 0;
            padding-top: 10px;
            @media ${size["md"]} {
              padding-top: 0;
            }
          }
        }
      }
      &.my-portfolio {
        .ant-tabs-content {
          padding-bottom: 0;
        }
      }
      &.portfolio {
        padding-bottom: 0;
        .ant-tabs-nav {
          &:before {
            display: none;
          }
        }
        .ant-tabs-content {
          padding: 0;
        }
      }
      &.create-album {
        form {
          padding-bottom: 0;
          .btn-wrapper {
            margin-bottom: 0;
            .btn-cancel {
              padding: 0 10px;
              &:hover {
                box-shadow: none;
                color: #758287 !important;
              }
              &:after {
                display: none;
              }
            }
          }
        }
      }
    }
  }
`;

export const DetailHead = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border-bottom: 1px solid #cdcdcd;
  @media ${size["md"]} {
    padding: 20px 10px;
  }
  @media ${size["xs"]} {
    align-items: flex-end;
  }
`;
export const Content = styled.div`
  padding: 40px 0;
  @media ${size["md"]} {
    padding: 30px 0;
  }
  @media ${size["sm"]} {
    padding: 10px 0 30px;
  }
  .ant-form {
    max-width: 100%;
    margin: 0 auto;
  }
`;

export const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  @media ${size["sm"]} {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  .situation {
    @media ${size["xxl"]} {
      padding: 11.5px 20px;
    }
    @media ${size["md"]} {
      padding: 10px 20px;
    }
    @media ${size["sm"]} {
      margin-top: 15px;
    }
  }
  .detail-text {
    margin: 0 25px 0 0;
    @media ${size["sm"]} {
      margin: 0 15px 0 0;
    }
  }
  .icon-left-arrow {
    margin-right: 20px;
    cursor: pointer;
    @media ${size["sm"]} {
      margin-right: 10px;
    }
  }
  .re-name {
    margin: 0 10px 0 20px;
    @media ${size["sm"]} {
      margin: 18px 10px 0 20px;
      font-size: 14px;
    }
  }
`;

export const RightBlock = styled.div`
  margin: 0 0 0 auto;
  display: flex;
  @media ${size["sm"]} {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: -42px;
    align-items: center;
  }
  .edit-task {
    background: none;
    color: #75828e;

    border: 1px solid #cdcdcd;
  }
`;

export const DetailContent = styled.div`
  &.bid-section {
    padding-bottom: 5px;
    .table-title {
      @media ${size["lg"]} {
        border-bottom: 1px solid #cdcdcd;
      }
    }
    td {
      @media ${size["lg"]} {
        &:nth-of-type(2) {
          position: absolute;
          left: 0;
        }
        &:nth-of-type(3) {
          min-height: 65px;
          padding-left: calc(40% + 70px) !important;
        }
      }
    }
  }
  padding: 20px;
  @media ${size["md"]} {
    padding: 20px 10px;
  }
  @media ${size["sm"]} {
    padding: 20px 10px;
  }
  .task-cancelled,
  .task-reported,
  .task-resolved {
    border-top: 1px solid #cdcdcd;
    padding: 40px 0 0;
    @media ${size["lg"]} {
      margin: 20px 0 0;
      padding: 20px 0 0;
    }
    @media ${size["md"]} {
      margin: 20px 0 0;
    }
    @media ${size["md"]} {
      margin: 20px 0 0;
    }
  }
  .task-reported,
  .task-resolved {
    padding-bottom: 20px;
    @media ${size["lg"]} {
      padding-bottom: 0;
    }
  }
  &.bank-ac {
    padding: 0;
    .bank-form {
      box-shadow: none;
      .from-btn {
        margin-top: 20px;
        @media ${size["md"]} {
          margin-top: 0px;
        }
      }
    }
  }
`;

export const InfoTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 20px;
  flex-wrap: wrap;
  @media ${size["lg"]} {
    margin: 0 0 20px;
  }
`;

export const InfoTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0 10px 0 0;
  font-size: 18px;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
    line-height: 25px;
  }
  i {
    margin: 0 10px 0 0;
    @media ${size["xs"]} {
      margin: 0 5px 0 0;
    }
  }
`;

export const JobInfo = styled.div`
  border: 1px solid #cdcdcd;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  display: flex;
  //   justify-content: space-between;
  margin: 0 0 40px;
  @media ${size["lg"]} {
    flex-wrap: wrap;
  }
  @media ${size["md"]} {
    flex-wrap: wrap;
    margin: 0 0 30px;
  }
  @media ${size["xs"]} {
    margin: 0 0 20px;
  }
`;

export const Box = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  width: calc(100% / 5);
  border-right: 1px solid #cdcdcd;
  @media ${size["xl"]} {
    padding: 20px 10px;
  }
  @media ${size["lg"]} {
    width: calc(100% / 3);
    padding: 15px 10px;
  }
  @media ${size["xs"]} {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #cdcdcd;
    padding: 20px;
  }
  &:first-child {
    @media ${size["xs"]} {
      padding: 30px 20px;
    }
  }
  &:last-child {
    border: none;
    max-width: 80px;
    @media ${size["xs"]} {
      max-width: 100%;
    }
  }
  &:nth-child(3) {
    @media ${size["lg"]} {
      border-right: none;
    }
    @media ${size["md"]} {
      border-right: none;
    }
  }
  &:first-child,
  &:nth-child(2),
  &:nth-child(3) {
    @media ${size["lg"]} {
      border-bottom: 1px solid #cdcdcd;
    }
    @media ${size["md"]} {
      border-bottom: 1px solid #cdcdcd;
    }
  }
  i {
    font-size: 18px;
    background: #f8fafb;
    padding: 12px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    @media ${size["lg"]} {
      font-size: 15px;
      padding: 5px;
    }
  }
  &.specialist {
    display: none;
  }
  &.border-remove {
    border-right: 0;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
  @media ${size["xs"]} {
    flex-direction: row;
    align-items: center;
  }
  .title {
    font-size: 16px;
    margin: 0 0 10px;
    font-weight: 700;
    @media ${size["xxl"]} {
      font-size: 14px;
    }
    @media ${size["md"]} {
      max-width: 110px;
      width: 100%;
      margin: 0;
      font-size: 13px;
      margin: 0 0 8px;
    }
    @media ${size["xs"]} {
      margin: 0;
    }
  }
`;

export const SubTitle = styled.div`
  font-size: 18px;
  color: #423f3f;
  font-weight: 400;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
`;

export const WorkDetail = styled.div`
  display: flex;
  @media ${size["lg"]} {
    flex-direction: column;
  }
  .b-top {
    .ant-form-item-label > label {
      height: 44px !important;
    }
    .ant-form-item-tooltip {
      &.ant-tooltip-open {
        &::after {
          top: 3px !important;
        }
      }
    }
  }
  .ant-checkbox-wrapper {
    margin: 0 0 40px;
    font-size: 18px;
    @media ${size["xxl"]} {
      margin: 0 0 30px;
      font-size: 16px;
    }
    @media ${size["sm"]} {
      margin: 0 0 20px;
      font-size: 14px;
    }
  }
  .block {
    width: 50%;
    &:last-child {
      margin-left: 40px;
      @media ${size["lg"]} {
        margin-left: 0;
      }
      @media ${size["xs"]} {
        margin-left: 0;
      }
    }
    @media ${size["lg"]} {
      width: 100%;
    }
  }
  .task-btn {
    &.task-cancel {
      padding-top: 20px;
    }
    /* border-top: 1px solid #cdcdcd; */
    display: flex;
    align-items: center;
    padding: 40px 0 20px;
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
        margin: 0 20px 0 0 !important;
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
              margin-left: 9px !important;
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
  }

  // slider
  .work-slider {
    @media ${size["lg"]} {
      width: 60%;
      margin: 0 auto 40px;
    }
    @media ${size["md"]} {
      width: 70%;
      margin: 0 auto 40px;
    }
    @media ${size["sm"]} {
      width: 80%;
      margin: 0 auto 60px;
    }
    @media ${size["xs"]} {
      max-width: 335px;
      width: 100%;
      margin: 0 auto 40px;
    }
    .image-gallery {
      .image-gallery-slide-wrapper {
        .image-gallery-left-nav,
        .image-gallery-right-nav {
          top: 100% !important;
          height: 130px;
          padding: 0;
          outline: 0;
          display: flex;
          align-items: flex-end;
          filter: none;
          transform: none;
          @media ${size["xl"]} {
            height: 122px;
          }
          @media ${size["md"]} {
            height: 110px;
          }
          @media ${size["sm"]} {
            display: none;
          }
          .image-gallery-svg {
            width: 15px !important;
            height: 100%;
            stroke: #758287;
            stroke-width: 1.4px;
            @media ${size["md"]} {
              width: 13px !important;
            }
          }
          &:hover {
            .image-gallery-svg {
              transform: scale(1);
              transition: all 0.3s linear;
            }
          }
        }
        .image-gallery-slides {
          padding: 30%;
          border-radius: 14px;
          -webkit-border-radius: 14px;
          overflow: hidden;
          .image-gallery-slide {
            position: absolute;
            height: 100%;
            &.center {
              position: absolute;
              height: 100%;
            }
            & * {
              height: 100%;
            }
          }
        }
        .image-gallery-image {
          object-fit: cover !important;
          max-height: initial;
        }
      }
      .image-gallery-thumbnails-wrapper {
        .image-gallery-thumbnails {
          padding: 15px;
          @media ${size["sm"]} {
            display: none;
          }
          .image-gallery-thumbnail {
            border-radius: 14px;
            -webkit-border-radius: 14px;
            overflow: hidden;
            height: 100px;
            width: 100px;
            border: none;
            transition: box-shadow 0.2s ease-out;
            max-width: 23%;
            @media ${size["xl"]} {
              height: 92px;
              width: 92px;
            }
            @media ${size["lg"]} {
              height: 90px;
              width: 90px;
            }
            @media ${size["md"]} {
              height: 80px;
              width: 80px;
            }
            @media ${size["sm"]} {
              height: 50px;
              width: 50px;
            }
            &.active {
              box-shadow: inset 0 0 0 3px #fcae1d;
            }
            &:hover {
              box-shadow: inset 0 0 0 3px #fcae1d;
            }
            // &:focus {
            //   box-shadow: inset 0 0 0 3px #fcae1d;
            // }
            .image-gallery-thumbnail-inner {
              height: 100%;
              z-index: -1;
              img {
                height: 100%;
                object-fit: cover !important;
              }
            }
            & + .image-gallery-thumbnail {
              margin-left: 10px;
            }
          }
        }
      }
      .image-gallery-bullets {
        display: none;
        position: absolute;
        bottom: -20px;
        @media ${size["sm"]} {
          display: block;
        }
        .image-gallery-bullet {
          padding: 4px;
          background: rgba(117, 130, 135, 0.28);
          border: none;
          outline: none;
          border-radius: 50%;
          -webkit-border-radius: 50%;
          box-shadow: none;
          &.active {
            background: #758287;
          }
        }
      }
    }
  }
`;

export const DescHd = styled.div`
  display: flex;
  margin: 0 0 20px;
`;

export const Budget = styled.div`
  margin: 0 80px 0 0;
  &.specialist {
    display: none;
  }
`;

export const Amount = styled.div`
  &.specialist {
    display: none;
  }
`;

export const DescriptionPera = styled.div`
  // border-bottom: 1px solid #cdcdcd;
  text-align: left;
  .desc-pera {
    margin: 0 0 30px;
    @media ${size["lg"]} {
      margin: 0 0 15px;
    }
  }
`;

export const RatingBox = styled.div`
  display: table;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  background: #fff;
  width: 50%;
  padding: 20px;
  box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
  .submit-btn {
    background: #fff !important;
  }
  @media ${size["lg"]} {
    width: 50%;
  }
  @media ${size["md"]} {
    width: 100%;
    padding: 20px 10px;
  }
  // @media ${size["xs"]} {
  //   width: 100%;
  //   padding: 20px 10px;
  // }
  .title {
    margin: 0 0 20px;
    line-height: 22px;
    @media ${size["xs"]} {
      margin: 0 0 7px;
    }
  }
  .ant-rate {
    line-height: 10px;
    @media ${size["xs"]} {
      margin: 0 0 0 !important;
    }
    .ant-rate-star {
      svg {
        stroke-width: 50px;
        stroke: #758287;
        fill: none;
        width: 16px;
      }
      &.ant-rate-star-full {
        svg {
          fill: #fadb14;
          stroke-width: 0;
        }
      }
    }
  }
  textarea {
    &::-webkit-scrollbar-thumb {
      border: 0px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      border-top-width: 12px;
      border-bottom-width: 12px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: none;
      border-radius: 172px;
      -webkit-border-radius: 172px;
      background: transparent;
      border: 0px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      border-top-width: 12px;
      border-bottom-width: 12px;
    }
  }
  .ant-form-item {
    &.ant-form-item-has-error {
      margin-bottom: 10px;
      textarea {
        margin: 0 0 5px !important;
      }
    }
  }
`;

export const CancelModelWrapper = styled.div`
  display: flex;
  @media ${size["md"]} {
    flex-wrap: wrap;
    flex-direction: column;
  }
`;
export const ModalLeftSide = styled.div`
  width: 45%;
  @media ${size["lg"]} {
    width: 60%;
  }
  @media ${size["md"]} {
    width: 70%;
    margin: 0 auto;
  }
  @media ${size["sm"]} {
    width: 80%;
  }
  @media ${size["xs"]} {
    max-width: 335px;
    width: 100%;
  }
`;
export const ModalRightSideSlider = styled.div`
  width: 55%;
  margin: 0 0 0 60px;
  @media ${size["lg"]} {
    width: 60%;
    margin: 0 0 0 40px;
  }
  @media ${size["md"]} {
    width: 70%;
    margin: 0 auto;
  }
  @media ${size["sm"]} {
    width: 80%;
  }
  @media ${size["xs"]} {
    max-width: 335px;
    width: 100%;
  }

  // slider
  .work-slider {
    @media ${size["lg"]} {
      width: 100%;
      margin: 0 auto 0;
    }
    @media ${size["md"]} {
      width: 100%;
      margin: 0 auto 40px;
    }
    @media ${size["sm"]} {
      width: 100%;
      margin: 0 auto 40px;
    }
    @media ${size["xs"]} {
      width: 100%;
      margin: 0 auto 40px;
    }
    .image-gallery {
      .image-gallery-slide-wrapper {
        .image-gallery-left-nav,
        .image-gallery-right-nav {
          top: 100% !important;
          height: 130px;
          padding: 0;
          outline: 0;
          display: flex;
          align-items: flex-end;
          filter: none;
          transform: none;
          @media ${size["xl"]} {
            height: 122px;
          }
          @media ${size["md"]} {
            display: none;
            height: 110px;
          }
          @media ${size["sm"]} {
            display: none;
          }
          .image-gallery-svg {
            width: 15px !important;
            height: 100%;
            stroke: #758287;
            stroke-width: 1.4px;
            @media ${size["md"]} {
              width: 13px !important;
            }
          }
        }
        .image-gallery-swipe {
          border-radius: 14px;
          -webkit-border-radius: 14px;
          overflow: hidden;
          .image-gallery-description {
            background: #f8fafb;
            color: #758287;
            left: 50%;
            font-size: 14px;
            line-height: 19px;
            padding: 10px;
            bottom: 10px;
            border-radius: 14px;
            -webkit-border-radius: 14px;
            width: 95%;
            transform: translateX(-50%);
            @media ${size["lg"]} {
              font-size: 12px;
              line-height: 14px;
            }
            @media ${size["md"]} {
              width: 100%;
              bottom: 0;
              position: unset;
              display: contents;
              text-align: center;
              align-items: center;
              justify-content: center;
            }
          }
          .image-gallery-slides {
            padding: 30%;
            .image-gallery-slide {
              position: absolute;
              height: 100%;
              &.center {
                position: absolute;
                height: 100%;
              }
              & *:not(.image-gallery-description) {
                height: 100%;
              }
            }
          }
          .image-gallery-image {
            object-fit: cover !important;
            max-height: initial;
            @media ${size["md"]} {
              margin-bottom: 5px;
              border-radius: 14px;
              -webkit-border-radius: 14px;
            }
          }
        }
      }
      .image-gallery-thumbnails-wrapper {
        .image-gallery-thumbnails {
          padding: 15px;
          @media ${size["md"]} {
            display: none;
          }
          .image-gallery-thumbnail {
            border-radius: 14px;
            -webkit-border-radius: 14px;
            overflow: hidden;
            height: 100px;
            width: 100px;
            border: none;
            transition: box-shadow 0.2s ease-out;
            max-width: 23%;
            @media ${size["xl"]} {
              height: 92px;
              width: 92px;
            }
            @media ${size["lg"]} {
              height: 90px;
              width: 90px;
            }
            @media ${size["md"]} {
              height: 60px;
              width: 60px;
            }
            @media ${size["sm"]} {
              height: 50px;
              width: 50px;
            }
            &.active {
              box-shadow: inset 0 0 0 3px #fcae1d;
            }
            &:hover {
              box-shadow: inset 0 0 0 3px #fcae1d;
            }
            // &:focus {
            //   box-shadow: inset 0 0 0 3px #fcae1d;
            // }
            .image-gallery-thumbnail-inner {
              height: 100%;
              z-index: -1;
              img {
                height: 100%;
                object-fit: cover !important;
              }
            }
            & + .image-gallery-thumbnail {
              margin-left: 10px;
            }
          }
        }
      }
      .image-gallery-bullets {
        display: none;
        position: absolute;
        bottom: -20px;
        @media ${size["md"]} {
          display: block;
        }
        .image-gallery-bullet {
          padding: 4px;
          background: rgba(117, 130, 135, 0.28);
          border: none;
          outline: none;
          border-radius: 50%;
          -webkit-border-radius: 50%;
          box-shadow: none;
          &.active {
            background: #758287;
          }
        }
      }
    }
  }
`;
