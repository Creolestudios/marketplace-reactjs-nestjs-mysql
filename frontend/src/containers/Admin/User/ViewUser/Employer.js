import React, { Component } from "react";
import { Row, Col, Divider, Card } from "antd";
import { connect } from "react-redux";
import UserProfileWidget, { UserProfileWidgetItem } from "../UserProfileWidget";
import userpic from "@iso/assets/images/avatar.png";
import examplePic from "@iso/assets/images/bio-profile-image.png";
import basicStyle from "@iso/assets/styles/constants";
import { StarOutlined } from "@ant-design/icons";
import Button from "@iso/components/uielements/button";
import { withRouter } from "react-router-dom";
import IsoWidgetsWrapper from "@iso/containers/Global/Common/WidgetsWrapper";
import IntlMessages from "@iso/components/utility/intlMessages";

class Employer extends Component {
  DetailesOfJobListing = (item) => {
    return (
      <Col span={24}>
        <div
          className="tab-wrapper"
          style={{
            textAlign: "start",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <div>
            <img
              src={item.reviewer_photo ? item.reviewer_photo : userpic}
              style={{ width: 40 }}
            />
            <div
              className="tab-wrapper-inner"
              style={{
                display: "inline-grid",
                justifyItems: "start",
                margin: 40,
              }}
            >
              <h3
                style={{
                  color: "#423F3F",
                  fontWeight: 700,
                }}
              >
                {item.reviewer_name}
              </h3>
              <span
                style={{
                  color: "#423F3F",
                  fontWeight: 700,
                }}
              >
                {item.task_title}
              </span>
              <p
                style={{
                  color: "#758287",
                }}
              >
                {item.review}
              </p>
            </div>
          </div>
          <span style={{ whiteSpace: "nowrap", color: "#758287" }}>
            <StarOutlined twoToneColor="#FCAE1D" />
            {item.rating} ({item.reviewed_by})
          </span>
        </div>
        <Divider />
      </Col>
    );
  };
  render() {
    const { rowStyle, colStyle } = basicStyle;

    const { viewAll, handleViewAll, handleBack } = this.props;
    const { employerData } = this.props;

    return (
      <React.Fragment>
        {!viewAll ? (
          <Col span={24}>
            <UserProfileWidget>
              <Row style={rowStyle}>
                <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
                  <UserProfileWidgetItem
                    type={"Tasks Completed"}
                    value={employerData && employerData.totalTasks}
                  />
                  <UserProfileWidgetItem
                    type={"Ratings"}
                    value={
                      ((<StarOutlined />),
                      `${
                        employerData && employerData.totalRating !== null
                          ? employerData.totalRating
                          : 0
                      } (${employerData && employerData.totalTasks})`)
                    }
                    style={{ whiteSpace: "nowrap", color: "#758287" }}
                  />
                </Col>
                <Divider />
                {employerData &&
                  employerData.reviewData &&
                  employerData.reviewData.map(
                    (item, index) =>
                      index < 2 && this.DetailesOfJobListing(item)
                  )}
                <Button
                  onClick={() => handleViewAll("employer")}
                  style={{
                    color: "#758287",
                    borderColor: "#758287",
                  }}
                >
                  <IntlMessages id="page.global.viewAll"/>
                </Button>
              </Row>
            </UserProfileWidget>
          </Col>
        ) : (
          <Col span={24}>
            <Col lg={24} md={24} sm={24} xs={24}>
              <IsoWidgetsWrapper className="learnMoreOwnAppError">
                <Card
                  style={{
                    backgroundColor: "#F8FAFB",
                  }}
                >
                  <div
                    className="learnMoreSec"
                    style={{
                      color: "#423F3F",
                      fontWeight: 400,
                      fontSize: 16,
                      textAlign: "start",
                    }}
                  >
                    {" "}
                    <IntlMessages id="antTable.title.Employer"/>
                  </div>
                </Card>
              </IsoWidgetsWrapper>
            </Col>
            <UserProfileWidget>
              <Row style={rowStyle}>
                <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
                  <UserProfileWidgetItem
                    type={"Tasks Completed"}
                    value={employerData && employerData.totalTasks}
                  />
                  <UserProfileWidgetItem
                    type={"Ratings"}
                    value={
                      ((<StarOutlined />),
                      `${
                        employerData && employerData.totalRating !== null
                          ? employerData.totalRating
                          : 0
                      } (${employerData && employerData.totalTasks})`)
                    }
                    style={{ whiteSpace: "nowrap", color: "#758287" }}
                  />
                </Col>
                <Divider />
                {employerData &&
                  employerData.reviewData &&
                  employerData.reviewData.map((item) =>
                    this.DetailesOfJobListing(item)
                  )}
                <Button
                  onClick={handleBack}
                  style={{
                    color: "#758287",
                    borderColor: "#758287",
                  }}
                >
                  <IntlMessages id="back"/>
                </Button>
              </Row>
            </UserProfileWidget>
          </Col>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(Employer);
