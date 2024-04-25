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
import { Modal, Button, Form } from "antd";
import UploadComponent from "@iso/components/UploadComponent";
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
import taskActions from "@iso/redux/task/actions";
import { AppConstant } from "@iso/config/constant";
import VideoImage from "@iso/assets/images/video-icon.png";

let title = "Plumber required for a job."; //not there
const { singleTaskDetails, taskAction, reviewTask, clearMessages } =
  taskActions;
let currency = "Kr"; //not there
const reportTaskMediaError =
  "To report a completed task, media proof must be provided";
const TaskCard = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  let fileLists = { fileList: [], files: [] };
  const [fileList, setfileList] = useState(fileLists);
  const [mobile, setMobile] = useState(false);
  const [reportForm] = Form.useForm();
  const [uploadError, setuploadError] = useState("");
  const [reportFormVisible, setReportFormVisible] = useState(false);
  const location = useLocation();
  let type = useSelector((state) => state.userTypeAndFilter.userType);
  let Category = useSelector((state) => state.Categories);
  let idWiseParentCategories = Category.idWiseParentCategories;
  let idWisesubCategories = Category.idWiseSubCategories;
  let userStatus = useSelector((state) => state?.Auth?.userStatus)

  let subcat = idWisesubCategories[props.task.taskData.category_id];
  subcat =
    subcat &&
    subcat.filter((each) => each.id === props.task.taskData.sub_category_id);
  if (subcat) {
    subcat.filter((each) => each.id === props.task.taskData.sub_category_id);
    if (subcat.length > 0) {
      subcat = subcat[0].name;
    }
  }
  const reportFormSubmit = (value) => {
    if (fileList.fileList.length === 0) {
      setuploadError(reportTaskMediaError);
      return;
    }
    if (value.reportAndReview) {
      let formData = new FormData();
      let payload = {
        actionType: "report",
        user_type: type,
        task_id: props.task.taskData.id,
        report_reason: value.reportAndReview,
      };
      Object.keys(payload).forEach((key) => formData.append(key, payload[key]));

      fileList.files.forEach((file) =>
        formData.append("report_task_media", file.originFileObj)
      );

      dispatch(taskAction(payload, formData, history));
      setReportFormVisible(false);
    }
  };
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  async function handlerPreview(file) {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  }
  function handlerChange({ fileList, file }) {
    setuploadError("");
    const isValidImage =
      file.type === "image/jpeg" || file.type === "image/png";
    const isValidVideo = file.type === "video/mp4" || file.type === "video/quicktime";;
    const isValidAudio = file.type === "audio/mpeg";
    if (!isValidAudio && !isValidVideo && !isValidImage) {
      setuploadError(
        "You can only upload Jpg or Png images. Mp4 videos and Mp3 audio file!"
      );

      return;
    }
    const imgSzLt = file.size / 1024 / 1024 < 20;
    const vdSzLt = file.size / 1024 / 1024 < 50;
    const audSzLt = file.size / 1024 / 1024 < 10;
    if (isValidImage && !imgSzLt) {
      setuploadError(<IntlMessages id="ant.Image.sizeError" />);

      return;
    }
    if (isValidVideo && !vdSzLt) {
      setuploadError(<IntlMessages id="ant.Video.sizeError" />);

      return;
    }
    if (isValidAudio && !audSzLt) {
      setuploadError(<IntlMessages id="ant.Audio.sizeError" />);

      return;
    }

    setfileList((ps) => ({
      fileList,
      files: fileList,
    }));
  }
  const handleRedirect = () => {
    setMobile(true)
  }
  return (
    <Card>
      {mobile && (props.userType === "specialist" ? <Redirect to={{
        pathname: `/client/task-details/${props.userType}/${props.task.taskData.id}`,
        state: { prevPath: location.pathname }
      }} /> : <Redirect to={{
        pathname: `/client/task-details/${props.userType}/${props.task.taskData.id}`,
        state: { prevPath: location.pathname }
      }} />)}
      {props.isInviteSpecialist && (
        <CheckboxWrapper>
          <Checkbox
            defaultValue={props.task.taskData.id}
            onChange={props.onCheckboxChecked}
            disabled={props.isChecked ? false : props.disabled}
            checked={props.isChecked}
          ></Checkbox>
        </CheckboxWrapper>
      )}

      <CardInnerWrapper>
        <div onClick={handleRedirect} className="cardRedirect">
          <div className="card-discription">
            <div className="mob-title">
              {props.task.taskMedia.media_type === "video" ?
                <video>
                  <source src={props.task.taskMedia.media} type="video/mp4"></source>
                </video> : <img
                  src={
                    props.task.taskMedia.media ? props.task.taskMedia.media : active
                  }
                  alt="img"
                />}
              
              <div className="card-title mob">
                {props.userType === "specialist" ? (
                  <a>
                    <TaskTitle className="title">
                      {props.task.taskData.title}
                    </TaskTitle>
                  </a>
                ) : (
                  <Link
                    to={userStatus === 1 ? {
                      pathname: `/client/task-details/${props.userType}/${props.task.taskData.id}`,
                      state: { prevPath: location.pathname },
                    } : "#"}
                  >
                    <TaskTitle className="title">
                      {props.task.taskData.title}
                    </TaskTitle>
                  </Link>
                )}
                {props.userType === "specialist" ? (
                  <UserNumberPos className="usernumber">
                    <NumberPos>{props.task.estimated_budget}</NumberPos>
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
                    to={userStatus === 1 ? {
                      pathname: `/client/task-details-specialists/${props.userType}/${props.task.taskData.id}`,
                      state: { prevPath: location.pathname },
                    } : "#"}
                  >
                    <TaskTitle className="title">
                      {props.task.taskData.title}
                    </TaskTitle>
                  </Link>
                ) : (
                  <Link
                    to={userStatus === 1 ? {
                      pathname: `/client/task-details/${props.userType}/${props.task.taskData.id}`,
                      state: { prevPath: location.pathname },
                    } : "#"}
                  >
                    <TaskTitle className="title">
                      {props.task.taskData.title}
                    </TaskTitle>
                  </Link>
                )}

                {props.userType === "specialist" ? (
                  <UserNumberPos>
                    <NumberPos>
                      {props.task.taskData.estimated_budget} Kr
                    </NumberPos>
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

                  {props.userType === "employer"
                    ? idWiseParentCategories[props.task.taskData.category_id]
                    : idWiseParentCategories[props.task.taskData.category_id]}
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
                    : props.task.taskData.zipcode}
                </span>
              </div>
              <div className="category-wraper">
                {props.userType === "employer" ? (
                  <ul className="category">
                    <li>
                      {props.task.taskData.specialist_preference === 1
                        ? <IntlMessages id="SignUp.Freelancer" />
                        : props.task.taskData.specialist_preference === 0
                          ? <IntlMessages id="SignUp.Bussiness" />
                          : <><IntlMessages id="SignUp.Bussiness" /> | <IntlMessages id="SignUp.Freelancer" /></>}
                      {/* <IntlMessages id="SignUp.Freelancer" /> */}
                    </li>
                    {props.task.taskData.nemid_authorized === 1 ? (
                      <li>
                        <IntlMessages id="Authorized" />
                      </li>
                    ) : (
                      <li>
                        <IntlMessages id="NemId" />
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
                      </li>
                    ) : (
                      // <li>{props.task.specialistData.name}</li>
                      ""
                    )}
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
                    {!props.task.employerData ? null : props.task.employerData
                      .name === null ? (
                      <li>
                        {" "}
                        <IntlMessages id="NoChoosenSpecialist" />
                      </li>
                    ) : (
                      // <li>{props.task.employerData.name}</li>
                      ""
                    )}
                  </ul>
                )}

                {props.userType === "specialist" ? (
                  <div className="bid">
                    {!props.task.employerData ? null : props.task.employerData
                      .name === null ? null : (
                      <>
                        <IntlMessages id="antTable.title.Employer" />:{" "}
                        <a>
                          {" "}
                          <Link
                            to={`/client/user-profile/${props.task.employerData.id}/profile`}
                          >
                            {" "}
                            <TextInfo className="bid-count">
                              {props.task.employerData.name}
                            </TextInfo>
                          </Link>{" "}
                        </a>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="bid">
                    {props.task.specialistData.name ? (
                      <>
                        <IntlMessages id="antTable.title.Specialist" />:{" "}
                        <a>
                          {" "}
                          <Link
                            to={`/client/user-profile/${props.task.specialistData.id}/profile`}
                          >
                            {" "}
                            <TextInfo className="bid-count">
                              {props.task.specialistData.name}
                            </TextInfo>
                          </Link>{" "}
                        </a>
                      </>
                    ) : (
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
                          <TextInfo className="bid-count">
                            {props.task.taskData.total_bid}
                          </TextInfo>
                        </Link>
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
                >
                  <IntlMessages id="inviteForTask" />
                </ButtonLink>
              )}
            </div>
          </div>
          {props.userType === "specialist" ? (
            <div className="situation-wraper">
              {props.task.taskData.task_status === AppConstant.CardStatus.Active && (
                <SuccessSituation className="situation">
                  {" "}
                  <IntlMessages id="Active" />
                </SuccessSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.Open && (
                <InfoSituation className="situation">
                  <IntlMessages id="open" />
                </InfoSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.Archieved && (
                <PurpleSituation className="situation">
                  <IntlMessages id="Archieved" />
                </PurpleSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.Completed && (
                <SuccessSituation className="situation">
                  <IntlMessages id="Completed" />
                </SuccessSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.cancellation_requested_by_employer && (
                <DangerSituation className="situation">
                  <IntlMessages id="Cancellation-Request" />
                </DangerSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.cancellation_requested_by_specialist && (
                <DangerSituation className="situation">
                  <IntlMessages id="Cancellation-Request" />
                </DangerSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.cancelled && (
                <DangerSituation className="situation">
                  <IntlMessages id="Cancelled" />
                </DangerSituation>
              )}

              {props.task.taskData.task_status === AppConstant.CardStatus.Reported && props.task.taskData.resolved_task === null &&(
                <DangerSituation className="situation">
                  <IntlMessages id="Reported" />
                </DangerSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.Reported && props.task.taskData.resolved_task === 1 && (
                <SuccessSituation className="situation">Resolved</SuccessSituation>
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
          ) : (
            <div className="situation-wraper">
              {props.task.taskData.task_status === AppConstant.CardStatus.Active && (
                <SuccessSituation className="situation">
                  <IntlMessages id="Active" />
                </SuccessSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.Open && (
                <InfoSituation className="situation">
                  <IntlMessages id="open" />
                </InfoSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.Archieved && (
                <PurpleSituation className="situation">
                  <IntlMessages id="Archieved" />
                </PurpleSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.Completed && (
                <SuccessSituation className="situation">
                  <IntlMessages id="Completed" />
                </SuccessSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.cancellation_requested_by_employer && (
                <DangerSituation className="situation">
                  <IntlMessages id="Cancellation-Request" />
                </DangerSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.cancellation_requested_by_specialist && (
                <DangerSituation className="situation">
                  <IntlMessages id="Cancellation-Request" />
                </DangerSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.cancelled && (
                <DangerSituation className="situation"> <IntlMessages id="Cancelled" /></DangerSituation>
              )}
              {props.task.taskData.task_status === AppConstant.CardStatus.Reported && props.task.taskData.resolved_task === 0 && (
                <DangerSituation className="situation">Reported</DangerSituation>
              )}
                {props.task.taskData.task_status === AppConstant.CardStatus.Reported && props.task.taskData.resolved_task === 1 && (
                <SuccessSituation className="situation">Resolved</SuccessSituation>
              )}
              {props.task.status === "Completed" && (
                <DarkInfoSituation className="situation">
                  {props.task.status}
                </DarkInfoSituation>
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
        {props.userType === "specialists" ? null : (
          <>
            {props.task.taskData.task_status === AppConstant.CardStatus.Reported && (
              <div className="result">
                <TextDanger className="re-name"></TextDanger>
                <div className="btn-container">
                  <ButtonLink
                    onClick={() => setReportFormVisible(true)}
                    className="btn apply-btn"
                  >
                    <IntlMessages id="add_proof" />
                  </ButtonLink>
                  {/* <ButtonLink
                    onClick={() => setReportFormVisible(true)}
                    className="btn clear-btn btn-border"
                    style={{
                      background: "none",
                      border: "1px solid #FCAE1D",
                      color: "#FCAE1D",
                    }}
                  >
                    <IntlMessages id="edit-proof" />
                  </ButtonLink> */}
                </div>
              </div>
            )}
          </>
        )}
        <Modal
          width={888}
          title="Report Task"
          centered={true}
          visible={reportFormVisible}
          onCancel={() => setReportFormVisible(false)}
          footer={[
            <Button
              className="btn info-btn-border"
              style={{
                display: "inline",
                width: "auto",
              }}
              type="primary"
              onClick={() => reportForm.submit()}
            >
              Submit
            </Button>,
          ]}
        >
          <UploadComponent
            uploadError={uploadError}
            form={reportForm}
            onFinish={reportFormSubmit}
            formName="reportTask"
            fieldName="reportAndReview"
            title={<IntlMessages id="card-title" />}
            showTextarea={true}
            fileList={fileList.fileList}
            handlePreview={handlerPreview}
            handleChange={handlerChange}
          />
        </Modal>
      </CardInnerWrapper>
    </Card>
  );
};

export default TaskCard;
