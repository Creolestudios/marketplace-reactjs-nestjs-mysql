import React, { useEffect, useState, useRef } from "react";
import FooterContainer from "@iso/components/Footer";
import {
  Form,
  Checkbox,
  Rate,
  Input,
  Modal,
  Button,
  Alert,
  notification,
} from "antd";
// import "containers/TaskDetailsSpecialists/node_modules/assets/style.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import UploadComponent from "@iso/components/UploadComponent";
import FullViewImgModel from "@iso/components/FullViewImgModel";
import {
  PageWrapper,
  PageContainer,
  TaskTitle,
  SuccessSituation,
  ButtonLink,
  SmallTitle,
  PeraGraph,
  ContentBottom,
  InfoSituation,
  DangerSituation,
  PurpleSituation,
  TextDanger,
  DarkInfoSituation,
} from "../../../CommonStyle";
import { ContentArea } from "../Task/style";
import {
  Detail,
  DetailHead,
  LeftBlock,
  RightBlock,
  DetailContent,
  InfoTitleWrapper,
  InfoTitle,
  JobInfo,
  Box,
  Info,
  WorkDetail,
  Budget,
  DescHd,
  Amount,
  DescriptionPera,
  RatingBox,
  SubTitle,
  Content,
  CancelModelWrapper,
  ModalLeftSide,
  ModalRightSideSlider,
} from "./style";
import { Price } from "@iso/components/Card/style";
import { MyGallery } from "@iso/components/Slider";
import IntlMessages from "@iso/components/utility/intlMessages";
import { useParams, useHistory } from "react-router-dom";
import taskActions from "@iso/redux/task/actions";
import { useSelector, useDispatch } from "react-redux";
import HeadTitle from "@iso/components/Topbar";
import { Link } from "react-router-dom";
import moment from "moment";
import { AppConstant } from "@iso/config/constant";
import image from "@iso/assets/images/no-image.jpg";
import { socket } from "../../../socket";
import { removeUTC } from "../../../library/helpers/utility";
import { getVideoCover } from "../../../library/helpers/getVideoCover";
import VideoImage from "@iso/assets/images/video-icon.png";

const { TextArea } = Input;
const {
  singleTaskDetails,
  taskAction,
  reviewTask,
  clearMessages,
  taskAcceptReject,
} = taskActions;

const images = [
  {
    original: image,
    thumbnail: image,
  },
];

const reportTaskMediaError =
  "To report a completed task, media proof must be provided";
const cancelTaskMediaError =
  "To cancel an active task, media proof must be provided";

