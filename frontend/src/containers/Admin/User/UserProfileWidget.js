import React from "react";
import { UserProfileDetails } from "./Billing.style";
import { StarFilled } from "@ant-design/icons";

const UserProfileWidget = ({ className, children }) => {
  return (
    <UserProfileDetails
      className={`isoUserProfileWidgetWrapper ${className ? className : ""}`}
    >
      {children}
    </UserProfileDetails>
  );
};

export const UserProfileWidgetItem = ({
  type,
  value,
  name,
  status,
  color,
  onClick,
  cursor,
  valstyle
}) => (
  <li
    className="isoUserProfileWidgetItem"
    onClick={onClick}
    style={{ cursor: cursor }}
  >
    <p
      style={{
        font: "Nunito Sans",
        fontWeight: 700,
        fontStyle: "normal",
        size: 14,
      }}
    >
      {type}
    </p>
    <span style={{
        font: "Nunito Sans",
        fontWeight: 700,
        fontStyle: "normal",
        size: 14,
        color: "#423F3F",
      }}
    >:</span>
    <h4 style={{ color: "#758287" }}> <span className="rp-task-name">{name}</span>
    <span className="rp-task-value " style={valstyle}>{type==="Ratings"?<StarFilled style={{color: "#FCD50A",marginRight: '5px'
}} />:null}{value}</span></h4>
    {/* <span className="active-status">{status}</span> */}
  </li>
);

export default UserProfileWidget;
