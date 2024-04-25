import styled from "styled-components";
import { Link } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import { palette } from "styled-theme";
import breadcrumbIcon from "@iso/assets/images/icon/breadcrumb.svg";

const HeaderBreadCrumbWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
  width: 100%;
`;

const DisabledLinkTextWrapper = styled(Link)`
  margin-bottom: 0;
  color: #758287;
  font-weight: 600;
  font-size: 20px;
  line-height: normal;
  display: flex;
  align-items: center;
  &:hover {
    color: ${palette("secondary", 11)};
  }
  &:after {
    content: "\\e914";
    color: ${palette("grayscale", 12)};
    margin: 0 10px;
    font-family: "icomoon" !important;
    transform: rotate(180deg);
    font-size: 18px;
    @media (max-width: 767px) {
      font-size: 12px;
    }
  }

  @media (max-width: 767px) {
    font-size: 18px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

export { HeaderBreadCrumbWrapper, DisabledLinkTextWrapper };
