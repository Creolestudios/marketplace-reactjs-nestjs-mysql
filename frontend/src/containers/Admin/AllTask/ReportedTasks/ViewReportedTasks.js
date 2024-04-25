import React, { Component } from "react";
import { Row, Col, Typography, Divider, Form, Carousel } from "antd";
import { connect } from "react-redux";
import UserProfileWidget, {
  UserProfileWidgetItem,
} from "../../User/UserProfileWidget";
import Input from "@iso/components/uielements/input";
import { Textarea } from "@iso/components/uielements/input";
import Select, { SelectOption } from "@iso/components/uielements/select";
import HeaderBreadCrumb, {
  DisabledLinkText,
} from "@iso/components/utility/headerBreadCrumb";
import basicStyle from "@iso/assets/styles/constants";
import LayoutContent from "@iso/components/utility/layoutContent";
import Box from "@iso/components/utility/box";
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
import moment from "moment";
import { AppConstant } from "@iso/config/constant";
import IntlMessages from "@iso/components/utility/intlMessages";

const { Title } = Typography;
const FormItem = Form.Item;
const { viewReportedTaskDetail, callDisputeSettle } = taskAdminAction;
class ViewTasks extends Component {
  state = {
    media: null,
    nav: null,
    active: 0,
  };

  componentDidMount = () => {
    this.setState({
      media: this.media,
      nav: this.nav,
    });
    this.props.viewReportedTaskDetail({
      task_id: this.props?.match?.params?.taskid,
    });
  };

  onChange = (a, b, c) => {
    this.setState({
      active: a,
    });
  };

