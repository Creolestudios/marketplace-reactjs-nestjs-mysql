import styled from "styled-components";
import { size } from "../../size";

export const BottomWrapper = styled.div`
  border-radius: 14px;
  -webkit-border-radius: 14px;
  background: #fff;
  width: 50%;
  padding: 20px;
  box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
  margin: 0 0 0 24px;
  @media ${size["md"]} {
    width: 100%;
    margin: 20px 0 0 0;
    padding: 20px 10px;
  }
  text-align: left;
  .title {
    margin: 0 0 20px;
    line-height: 22px;
  }
  .bid {
    margin: 0 0 20px;
    .ant-input {
      border-radius: 40px;
      -webkit-border-radius: 40px;
      padding: 0 20px;
    }
  }
  .massage {
    margin: 0 0 20px;
    textarea {
      margin: 0 !important;
      padding: 10px 20px !important;
    }
  }
  &.place-bid {
    margin: 0;
    .bid {
      margin-bottom: 0;
    }
  }
  form {
    padding: 0;
    margin: 0;
    max-width: 100%;
    textarea,
    .btn {
      margin-bottom: 0 !important;
    }
    button {
      font-size: 14px;
      letter-spacing: normal;
    }
  }
  .bid-box {
    margin: 0;
  }
`;
