import styled from "styled-components";

const LayoutContentWrapper = styled.div`
  padding: 30px;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;

  @media only screen and (max-width: 767px) {
    padding: 50px 20px;
  }

  @media (max-width: 600px) {
    padding: 15px 0;
  }
`;

export { LayoutContentWrapper };
