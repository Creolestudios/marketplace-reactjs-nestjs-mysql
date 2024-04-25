import React from 'react';
import { LayoutHeaderActionWrapper } from './layoutHeaderActionWrapper.style';

export default (props) => (
  <LayoutHeaderActionWrapper
    className={
      props.className != null
        ? `${props.className} isoLayoutHeaderActionWrapper`
        : 'isoLayoutHeaderActionWrapper'
    }
    {...props}
  >
    {props.children}
  </LayoutHeaderActionWrapper>
);
