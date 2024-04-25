import React, { Component } from "react";
import { Row, Col, Divider, Card } from "antd";
import { connect } from "react-redux";
import UserProfileWidget, { UserProfileWidgetItem } from "../UserProfileWidget";
import userpic from "@iso/assets/images/avatar.png";
import examplePic from "@iso/assets/images/bio-profile-image.png";
import basicStyle from "@iso/assets/styles/constants";
import { StarOutlined,StarFilled } from "@ant-design/icons";
import Button from "@iso/components/uielements/button";
import { withRouter } from "react-router-dom";
import IsoWidgetsWrapper from "@iso/containers/Global/Common/WidgetsWrapper";
import IntlMessages from "@iso/components/utility/intlMessages";
class Splcialist extends Component {

  
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
              style={{ width: "40px", borderRadius: "4px" }}
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
            <StarFilled style={{color: "#FCD50A"}} />
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
    const { specialistData } = this.props;

    return (
      <React.Fragment>
        {!viewAll ? (
          <Col span={24}>
            <UserProfileWidget>
              <Row style={rowStyle}>
                <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
                  <UserProfileWidgetItem
                    type={"Tasks Completed"}
                    value={specialistData && specialistData.totalTasks}
                  />
                  <UserProfileWidgetItem
                    type={"Ratings"}
                    value={
                      (
                      `${
                        specialistData && specialistData.totalRating !== null
                          ? specialistData.totalRating
                          : 0
                      } (${specialistData && specialistData.totalTasks})`)
                    }
                    style={{ color: "#758287", whiteSpace: "nowrap" }}
                  />
                </Col>
                <Divider />
                {specialistData &&
                  specialistData.reviewData &&
                  specialistData.reviewData.map(
                    (item, index) =>
                      index < 2 && this.DetailesOfJobListing(item)
                  )}
                <Button
                  onClick={() => handleViewAll("specialist")}
                  style={{
                    color: "#758287",
                    borderColor: "#758287",
                  }}
                  //disabled={userStatus===3}
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
                    <IntlMessages id="antTable.title.Specialist"/>
                  </div>
                </Card>
              </IsoWidgetsWrapper>
            </Col>
            <UserProfileWidget>
              <Row style={rowStyle}>
                <Col lg={12} md={12} sm={24} xs={24} style={colStyle}>
                  <UserProfileWidgetItem
                    type={"Tasks Completed"}
                    value={specialistData && specialistData.totalTasks}
                  />
                  <UserProfileWidgetItem
                    type={"Ratings"}
                    value={
                      (
                      `${
                        specialistData && specialistData.totalRating !== null
                          ? specialistData.totalRating
                          : 0
                      } (${specialistData && specialistData.totalTasks})`)
                    }
                    style={{ color: "#758287", whiteSpace: "nowrap" }}
                  />
                </Col>
                <Divider />
                {specialistData &&
                  specialistData.reviewData &&
                  specialistData.reviewData.map((item) =>
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

export default withRouter(Splcialist);
