import styled from "styled-components";
import { size } from "../../../size";

export const ImagePriviewer = styled.div``;
export const Figure = styled.div`
  max-width: 580px;
  width: 100%;
  margin: 0 auto 20px;
  @media ${size["md"]} {
    margin: 0 auto 30px;
  }
  @media ${size["sm"]} {
    margin: 0 auto 20px;
  }
  img {
    width: 100%;
  }
`;
