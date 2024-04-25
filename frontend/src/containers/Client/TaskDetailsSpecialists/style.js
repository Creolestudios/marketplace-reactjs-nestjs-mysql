import styled from "styled-components";
import { size } from "../../../size";
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
              z-index:-1;
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