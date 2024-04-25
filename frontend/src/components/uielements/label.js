import React from 'react';
import styled from 'styled-components';
import { palette } from 'styled-theme';

const LabelStyled = styled.label`
  color: ${palette('label', 0)};
  font-weight: 600;
  display: inline-block;
  margin: 0 0 5px;
`;

const Label = ({ children, ...props }) => (
  <LabelStyled {...props}>{children}</LabelStyled>
);

export default Label;
