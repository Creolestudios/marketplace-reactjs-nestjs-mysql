import React, { Component } from "react";
import { Row, Col, Typography, Divider, Carousel } from "antd";
import { connect } from "react-redux";
import UserProfileWidget, {
  UserProfileWidgetItem,
} from "../../User/UserProfileWidget";
import HeaderBreadCrumb, {
  DisabledLinkText,
} from "@iso/components/utility/headerBreadCrumb";
import basicStyle from "@iso/assets/styles/constants";
import LayoutContent from "@iso/components/utility/layoutContent";
import moment from "moment";
import fen3 from "@iso/assets/images/fencing-img-3.jpg";
import fen2 from "@iso/assets/images/fencing-img-2.jpg";
import fen1 from "@iso/assets/images/fencing-img-1.jpg";
import plumber1 from "@iso/assets/images/plumber-img-1.jpg";
import plumber2 from "@iso/assets/images/plumber-img-2.jpg";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Button from "@iso/components/uielements/button";
import { withRouter } from "react-router-dom";
import CarouselStyleWrapper from "@iso/components/uielements/styles/Carousel.styles.js";
import { Link } from "react-router-dom";
import taskAdminAction from "@iso/redux/admin/tasks/actions";
import IntlMessages from "@iso/components/utility/intlMessages";
const { Title } = Typography;
const { viewTaskDetail } = taskAdminAction;
class ViewTasks extends Component {
  state = {
    media: null,
    nav: null,
    active: 0,
    id: null
  };

