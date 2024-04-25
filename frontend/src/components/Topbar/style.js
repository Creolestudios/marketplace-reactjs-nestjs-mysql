import styled from "styled-components";
import { size } from "../../size";

export const Head = styled.div`
  position: relative;
  display: flex;
  margin-bottom: 40px;
  @media ${size["lg"]} {
    margin-bottom: 30px;
  }
  @media ${size["md"]} {
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  @media ${size["md"]} {
    margin-bottom: 20px;
  }
  @media ${size["xs"]} {
    margin-bottom: 15px;
  }
`;

export const LeftSide = styled.div`
  background: #fff;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
  @media ${size["md"]} {
    flex-wrap: wrap;
  }
  @media ${size["xs"]} {
    flex-wrap: wrap;
    padding: 5px;
  }
`;

export const Area = styled.div`
  border-left: 1px solid #cdcdcd;
  padding: 0 15px 0 10px;
  display: flex;
  align-items: center;
  min-width: 180px;
  @media ${size["md"]} {
    min-width: 126px;
  }
  @media ${size["xs"]} {
    padding: 0 0 0 10px;
  }
  i {
    margin-right: 10px;
  }
`;

export const AreaName = styled.div`
  color: #423f3f;
  font-size: 16px;
  font-weight: 400;
  @media ${size["xxl"]} {
    font-size: 15px;
  }
  @media ${size["md"]} {
    font-size: 14px;
  }
  @media ${size["xs"]} {
    font-size: 13px;
  }
`;

export const RightSide = styled.div`
  margin-left: 24px;
  position: relative;
  z-index: 1;
  @media ${size["md"]} {
    margin-left: 0;
    margin-top: 15px;
    margin-bottom: -57px;
    
  }
  @media ${size["xs"]} {
    width: calc(50% - 10px);
  }
  .ant-select {
    height: 100%;
    outline: none;
    border: none;
    min-width: 190px !important;
    width: 100% !important;
    @media ${size["xs"]} {
      min-width: 135px !important;
    }
    .ant-select-selector {
      height: 100% !important;
      align-items: center;
      border-radius: 14px;
      -webkit-border-radius: 14px !important;
      border: none;
      background: #fcae1d !important;
      color: #fff;
      font-weight: 700;
      font-size: 18px;
      outline: none;
      text-align: left;
      padding: 0 20px;
      box-shadow: none !important;
      @media ${size["xxl"]} {
        font-size: 17px;
      }
      @media ${size["lg"]} {
        padding: 6px 20px;
        font-size: 16px;
      }
      @media ${size["xs"]} {
        font-size: 14px;
        padding: 5px 10px;
      }
      .ant-select-selection-item {
        color: #fff !important;
      }
    }
    .ant-select-arrow {
      color: #fff;
      display: flex;
      align-items: center;
      margin-right: 10px;
      @media ${size["xs"]} {
        margin-right: 0;
      }
      &:after {
        content: "\\e910";
        display: block;
        font-family: "icomoon" !important;
        font-size: 7px;
      }
      svg {
        display: none;
      }
    }
  }
 
  &.task-detail-rigth-side {
    ${({ active }) => active && `
    @media ${size["md"]} {
      margin-bottom: 0;
    }
    @media ${size["xs"]} {
      width: 100%;
      margin: 10px 0 0;
    }
    .ant-select-selector {
      padding: 8px 20px;
      box-shadow: none !important;
      @media ${size["xs"]} {
        padding: 5px 10px;
      }
    }
  `}
 
  }

  &.search-task {
    max-width: 408px;
    width: 100%;
    height: 60px;
    box-shadow: 0px 0px 8px rgb(42 171 225 / 10%);
    border-radius: 14px;
    -webkit-border-radius: 14px;
    @media ${size["xxl"]} {
      height: 54px;
    }
    @media ${size["xl"]} {
      height: auto;
    }
    @media ${size["lg"]} {
      max-width: 300px;
    }
    @media ${size["md"]} {
      height: 40px;
      max-width: 250px;
      margin-bottom: -55px;
      margin-top: 15px;
    }
    /* @media ${size["sm"]} {
      max-width: calc(100% - 180px);
    } */
    @media ${size["xs"]} {
      width: calc(50% - 10px);
      max-width: initial;
    }
    .ant-input-group-wrapper {
      &.ant-input-search {
        height: 100%;
        border-radius: 14px;
        -webkit-border-radius: 14px;
        overflow: hidden;
        .ant-input-group {
          height: 100%;
          .ant-input {
            height: 100%;
            border: none;
            padding: 0 20px;
            font-size: 18px;
            @media ${size["xxl"]} {
              font-size: 16px;
            }
            @media ${size["md"]} {
              font-size: 14px;
            }
            &::placeholder {
              font-style: italic;
              font-size: 18px;
              color: #cdcdcd;
              @media ${size["xxl"]} {
                font-size: 16px;
              }
              @media ${size["md"]} {
                font-size: 14px;
              }
            }
            &:focus {
              box-shadow: none;
            }
          }
          .ant-btn {
            height: 100%;
            width: 50px;
            border: none;
            .anticon-search {
              &:before {
              }
              // svg {
              //   display: none;
              // }
            }
          }
        }
      }
    }
    &.inbox-search {
      @media ${size["md"]} {
        margin-top:10px;
        margin-bottom:0px;
        height: 52px;
      }
      @media ${size["sm"]} {
        max-width: 100%;
        width: 100%;
      }
      @media ${size["xs"]} {
        height: 48px;
      }
    }
  }
  &.usermenu-rightside {
    @media ${size["md"]} {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      margin: 10px 0 -20px;
    }
    .btn {
      margin: 0 0 10px 0;
      text-transform: capitalize;
      justify-content: center;
      @media ${size["xxl"]} {
        margin: 0 0 6px 0;
      }
      @media ${size["md"]} {
        margin: 0 0 0 10px;
      }
    }
    .task-select-indi {
      font-size: 14px;
      line-height: 14px;
      color: #758287;
      margin-bottom: -8px;
      white-space:nowrap;
      @media ${size["xxl"]} {
        margin-bottom: -10px;
        font-size: 13px;
      }
    }
  }
`;