  callDispute = (values) => {
    let param = {
      task_id:
        this.props?.match?.params?.taskid &&
        parseInt(this.props?.match?.params?.taskid),
      refund_to_employer: values.refund_to_employer,
      refund_to_specialist: values.refund_to_specialist,
      refund_message: values.refund_message,
    };
    this.props.callDisputeSettle(param, this.props.history);
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
            <DisabledLinkText to={`/admin/alltasks/reported-tasks`}>
            <IntlMessages id="reportedTask" />
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
                          <video width="100%" height="365">
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
                                border:
                                  this.state.active === 0
                                    ? "2px solid #FCAE1D"
                                    : "",
                              }}
                            />
                          </div>
                        ) : (
                          <div className="rp-task-img">
                            <video
                              width="123"
                              height="123"
                              style={{
                                border:
                                  this.state.active === 0
                                    ? "2px solid #FCAE1D"
                                    : "",
                              }}
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
                <Col className="rp-task-btn-wrapper">
                  <Link
                  to={`/admin/messages`}
                  >
                  <Button
                    type="primary"
                    style={{
                      marginRight: 20,
                    }}
                    className="btn-view-message"
                  >
                    <IntlMessages id="viewMessage" />
                  </Button>
                  </Link>
                 
                  <Link
                    to={`/admin/alltasks/reported-tasks/${this.props?.match?.params?.taskid}/view_proofs`}
                  >
                    <Button
                      style={{
                        color: "#758287",
                        borderColor: "#cdcdcd",
                      }}
                      className="btn-view-proof"
                    >
                      <IntlMessages id="viewProof" />
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <UserProfileWidget>
                    <Row style={rowStyle} className="task-details">
                      <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                        <h3><IntlMessages id="taskDetails" /></h3>
                        <UserProfileWidgetItem
                          type={"Task ID"}
                          value={
                            viewTaskDetailData &&
                            viewTaskDetailData.task &&
                            viewTaskDetailData.task.id
                          }
                        />
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
                              :viewTaskDetailData?.reportedTaskDetails?.[0]
                              ?.status !== 0 
                              ? "Resolved"
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
                        <Link
                          to={`/admin/alltasks/reported-tasks/${this.props?.match?.params?.taskid}/placebid`}
                        >
                          <UserProfileWidgetItem
                            type={"Bids"}
                            name={
                              viewTaskDetailData && viewTaskDetailData.totalBids
                            }
                            color={"#2AABE1"}
                          />{" "}
                        </Link>
                        <UserProfileWidgetItem
                          type={"Reported on"}
                          value={"03/06/2020"}
                        />
                      </Col>
                      <Row className="budget-wrapper">
                        <Col span={12} className="budget">
                          <span><IntlMessages id="estimatedBudget" /></span>

                          <h2>
                            {viewTaskDetailData &&
                              viewTaskDetailData.task &&
                              viewTaskDetailData.task.estimated_budget}
                          </h2>
                        </Col>
                        <Col span={12} className="budget">
                          <span><IntlMessages id="antTable.title.Amount"/></span>

                          <h2
                            style={{
                              color: "#2AABE1",
                            }}
                          >
                            {viewTaskDetailData && viewTaskDetailData.activeBid}
                          </h2>
                        </Col>
                        <Col span={16} className="about-task">
                          <p className="about-task-title"><IntlMessages id="aboutTask"/></p>
                        </Col>

                        <Col className="about-task-text-wrapper" span={16}>
                          <p className="about-task-text">
                          
                            Ipsum cursus lacus, in vel interdum. Duis nisl sit
                            ornare turpis orci. Elit dictumst aliquam lectus
                            tincidunt vestibulum pretium ac vitae ullamcorper.
                            Sed elementum facilisi nunc bibendum non, viverra
                            pulvinar
                          </p>
                        </Col>
                      </Row>
                    </Row>
                  </UserProfileWidget>
                </Col>
              </Col>
              <Divider />
              <Col lg={12} md={24} sm={24} xs={24}>
                <Box title="Payments" className="payments">
                  <Row key={1}>
                    {/* <Col
                      xl={24}
                      lg={24}
                      sm={24}
                      xs={24}
                      md={18}
                      style={colStyle}
                      className="export-select"
                    >
                      <FormItem
                        label={"Funds"}
                        colon={false}
                        className="payment-field"
                      >
                        <Select
                          value={this.state?.filextention}
                          className="exportSelectInput"
                          onChange={this.handleChangeForSelect}
                          placeholder="Select"
                        >
                          {["Excel", "CSV"].map((item, index) => (
                            <SelectOption
                              key={index}
                              value={item}
                              className="payment-input"
                            >
                              {item}
                            </SelectOption>
                          ))}
                        </Select>
                      </FormItem>
                    </Col> */}
                    <Form
                      onFinish={
                        viewTaskDetailData?.reportedTaskDetails?.[0]?.status ===
                          0 && this.callDispute
                      }
                    >
                      <Row key={1} justify="start">
                        <Col md={18} lg={24} sm={24} xs={24} style={colStyle}>
                          <FormItem
                            colon={false}
                            name="refund_to_employer"
                            label={
                              <IntlMessages id="antInput.label.refundEmployer" />
                            }
                            rules={[
                              {
                                required: true,
                                message:
                                  AppConstant.FormValidation.refundEmployer,
                              },
                            ]}
                            className="payment-field"
                          >
                            <Input
                              size="large"
                              placeholder="13 Kr"
                              className="payment-input"
                            />
                          </FormItem>
                        </Col>
                        <Col md={18} lg={24} sm={24} xs={24} style={colStyle}>
                          <FormItem
                            colon={false}
                            className="payment-field"
                            name="refund_to_specialist"
                            label={
                              <IntlMessages id="antInput.label.refundSpecialist" />
                            }
                            rules={[
                              {
                                required: true,
                                message:
                                  AppConstant.FormValidation.refundSpecialist,
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="15 Kr"
                              className="payment-input"
                            />
                          </FormItem>
                        </Col>
                        <Col
                          md={18}
                          lg={24}
                          sm={24}
                          xs={24}
                          style={colStyle}
                        >
                          <FormItem
                            colon={false}
                            className="payment-field"
                            name="refund_message"
                            label={<IntlMessages id="feedback.alert.message" />}
                            rules={[
                              {
                                required: true,
                                message: AppConstant.FormValidation.message,
                              },
                            ]}
                          >
                            <Textarea
                              style={{ resize: "none" }}
                              rows={4}
                              placeholder="Message"
                              className="payment-input"
                            />
                          </FormItem>
                        </Col>
                        <Button
                          type="primary"
                          className="resolve-btn"
                          htmlType="submit"
                          disabled={
                            viewTaskDetailData?.reportedTaskDetails?.[0]
                              ?.status !== 0
                          }
                        >
                          <IntlMessages id="markAsResolved"/>
                        </Button>
                      </Row>
                    </Form>
                  </Row>
                </Box>
              </Col>
            </Row>
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  viewTaskDetailData: state.AdminTask.viewReportedTaskDetailData,
});

const mapDispatchToProps = {
  viewReportedTaskDetail,
  callDisputeSettle,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewTasks));
