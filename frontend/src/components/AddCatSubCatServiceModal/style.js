import styled from "styled-components";
import { size } from "../../size";

export const AddTypeServiceModel = styled.div`
  form {
    padding: 0;
    .ant-form-item {
      align-content: flex-start;
      position: relative;
      &.btn-wrapper {
        margin: 20px 0 0;
        padding: 40px 0 20px;
        border-top: 1px solid #cdcdcd;
        @media ${size["sm"]} {
          /* margin: 0; */
          padding: 20px 0 20px;
        }
      }
    }
  }
`;
