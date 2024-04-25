import styled from "styled-components";
import { size } from "../../size";

export const WorkPorfolioWrapper = styled.div`
  width: calc(50% - 10px);
  background: #fff;
  box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
  border-radius: 14px;
  -webkit-border-radius: 14px;
  margin: 0 0 20px 20px;
  height: fit-content;

  @media ${size["lg"]} {
    width: 100%;
    margin-left: 0;
  }
  &:first-child {
    margin-bottom: 20px !important;
    // @media ${size["lg"]} {
    //   margin-bottom: 20px !important;
    // }
  }
  &:nth-child(2n + 1) {
    margin-left: 0;
    margin-bottom: 0;
    @media ${size["lg"]} {
      margin-bottom: 0;
    }
  }
`;
export const WorkPortfolioHeader = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #cdcdcd;
  @media ${size["sm"]} {
    padding: 20px 10px;
  }
  .title {
    width: max-content;
    cursor: pointer;
    margin: 0 0 10px;
    text-transform: capitalize;
  }
  .ant-checkbox-wrapper {
    margin-right: 12px;
  }
  .portfolio-info-header {
    margin: 0;
  }
  .icon {
    margin: 0 0 0 auto;
    display: flex;
    align-items: center;
    @media ${size["lg"]} {
      margin: 0 0 auto auto;
    }
    @media ${size["md"]} {
      margin: 0 0 auto auto;
    }
    i {
      cursor: pointer;
      color: #423f3f;

      @media ${size["md"]} {
        font-size: 12px;
      }
      @media ${size["sm"]} {
        font-size: 10px;
      }
      &.icon-invisiable {
        font-size: 20px;
        @media ${size["md"]} {
          font-size: 15px;
        }
      }
      &.icon-visiable {
        font-size: 15px;
        @media ${size["md"]} {
          font-size: 10px;
        }
      }
    }
  }
`;

export const WorkPortfolioContent = styled.div`
  padding: 20px 0px 0 20px;
  @media ${size["sm"]} {
    padding: 20px 10px 0;
  }
`;

export const WorkPortfolioImage = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const Figure = styled.div`
  width: 122px;
  height: 122px;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  overflow: hidden;
  margin: 0 24px 20px 0;
  @media ${size["xl"]} {
    width: 100px;
    height: 100px;
    margin: 0 30px 20px 0;
  }
  @media ${size["sm"]} {
    width: 80px;
    height: 80px;
    margin: 0 16px 20px 0;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