export const ContentArea = styled.div`
  display: flex;
  position: relative;
  &.content-section {
    @media ${size["sm"]} {  
      margin-top: 20px;
      .situation{
        margin-top: 20px;
      }
    }
  }
  @media ${size["md"]} {
    flex-direction: column;
  }
  .filter-btn {
    max-width: 110px;
    display: none;
    @media ${size["md"]} {
      display: block;
      margin: -4px 0 15px;
      max-width: 160px;
      background: #fff;
      border: 1px solid #fcae1d;
      color: #fcae1d;
      padding: 0 16px;
    }
    @media ${size["xs"]} {
      width: calc(50% - 10px);
      max-width: initial;
      margin: 2px 0 20px;
    }
  }
  /* .find-filter-btn {
    @media ${size["md"]} {
      margin: 55px 0 15px;
    }
  }
  .specialist-filter {
    @media ${size["md"]} {
      margin: 55px 0 15px;
    } */
  }
`;

export const LeftBlock = styled.div`
  max-width: 300px;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 20px;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
  position: sticky;
  top: 10px;
  @media ${size["lg"]} {
    max-width: 250px;
    padding: 20px;
  }
  @media ${size["md"]} {
    display: none;
    position: fixed;
    /* height: 100vh; */
    z-index: 998;
    top: 70px;
    bottom: 0;
    right: 0;
    left: 0;
    max-width: 100%;
    border-radius: 0;
    -webkit-border-radius: 0;
    box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
    overflow: auto;
    height: calc(100% - 150px);
    padding-top: 0;
  }
  @media ${size["sm"]} {
    top: 56px;
    height: calc(100% - 136px);
  }
  @media ${size["xs"]} {
    position: fixed;
    height: calc(100% - 130px);
    left: 0;
    right: 0;
    max-width: 100%;
    bottom: 0;
    border-radius: 0;
    -webkit-border-radius: 0;
  }
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    
    @media ${size["xs"]} {
      overflow: auto;
      // height: calc(100vh - 206px);
    }
    @media ${size["md"]} {
      padding: 0 0 0 20px;
    }
    .ant-checkbox-group-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      color: #758287;
      font-weight: 400;
      font-size: 18px;
      @media ${size["xxl"]} {
        font-size: 16px;
      }
      @media ${size["md"]} {
        font-size: 14px;
      }
      &:last-child {
        margin: 0;
      }
      .ant-checkbox-inner {
        &:after {
          top: 44%;
        }
      }
      .ant-checkbox{
        margin: -6px 0 0;
      }
    }
  }
  button {
    border: 1px solid #fcae1d;
    color: #fcae1d;
    font-size: 16px;
    font-weight: 700;
    height: 44px;
    text-transform: uppercase;
    border-radius: 30px;
    -webkit-border-radius: 30px;
    padding: 0 25px;
    letter-spacing: 0.5px;
    box-shadow: none;
    transition: all 0.3s linear;
    @media ${size["xxl"]} {
      font-size: 14px;
      padding: 0 20px;
    }
    @media ${size["md"]} {
      font-size: 13px;
      height: 40px;
    }
    &.clear-btn {
      border: none;
      color: #758287 !important;
      background: none !important;
      border: none !important;
    }
    &:hover {
      background: #fcae1d;
      color: #fff;
      border: 1px solid #fcae1d;
    }
    &:active {
      border: 1px solid #fcae1d;
    }
  }
  .filter-header {
    display: none;
    @media ${size["md"]} {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 25px 0 30px;
      position: sticky;
      top: 0;
      z-index: 1;
      background: #fff;
      font-size: 16px;
      span {
        cursor:pointer;
      }
    }
    .title {
      font-size: 16px;
      font-weight: 400;
      color: #423f3f;
    }
  }
  .filter-title {
    @media ${size["md"]} {
      font-size: 14px;
    }
  }
  .filter-footer {
    margin-top: 15px;
    @media ${size["md"]} {
      bottom: 0;
      position: fixed;
      right: 0;
      left: 0;
      padding: 0 55px 20px;
      background: #fff;
    }
    .ant-divider-horizontal{
      margin: 0 0 20px !important;
      @media ${size["md"]} {
        margin: 0 -55px 20px -55px !important;
        width: calc(100% + 110px);
      }
    }
    .apply-btn {
      padding: 0 30px;
      @media ${size["lg"]} {
        padding: 0 20px;
      }
      @media ${size["sm"]} {
        padding: 0 15px;
      }
      &:focus {
        border-color: #fcae1d;
      }
    }
    .btn-clear {
      @media ${size["md"]} {
        padding: 0;
      }
    }
  }
  &.usermenu-block {
    @media ${size["md"]} {
      display: block;
      position: unset;
      height: auto;
      margin: 0 0 20px;
      border-radius: 14px;
      -webkit-border-radius: 14px;
      box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
      margin-top: 20px;
      padding-top: 20px;
    }
  }
`;

export const RightBlock = styled.div`
  margin-left: 24px;
  /* width: 100%; */
  flex: auto;
  @media ${size["lg"]} {
    margin-left: 15px;
  }
  @media ${size["md"]} {
    margin-left: 0;
    width: 100%;
  }
  @media ${size["sm"]} {
    margin: 0 0 0 auto;
  }
  .sug-title {
    display: flex;
    margin: 0 0 20px;
    align-items: center;
    .sug-text {
      margin: 0 5px 0 0;
      font-weight: 400;
      color: #423f3f;
    }
    .task-count {
      background: #fcae1d;
      min-width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      border-radius: 50%;
      -webkit-border-radius: 50%;
      font-size: 14px;
    }
  }
  .edit-task {
    width: fit-content;
    margin: 0 0 0 auto;
  }
  /* &.specialist-page {
    @media ${size["md"]} {
      margin-left: 0;
    }
  } */
`;
