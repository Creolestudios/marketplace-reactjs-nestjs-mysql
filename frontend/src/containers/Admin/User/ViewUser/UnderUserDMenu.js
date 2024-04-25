import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import {
  CustomTabHeader,
  CustomTabPanelContainer,
  CustonTabPanel,
} from "@iso/components/uielements/tabs";
import basicStyle from "@iso/assets/styles/constants";
import Employer from "./Employer";
import Specialist from "./Specialist";

const tabsHeader = [
  {
    key: 1,
    title: "Specialist",
  },
  {
    key: 2,
    title: "Employer",
  },
];

class UnderUserDMenu extends Component {
  state = {
    activeTab: 1,
  };

  handleTabChange = (data) => {
    this.setState({
      activeTab: data.key,
    });
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;

    const { activeTab } = this.state;
    const { employerData, specialistData } = this.props;
    return (
      <React.Fragment>
        {!this.props.viewAll && (
          <CustomTabHeader
            tabs={tabsHeader}
            activeKey={activeTab}
            changeTabKey={this.handleTabChange}
          />
        )}

        <Row style={rowStyle} gutter={0} justify="start" style={{ paddingLeft: "20px" }}
>
          <Col
            lg={24}
            md={24}
            sm={24}
            xs={24}
            style={{ paddingBottom: "20px" }}
          >
            {this.props.viewAll ? (
              this.props.activeRole === 'specialist' ? (
                <Specialist
                  viewAll={this.props.viewAll}
                  specialistData={specialistData}
                  handleViewAll={this.props.handleViewAll}
                  handleBack={this.props.handleBack}
                />
              ) : (
                <Employer
                  activeTab={activeTab}
                  employerData={employerData}
                  viewAll={this.props.viewAll}
                  handleViewAll={this.props.handleViewAll}
                  handleBack={this.props.handleBack}
                />
              )
            ) : (
              <CustomTabPanelContainer activeKey={activeTab}>
                {/* Bio */}
                <CustonTabPanel tabkey={1}>
                  <Specialist
                    viewAll={this.props.viewAll}
                    specialistData={specialistData}
                    handleViewAll={this.props.handleViewAll}
                    handleBack={this.props.handleBack}
                  />
                </CustonTabPanel>
                {/* Contact Information */}
                <CustonTabPanel tabkey={2}>
                  <Employer
                    activeTab={activeTab}
                    employerData={employerData}
                    viewAll={this.props.viewAll}
                    handleViewAll={this.props.handleViewAll}
                    handleBack={this.props.handleBack}
                  />
                </CustonTabPanel>
              </CustomTabPanelContainer>
            )}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default UnderUserDMenu;
