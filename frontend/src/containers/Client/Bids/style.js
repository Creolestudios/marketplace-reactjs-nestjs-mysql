import styled from "styled-components";
import { size } from "../../../size";
// import "containers/TaskDetailsSpecialists/node_modules/assets/style.css";

export const BidTableWrapper = styled.div`
  .table-title {
    display: flex;
    text-align: left;
    align-items: center;
    margin-bottom: 40px;
    @media ${size["xxl"]} {
      margin-bottom: 30px;
    }
    @media ${size["lg"]} {
      border-bottom: 1px solid #cdcdcd;
      padding: 0 0 20px;
      margin-bottom: 20px;
    }
    .name {
      color: #2aabe1;
      font-weight: 700;
      font-size: 18px;
      margin-right: 30px;
      a {
        color: #2aabe1;
      }
      @media ${size["xxl"]} {
        font-size: 16px;
      }
      @media ${size["md"]} {
        font-size: 16px;
      }
      @media ${size["xs"]} {
        font-size: 14px;
      }
    }
    .rate {
      display: flex;
      align-items: center;
      i {
        font-size: 16px;
        margin-right: 5px;
      }
      span {
        font-size: 18px;
        color: #423f3f;
        margin-top: 3px;
        @media ${size["xxl"]} {
          font-size: 16px;
        }
        @media ${size["xs"]} {
          font-size: 14px;
        }
      }
    }
  }
  table {
    th:first-child, td:first-child {
      text-align: center;
      @media ${size["md"]} {
        text-align: left;
      }
    }
  }
`;
