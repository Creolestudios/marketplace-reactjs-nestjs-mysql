import styled from "styled-components";
import { palette } from "styled-theme";

const AntCheckbox = (ComponentName) => styled(ComponentName)`
  &.ant-checkbox-wrapper {
    font-size: 14px;
    color: ${palette("label", 0)};
    vertical-align: middle;
    margin-right: 10px;

    &:hover {
      .ant-checkbox-inner {
        border-color: ${palette("primary", 0)};
      }
    }

    .ant-checkbox {
      top: inherit;

      &.ant-checkbox-checked {
        .ant-checkbox-inner {
          background-color: #fcae1d;
        }
        &:after {
          border-color: #fcae1d;
        }
      }

      &:hover {
        .ant-checkbox-inner {
          border-color: #fcae1d;
        }
      }
    }

    .ant-checkbox-inner {
      border-color: #fcae1d;
    }

    .ant-checkbox-input {
      &:focus {
        & + {
          .ant-checkbox-inner {
            border-color: #fcae1d;
          }
        }
      }
    }
  }
`;

export default AntCheckbox;
