import React from "react";
import IntlMessages from "@iso/components/utility/intlMessages";

import {
  PeraGraph,
  SmallTitle,
  TextInfo,
  ButtonLink,
  Title,
} from "../../CommonStyle";
import { BottomWrapper } from "./style";

const TaskView = (props) => {
  return (
    <>
      <BottomWrapper>
        <SmallTitle className="title">
          <IntlMessages id="viewbid" />
          </SmallTitle>
        <div className="bid">
          <Title><IntlMessages id="bid" /></Title>
          <TextInfo style={{ fontWeight: "400", color: "#423F3F" }}>
            {props.amount}
          </TextInfo>
        </div>
        <div className="massage">
          <Title><IntlMessages id="sidebar.messages" /></Title>
          <PeraGraph style={{ fontWeight: "400", color: "#423F3F" }}>
            {props.message}
          </PeraGraph>
        </div>
      {props.status ? <ButtonLink
          className="info-btn-border"
          style={{
            display: "inline-block",
            float: "left",
          }}
         
          onClick={props.onEditClicked}
       
        >
          <IntlMessages id="button.edit" />
        </ButtonLink>:""}
       
      </BottomWrapper>
    </>
  );
};

export default TaskView;
