import React, { useState } from "react";
import {
  TaskTitle,
  SuccessSituation,
  Date,
  ButtonLink,
  TextDanger,
  TextInfo,
  TextDarkInfo,
  PurpleSituation,
  DangerSituation,
  DarkInfoSituation,
  InfoSituation,
  PeraGraph,
} from "../../CommonStyle";
import {
  Card,
  Price,
  Currency,
  CostWrapper,
  CardInnerWrapper,
  CheckboxWrapper,
} from "./style";
import Checkbox from "antd/lib/checkbox/Checkbox";
import {
  UserNumberPos,
  NumberPos,
  RatingWrapper,
} from "@iso/containers/Client/SpecialistsDetails/style";
import IntlMessages from "@iso/components/utility/intlMessages";
import active from "@iso/assets/images/no-image.jpg";
import { Link, Redirect, useHistory } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "../../library/helpers/redirect";
let title = "Plumber required for a job."; //not there

let currency = "Kr"; //not there

const CardSpecialist = (props) => {
  let userStatus = useSelector((state) => state.Auth.userStatus);
  const [mobile, setMobile] = useState(false);
  const handleRedirect = () => {
    setMobile(true)
  };
  return (
    <Card>
      {mobile && (
        <Redirect
          to={`/client/user-profile/${props.task.user_id}/profile`}
        />
      )}
      {props.fromUserMenu && (
        <CheckboxWrapper>
          <Checkbox></Checkbox>
        </CheckboxWrapper>
      )}

      <CardInnerWrapper onClick={handleRedirect}>
        <div className="card-discription">
          <div className="mob-title">
            <img
              src={props.task.profile_photo ? props.task.profile_photo : active}
              alt="img"
            />
            <div className="card-title mob">
              {props.pageType === "specialist" ? (
                <>
                  <Link
                    to={
                      userStatus === 1
                        ? `/client/user-profile/${props.task.user_id}/profile`
                        : "#"
                    }
                  >
                    <TaskTitle className="title">
                      {props.task.user_name}

                      <div className="rate">
                        <i className="icon-star"></i>
                        <span>{props.task.avg_rating} </span>
                      </div>
                    </TaskTitle>
                  </Link>
                </>
              ) : (
                <Link
                  to={{
                    pathname: `/client/task-details/${props.userType}/${props.task.taskData.id}`,
                  }}
                >
                  <TaskTitle className="title">
                    {props.task.taskData.title}
                  </TaskTitle>
                </Link>
              )}
              {props.pageType === "specialist" ? (
                <UserNumberPos className="usernumber">
                  <i className="icon-betch"></i>
                  <NumberPos>{props.task.ranking}</NumberPos>
                </UserNumberPos>
              ) : (
                <CostWrapper>
                  <Price className="price">
                    {props.task.taskData.estimated_budget}{" "}
                  </Price>
                  <Currency>{currency}</Currency>
                </CostWrapper>
              )}
            </div>
          </div>

          <div className="card-dec-inner">
            <div className="card-title desktop">
              {props.pageType === "specialist" ? (
                <Link
                  to={
                    userStatus === 1
                      ? `/client/user-profile/${props.task.user_id}/profile`
                      : "#"
                  }
                >
                  <TaskTitle className="title">
                    {props.task.user_name}
                  </TaskTitle>
                </Link>
              ) : (
                <Link
                  to={
                    userStatus === 1
                      ? {
                          pathname: `/client/task-details/${props.userType}/${props.task.taskData.id}`,
                        }
                      : "#"
                  }
                >
                  <TaskTitle className="title">
                    {props.task.taskData.title}
                  </TaskTitle>
                </Link>
              )}
              {props.pageType === "specialist" ? (
                <RatingWrapper>
                  <div className="rate">
                    <i className="icon-star"></i>
                    <span>
                      {props.task.avg_rating}({props.task.total_review})
                    </span>
                  </div>
                </RatingWrapper>
              ) : (
                <RatingWrapper></RatingWrapper>
              )}
              {props.pageType === "specialist" ? (
                <UserNumberPos>
                  <i className="icon-betch"></i>
                  <NumberPos>{props.task.ranking}</NumberPos>
                </UserNumberPos>
              ) : (
                <CostWrapper>
                  <Price className="price">
                    {props.task.taskData.estimated_budget}
                  </Price>
                  <Currency>Kr</Currency>
                </CostWrapper>
              )}
            </div>
            <div className="service">
              <span className="ser-name">
                <i className="icon-cunstruction"></i>
                {props.task.category}
              </span>

              <span className="ser-name">
                <i className="icon-handyman"></i>
                {props.task.sub_category}
              </span>
              <span className="ser-name">
                {props.pageType === "specialist" ? (
                  <i className="icon-location"> </i>
                ) : (
                  <>
                    <i className="icon-down-rembo"></i>
                  </>
                )}
                {props.pageType === "specialist" ? props.task.city : ""}
              </span>
            </div>
            <div className="category-wraper">
              {props.pageType === "specialist" ? (
                <ul className="category">
                  {props.task.work_as === "FREELANCE" ? (
                    <li>
                      <IntlMessages id="FREELANCE" />
                    </li>
                  ) : (
                    ""
                  )}

                  {/* <li>
                    <IntlMessages id="NoChoosenSpecialist" />
                  </li> */}
                </ul>
              ) : (
                <ul className="category">
                  <li>
                    <IntlMessages id="SignUp.Freelancer" />
                  </li>
                  {props.task.taskData.nemid_authorized === 1 ? (
                    <li>
                      <IntlMessages id="Authorized" />
                    </li>
                  ) : (
                    ""
                  )}
                  {props.task.taskData.urgency ? (
                    <li>
                      {" "}
                      <IntlMessages id="Urgent" />{" "}
                    </li>
                  ) : (
                    ""
                  )}
                  <li>
                    <IntlMessages id="NoChoosenSpecialist" />
                  </li>
                </ul>
              )}
            </div>
            {props.pageType === "specialist" && (
              <PeraGraph className="pera"> {props.task.description}</PeraGraph>
            )}
            {props.pageType === "specialist" && (
              <Link
                className="btn invite-btn invite-button"
                to={
                  userStatus === 1
                    ? {
                        pathname: `/client/task-specialists/${props.task.user_id}`,
                        state: {
                          ranking: props.task.ranking,
                        },
                      }
                    : "#"
                }
              >
                <IntlMessages id="Invitefortask" />
              </Link>
            )}
          </div>
        </div>

        {props.pageType === "specialists" ? null : <></>}
      </CardInnerWrapper>
    </Card>
  );
};

export default CardSpecialist;
