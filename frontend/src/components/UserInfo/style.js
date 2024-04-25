import styled from "styled-components";
import { size } from "../../size";

export const UserInfowrapper = styled.div`
  .rate {
    display: flex;
    align-items: center;
    white-space: nowrap;
    font-size: 18px;
    @media ${size["xxl"]} {
      font-size: 16px;
    }
    @media ${size["md"]} {
      font-size: 14px;
    }
    i {
      margin-right: 5px;
    }
    span {
      color: #423f3f;
      line-height: 15px;
      margin: 3px 0 0;
    }
  }
`;

export const UserInfoHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #cdcdcd;
  padding-bottom: 20px;
  margin-right: 13px;
  .task {
    margin-right: 70px;
    @media ${size["xs"]} {
      margin-right: 0px;
    }
  }
  @media ${size["xs"]} {
    .task,
    .rating {
      width: 50%;
    }
  }
`;

export const UserContent = styled.div`
  overflow: auto;
  height: 334px;
  padding-right: 10px;
  @media ${size["sm"]} {
    padding-right: 5px;
  }
`;

export const UserFooter = styled.div`
  padding-top: 20px;
  border-top: 1px solid #cdcdcd;
  margin-right: 13px;
  text-align: left;
  a {
    display: inline-block;
    text-align: center;
  }
`;
