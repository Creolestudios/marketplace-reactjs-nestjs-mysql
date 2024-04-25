import styled from "styled-components";
import { size } from "../../size";

export const ModelContent = styled.div`
  .title {
    margin: 0 0 20px;
  }
  textarea {
    margin: 0 !important;
  }

  // slider
  .image-gallery {
    .image-gallery-slide-wrapper {
      position: unset !important;
      .image-gallery-left-nav,
      .image-gallery-right-nav {
        padding: 0;
        outline: none;
        display: flex;
        align-items: flex-end;
        filter: none;
        top: 46%;
        @media ${size["sm"]} {
          display: none;
        }
        .image-gallery-svg {
          width: 20px !important;
          height: auto;
          stroke: #758287;
          stroke-width : 1.4px;
          @media ${size["md"]} {
            width: 16px !important;
          }
        }
      }
      .image-gallery-swipe {
        border-radius: 14px;
        -webkit-border-radius: 14px;
        overflow: hidden;
        width: 85%;
        margin: 0 auto;
        @media ${size["sm"]} {
          width: 100%;
        }
        .image-gallery-slides {
          height: 500px;
          max-height: calc(100vh - 130px);
          & * {
            height: 100%;
          }
        }
        .image-gallery-image{
          object-fit: cover !important;
        }
      }
    }
    .image-gallery-thumbnails-wrapper {
      .image-gallery-thumbnails {
        padding: 5px 15px;
        @media ${size["sm"]} {
          display: none;
        }
        .image-gallery-thumbnail {
          border-radius: 14px;
          -webkit-border-radius: 14px;
          overflow: hidden;
          height: 100px;
          width: 100px;
          transition: border 0.2s ease-out;
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
            border: 2px solid #fcae1d;
          }
          &:hover {
            border: 2px solid #fcae1d;
          }
          // &:focus {
          //   border: 2px solid #fcae1d;
          // }
          .image-gallery-thumbnail-inner {
            height: 100%;
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
    .image-gallery-index {
      position: unset;
      background: none;
      color: #758287;
      text-align: right;
      margin: 10px 55px 0 0;
      font-size: 18px;
      padding-bottom: 5px;
      @media ${size["sm"]} {
        display: none;
      }
    }
  }
`;
