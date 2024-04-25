import React from "react";
import BoxTitleWrapper from "./boxTitle";
import { BoxWrapper, BoxChildren, BoxFooter } from "./box.style";

export default (props) => (
  <BoxWrapper
    className={`${props.className ? props.className : ""} isoBoxWrapper`}
    style={props.style}
  >
    {props.title && props.onTitleClick ? (
      <BoxTitleWrapper
        title={props.title}
        className="isoBoxHeaderWrapper"
        backGColor={props.backGColor}
        borderBottom={props.borderBottom}
        onTitleClick={props.onTitleClick}
      >
        {props.renderChildren}
      </BoxTitleWrapper>
    ) : (
      <BoxTitleWrapper
        title={props.title}
        className="isoBoxHeaderWrapper"
        backGColor={props.backGColor}
        borderBottom={props.borderBottom}
      >
        {props.renderChildren}
      </BoxTitleWrapper>
    )}
    <BoxChildren className="isoBoxChildrenWrapper">
      {props.children}
    </BoxChildren>
    {props.footer && (
      <BoxFooter className="isoBoxFooterWrapper">{props.footer}</BoxFooter>
    )}
  </BoxWrapper>
);
