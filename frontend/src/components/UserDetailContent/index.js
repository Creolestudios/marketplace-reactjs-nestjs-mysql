import React from "react";
import {} from "antd";
import { PeraGraph, TaskTitle } from "../../CommonStyle";
import { UserDetailWrapper, Avatar, AvatarContent, Description } from "./style";
import avtarimg from "@iso/assets/images/avatar.png";

const UserDetailContent = ({ userInfo, totalReview }) => {
  return (
    <>
      <UserDetailWrapper className="user-detail">
        <Avatar>
          <img src={userInfo.reviewer_photo || avtarimg} alt="img" />
        </Avatar>
        <AvatarContent>
          {/* <Left> */}
          <TaskTitle className="title">{userInfo.reviewer_name}</TaskTitle>
          <TaskTitle className="sub-title">{userInfo.task_title}</TaskTitle>
          <Description>
            <PeraGraph className="user-pera">{userInfo.review}</PeraGraph>
            <div className="rate">
              <i className="icon-star"></i>
              <span>
                {userInfo.rating} ({totalReview})
              </span>
            </div>
          </Description>
          {/* </Left> */}
          {/* <Right>
            <div className="rate">
              <i className="icon-star"></i>
              <span>4.5 (462)</span>
            </div>
          </Right> */}
        </AvatarContent>
      </UserDetailWrapper>
    </>
  );
};

export default UserDetailContent;
