import styled from 'styled-components';
import { palette } from 'styled-theme';

const LayoutHeaderActionWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;
  width: 100%;
  padding: 0px;
  background-color: ${palette('monochrome', 0)};
`;

export { LayoutHeaderActionWrapper };
