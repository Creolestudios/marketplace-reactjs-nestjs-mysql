import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import userpic from "@iso/assets/images/avatar.png";
import LayoutContent from "@iso/components/utility/layoutContent";
import Checkbox, { CheckboxGroup } from "@iso/components/uielements/checkbox";
import Button from "@iso/components/uielements/button";
import UserProfileWidget, { UserProfileWidgetItem } from "../UserProfileWidget";
import basicStyle from "@iso/assets/styles/constants";
import UnderUserDMenu from "./UnderUserDMenu";
import IntlMessages from "@iso/components/utility/intlMessages";
import userAdminAction from "@iso/redux/admin/users/actions";

const { suspendUser, activateUser } = userAdminAction;
class UserDetails extends Component {
  state = {
    viewAll: false,
    activeRole: "",
  };
  componentDidUpdate(prevProps) {
    if (
      prevProps.suspendUserRes !== this.props.suspendUserRes ||
      prevProps.activateUserRes !== this.props.activateUserRes
    ) {
      this.props.history.push("/admin/users");
    }
  }
  handleViewAll = (val) => {
    this.setState({
      viewAll: true,
      activeRole: val,
    });
  };

  handleBack = () => {
    this.setState({
      viewAll: false,
    });
  };
  handleSuspendUser = () => {
    const payload = {
      user_id:
        this.props.match &&
        this.props.match.params &&
        this.props.match.params.id &&
        parseInt(this.props.match.params.id),
    };

    this.props.suspendUser(payload);
  };

