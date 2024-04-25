import styled from "styled-components";
import { palette } from "styled-theme";
import WithDirection from "@iso/lib/helpers/rtl";

const CarouselStyleWrapper = styled.div`
  .isoCarousalDemoContainer {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
  }

  .ant-carousel .slick-prev,
  .ant-carousel .slick-next {
    font-size: 20px;
    color: black;
  }

  .ant-carousel .slick-prev:hover,
  .ant-carousel .slick-next:hover,
  .ant-carousel .slick-prev:focus,
  .ant-carousel .slick-next:focus {
    color: black;
  }
  .ant-carousel {
    text-align: -webkit-center;
    .slick-slide .slick-active .slick-cloned {
      width: 160px;
    }
    .slick-slider {
      direction: ${(props) =>
        props["data-rtl"] === "rtl" ? "ltr" : "inherit"};
      .slick-track {
        left: auto;
        right: 0;

        .slick-slide {
          text-align: center;
          height: 160px;
          // line-height: 160px;
          margin-top: 30px;
          background: transparent;
          color: black;
          overflow: hidden;
          float: left !important;
        }
      }
    }
    .slick-slide {
      &.slick-active {
        &.slick-current {
          img {
            border: 2px solid rgb(252, 174, 29);
            border-radius: 4px;
          }
        }
      }
      &.slick-center {
        &.slick-current {
          img {
            border: 2px solid rgb(252, 174, 29);
            border-radius: 4px;
          }
        }
      }
    }
  }
`;

export default WithDirection(CarouselStyleWrapper);
