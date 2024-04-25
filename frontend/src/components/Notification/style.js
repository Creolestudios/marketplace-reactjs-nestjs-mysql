import styled from "styled-components";
import { size } from "../../size";

export const NotificationMsgWrapper = styled.div``;
export const Message = styled.div`
  border-bottom: 1px solid #cdcdcd;
  padding: 20px 0;
  .msg-pera {
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    font-weight: 400;
    b {
      margin: 0 4px;
    }
  }
  &:last-child {
    border: 0;
  }
`;
export const Special = styled.strong`
  color: #2aabe1;
  font-weight: 700;
  margin: 0 4px;
  @media ${size["xs"]} {
  }
`;