  handleActivateUser = () => {
    const payload = {
      user_id:
        this.props.match &&
        this.props.match.params &&
        this.props.match.params.id &&
        parseInt(this.props.match.params.id),
    };
    this.props.activateUser(payload);
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { viewUserDetailData } = this.props;
    const userStatus =
      viewUserDetailData &&
      viewUserDetailData.profile &&
      viewUserDetailData.profile.status;

    return (
      <React.Fragment>
        <LayoutContent>
          {this.state.viewAll ? (
            <UnderUserDMenu
              viewAll={this.state.viewAll}
              employerData={viewUserDetailData && viewUserDetailData.employer}
              specialistData={
                viewUserDetailData && viewUserDetailData.specialist
              }
              activeRole={this.state.activeRole}
              handleViewAll={this.handleViewAll}
              handleBack={this.handleBack}
            />
          ) : (
            <>
              <Row gutter={[6, 6]}>
                <Col
                  span={24}
                  style={{
                    textAilgnLast: "end",
                  }}
                >
                  {userStatus == 3 ? (
                    <Button
                      type="primary"
                      onClick={this.handleActivateUser}
                      className="suspend-btn activate-btn"
                      style={{
                        backgroundColor: "#0FD346",
                        borderColor: "#0FD346",
                        float: "right",
                      }}
                    >
                      <span>Activate</span>
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={this.handleSuspendUser}
                      className="suspend-btn"
                      style={{
                        backgroundColor: "#ED4C5C",
                        borderColor: "#ED4C5C",
                        float: "right",
                      }}
                    >
                      <span>
                        <IntlMessages id="suspend" />
                      </span>
                    </Button>
                  )}
                </Col>
              </Row>

              <Row gutter={[6, 6]}>
                <Col
                  span={4}
                  xs={24}
                  sm={24}
                  md={24}
                  xl={4}
                  className="user-info"
                >
                  <Col span={24} style={colStyle} className="user-img">
                    <img
                      className="isoImgWrapper"
                      src={
                        viewUserDetailData &&
                        viewUserDetailData.profile &&
                        viewUserDetailData.profile.profile_photo
                          ? viewUserDetailData.profile.profile_photo
                          : userpic
                      }
                      style={{
                        width: "120px",
                        hight: "120px",
                        borderRadius: "4px",
                        marginBottom: "20px",
                      }}
                    />
                  </Col>

                  <Col
                    span={24}
                    style={{
                      paddingBottom: 16,
                      fontWeight: 700,
                    }}
                  >
                    {viewUserDetailData &&
                      viewUserDetailData.profile &&
                      viewUserDetailData.profile.full_name}
                  </Col>
                  <Col
                    span={24}
                    style={{ display: "inline-flex" }}
                    className="authentication"
                  >
                    <Checkbox
                      disabled
                      value={
                        viewUserDetailData &&
                        viewUserDetailData.profile &&
                        viewUserDetailData.profile.authorized_by_nemid === 0
                          ? false
                          : true
                      }
                    />
                    <p style={{ color: "#758287" }}>
                      <IntlMessages id="authorizedByNamed" />
                      Authorized by NameID
                    </p>
                  </Col>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={12}
                  xl={10}
                  // xs-push={0}
                  push={1}
                >
                  <UserProfileWidget>
                    <Row style={rowStyle}>
                      <Col
                        span={24}
                        style={colStyle}
                        className="user-detail-content"
                      >
                        <UserProfileWidgetItem
                          type={<IntlMessages id="antTable.title.userId" />}
                          value={viewUserDetailData?.profile?.user_id}
                          className="user-detail-item"
                        />
                        <UserProfileWidgetItem
                          type={<IntlMessages id="form.apply.email" />}
                          value={viewUserDetailData?.profile?.email}
                        />
                        <UserProfileWidgetItem
                          type={
                            <IntlMessages id="form.profile.contactNumber" />
                          }
                          value={
                            viewUserDetailData &&
                            viewUserDetailData.profile &&
                            viewUserDetailData.profile.phone &&
                            viewUserDetailData.profile.phone[0] &&
                            viewUserDetailData.profile.phone[0].phone_number
                          }
                        />
                        <UserProfileWidgetItem
                          type={<IntlMessages id="worksAs" />}
                          value={
                            viewUserDetailData?.profile?.work_as === 0
                              ? "Freelancer"
                              : "Business"
                          }
                        />
                        <UserProfileWidgetItem
                          type={<IntlMessages id="form.profile.zipCode" />}
                          value={viewUserDetailData?.profile?.zipcode}
                        />
                        <UserProfileWidgetItem
                          type={<IntlMessages id="form.profile.city" />}
                          value={viewUserDetailData?.profile?.city}
                        />
                        <UserProfileWidgetItem
                          type={<IntlMessages id="lastSeen" />}
                          value={
                            viewUserDetailData &&
                            viewUserDetailData.profile &&
                            moment(
                              viewUserDetailData.profile.last_seen
                            ).fromNow()
                          }
                        />
                      </Col>
                    </Row>
                  </UserProfileWidget>
                </Col>
                <Col
                  xs={24}
                  sm={24}
                  md={24}
                  lg={12}
                  xl={10}
                  style={{ textAlign: "left" }}
                  className="user-detail-earn"
                >
                  <Row>
                    <Col span={12}>
                      <h2
                        style={{
                          color: "#2AABE1",
                        }}
                      >
                        {viewUserDetailData &&
                          viewUserDetailData.totalEarning &&
                          `${viewUserDetailData.totalEarning} kr`}
                      </h2>
                      <span>
                        <IntlMessages id="TotalEarnings" />
                      </span>
                    </Col>
                    <Col span={12}>
                      <h2
                        style={{
                          color: "#2AABE1",
                        }}
                      >
                        {`${
                          viewUserDetailData?.outStandingData
                            ?.totalPendingAmount || 0
                        } kr`}
                      </h2>
                      <span>
                        <IntlMessages id="outstandingAmounts" />
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      span={24}
                      style={{
                        textAlign: "start",
                        paddingTop: 50,
                      }}
                    >
                      <p
                        style={{
                          color: "#423F3F",
                          fontWeight: 700,
                        }}
                      >
                        <IntlMessages id="antTable.title.description" />{" "}
                        <span
                          style={{
                            paddingLeft: "10px",
                            color: "#423F3F",
                            fontWeight: 700,
                          }}
                        >
                          :
                        </span>
                      </p>
                    </Col>

                    <Col
                      span={24}
                      style={{
                        textAlign: "start",
                      }}
                    >
                      <p>
                        {viewUserDetailData &&
                          viewUserDetailData.profile &&
                          viewUserDetailData.profile.description}
                      </p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={[6, 6]}>
                <Col xs={24} sm={24} md={24} xl={24}>
                  <UnderUserDMenu
                    viewAll={this.state.viewAll}
                    employerData={
                      viewUserDetailData && viewUserDetailData.employer
                    }
                    specialistData={
                      viewUserDetailData && viewUserDetailData.specialist
                    }
                    activeRole={this.state.activeRole}
                    handleViewAll={this.handleViewAll}
                    handleBack={this.handleBack}
                  />
                </Col>
              </Row>
            </>
          )}
        </LayoutContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  suspendUserRes: state.AdminUser.suspendUserRes,
  activateUserRes: state.AdminUser.activateUserRes,
});

const mapDispatchToProps = {
  suspendUser,
  activateUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserDetails));
