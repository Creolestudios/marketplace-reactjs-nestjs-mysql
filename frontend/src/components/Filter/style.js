import styled from "styled-components";
import { size } from "../../size";

export const FilterFormWrapper = styled.div`
  .ant-form-item {
    margin-bottom: 20px;
    align-content: flex-start;
  }
  label {
    color: #423f3f;
    font-weight: 700;
  }

  .ant-select {
    &:not(.ant-select-customize-input) {
      .ant-select-selector {
        border-radius: 14px;
        -webkit-border-radius: 14px;
        height: 60px;
        box-shadow: none;
        @media ${size["xxl"]} {
          height: 45px;
          box-shadow: none !important;
        }
        @media ${size["md"]} {
          height: 40px;
        }
        input {
          height: 100%;
        }
        .ant-select-selection-placeholder {
          line-height: 60px;
          @media ${size["xxl"]} {
            line-height: 45px;
          }
          @media ${size["md"]} {
            line-height: 40px;
          }
        }
        .ant-select-selection-item {
          line-height: 60px;
          @media ${size["xxl"]} {
            line-height: 45px;
          }
          @media ${size["md"]} {
            line-height: 40px;
          }
        }
      }
    }
    &.special-subcategory {
      .ant-select-selector {
        .ant-select-selection-item {
          .ant-select-selection-item-content {
            line-height: 24px;
          }
          .ant-select-selection-item-remove {
            line-height: 24px;
          }
        }
      }
    }
  }

  .distance-slider {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ant-slider {
      width: 100%;
      .ant-slider-handle {
        border: solid 2px #fcae1d;
        background: #fcae1d;
        width: 20px;
        height: 20px;
        margin-top: -8px;
        &:hover {
          border: solid 2px #fcae1d;
        }
        &:focus {
          box-shadow: none;
        }
      }
      .ant-slider-step {
        height: 6px;
      }
      .ant-slider-track {
        border: solid 2px #fcae1d;
        height: 6px;
        border-radius: 20px;
        background: #fcae1d;
      }
      .ant-slider-rail {
        background-color: #cdcdcd;
        height: 6px;
        border-radius: 20px;
      }
    }
    .distance-text {
      color: #758287;
      font-size: 14px;
      font-weight: 400;
      white-space: nowrap;
      text-align: right;
      margin-left: 5px;
    }
  }
`;

export const FilterWrapper = styled.div`
  .apply-btn {
    background-color: #fff !important;
    color: #fcae1d !important;
  }

  height: auto;
  .ant-checkbox {
    margin-top: 0 !important;
  }
  .checkboxFont {
    font-family: Nunito Sans !important;
    font-size: 16px;
    margin-bottom: 12px;
    color: #758287;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #fcae1d !important;
    border-color: #fcae1d !important;
  }

  @media ${size["md"]} {
    .ant-checkbox + span {
      padding-left: 20px;
    }
    .ant-checkbox-group {
      padding: 0 0 0 13px !important;
    }
  }
  label{
    padding-bottom: 10px;
  }
  /* @media ${size["xs"]} {
    height: calc(100vh - 100px);
  } */
`;