  // componentDidMount = () => {
  //   console.log("trestetet");
  //   this.setState({
  //     media: this.media,
  //     nav: this.nav,
  //     id: this.props?.match?.params?.taskid
  //   });
  //   this.props.viewTaskDetail({
  //     task_id: this.props?.match?.params?.taskid,
  //   });
  // };
  componentDidUpdate(prevProps) {
  if(this.state.id !== this.props?.match?.params?.taskid){
      this.setState({
      media: this.media,
      nav: this.nav,
      id: this.props?.match?.params?.taskid
    });
    this.props.viewTaskDetail({
      task_id: this.props?.match?.params?.taskid,
    });
  }

  }
  onChange = (a, b, c) => {
    this.setState({
      active: a,
    });
  };
  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { viewTaskDetailData } = this.props;
    return (
      <React.Fragment>
        <LayoutContentWrapper>
          <HeaderBreadCrumb style={{ marginBottom: "30px" }}>
            <Divider
              type="vertical"
              style={{
                height: 44,
                borderWidth: "thick",
                background: "#E5E5E5",
              }}
            />
            <DisabledLinkText to={`/admin/alltasks/tasks`}>
              <IntlMessages id="sidebar.alltasks.tasks" />
            </DisabledLinkText>
            <Title level={2}>
              {viewTaskDetailData &&
                viewTaskDetailData.task &&
                viewTaskDetailData.task.title}
            </Title>
          </HeaderBreadCrumb>
          <LayoutContent>
            <Row className="task-carousel-wrapper">
              <Col
                xxl={12}
                xl={12}
                lg={13}
                md={24}
                sm={24}
                xs={24}
                className="task-img-wrapper"
              >
                <Carousel
                  asNavFor={this.state.nav}
                  touchMove={false}
                  dots={false}
                  ref={(carousel) => (this.media = carousel)}
                >
                  {viewTaskDetailData &&
                    viewTaskDetailData.taskMedia &&
                    viewTaskDetailData.taskMedia.map((item) =>
                      item.media_type === "image" ? (
                        <div
                          className="task-big-img"
                          style={{
                            display: "inline-block",
                          }}
                        >
                          <img src={item.media} />
                        </div>
                      ) : (
                        <div
                          className="task-big-img"
                          style={{
                            display: "inline-block",
                          }}
                        >
                          <video width="100%" height="365" controls>
                            <source src={item.media} type="video/mp4" />
                            <IntlMessages id="yourBrawserDoes" />
                          </video>
                        </div>
                      )
                    )}
                </Carousel>
                <CarouselStyleWrapper className="abc">
                  <Carousel
                    slidesToShow={3}
                    infinite={false}
                    className="task-carousel"
                    afterChange={this.onChange}
                    centerMode={false}
                    asNavFor={this.state.media}
                    draggable={true}
                    ref={(carousel) => (this.nav = carousel)}
                    swipeToSlide={true}
                    touchThreshold={50}
                    focusOnSelect={true}
                    dots={false}
                    arrows
                    nextArrow={<ArrowRightOutlined />}
                    prevArrow={<ArrowLeftOutlined />}
                    style={{
                      width: "90%",
                      float: "center",
                    }}
                    responsive={[
                      {
                        breakpoint: 1400,
                        settings: {
                          slidesToShow: 3,
                        },
                      },
                      {
                        breakpoint: 991,
                        settings: {
                          slidesToShow: 5,
                        },
                      },

                      {
                        breakpoint: 767,
                        settings: {
                          slidesToShow: 3,
                        },
                      },
                      {
                        breakpoint: 575,
                        settings: {
                          slidesToShow: 2,
                        },
                      },
                    ]}
                  >
                    {viewTaskDetailData &&
                      viewTaskDetailData.taskMedia &&
                      viewTaskDetailData.taskMedia.map((item) =>
                        item.media_type === "image" ? (
                          <div className="rp-task-img">
                            <img
                              src={item.media}
                              style={{
                                width: 123,
                                height: 123,
                                // border:
                                //   this.state.active === 0
                                //     ? "2px solid #FCAE1D"
                                //     : "",
                              }}
                            />
                          </div>
                        ) : (
                          <div className="rp-task-img">
                            <video
                            
                              width="123"
                              height="123"
                              style={
                                {
                                  // border:
                                  //   this.state.active === 0
                                  //     ? "2px solid #FCAE1D"
                                  //     : "",
                                }
                              }
                            >
                              <source src={item.media} type="video/mp4" />
                              <IntlMessages id="yourBrawserDoes" />
                            </video>
                          </div>
                        )
                      )}
                  </Carousel>
                </CarouselStyleWrapper>
              </Col>
              <Col
                xxl={12}
                xl={12}
                lg={11}
                md={24}
                sm={24}
                xs={24}
                className="task-details-wrapper"
              >
                <Col>
                  <Link
                    to={`/admin/alltasks/tasks/${this.props?.match?.params?.taskid}/view_proofs`}
                  >
                    <Button
                      className="btn-view-proof"
                      style={{
                        color: "#758287",
                        borderColor: "#CDCDCD",
                      }}
                    >
                      <IntlMessages id="viewProof" />
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <UserProfileWidget>
                    <Row style={rowStyle} className="task-details">
                      <Col
                        lg={24}
                        md={24}
                        sm={24}
                        xs={24}
                        style={colStyle}
                        classname="task-detail-content"
                      >
                        <h3>
                          <IntlMessages id="taskDetails" />
                        </h3>
                        <Link
                          to={`/admin/users/view-user/${
                            viewTaskDetailData &&
                            viewTaskDetailData.employer &&
                            viewTaskDetailData.employer.user_id
                          }`}
                        >
                          <UserProfileWidgetItem
                            type={"Employer"}
                            name={
                              viewTaskDetailData &&
                              viewTaskDetailData.employer &&
                              viewTaskDetailData.employer.name
                            }
                            color={"#2AABE1"}
                            className="employer-name"
                          />
                        </Link>
                        <Link
                          to={`/admin/users/view-user/${
                            viewTaskDetailData &&
                            viewTaskDetailData.specialist &&
                            viewTaskDetailData.specialist.user_id
                          }`}
                        >
                          <UserProfileWidgetItem
                            type={"Specialist"}
                            name={
                              viewTaskDetailData &&
                              viewTaskDetailData.specialist &&
                              viewTaskDetailData.specialist.name
                            }
                            color={"#2AABE1"}
                          />
                        </Link>
                        <UserProfileWidgetItem
                          type={"Start Date"}
                          value={
                            viewTaskDetailData &&
                            viewTaskDetailData.task &&
                            viewTaskDetailData.task.start_date_time &&
                            moment(
                              viewTaskDetailData.task.start_date_time
                            ).format("DD/MM/YYYY")
                          }
                        />
                        <UserProfileWidgetItem
                          type={"End Date"}
                          value={
                            viewTaskDetailData &&
                            viewTaskDetailData.task &&
                            viewTaskDetailData.task.end_date_time &&
                            moment(
                              viewTaskDetailData.task.end_date_time
                            ).format("DD/MM/YYYY")
                          }
                        />
                        <UserProfileWidgetItem
                          type={"Duration"}
                          value={
                            viewTaskDetailData &&
                            viewTaskDetailData.task &&
                            viewTaskDetailData.task.duration !== null &&
                            `${
                              viewTaskDetailData &&
                              viewTaskDetailData.task &&
                              viewTaskDetailData.task.duration
                            } days`
                          }
                        />
                        <UserProfileWidgetItem
                          type={"City"}
                          value={
                            viewTaskDetailData &&
                            viewTaskDetailData.task &&
                            viewTaskDetailData.task.city
                          }
                        />
                        <UserProfileWidgetItem
                          type={"Zip-code"}
                          value={
                            viewTaskDetailData &&
                            viewTaskDetailData.task &&
                            viewTaskDetailData.task.zipcode
                          }
                        />

                        <UserProfileWidgetItem
                          type={"Status"}
                          value={
                            viewTaskDetailData &&
                            viewTaskDetailData.task &&
                            (viewTaskDetailData.task.task_status === 1
                              ? "Open"
                              : viewTaskDetailData.task.task_status === 2
                              ? "Active"
                              : viewTaskDetailData.task.task_status === 3
                              ? "Archive"
                              : viewTaskDetailData.task.task_status === 4
                              ? "Completed"
                              : viewTaskDetailData.task.task_status === 5
                              ? "Cancellation requested by employer"
                              : viewTaskDetailData.task.task_status === 6
                              ? "Cancellation requested by specialist"
                              : viewTaskDetailData.task.task_status === 7
                              ? "Cancelled"
                              : viewTaskDetailData.task.task_status === 8
                              ? "Reported"
                              : viewTaskDetailData.task.task_status === 9 &&
                                "Payment pending")
                          }
                          // color={"#ED4C5C"}
                          valstyle={{
                            backgroundColor:
                              viewTaskDetailData &&
                              viewTaskDetailData.task &&
                              (viewTaskDetailData.task.task_status === 1
                                ? "#2aabe1"
                                : viewTaskDetailData.task.task_status === 2
                                ? "#29ef38"
                                : viewTaskDetailData.task.task_status === 3
                                ? "#d30fb4"
                                : viewTaskDetailData.task.task_status === 4
                                ? "#0fd346"
                                : viewTaskDetailData.task.task_status === 5
                                ? "#c56767"
                                : viewTaskDetailData.task.task_status === 6
                                ? "#9c5f5f"
                                : viewTaskDetailData.task.task_status === 7
                                ? "#ed4c5c"
                                : viewTaskDetailData.task.task_status === 8
                                ? "#d41023"
                                : viewTaskDetailData.task.task_status === 9
                                ? "#fcae1f"
                                : viewTaskDetailData.task.task_status === 7
                                ? "#ED4C5C"
                                : "#fcae1f"),
                            borderRadius: 2,
                            color: "white",
                            padding: "0px 15px",
                            width: "fit-content",
                          }}
                        />

                        <UserProfileWidgetItem
                          type={"Cancelled by"}
                          value={
                            viewTaskDetailData &&
                            viewTaskDetailData.task &&
                            (viewTaskDetailData.task.cancelled_by ===
                            viewTaskDetailData.employer.user_id
                              ? viewTaskDetailData.employer.name
                              : viewTaskDetailData.specialist.user_id ===
                                viewTaskDetailData.specialist.user_id
                              ? viewTaskDetailData.specialist.name
                              : "")
                          }
                        />
                        <Link
                          to={`/admin/alltasks/tasks/${this.props?.match?.params?.taskid}/placebid`}
                        >
                          <UserProfileWidgetItem
                            type={"Bids"}
                            name={
                              viewTaskDetailData && viewTaskDetailData.totalBids
                            }
                            color={"#2AABE1"}
                          />{" "}
                        </Link>
                      </Col>
                      <Row className="budget-wrapper">
                        <Col span={12} className="budget">
                          <span>
                            <IntlMessages id="estimatedBudget" />
                          </span>

                          <h2>
                            {viewTaskDetailData &&
                              viewTaskDetailData.task &&
                              viewTaskDetailData.task.estimated_budget &&
                              `${viewTaskDetailData.task.estimated_budget} kr`}
                          </h2>
                        </Col>
                        <Col span={12} className="budget">
                          <span>
                            <IntlMessages id="bidAmount" />
                          </span>

                          <h2>
                            {viewTaskDetailData &&
                              viewTaskDetailData.activeBid &&
                              `${viewTaskDetailData.activeBid} kr`}
                          </h2>
                        </Col>
                      </Row>

                      <Col className="about-task" span={16}>
                        <p className="about-task-title">
                          <IntlMessages id="aboutTask" />
                        </p>
                      </Col>
                      <Col className="about-task-text-wrapper" span={16}>
                        <p className="about-task-text">
                          {viewTaskDetailData &&
                            viewTaskDetailData.task &&
                            viewTaskDetailData.task.description}
                        </p>
                      </Col>
                    </Row>
                  </UserProfileWidget>
                </Col>
              </Col>
            </Row>
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  viewTaskDetailData: state.AdminTask.viewTaskDetailData,
});

const mapDispatchToProps = {
  viewTaskDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewTasks));
