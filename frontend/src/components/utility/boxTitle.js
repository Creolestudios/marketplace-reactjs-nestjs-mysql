import React from "react";
import { BoxTitle, BoxTitleMainWrapper } from "./boxTitle.style";

export default (props) => {
  return (
    <BoxTitleMainWrapper
      className={`${props.className ? props.className : ""}`}
      style={{
        backgroundColor: `${props.backGColor}`,
        borderBottom: `${props.borderBottom}`,
      }}
    >
      {props.title && props.onTitleClick ? (
        <>
          <BoxTitle className="isoBoxTitle" onClick={props.onTitleClick}>
            {" "}
            {props.title}{" "}
          </BoxTitle>
          {props.children && (
            <div className="isoBoxTitleNode">{props.children}</div>
          )}
        </>
      ) : (
        props.title && (
          <>
            <BoxTitle className="isoBoxTitle"> {props.title} </BoxTitle>
            {props.children && (
              <div className="isoBoxTitleNode">{props.children}</div>
            )}
          </>
        )
      )}
    </BoxTitleMainWrapper>
  );
};
