import React from 'react';
import { LayoutHeaderContentWrapper } from './layoutHeaderWrapper.style';

export default (props) => (
  <LayoutHeaderContentWrapper
    className={
      props.className != null
        ? `${props.className} isoLayoutHeaderContentWrapper`
        : 'isoLayoutHeaderContentWrapper'
    }
    {...props}
  >
    {props.children}
  </LayoutHeaderContentWrapper>
);
