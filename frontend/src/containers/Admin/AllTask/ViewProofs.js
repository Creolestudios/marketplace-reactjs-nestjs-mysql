import React, { Component } from "react";
import { Row, Col, Typography, Divider, Empty } from "antd";
import { connect } from "react-redux";

import HeaderBreadCrumb, {
  DisabledLinkText,
} from "@iso/components/utility/headerBreadCrumb";
import {
  CustomTabHeader,
  CustomTabPanelContainer,
  CustonTabPanel,
} from "@iso/components/uielements/tabs";
import basicStyle from "@iso/assets/styles/constants";
import LayoutContent from "@iso/components/utility/layoutContent";

import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import ProofByEmpOrSpe from "./ProofByEmpOrSpe";
import { withRouter } from "react-router-dom";
import taskAdminAction from "@iso/redux/admin/tasks/actions";
import IntlMessages from "@iso/components/utility/intlMessages";
const { viewProof } = taskAdminAction;
const { Title } = Typography;

const tabsHeader = [
  {
    key: 1,
    title: "Proof by Employer ",
  },
  {
    key: 2,
    title: "Proof by Specialist",
  },
];

class ViewProofs extends Component {
  state = {
    activeTab: 1,
  };
  componentDidMount() {
    let param = {
      task_id:
        this.props.match &&
        this.props.match.params &&
        this.props.match.params.taskid &&
        parseInt(this.props.match.params.taskid),
    };
    this.props.viewProof(param);
  }
  handleTabChange = (data) => {
    this.setState({
      activeTab: data.key,
    });
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { activeTab } = this.state;
    const { viewProofData } = this.props;
    return (
      <React.Fragment>
        <LayoutContentWrapper>
          <HeaderBreadCrumb style={{ marginBottom: "30px"}}>
            <Divider
              type="vertical"
              style={{
                height: 44,
                borderWidth: "thick",
                background: "#E5E5E5",
              }}
            />
            {(this.props?.match?.path).includes("/alltasks/reported-tasks/") ? (
              <>
                <DisabledLinkText to={`/admin/alltasks/reported-tasks`}>
                <IntlMessages id="sidebar.alltasks.reportedTasks" />
                </DisabledLinkText>
                <DisabledLinkText
                  to={`/admin/alltasks/reported-tasks/${this.props?.match?.params?.taskid}`}
                  style={{whiteSpace: "nowrap"}}
                >
                  {viewProofData && viewProofData.taskData && viewProofData.taskData.title}
                </DisabledLinkText>
              </>
            ) : (
              <>
                <DisabledLinkText to={`/admin/alltasks/tasks`}>
                <IntlMessages id="sidebar.alltasks.tasks" />
                </DisabledLinkText>
                <DisabledLinkText
                  to={`/admin/alltasks/tasks/${this.props?.match?.params?.taskid}`}
                  style={{whiteSpace: "nowrap"}}
                >
                  {viewProofData && viewProofData.taskData && viewProofData.taskData.title}
                </DisabledLinkText>
              </>
            )}
            <Title level={2}><IntlMessages id="viewProof" /></Title>
          </HeaderBreadCrumb>
          {viewProofData && Object.keys(viewProofData).length !==0 ? (
            <LayoutContent className="view-proof-layout">
              <CustomTabHeader
                tabs={tabsHeader}
                activeKey={activeTab}
                changeTabKey={this.handleTabChange}
              />
              {/* <Divider /> */}

              <Row
                style={rowStyle}
                gutter={0}
                justify="start"
                className="view-proof-wrapper"
              >
                <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                  <CustomTabPanelContainer activeKey={activeTab}>
                    {/* Bio */}
                    <CustonTabPanel tabkey={1}>
                      <ProofByEmpOrSpe
                        proofData={viewProofData && viewProofData.employerProof}
                      />
                    </CustonTabPanel>
                    {/* Contact Information */}
                    <CustonTabPanel tabkey={2}>
                      <ProofByEmpOrSpe
                        proofData={
                          viewProofData && viewProofData.specialistProof
                        }
                      />
                    </CustonTabPanel>
                    {/* Links */}
                  </CustomTabPanelContainer>
                </Col>
              </Row>
            </LayoutContent>
          ) : (
            <LayoutContent className="view-proof-layout">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </LayoutContent>
          )}
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  viewProofData: state.AdminTask.viewProofData,
});

const mapDispatchToProps = {
  viewProof,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewProofs));
