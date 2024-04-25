import styled from "styled-components";
import { palette } from "styled-theme";

const BoxWrapper = styled.div`
  width: 100%;
  height: auto;
  padding: 0 0 0px 0;
  background-color: #ffffff;
  border: 1px solid ${palette("border", 0)};
  margin: 0 0 30px;

  &:last-child {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 767px) {
    padding: 0;
  }

  &.half {
    width: calc(50% - 34px);
    @media (max-width: 767px) {
      width: 100%;
    }
  }
  i {
    margin-right: 5px;
  }
  &.broken-floor {
    .isoBoxTitle {
      cursor: pointer;
      text-transform: capitalize;
    }
    .isoBoxChildrenWrapper {
      .anticon-eye-invisible {
        &::before {
          content: "\\e91b";
          display: block;
          font-family: "icomoon" !important;
          font-size: 14px;
        }
        svg {
          display: none;
        }
      }
      .anticon-eye-visible {
        &::before {
          content: "\\e91c";
          display: block;
          font-family: "icomoon" !important;
          font-size: 10px;
        }
        svg {
          display: none;
        }
      }
    }
  }
`;

const BoxChildren = styled.div`

  margin-top: 10px;
  padding: 0  20px;
  
  /* margin-bottom: 20px; */
  .portfolio-content
  {
    display: flex;
    margin-bottom:20px!important;
    .construct 
    {
      margin-right:20px;
      @media (max-width:576px)
      {
        margin-bottom:10px;
      }
      
    }
    @media (max-width:1200px)
    {
      flex-wrap:wrap;
    }
  }
  
    img {
      width: 142px;
      height: 142px;
      margin: 0 20px 20px 0;
      border-radius: 4px!important;
      @media screen and (max-width: 1600px) {
        width: 112px;
        height: 112px;
      }
      @media screen and (max-width: 1220px) {
        width: 105px;
        height: 105px;
      }
      @media screen and (max-width: 767px) {
        width: 80px;
        height: 80px;
      }
    }
    .ant-select-arrow
  {
    img 
    {
      width:auto!important;
      height:auto!important;
    }
  }
    &:nth-child(3) {
      img {
        /* margin-right: 0; */
        @media screen and (max-width: 1600px) {
          margin-right: 20px;
        }
        @media screen and (max-width: 991px) {
          margin-right: 20px;
        }
      }
    }
  }
`;

const BoxFooter = styled.div`
  border-top: 1px solid ${palette("border", 0)};
`;

export { BoxWrapper, BoxChildren, BoxFooter };
