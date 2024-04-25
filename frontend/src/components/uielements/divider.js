import React from 'react';
import { Divider } from 'antd';
import styled from 'styled-components';
import { palette } from 'styled-theme';

const DividerWrapper = styled(Divider)`
  &.ant-divider-horizontal {
    border-top: 1px solid ${palette('border', 0)};
  }
`;

const CustomDivider = (props) => <DividerWrapper {...props} />;

export default CustomDivider;
