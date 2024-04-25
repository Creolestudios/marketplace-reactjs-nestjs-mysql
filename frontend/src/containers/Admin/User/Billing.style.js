import styled from "styled-components";
import { palette } from "styled-theme";

const UserProfileDetails = styled.ul`
  display: flex;
  width: 100%;
  .isoUserProfileWidgetItem.user-detail-item
  {
    p
    {
      min-width:110px;
    }
  }
  .isoUserProfileWidgetItem {
    display: flex;
    /* justify-content: space-between; */
    padding: 15px 0;

    p {
      min-width: 135px;
      text-align: left;
      white-space: nowrap;
      color: #423f3f;
    }
    span {
      margin-right: 20px;
    }
  }
  .tab-wrapper {
    @media screen and (max-width: 767px) {
      flex-direction: column;
    }
    .tab-wrapper-inner {
      margin: 0 40px !important;
      @media screen and (max-width: 767px) {
        margin: 20px 0 20px !important;
      }
    }
  }
`;

export { UserProfileDetails };
