import React from 'react';
import {
  HeaderBreadCrumbWrapper,
  DisabledLinkTextWrapper,
} from './headerBreadCrumb.style';

export default (props) => (
  <HeaderBreadCrumbWrapper
    className={
      props.className != null
        ? `${props.className} isoHeaderBreadCrumbWrapper`
        : 'isoHeaderBreadCrumbWrapper'
    }
    {...props}
  >
    {props.children}
  </HeaderBreadCrumbWrapper>
);

export const DisabledLinkText = ({ children, ...props }) => (
  <DisabledLinkTextWrapper {...props}>{children}</DisabledLinkTextWrapper>
);
