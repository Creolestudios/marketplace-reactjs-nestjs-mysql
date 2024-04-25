import styled from "styled-components";
import { size } from "../../../size";

export const CardBlock = styled.div`
  width: 50%;
  background: #fff;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  display: inline-block;
  box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
  @media ${size["md"]} {
    width: 100%;
    margin: 0 0 30px;
  }
  @media ${size["sm"]} {
    margin: 0 0 20px;
  }
`;
export const AddNewCardBlock = styled.div`
  width: 50%;
  margin: 0 0 0 24px;
  background: #fff;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  display: table;
  box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
  @media ${size["lg"]} {
    margin: 0 0 0 12px;
  }
  @media ${size["md"]} {
    width: 100%;
    margin: 0;
  }
`;

export const CardHeader = styled.div`
  padding: 30px 20px;
  border-bottom: 1px solid #cdcdcd;
  @media ${size["sm"]} {
    padding: 20px 10px;
  }
  .title {
    margin: 0;
  }
`;

export const CardContent = styled.div`
  padding: 20px 20px;
  @media ${size["sm"]} {
    padding: 20px 10px;
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    overflow: auto;
    white-space: nowrap;
    @media ${size["md"]} {
      display: flex;
      overflow-x: auto;
      /* padding: 0 0 10px; */
    }
    li {
      margin: 0 0 20px;
      border: 1px solid #cdcdcd;
      border-radius: 14px;
      -webkit-border-radius: 14px;
      @media ${size["md"]} {
        width: auto;
        display: flex;
        margin: 0 25px 10px 0;
        min-width: 300px;
      }
      @media ${size["sm"]} {
        margin: 0 20px 10px 0;
        /* padding: 15px; */
      }
      &:last-child {
        margin: 0;
        @media ${size["md"]} {
          margin: 0 0 10px;
        }
      }
      &.active {
        border: 1px solid #fcae1d;
      }
    }
  }
`;

export const CardBox = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  .ant-radio-wrapper {
    margin-right: 22px;
    .ant-radio {
      transition: all 0.3s linear;
      &:hover .ant-radio-inner {
        border-color: #fcae1d;
        transition: all 0.3s linear;
      }
      &.ant-radio-checked {
        .ant-radio-inner {
          border-color: #fcae1d;
          background: #fcae1d;

          &::after {
            background-color: #fff;
          }
        }
      }
    }
  }
`;

export const CardInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  i {
    background: #f8fafb;
    padding: 10px;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
  }
`;

export const LeftInfo = styled.div`
  text-align: left;
  .title {
    color: #423f3f;
    font-weight: 700;
    margin: 0 0 20px;
  }
`;

export const RightInfo = styled.div`
  @media ${size["md"]} {
    margin-left: 20px;
  }
`;

export const CardNumber = styled.div`
  font-size: 18px;
  margin: 0 0 10px;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["sm"]} {
    font-size: 14px;
  }
`;
export const ExpiryDate = styled.div`
  font-size: 18px;
  margin: 0 0 10px;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["sm"]} {
    font-size: 14px;
  }
`;

export const DefaultText = styled.div`
  font-size: 18px;
  color: #cdcdcd;
  font-style: italic;
  @media ${size["xxl"]} {
    font-size: 16px;
  }
  @media ${size["sm"]} {
    font-size: 14px;
  }
`;

export const CardImg = styled.img`
  display: block;
  margin: 0 0 25px auto;
  width: 35px;
  height: auto;
`;

export const CardForm = styled.div`
  max-width: 410px;
  width: 100%;
  margin: 0 auto;
  form {
    @media ${size["sm"]} {
      padding: 0;
    }
    .ant-form-item {
      align-content: flex-start;
      &.btn-wrapper {
        margin-bottom: 0;
      }
    }
    .label-remove {
      margin-top: 37px;
    }
  }
`;
