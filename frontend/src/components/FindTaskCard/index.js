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
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppConstant } from "@iso/config/constant";
import { redirect } from "../../library/helpers/redirect";
let title = "Plumber required for a job."; //not there

let currency = "Kr"; //not there

const TaskCard = (props) => {
  const [mobile, setMobile] = useState(false);
  const location = useLocation();
  let Category = useSelector((state) => state.Categories);
  let userStatus = useSelector((state) => state?.Auth?.userStatus);
  //let userStatus=1
  let idWiseParentCategories = Category.idWiseParentCategories;
  let idWisesubCategories = Category.idWiseSubCategories;
  let subcat = idWisesubCategories[props.task.category_id];
  subcat =
    subcat && subcat.filter((each) => each.id === props.task.sub_category_id);
  if (subcat) {
    subcat.filter((each) => each.id === props.task.sub_category_id);
    if (subcat.length > 0) {
      subcat = subcat[0].name;
    }
  }
  const handleRedirect = () => {
    setMobile(true)
  };
  return (
    <Card>
      {mobile && (
        <Redirect
          to={{
            pathname: `/client/task-details-specialists/${props.userType}/${props.task.task_id}`,
            state: { prevPath: location.pathname },
          }}
        />
      )}
      {props.fromUserMenu && (
        <CheckboxWrapper>
          <Checkbox></Checkbox>
        </CheckboxWrapper>
      )}

      <CardInnerWrapper>
        <div onClick={handleRedirect}>
          <div className="card-discription" >
            <div className="mob-title">
              {props.task.media_type === "video" ? <video>
                <source src={props.task.media} type="video/mp4"></source>
              </video> : <img
                src={
                  props.task.media ? props.task.media : active
                }
                alt="img"
              />}

              <div className="card-title mob">
                {props.userType === "specialist" ? (
                  <Link
                    to={{
                      pathname: `/client/task-details-specialists/${props.userType}/${props.task.task_id}`,
                      state: { prevPath: location.pathname },
                    }}
                  >
                    <TaskTitle className="title">
                      {props.task.task_title}
                    </TaskTitle>
                  </Link>
                ) : (
                  <a href="\task-detail">
                    <TaskTitle className="title">
                      {props.task.taskData.title}
                    </TaskTitle>
                  </a>
                )}
                {props.userType === "specialist" ? (
                  <UserNumberPos className="usernumber">
                    {/* <i className="icon-betch"></i> */}
                    <NumberPos>{props.task.estimated_budget} Kr</NumberPos>
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
                {props.userType === "specialist" ? (
                  <Link
                    to={{
                      pathname: `/client/task-details-specialists/${props.userType}/${props.task.task_id}`,
                      state: { prevPath: location.pathname },
                    }}
                  >
                    <TaskTitle className="title">
                      {props.task.task_title}
                    </TaskTitle>
                  </Link>
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

                {props.userType === "specialist" ? (
                  <UserNumberPos>
                    {/* <i className="icon-betch"></i> */}
                    <NumberPos>{props.task.estimated_budget} Kr</NumberPos>
                  </UserNumberPos>
                ) : (
                  <CostWrapper>
                    <Price className="price">
                      {props.task.taskData.estimated_budget} Kr
                    </Price>
                    <Currency>{props.task.currency}</Currency>
                  </CostWrapper>
                )}
              </div>
              <div className="service">
                <span className="ser-name">
                  <i className="icon-cunstruction"></i>

                  {props.userType === "employer"
                    ? idWiseParentCategories[props.task.taskData.category_id]
                    : idWiseParentCategories[props.task.category_id]}
                </span>

                <span className="ser-name">
                  <i className="icon-handyman"></i>
                  {subcat && subcat}
                </span>
                <span className="ser-name">
                  {props.userType === "specialist" ? (
                    <i className="icon-location"></i>
                  ) : (
                    <>
                      <i className="icon-down-rembo"></i>
                    </>
                  )}
                  {props.userType === "employer"
                    ? props.task.taskData.zipcode
                    : props.task.zipcode}
                </span>
              </div>
              <div className="category-wraper">
                {props.userType === "employer" ? (
                  <ul className="category">
                    <li>
                      {props.task.taskData.specialist_preference === 1 ? (
                        <IntlMessages id="SignUp.Freelancer" />
                      ) : props.task.taskData.specialist_preference === 0 ? (
                        <IntlMessages id="SignUp.Both" />
                      ) : (
                        <IntlMessages id="SignUp.Bussiness" />
                      )}
                      {/* <IntlMessages id="SignUp.Freelancer" /> */}
                    </li>
                    {props.task.taskData.nemid_authorized === 1 ? (
                      <li>
                        <IntlMessages id="Authorized" />
                      </li>
                    ) : (
                      <li>
                        <IntlMessages id="NemId" />{" "}
                      </li>
                    )}
                    {props.task.taskData.urgency ? (
                      <li>
                        {" "}
                        <IntlMessages id="Urgent" />{" "}
                      </li>
                    ) : (
                      ""
                    )}
                    {props.task.specialistData.name == null ? (
                      <li>
                        {" "}
                        <IntlMessages id="NoChoosenSpecialist" />
                        {props.task.specialistData.name}
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                ) : (
                  <ul className="category">
                    <li>
                      {props.task.specialist_preference === 1 ? (
                        <IntlMessages id="SignUp.Freelancer" />
                      ) : props.task.specialist_preference === 0 ? (
                        <IntlMessages id="SignUp.Bussiness" /> |
                        <IntlMessages id="SignUp.Freelancer" />
                      ) : (
                        <IntlMessages id="SignUp.Bussiness" />
                      )}
                      {/* <IntlMessages id="SignUp.Freelancer" /> */}
                    </li>
                    {props.task.nemid_authorized === 1 ? (
                      <li>
                        <IntlMessages id="authByNem" />
                      </li>
                    ) : (
                      ""
                    )}
                    {props.task.urgency ? (
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

                {props.userType === "employer" ? (
                  ""
                ) : (
                  <div className="bid">
                    {props.userType === "specialist" ? (
                      <>
                        <IntlMessages id="antTable.title.Employer" />:{" "}
                        <a>
                          {" "}
                          <TextInfo className="bid-count">
                            <Link
                              to={
                                userStatus === 1
                                  ? `/client/user-profile/${props.task.user_employer_id}/profile`
                                  : "#"
                              }
                            >
                              {" "}
                              {props.task.employer_name}
                            </Link>
                          </TextInfo>{" "}
                        </a>
                      </>
                    ) : props.task.taskData.task_status ? (
                      <>
                        <IntlMessages id="bids" />:{" "}
                        <Link
                          to={{
                            pathname:
                              props.task.taskData.total_bid > 0
                                ? `/client/bids/${props.task.taskData.id}`
                                : "",
                          }}
                        >
                          {" "}
                          <TextInfo className="bid-count">
                            {props.task.taskData.total_bid}
                          </TextInfo>{" "}
                        </Link>
                      </>
                    ) : (
                      <>
                        <IntlMessages id="antTable.title.Specialist" />:{" "}
                        <a>
                          {" "}
                          <TextInfo className="bid-count">
                            Ric Salzmen
                          </TextInfo>{" "}
                        </a>
                      </>
                    )}
                  </div>
                )}
              </div>
              {props.pageType === "Specialists" && (
                <PeraGraph className="pera">
                  Varius neque sagittis sagittis risus elit. Pharetra ante
                  fermentum feugiat quis eget volutpat. Ut amet platea eu massa
                  vel. Id nibh donec risus id feugiat in nulla massa.
                </PeraGraph>
              )}
              {props.pageType === "Specialists" && (
                <ButtonLink
                  className="btn invite-btn"
                  style={{ display: "table-caption", margin: "0 0 0 auto" }}
                  disabled={userStatus === 3}
                >
                  <IntlMessages id="inviteForTask" />
                </ButtonLink>
              )}
            </div>
          </div>

          {props.userType === "specialist" ? (
            <div className="situation-wraper">
              <div>
                {props.task.task_status === AppConstant.CardStatus.Active && (
                  <SuccessSituation className="situation">
                    <IntlMessages id="Active" />
                  </SuccessSituation>
                )}
                {props.task.task_status === AppConstant.CardStatus.Open &&
                  props.task.placed_bid ? (
                  <InfoSituation className="situation">
                    <IntlMessages id="Placed" />
                  </InfoSituation>
                ) : props.task.task_status === AppConstant.CardStatus.Open &&
                  props.task.invited ? (
                  <InfoSituation className="situation">
                    Suggested Task
                  </InfoSituation>
                ) : props.task.task_status === AppConstant.CardStatus.Open ? (
                  <InfoSituation className="situation">
                    <IntlMessages id="Open-Task" />
                  </InfoSituation>
                ) : (
                  ""
                )}
                {props.task.task_status === AppConstant.CardStatus.Archieved && (
                  <PurpleSituation className="situation">
                    <IntlMessages id="Archieved" />
                  </PurpleSituation>
                )}
                {props.task.task_status === AppConstant.CardStatus.cancelled && (
                  <DangerSituation className="situation">
                    <IntlMessages id="Cancelled" />
                  </DangerSituation>
                )}
                {props.task.task_status === AppConstant.CardStatus.Completed && (
                  <DarkInfoSituation className="situation">
                    {props.task.status}
                  </DarkInfoSituation>
                )}
              </div>

              {props.task.end_date_time ? (
                <Date className="date">
                  {moment(props.task.end_date_time).format("YYYY/MM/DD")}
                </Date>
              ) : (
                <Date className="date">
                  {moment(props.task.start_date_time).format("YYYY/MM/DD")}
                </Date>
              )}
            </div>
          ) : (
            <div className="situation-wraper">
              {props.task.taskData.task_status ===
                AppConstant.CardStatus.Active && (
                  <SuccessSituation className="situation">
                    <IntlMessages id="Active" />
                  </SuccessSituation>
                )}
              {props.task.taskData.task_status ===
                AppConstant.CardStatus.Open && (
                  <InfoSituation className="situation">
                    <IntlMessages id="Open" />
                  </InfoSituation>
                )}
              {props.task.taskData.task_status ===
                AppConstant.CardStatus.Archieved && (
                  <PurpleSituation className="situation">
                    <IntlMessages id="Archieved" />
                  </PurpleSituation>
                )}
              {props.task.taskData.task_status ===
                AppConstant.CardStatus.Completed && (
                  <SuccessSituation className="situation">
                    <IntlMessages id="Completed" />
                  </SuccessSituation>
                )}
              {props.task.taskData.task_status ===
                AppConstant.CardStatus.cancelled && (
                  <DangerSituation className="situation">
                    <IntlMessages id="Cancelled" />
                  </DangerSituation>
                )}
              {props.task.taskData.task_status ===
                AppConstant.CardStatus.Reported && (
                  <DangerSituation className="situation">
                    <IntlMessages id="Reported" />
                  </DangerSituation>
                )}
              {props.task.taskData.end_date_time ? (
                <Date className="date">
                  {moment(props.task.taskData.end_date_time).format("YYYY/MM/DD")}
                </Date>
              ) : (
                <Date className="date">
                  {moment(props.task.taskData.start_date_time).format(
                    "YYYY/MM/DD"
                  )}
                </Date>
              )}
            </div>
          )}
        </div>
        {props.pageType === "specialists" ? null : <></>}
      </CardInnerWrapper>
    </Card>
  );
};

export default TaskCard;