function TaskDetail(props) {
  const galleryRef = useRef();
  let fileLists = { fileList: [], files: [] };
  const [fileList, setfileList] = useState(fileLists);
  const [uploadError, setuploadError] = useState("");

  let history = useHistory();

  //singleTask.task.start_date_time
  let singleTask = useSelector((state) => state.Task.singleTaskDetails);
  let reviewError = useSelector((state) => state.Task.reviewMessage);
  let activeBid = useSelector(
    (state) => state.Task.singleTaskDetails.specialistDetails
  );
  let { error, acceptBidSuccess } = useSelector((state) => state.Task);
  let media = [];
  let taskCancelProof = [];
  if (singleTask.taskMedia.length > 0) {
    singleTask.taskMedia.map((each) =>
      media.push({
        original: each.media,
        thumbnail: each?.media_type === 'video' ? VideoImage : each.media,
        media_type: each?.media_type
      })
    );
  }
  if (
    singleTask.task &&
    singleTask.task.cancellation_proof &&
    JSON.parse(singleTask.task.cancellation_proof).length > 0
  ) {
    JSON.parse(singleTask.task.cancellation_proof).map((each) =>
      taskCancelProof.push({
        original: each.filename,
        thumbnail: each.filename,
      })
    );
  }
  const [imageUrl, setImageUrl] = useState("");
  const [isFullModalVisible, setisFullModalVisible] = useState(false);
  const [cancelFormVisible, setcancelFormVisible] = useState(false);
  const [cancellationRequest, setCancellationRequest] = useState(false);
  const [reportFormVisible, setReportFormVisible] = useState(false);
  const [isCancellModalVisible, setisCancelModalVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const { userType, id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
    acceptBidSuccess &&
      notification.success({
        message: acceptBidSuccess,
      });
    dispatch(clearMessages());
    dispatch(
      singleTaskDetails(
        {
          user_type: `${userType}`,
          task_id: `${id}`,
        },
        history
      )
    );
  }, []);

  const [reportForm] = Form.useForm();
  const [cancelForm] = Form.useForm();
  const [disagreeForm] = Form.useForm();


  const cancelFormSubmit = (value) => {
    if (fileList.fileList.length === 0) {
      setuploadError(cancelTaskMediaError);
      return;
    }
    if (value.cancelAndReview) {
      let formData = new FormData();
      let payload = {
        actionType: "cancel",
        user_type: `${userType}`,
        task_id: `${id}`,
        cancel_reason: value.cancelAndReview,
      };
      Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
      fileList.files.forEach((file) =>
        formData.append("cancel_task_media", file.originFileObj)
      );

      dispatch(taskAction(payload, formData, history));
      setcancelFormVisible(false);
      cancelForm.resetFields();
      setfileList((ps) => ({
        files: [],
        fileList: [],
      }));
    }
  };
  const disagreeFormSubmit = (value) => {
    if (fileList.fileList.length === 0) {
      setuploadError(cancelTaskMediaError);
      return;
    }
    if (value.disagreeReview) {
      let formData = new FormData();
      let payload = {
        task_action: "REJECT",
        user_type: `${userType}`,
        task_id: id && parseInt(id),
        disagree_reason: value.disagreeReview,
      };
      // let payload = {
      //   actionType: "cancel",
      //   user_type: `${userType}`,
      //   task_id: `${id}`,
      //   cancel_reason: value.disagreeReview,
      // };
      Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
      fileList.files.forEach((file) =>
        formData.append("disagree_media", file.originFileObj)
      );
      dispatch(taskAcceptReject(payload,formData, history));

      setCancellationRequest(false);
      disagreeForm.resetFields();
      setfileList((ps) => ({
        files: [],
        fileList: [],
      }));
    }
  };
  const reportFormSubmit = (value) => {
    if (fileList.fileList.length === 0) {
      setuploadError(reportTaskMediaError);
      return;
    }
    if (value.reportAndReview) {
      let formData = new FormData();
      let payload = {
        actionType: "report",
        user_type: `${userType}`,
        task_id: `${id}`,
        report_reason: value.reportAndReview,
      };
      Object.keys(payload).forEach((key) => formData.append(key, payload[key]));

      fileList.files.forEach((file) =>
        formData.append("report_task_media", file.originFileObj)
      );

      dispatch(taskAction(payload, formData, history));
      setReportFormVisible(false);
      reportForm.resetFields();
      setfileList((ps) => ({
        files: [],
        fileList: [],
      }));
    }
  };
  const reviewFormSubmit = (value) => {
    let payload = {
      user_type: `${userType}`,
      task_id: parseInt(id),
      task_rating: value.rating_star,
      task_review: value.task_review,
    };
    dispatch(reviewTask(payload, history));
  };
  let Category = useSelector((state) => state.Categories);
  let idWiseParentCategories = Category.idWiseParentCategories;
  let idWisesubCategories = Category.idWiseSubCategories;
  let subcat = idWisesubCategories[singleTask.task.category_id];

  subcat =
    subcat &&
    subcat.filter((each) => each.id === singleTask.task.sub_category_id);

  if (subcat) {
    subcat.filter((each) => each.id === singleTask.task.sub_category_id);
    if (subcat.length > 0) {
      subcat = subcat[0].name;
    }
  }
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
  async function handlerChange({ fileList, file }) {
    setuploadError("");
    const isValidImage =
      file.type === "image/jpeg" || file.type === "image/png";
    const isValidVideo =
      file.type === "video/mp4" || file.type === "video/quicktime";
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
    if (isValidVideo && !file.thumbUrl) {
      const thumb = await getVideoCover(file);
      file.thumbUrl = URL.createObjectURL(thumb);
      const videoUrl = URL.createObjectURL(file);
      setImageUrl(videoUrl);
    }
    setfileList((ps) => ({
      fileList,
      files: fileList,
    }));
  }

  function createChat(data) {
    const message = {
      message: "Hi",
      receiver_id: data.id,
      task_id: singleTask.task.id,
    };
    if (!singleTask.room_id) {
      socket.emit("msgToServer", message);
      socket.on("msgToClient", (message) => {
        history.push(`/client/inbox/${message.data.room_id}`);
      });
      socket.on("msgToClientError", (message) => {
        console.log("task details msg error", message);
      });
    } else {
      history.push(`/client/inbox/${singleTask.room_id}`);
    }
  }

  const setCancelTaskStatus = (status) => {
    let formData = new FormData();
    let payload = {
      task_action: status,
      user_type: `${userType}`,
      task_id: id && parseInt(id),
    };
    Object.keys(payload).forEach((key) => formData.append(key, payload[key]));
    dispatch(taskAcceptReject(payload,formData, history));

  };
  return (
    <>
      <PageWrapper>
        <PageContainer>
          <Content>
            <HeadTitle filter={true} options={["Employer", "Specialist"]} />

            <ContentArea className="content-section">
              <Detail>
                <DetailHead>
                  <LeftBlock>
                    <Link>
                      <div
                        onClick={() =>
                          props.location.state?.prevPath ? history.push(`${props.location.state.prevPath}`) : history.push("/client/task")
                        }
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <i className="icon-left-arrow"></i>
                        <TaskTitle className="detail-text">
                          {singleTask.task.title}
                        </TaskTitle>
                      </div>
                    </Link>

                    {singleTask.task.task_status ===
                      AppConstant.CardStatus.Open && (
                      <InfoSituation className="situation">
                        {/* {props.task.status} */}
                        <IntlMessages id="open" />
                      </InfoSituation>
                    )}
                    {singleTask.task.task_status ===
                      AppConstant.CardStatus.Active && (
                      <SuccessSituation className="situation">
                        <IntlMessages id="active" />
                      </SuccessSituation>
                    )}
                    {singleTask.task.task_status ===
                      AppConstant.CardStatus.Archieved && (
                      <PurpleSituation className="situation">
                        <IntlMessages id="Archieved" />
                      </PurpleSituation>
                    )}
                    {singleTask.task.task_status ===
                      AppConstant.CardStatus.Completed && (
                      <SuccessSituation className="situation">
                        <IntlMessages id="Completed" />
                      </SuccessSituation>
                    )}
                    {singleTask.task.task_status ===
                      AppConstant.CardStatus
                        .cancellation_requested_by_employer && (
                      <DangerSituation className="situation">
                        <IntlMessages id="Cancellation-Request" />
                      </DangerSituation>
                    )}
                    {singleTask.task.task_status ===
                      AppConstant.CardStatus
                        .cancellation_requested_by_specialist && (
                      <DangerSituation className="situation">
                        <IntlMessages id="Cancellation-Request" />
                      </DangerSituation>
                    )}
                    {singleTask.task.task_status ===
                      AppConstant.CardStatus.cancelled && (
                      <DangerSituation className="situation">
                        <IntlMessages id="cancelled" />
                      </DangerSituation>
                    )}

                    {singleTask.task.task_status ===
                      AppConstant.CardStatus.Reported && singleTask.resolvedTask === false && (
                      <DangerSituation className="situation">
                        <IntlMessages id="Reported" />
                      </DangerSituation>
                    )}
                    {console.log("Testing resolved task",singleTask)}
                     {singleTask.task.task_status === AppConstant.CardStatus.Reported && singleTask.resolvedTask && (
                <SuccessSituation className="situation">Resolved</SuccessSituation>
              )}
                  </LeftBlock>
                  <RightBlock>
                    {singleTask.task.task_status ===
                      AppConstant.CardStatus.Open ||
                    singleTask.task.task_status ===
                      AppConstant.CardStatus.Archieved ? (
                      <Link to={`/client/create-task/${singleTask.task.id}`}>
                        <ButtonLink className="edit-task">
                          {" "}
                          <IntlMessages id="edit.task" />
                        </ButtonLink>
                      </Link>
                    ) : (
                      ""
                    )}{" "}
                  </RightBlock>
                </DetailHead>
                <DetailContent>
                  <InfoTitleWrapper>
                    <InfoTitle>
                      <i className="icon-cunstruction"></i>
                      {idWiseParentCategories[singleTask.task.category_id]}
                    </InfoTitle>
                    <InfoTitle>
                      <i className="icon-plumbing-work"></i>
                      {subcat && subcat}
                    </InfoTitle>
                  </InfoTitleWrapper>
                  <JobInfo>
                    <Box>
                      <Info>
                        <SmallTitle className="title">
                          <IntlMessages id="antTable.title.Specialist" />
                        </SmallTitle>
                        <SubTitle
                          className="subtitle"
                          style={{ color: "#2AABE1", fontWeight: "700" }}
                        >
                          {" "}
                          {Object.keys(activeBid).length === 0 &&
                          activeBid.constructor === Object ? (
                            <a> - </a>
                          ) : (
                            <>
                              <Link
                                to={`/client/user-profile/${activeBid.id}/profile`}
                              >
                                {activeBid.full_name}
                              </Link>
                              <i
                                className="icon-specialist"
                                onClick={() => createChat(activeBid)}
                              />
                            </>
                          )}
                        </SubTitle>
                      </Info>
                    </Box>
                    <Box>
                      <Info>
                        <SmallTitle className="title">
                          <IntlMessages id="StartDate" />
                        </SmallTitle>
                        <SubTitle className="subtitle">
                          {singleTask.task.start_date_time
                            ? moment(
                                removeUTC(singleTask.task.start_date_time)
                              ).format("MMMM Do YYYY, h:mm:ss a")
                            : "-"}
                        </SubTitle>
                      </Info>
                    </Box>
                    <Box>
                      <Info>
                        <SmallTitle className="title">
                          <IntlMessages id="EndDate" />
                        </SmallTitle>
                        <SubTitle className="subtitle">
                          {singleTask.task.end_date_time
                            ? moment(
                                removeUTC(singleTask.task.end_date_time)
                              ).format("MMMM Do YYYY, h:mm:ss a")
                            : "-"}
                        </SubTitle>
                      </Info>
                    </Box>
                    <Box>
                      <Info>
                        <SmallTitle className="title">
                          <IntlMessages id="form.profile.address" />
                        </SmallTitle>
                        <SubTitle className="subtitle">
                          {singleTask.task.address}
                        </SubTitle>
                      </Info>
                    </Box>
                    <Box>
                      <Info>
                        <SmallTitle className="title">
                          <IntlMessages id="form.profile.zipCode" />
                        </SmallTitle>
                        <SubTitle className="subtitle">
                          {singleTask.task.zipcode}
                        </SubTitle>
                      </Info>
                    </Box>
                    <Box>
                      <Info>
                        <SmallTitle className="title">
                          <IntlMessages id="bids" />
                        </SmallTitle>
                        <SubTitle
                          className="subtitle"
                          style={{ color: "#2AABE1", fontWeight: "700" }}
                        >
                          <Link
                            to={{
                              pathname:
                                singleTask.totalBid > 0
                                  ? `/client/bids/${singleTask.task.id}`
                                  : "",
                            }}
                          >
                            {singleTask.totalBid}
                          </Link>
                          {/* <a> {singleTask.totalBid} </a> */}
                        </SubTitle>
                      </Info>
                    </Box>
                  </JobInfo>
                  <WorkDetail>
                    {/* Slider */}
                    <div className="work-slider block">
                      <MyGallery
                        imgRef={galleryRef}
                        imgList={
                          singleTask.taskMedia.length > 0 ? media : images
                        }
                        onImageClick={() => {
                          setisFullModalVisible(true);
                          const i = galleryRef.current.getCurrentIndex();
                          setImageIndex(i);
                        }}
                      />
                    </div>
                    {/* Description Details */}
                    <div className="work-description block">
                      <DescHd className="desc-hd">
                        <Budget>
                          <SmallTitle>
                            <IntlMessages id="estimatedBudget" />
                          </SmallTitle>
                          <Price>{singleTask.task.estimated_budget} Kr</Price>
                        </Budget>
                        {singleTask.task.task_status !==
                          AppConstant.CardStatus.Open &&
                        singleTask.activeBidAmount ? (
                          <Amount>
                            <SmallTitle>
                              <IntlMessages id="bidAmount" />
                            </SmallTitle>
                            <Price>{singleTask.activeBidAmount} Kr</Price>
                          </Amount>
                        ) : (
                          ""
                        )}
                      </DescHd>
                      {/* <Checkbox
                        style={{
                          color: "#758287",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        Share contact details with specialist
                      </Checkbox> */}
                      <DescriptionPera>
                        <SmallTitle>
                          <IntlMessages id="antTable.title.decription" />
                        </SmallTitle>
                        <PeraGraph className="desc-pera">
                          {singleTask.task.description}
                        </PeraGraph>
                      </DescriptionPera>
                      <div className="task-btn b-top">
                        {singleTask.task.task_status ===
                          AppConstant.CardStatus.Active ||
                        singleTask.task.task_status ===
                          AppConstant.CardStatus.Open ? (
                          <>
                            <ButtonLink
                              style={{ width: "auto" }}
                              className="btn cancel danger-btn-border"
                              onClick={() => setcancelFormVisible(true)}
                            >
                              <IntlMessages id="cancel_task" />
                            </ButtonLink>
                            <Form.Item
                              style={{ margin: "0 20px 0 0" }}
                              label=" "
                              tooltip={{
                                title: <IntlMessages id="taskdetails.title" />,
                                icon: <InfoCircleOutlined />,
                              }}
                            ></Form.Item>
                          </>
                        ) : singleTask.task.task_status ===
                          AppConstant.CardStatus
                            .cancellation_requested_by_employer ? (
                          userType === "employer" ? (
                            <div>
                              <PeraGraph className="desc-pera">
                                <IntlMessages id="task.pera" />
                              </PeraGraph>
                            </div>
                          ) : (
                            <div>
                              <PeraGraph className="desc-pera">
                                <IntlMessages id="task.pera1" />
                                <br />
                                <a
                                  href="javascript:void(0)"
                                  onClick={() => setisCancelModalVisible(true)}
                                >
                                  Click here
                                </a>{" "}
                                <IntlMessages id="task.pera2" />
                                <br />
                                <IntlMessages id="task.pera0" />
                              </PeraGraph>
                              <div className="task-btn">
                                <ButtonLink
                                  style={{ width: "auto" }}
                                  className="btn info-btn-border"
                                  onClick={() => setCancelTaskStatus("ACCEPT")}
                                >
                                  <IntlMessages id="agree" />
                                </ButtonLink>
                                <ButtonLink
                                  style={{ width: "auto" }}
                                  className="btn cancel danger-btn-border"
                                  onClick={() => setCancelTaskStatus("REJECT")}                      
                                >
                                  <IntlMessages id="disagree" />
                                </ButtonLink>
                              </div>
                            </div>
                          )
                        ) : singleTask.task.task_status ===
                          AppConstant.CardStatus
                            .cancellation_requested_by_specialist ? (
                          userType === "specialist" ? (
                            <div>
                              <PeraGraph className="desc-pera">
                                <IntlMessages id="task.pera3" />
                              </PeraGraph>
                            </div>
                          ) : (
                            <div>
                              <PeraGraph className="desc-pera">
                                <IntlMessages id="task.cancelmsg" />
                                <br />
                                <a
                                  href="javascript:void(0)"
                                  onClick={() => setisCancelModalVisible(true)}
                                >
                                  Click here
                                </a>{" "}
                                <IntlMessages id="task.pera4" />
                                <br />
                                <IntlMessages id="task.pera01" />
                              </PeraGraph>
                              <div className="task-btn">
                                <ButtonLink
                                  style={{ width: "auto" }}
                                  className="btn info-btn-border"
                                  onClick={() => setCancelTaskStatus("ACCEPT")}
                                >
                                  <IntlMessages id="agree" />
                                </ButtonLink>
                                <ButtonLink
                                  style={{ width: "auto" }}
                                  className="btn cancel danger-btn-border"
                                  // onClick={() => setCancelTaskStatus("REJECT")}
                                   onClick={() => setCancellationRequest(true)}
                                >
                                  <IntlMessages id="disagree" />
                                </ButtonLink>
                              </div>
                            </div>
                          )
                        ) : singleTask.task.task_status ===
                            AppConstant.CardStatus.cancelled ||
                          singleTask.task.task_status ===
                            AppConstant.CardStatus.Completed ? (
                          <>
                          {activeBid.full_name ?  <><ButtonLink
                              style={{ width: "auto" }}
                              className="btn report info-btn-border"
                              onClick={() => setReportFormVisible(true)}
                            >
                             <IntlMessages id="report_task" />
                            </ButtonLink>
                            <Form.Item
                              style={{ margin: "0" }}
                              label=" "
                              tooltip={{
                                title: <IntlMessages id="task.title" />,
                                icon: <InfoCircleOutlined />,
                              }}
                            ></Form.Item> </> : ""}
                          
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      {error && (
                        <div>
                          <Alert
                            style={{ marginTop: "10px", borderRadius: "40px" }}
                            message={error}
                            type="warning"
                            showIcon
                          />
                        </div>
                      )}
                    </div>
                  </WorkDetail>
                </DetailContent>
              </Detail>
            </ContentArea>
            <Form onFinish={reviewFormSubmit}>
              <ContentBottom>
                {singleTask.task.task_status ===
                  AppConstant.CardStatus.cancelled ||
                singleTask.task.task_status ===
                  AppConstant.CardStatus.Completed ? (
                  <RatingBox>
                    {reviewError && (
                      <div>
                        <Alert
                          style={{
                            borderRadius: "40px",
                            marginBottom: "20px",
                          }}
                          message={reviewError}
                          type="error"
                          showIcon
                        />
                      </div>
                    )}
                    <SmallTitle className="title">
                      <IntlMessages id="page.addRatingsAndReview" />
                    </SmallTitle>
                    <Form.Item
                      name="rating_star"
                      rules={[
                        {
                          required: true,

                          message: AppConstant.FormValidation.ratingRequired,
                        },
                      ]}
                    >
                      <Rate
                        style={{
                          width: "100%",
                          textAlign: "left",
                          margin: "0 0 5px",
                        }}
                        allowClear={false}
                      />
                    </Form.Item>
                    <IntlMessages id="placeholder.enterYourReviewHere">
                      {(placeholder) => (
                        <Form.Item
                          name="task_review"
                          rules={[
                            {
                              required: true,

                              message:
                                AppConstant.FormValidation.reviewRequired,
                            },
                          ]}
                        >
                          <TextArea
                            // value = {reviewText}

                            placeholder={placeholder}
                            rows={4}
                            autoSize={{ minRows: 4, maxRows: 4 }}
                          />
                        </Form.Item>
                      )}
                    </IntlMessages>

                    <Button
                      htmlType="submit"
                      className="submit-btn info-btn-border btn"
                      style={{
                        display: "inline-block",
                        float: "left",
                        width: "auto",
                        // marginTop: "15px",
                      }}
                    >
                      <IntlMessages id="button.submit" />
                    </Button>
                  </RatingBox>
                ) : (
                  ""
                )}
              </ContentBottom>
            </Form>
          </Content>
        </PageContainer>

        <Modal
          width={888}
          title="Cancel Task"
          centered={true}
          visible={cancelFormVisible}
          onCancel={() => setcancelFormVisible(false)}
          footer={[
            <Button
              className="btn info-btn-border"
              style={{
                display: "inline",
                width: "auto",
              }}
              type="primary"
              onClick={() => cancelForm.submit()}
            >
              Submit
            </Button>,
          ]}
        >
          <UploadComponent
            uploadError={uploadError}
            form={cancelForm}
            onFinish={cancelFormSubmit}
            formName="cancelTask"
            fieldName="cancelAndReview"
            title="Share your reason for cancelling the task:"
            showTextarea={true}
            fileList={fileList.fileList}
            handlePreview={handlerPreview}
            handleChange={handlerChange}
            thumbnail={imageUrl}
          />
        </Modal>
        <Modal
          width={888}
          title="Disagree cancellation request"
          centered={true}
          visible={cancellationRequest}
          onCancel={() => setCancellationRequest(false)}
          footer={[
            <Button
              className="btn info-btn-border"
              style={{
                display: "inline",
                width: "auto",
              }}
              type="primary"
              onClick={() => disagreeForm.submit()}
            >
              Submit
            </Button>,
          ]}
        >
          <UploadComponent
            uploadError={uploadError}
            form={disagreeForm}
            onFinish={disagreeFormSubmit}
            formName="disagreeForm"
            fieldName="disagreeReview"
            title="Share your reason for disagreeing the cancellation request:"
            showTextarea={true}
            fileList={fileList.fileList}
            handlePreview={handlerPreview}
            handleChange={handlerChange}
            thumbnail={imageUrl}
          />
        </Modal>

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
              <IntlMessages id="button.submit" />
            </Button>,
          ]}
        >
          <UploadComponent
            uploadError={uploadError}
            form={reportForm}
            onFinish={reportFormSubmit}
            formName="reportTask"
            fieldName="reportAndReview"
            title="Share your reason for reporting the task"
            showTextarea={true}
            fileList={fileList.fileList}
            handlePreview={handlerPreview}
            handleChange={handlerChange}
          />
        </Modal>
        {/* full image view model */}
        <Modal
          className="full-view-images-model"
          width={1055}
          // title="Cancel Task"
          centered={true}
          visible={isFullModalVisible}
          onCancel={() => setisFullModalVisible(false)}
          footer={null}
        >
          <div className="work-slider block">
            <FullViewImgModel
              slideToIndex={imageIndex}
              images={singleTask.taskMedia.length > 0 ? media : images}
            />
          </div>
        </Modal>

        <Modal
          width={1100}
          title="Task Cancellation Proof"
          centered={true}
          visible={isCancellModalVisible}
          onCancel={() => setisCancelModalVisible(false)}
          footer={false}
        >
          <CancelModelWrapper>
            <ModalLeftSide>
              {/* <PortModelInnerDetail> */}
              <InfoTitle>
                {singleTask.task && singleTask.task.cancellation_reason}
              </InfoTitle>
              {/* </PortModelInnerDetail> */}
            </ModalLeftSide>

            <ModalRightSideSlider>
              <div className="work-slider block">
                <MyGallery imgList={taskCancelProof} />
              </div>
            </ModalRightSideSlider>
          </CancelModelWrapper>
        </Modal>
      </PageWrapper>
      <FooterContainer />
    </>
  );
}

export default TaskDetail;
