import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

const IsoWrapperStyle = styled.div`
  background-color: ${palette('monochrome', 0)};
`;

const IsoWrapper = ({ children, ...props }) => (
  <IsoWrapperStyle {...props}>{children}</IsoWrapperStyle>
);

export default IsoWrapper;
