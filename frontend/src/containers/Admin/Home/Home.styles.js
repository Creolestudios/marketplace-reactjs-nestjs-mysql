import styled from "styled-components";
import WithDirection from "@iso/lib/helpers/rtl";
import Card from "@iso/components/uielements/card";

export const DashboardContentWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  .chartWrapper {
    width: 100%;
    height: 300px;
    .recharts-default-legend {
      display: flex;
      .recharts-legend-item-text {
        display: inline-flex;
        color: #000000 !important;
      }
    }
  }
  .recentActivityContainer {
    .ant-card-body {
      height: 125px;
      padding: 8px 24px;
      overflow: auto;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
    }
    .recentActivities {
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const UsersCard = styled(Card)`
  background-color: #7266BA!important;;
  
  border-radius: 10px !important;
  .ant-card-body {
    display: flex;
    padding: 0px;
  }
  .users {
    display:flex;
    justify-content:center;
    text-align:left;
    flex-direction:column;
    padding-left: 20px;
    width:263px;
    height: 85px;
    // padding: 25px;
    color: #fff;
    h3 {
      color: #fff;
      font-size: 20px;
      font-weight: 600;
    }
    span {
      font-weight: 500;
      font-size: 15px;
    }
  }
  &.user {
    // border: 2px solid #fc05f8;
    overflow: hidden;
  }
  .userIcon {
    background-color: #675ca8;
    display:flex;
    justify-content: center;
    // padding: 15px 10px;
    // border-radius: 10px 0px 0px 10px;
    width: 80px;
    display: flex;
    align-items: center;
  }
  i {
    font-size: 35px;
  }
`;

export const SpacesCard = styled(UsersCard)`
    background-color: #42A5F6 !important;
    &.spaces {
      // border: 2px solid #9900cc;
      overflow: hidden;
    }
      .userIcon {
        background-color: #3C94DE;
      }
    }
`;

export const AttributeCard = styled(UsersCard)`
    background-color: #7ED320!important;
    &.usersCard {
      // border: 2px solid #29a329;
      overflow: hidden;
    }
      .userIcon {
        background-color: #71BD1D;
        
      }
    }
`;
export const RevenueCard = styled(UsersCard)`
    background-color: #F75D81!important;
    &.usersCard {
      // border: 2px solid #29a329;
      overflow: hidden;
    }
      .userIcon {
        background-color: #DE5475;
        
      }
    }
`;