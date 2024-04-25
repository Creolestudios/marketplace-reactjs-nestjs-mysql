import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { ButtonLink, SmallTitle, Text } from "../../CommonStyle";
import IntlMessages from "@iso/components/utility/intlMessages";
import {
  UserInfowrapper,
  UserInfoHeader,
  UserContent,
  UserFooter,
} from "./style";
import UserDetailContent from "@iso/components/UserDetailContent";
import InfoImage1 from "@iso/assets/images/img-list.png";
import InfoImage2 from "@iso/assets/images/bid-img-1.jpg";

const UserInfo = ({ data, type }) => {
  const reviewData = data.reviewData;
  const [viewAllData, setViewAllData] = useState(false);
  const [dataCount, setDataCount] = useState(2);
  const toggleViewHide = () => setViewAllData((value) => !value);

  useEffect(() => {
    if (viewAllData) {
      let length = reviewData.length;
      setDataCount(length);
    } else {
      setDataCount(2);
    }
  }, [viewAllData]);
  return (
    <>
      <UserInfowrapper>
        <UserInfoHeader>
          <div className="task">
            <SmallTitle><IntlMessages id="task.completed" /></SmallTitle>
            <Text className="task-completed">{data.totalCompletedTasks}</Text>
          </div>
          <div className="rating">
            <SmallTitle><IntlMessages id="ratings" /></SmallTitle>
            <div className="rate">
              <i className="icon-star"></i>
              <span>{`${data.totalRating ? data.totalRating : "0"} (${data.totalTasks ? data.totalTasks :"0"})`} </span>
            </div>
          </div>
        </UserInfoHeader>
        <UserContent className="review">
          {reviewData && reviewData.length > 0
            ? reviewData
                .slice(0, dataCount)
                .map((data, i) => (
                  <UserDetailContent
                    key={i}
                    userInfo={data}
                    totalReview={reviewData.length}
                  />
                ))
            : <IntlMessages id="noReviews" />}
        </UserContent>
        {type !== "allReview" && (
          <UserFooter>
            {reviewData && reviewData.length > 0 ? <ButtonLink
              className="btn info-btn-border"
              onClick={toggleViewHide}
            >
              <IntlMessages id={viewAllData ? "hide" : "view.all"} />
              
            </ButtonLink> : ""}
            
          </UserFooter>
        )}
      </UserInfowrapper>
    </>
  );
};

export default UserInfo;
