import React, { Component } from "react";
import { Row, Col, Typography, Divider } from "antd";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import HeaderBreadCrumb, {
  DisabledLinkText,
} from "@iso/components/utility/headerBreadCrumb";
import {
  CustomTabHeader,
  CustomTabPanelContainer,
  CustonTabPanel,
} from "@iso/components/uielements/tabs";
import basicStyle from "@iso/assets/styles/constants";
// import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import Portfolio from "./Portfolio";
import TypesOfServices from "./TypesOfServices";
import UserDetails from "./UserDetails";
import styled from "styled-components";
import IntlMessages from "@iso/components/utility/intlMessages";
import userAdminAction from "@iso/redux/admin/users/actions";
import History from "./History";
const { viewUserDetail } = userAdminAction;
// const DisabledLinkText = styled.div`
//   font-size: 20px;
//   color: #758287;
//   display: flex;
//   align-items: center;
// `;

const LayoutContent = styled.div`
  margin-top: 0px;
  width: 100%;
  border: 1px solid #e5e5e5;

  @media (max-width: 767px) {
    margin-top: 20px;
  }
  h2 {
    font-size: 16px;
    font-weight: 700;
  }
  span {
    font-size: 14px;
    color: #758287;
  }
  p {
    color: #758287;
  }
`;

const { Title } = Typography;

const tabsHeader = [
  {
    key: 1,

    title: <IntlMessages id="User.details" />,
  },
  {
    key: 2,
    title: <IntlMessages id="Portfolio" />,
  },
  {
    key: 3,
    title: <IntlMessages id="Types.of.services" />,
  },
  {
    key: 4,
    title: "History",
  },
];

class ViewUser extends Component {
  state = {
    activeTab: 1,
  };
  componentDidMount = () => {
    this.props.viewUserDetail({
      user_id: this.props?.match?.params?.id,
    });
  };
  handleTabChange = (data) => {
    this.setState({
      activeTab: data.key,
    });
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { activeTab } = this.state;
    const { viewUserDetailData } = this.props;
    return (
      <React.Fragment>
        <LayoutContentWrapper>
          <HeaderBreadCrumb>
            <Divider
              type="vertical"
              style={{
                height: 44,
                borderWidth: "thick",
                background: "#E5E5E5",
              }}
            />
            <DisabledLinkText className="disable-link" to={`/admin/users`}>
            <IntlMessages id="sidebar.users" />
            </DisabledLinkText>
            <Title level={2} className="title">
              {this.state.activeTab === 1 ? viewUserDetailData && viewUserDetailData.profile && viewUserDetailData.profile.full_name : tabsHeader[this.state.activeTab - 1].title}{" "}
            </Title>
          </HeaderBreadCrumb>
          <LayoutContent>
            <CustomTabHeader
              tabs={tabsHeader}
              activeKey={activeTab}
              changeTabKey={this.handleTabChange}
            />
            <Row style={rowStyle} gutter={0} justify="start">
              <Col lg={24} md={24} sm={24} xs={24} style={colStyle}>
                <CustomTabPanelContainer activeKey={activeTab}>
                  {/* Bio */}
                  <CustonTabPanel tabkey={1}>
                    <UserDetails viewUserDetailData={viewUserDetailData} />
                  </CustonTabPanel>
                  {/* Contact Information */}
                  <CustonTabPanel tabkey={2}>
                    <Portfolio activeTab={activeTab} portfolioData={viewUserDetailData && viewUserDetailData.albumData} />
                  </CustonTabPanel>
                  {/* Links */}
                  <CustonTabPanel tabkey={3}>
                    <TypesOfServices
                      serviceData={
                        viewUserDetailData && viewUserDetailData.categoriesData
                      }
                    />
                  </CustonTabPanel>
                  <CustonTabPanel tabkey={4}>
                    <History activeTab={activeTab} portfolioData={viewUserDetailData && viewUserDetailData.albumData} />
                  </CustonTabPanel>
                </CustomTabPanelContainer>
              </Col>
            </Row>
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  viewUserDetailData: state.AdminUser.viewUserDetailData,
});

const mapDispatchToProps = {
  viewUserDetail,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewUser));
