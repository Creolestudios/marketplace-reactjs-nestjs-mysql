import styled from "styled-components";
import { palette } from "styled-theme";

const LayoutContentStyle = styled.div`
  width: 100%;
  background-color: #ffffff;
  // border: 1px solid ${palette("border", 0)};
  height: 100%;
  
  padding: 20px 20px 60px;
  @media screen and (max-width: 600px) {
    padding: 20px 20px 0;
  }
  .ant-popover {
    .ant-popover-content {
      .ant-popover-inner {
        border-radius: 4px !important;
      }
    }
  }
`;

export default LayoutContentStyle;
