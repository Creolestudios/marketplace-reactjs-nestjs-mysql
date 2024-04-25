import React, { Component } from "react";
import { Row, Col } from "antd";
import moment from "moment";
import {startCase, camelCase} from 'lodash';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import { SpinCustom } from "@iso/components/uielements/spin";
import { DashboardContentWrapper } from "./Home.styles";
import { UsersCard, SpacesCard, AttributeCard, RevenueCard } from "./Home.styles";
import UsersChart from "./UsersChart";
import GroupsChart from "./TaskChart";
import IncomeReport from "./IncomeReport";
import AuthorizedReport from "./AuthorizedReport";
import { CheckSquareOutlined, AppstoreOutlined } from "@ant-design/icons";
import dashboardAdminAction from "@iso/redux/admin/dashboard/actions";
import IntlMessages from "@iso/components/utility/intlMessages";
const { viewDashboard } = dashboardAdminAction;
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      spaces: [],
      loops: [],
      loading: false,
      signUp_start_date: moment().subtract(1, "months").format("YYYY-MM-DD"),
      signUp_end_date: moment().format("YYYY-MM-DD"),
      tasks_start_date: moment().subtract(1, "months").format("YYYY-MM-DD"),
      tasks_end_date: moment().format("YYYY-MM-DD"),
      income_start_date: moment().subtract(1, "months").format("YYYY-MM-DD"),
      income_end_date: moment().format("YYYY-MM-DD"),
      nemId_authorized_start_date: moment()
        .subtract(1, "months")
        .format("YYYY-MM-DD"),
      nemId_authorized_end_date: moment().format("YYYY-MM-DD"),

      userChartData: [],
      taskChartData: [],
      incomeChartData: [],
      authorizedChartData: [],
    };
  }
  callTaskApi = () => {
    const {
      signUp_start_date,
      signUp_end_date,
      tasks_start_date,
      tasks_end_date,
      income_start_date,
      income_end_date,
      nemId_authorized_start_date,
      nemId_authorized_end_date,
    } = this.state;
    let param = {
      signUp_start_date,
      signUp_end_date,
      tasks_start_date,
      tasks_end_date,
      income_start_date,
      income_end_date,
      nemId_authorized_start_date,
      nemId_authorized_end_date,
    };
    this.props.viewDashboard(param);
  };
  componentDidMount() {
    this.callTaskApi();
  }

  componentDidUpdate(prevProps) {
    const { viewDashboardData } = this.props;
    if (prevProps.viewDashboardData !== viewDashboardData) {
      let user = [];
      viewDashboardData &&
        viewDashboardData.userChartData &&
        Object.entries(viewDashboardData.userChartData).map(([key, value]) =>
          user.push({
            name: key,
            Users: value,
          })
        );
      let task = [];
      viewDashboardData &&
        viewDashboardData.taskReport &&
        Object.entries(viewDashboardData.taskReport).map(([key, value]) =>
          task.push({
            name: key && key.split('Task')[0]&& startCase(camelCase(key.split('Task')[0])),
            value: value,
          })
        );

      let income = [];
      viewDashboardData &&
        viewDashboardData.incomeChartData &&
        Object.entries(viewDashboardData.incomeChartData).map(([key, value]) =>
          income.push({
            name: key,
            Income: value,
          })
        );

      let authorized = [];
      viewDashboardData &&
        viewDashboardData.nemIDChartData &&
        Object.entries(viewDashboardData.nemIDChartData).map(([key, value]) =>
          authorized.push({
            name: key,
            NemID: value,
          })
        );
      this.setState({
        userChartData: user,
        taskChartData: task,
        incomeChartData: income,
        authorizedChartData: authorized,
      });
    }
  }

  handleDate = (e, val, name) => {
    this.setState({ [name]: val }, () => this.callTaskApi());
  };

  render() {
    const {
      users,
      spaces,
      loops,
      loading,
      signUp_start_date,
      signUp_end_date,
      tasks_start_date,
      tasks_end_date,
      income_start_date,
      income_end_date,
      nemId_authorized_start_date,
      nemId_authorized_end_date,
      userChartData,
      taskChartData,
      incomeChartData,
      authorizedChartData,
    } = this.state;

    const { viewDashboardData } = this.props;
    return (
      <LayoutContentWrapper>
        <DashboardContentWrapper>
          <SpinCustom spinning={loading}>
            <Row
              gutter={[16, 16]}
              style={{ marginBottom: "20px", marginTop: "10px" }}
            >
              <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={12}>
                <UsersCard className="user">
                  <div className="userIcon abc">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 40 41"
                      width="40"
                      height="41"
                      fill={"#FFFFFF"}
                    >
                      <path
                        id="Layer"
                        fillRule="evenodd"
                        // class="shp0"
                        d="M34.14 6.61C37.89 10.36 40 15.45 40 20.75C40 24.71 38.83 28.57 36.63 31.86C34.43 35.15 31.31 37.71 27.65 39.23C24 40.74 19.98 41.14 16.1 40.37C12.22 39.59 8.65 37.69 5.86 34.89C3.06 32.1 1.16 28.53 0.38 24.65C-0.39 20.77 0.01 16.75 1.52 13.1C3.04 9.44 5.6 6.32 8.89 4.12C12.18 1.92 16.04 0.75 20 0.75C25.3 0.75 30.39 2.86 34.14 6.61ZM31.43 33.49C34.02 31.17 35.84 28.13 36.66 24.75C37.48 21.37 37.25 17.83 36.01 14.58C34.77 11.34 32.57 8.55 29.71 6.58C26.85 4.61 23.46 3.56 19.98 3.56C16.51 3.56 13.12 4.62 10.26 6.59C7.4 8.56 5.2 11.36 3.97 14.6C2.73 17.85 2.51 21.39 3.33 24.77C4.15 28.15 5.98 31.19 8.57 33.5L8.57 32.67C8.57 32.65 8.59 32.64 8.59 32.62C8.54 30.68 9.27 28.79 10.6 27.37C11.93 25.95 13.77 25.11 15.71 25.04L24.29 25.04C26.23 25.11 28.07 25.95 29.41 27.37C30.74 28.79 31.47 30.67 31.43 32.62L31.43 33.49Z"
                      />
                      <path
                        id="Layer"
                        // class="shp0"
                        d="M20 7.89C18.59 7.89 17.21 8.31 16.03 9.1C14.86 9.88 13.94 11 13.4 12.3C12.86 13.61 12.72 15.04 12.99 16.43C13.27 17.81 13.95 19.09 14.95 20.09C15.95 21.09 17.22 21.77 18.61 22.04C19.99 22.32 21.43 22.18 22.73 21.63C24.04 21.09 25.15 20.18 25.94 19C26.72 17.83 27.14 16.45 27.14 15.04C27.14 13.14 26.39 11.32 25.05 9.98C23.71 8.65 21.89 7.89 20 7.89Z"
                      />
                    </svg>
                  </div>{" "}
                  <div className="users">
                    <h3>
                      {" "}
                      {viewDashboardData &&
                        viewDashboardData.adminData &&
                        viewDashboardData.adminData.totalUsers}
                    </h3>{" "}
                    <span> <IntlMessages id="sidebar.users" /> </span>{" "}
                  </div>{" "}
                </UsersCard>{" "}
              </Col>{" "}
              <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={12}>
                <SpacesCard className="spaces">
                  <div className="userIcon">
                    <CheckSquareOutlined
                      style={{
                        fontSize: 30,
                        color: "#FFFFFF",
                      }}
                    />
                  </div>{" "}
                  <div className="users">
                    <h3>
                      {" "}
                      {viewDashboardData &&
                        viewDashboardData.adminData &&
                        viewDashboardData.adminData.totalTasks}{" "}
                    </h3>{" "}
                    <span> <IntlMessages id="sidebar.alltasks.tasks" /> </span>{" "}
                  </div>{" "}
                </SpacesCard>{" "}
              </Col>{" "}
              <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={12}>
                <AttributeCard className="usersCard">
                  <div className="userIcon">
                    <AppstoreOutlined
                      style={{
                        fontSize: 30,
                        color: "#FFFFFF",
                      }}
                    />
                  </div>{" "}
                  <div className="users">
                    <h3>
                      {" "}
                      {viewDashboardData &&
                        viewDashboardData.adminData &&
                        viewDashboardData.adminData.totalAttributes}{" "}
                    </h3>{" "}
                    <span> <IntlMessages id="sidebar.attributes" />  </span>{" "}
                  </div>{" "}
                </AttributeCard>{" "}
              </Col>{" "}
              <Col xxl={6} xl={6} lg={8} md={12} sm={12} xs={12}>
                <RevenueCard className="usersCard">
                  <div className="userIcon">
                    <svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0962 0C17.6231 0 15.3374 0.287913 13.63 0.781131C12.7846 1.02532 12.0096 1.33992 11.4173 1.74452C10.8659 2.12126 10.1925 2.77703 10.1925 3.75V3.76339C7.77213 3.82503 5.56734 4.09656 3.87594 4.51934C2.91815 4.75875 2.05433 5.06373 1.39985 5.45058C0.82893 5.78804 0 6.44001 0 7.5V13.75C0 14.2974 0.245244 14.7334 0.505408 15.036C0.761941 15.3343 1.08621 15.5689 1.4084 15.7559C1.85281 16.0139 2.39638 16.2399 3.00404 16.4363C2.82022 16.5317 2.64745 16.6331 2.48788 16.7409C1.93456 17.1147 1.25 17.7705 1.25 18.75V24.9212C1.25 25.8936 1.9114 26.5596 2.47295 26.9509C3.07067 27.3674 3.85405 27.692 4.70952 27.944C6.43678 28.453 8.74885 28.75 11.25 28.75C13.7513 28.75 16.0634 28.4526 17.7906 27.9435C18.646 27.6914 19.4293 27.3668 20.027 26.9504C20.5882 26.5594 21.25 25.8936 21.25 24.9212V19.973C23.2531 19.886 25.0874 19.5946 26.5196 19.1742C27.3742 18.9234 28.1503 18.608 28.7416 18.2194C29.259 17.8793 30 17.2388 30 16.25V3.75C30 2.77686 29.3263 2.12109 28.7749 1.74445C28.1825 1.33989 27.4074 1.0253 26.562 0.781121C24.8545 0.287918 22.5688 0 20.0962 0ZM4.48218 6.94472C5.90083 6.59012 7.8222 6.34007 10 6.26996V8.73004C7.8222 8.65993 5.90083 8.40988 4.48218 8.05528C3.76624 7.87632 3.22771 7.68271 2.86178 7.5C3.22771 7.31729 3.76624 7.12368 4.48218 6.94472ZM3.87594 10.4807C5.56734 10.9034 7.77213 11.175 10.1925 11.2366V14.9843C7.94376 14.9173 5.95285 14.6414 4.49122 14.2644C3.6387 14.0446 3.02958 13.8063 2.6634 13.5937C2.59318 13.553 2.53976 13.5176 2.5 13.4889V10.0614C2.92406 10.2196 3.38779 10.3586 3.87594 10.4807ZM17.7805 15.7801C16.3943 15.3841 14.6298 15.1205 12.6925 15.0325V12.6517C12.9612 12.7504 13.2428 12.8416 13.5334 12.9256C15.2802 13.4307 17.6114 13.75 20.0962 13.75C22.5805 13.75 24.8676 13.4307 26.5722 12.9228C26.8948 12.8266 27.206 12.721 27.5 12.6052V16.0357C27.4685 16.0611 27.4256 16.0927 27.3684 16.1303C27.0659 16.3291 26.5508 16.5596 25.8154 16.7754C24.5356 17.1511 22.7823 17.4267 20.8159 17.4874C20.579 17.1692 20.2802 16.922 20.0121 16.7409C19.4153 16.3377 18.6338 16.0239 17.7805 15.7801ZM14.2278 10.524C13.5215 10.3198 13.0108 10.1019 12.6925 9.9087V6.40473C12.9905 6.52061 13.3053 6.62495 13.6305 6.71888C15.338 7.21208 17.6237 7.5 20.0962 7.5C22.5688 7.5 24.8545 7.21208 26.562 6.71888C26.8872 6.62495 27.202 6.52061 27.5 6.40473V9.79401C27.4698 9.81877 27.4287 9.84976 27.3736 9.8867C27.0814 10.0827 26.5801 10.3118 25.8582 10.5269C24.4305 10.9524 22.3908 11.25 20.0962 11.25C17.8011 11.25 15.7092 10.9524 14.2278 10.524ZM14.3242 4.31706C13.6754 4.12965 13.2117 3.92935 12.9187 3.74994C13.2116 3.57057 13.6751 3.37031 14.3238 3.18293C15.7482 2.77146 17.7894 2.5 20.0962 2.5C22.4025 2.5 24.4437 2.77146 25.8683 3.18294C26.517 3.37032 26.9807 3.5706 27.2737 3.75C26.9807 3.92939 26.517 4.12968 25.8683 4.31706C24.4437 4.72854 22.4025 5 20.0962 5C17.79 5 15.7488 4.72854 14.3242 4.31706ZM27.5465 3.54232C27.5512 3.53464 27.5548 3.53092 27.5548 3.53092C27.5548 3.53092 27.5529 3.5348 27.5465 3.54232ZM27.5631 9.73606C27.5692 9.7267 27.574 9.72218 27.574 9.72218C27.574 9.72218 27.5715 9.72692 27.5631 9.73606ZM27.5782 15.9613C27.5782 15.9613 27.5755 15.9663 27.5666 15.9758C27.5731 15.966 27.5782 15.9613 27.5782 15.9613ZM17.7805 21.7199C18.1172 21.6237 18.4426 21.5166 18.75 21.3975V24.7788C18.7197 24.8074 18.6716 24.8478 18.5978 24.8992C18.3099 25.0998 17.8118 25.331 17.0838 25.5455C15.6441 25.9699 13.5812 26.25 11.25 26.25C8.91865 26.25 6.85572 25.9701 5.41611 25.546C4.68814 25.3315 4.19011 25.1004 3.90229 24.8998C3.82836 24.8483 3.78024 24.8079 3.75 24.7793V21.3975C4.05735 21.5166 4.38281 21.6237 4.71946 21.7199C6.44308 22.2123 8.75158 22.5 11.25 22.5C13.7484 22.5 16.0569 22.2123 17.7805 21.7199ZM18.7956 24.7278C18.7956 24.7278 18.794 24.7313 18.7885 24.7381C18.7925 24.7312 18.7956 24.7278 18.7956 24.7278ZM3.70458 24.7284C3.70458 24.7284 3.70767 24.7318 3.71162 24.7387C3.70617 24.7319 3.70458 24.7284 3.70458 24.7284ZM11.5 20C15.6421 20 19 19.3284 19 18.5C19 17.6716 15.6421 17 11.5 17C7.35786 17 4 17.6716 4 18.5C4 19.3284 7.35786 20 11.5 20Z" fill="white"/>
                    </svg>
                  </div>{" "}
                  <div className="users">
                    <h3>
                      {viewDashboardData &&
                        viewDashboardData.adminData &&
                        viewDashboardData.adminData.totalRevenue}{" "}
                      Kr{" "}
                    </h3>{" "}
                    <span> <IntlMessages id="revenue" />  </span>{" "}
                  </div>{" "}
                </RevenueCard>{" "}
              </Col>{" "}
            </Row>{" "}
            <Row gutter={[16, 16]}>
              <Col lg={12} md={24} sm={24} xs={24}>
                <UsersChart
                  users={users}
                  userChartData={userChartData}
                  signUp_start_date={signUp_start_date}
                  signUp_end_date={signUp_end_date}
                  handleDate={this.handleDate}
                />
              </Col>{" "}
              <Col lg={12} md={24} sm={24} xs={24}>
                <GroupsChart
                  taskReport={taskChartData}
                  tasks_start_date={tasks_start_date}
                  tasks_end_date={tasks_end_date}
                  handleDate={this.handleDate}
                />
              </Col>{" "}
              <Col lg={12} md={24} sm={24} xs={24}>
                <IncomeReport
                  incomeChartData={incomeChartData}
                  income_start_date={income_start_date}
                  income_end_date={income_end_date}
                  handleDate={this.handleDate}
                />
              </Col>{" "}
              <Col lg={12} md={24} sm={24} xs={24}>
                <AuthorizedReport
                  nemIDChartData={authorizedChartData}
                  nemId_authorized_start_date={nemId_authorized_start_date}
                  nemId_authorized_end_date={nemId_authorized_end_date}
                  handleDate={this.handleDate}
                />
              </Col>{" "}
            </Row>{" "}
          </SpinCustom>
        </DashboardContentWrapper>{" "}
      </LayoutContentWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  viewDashboardData: state.AdminDashboard.viewDashboardData,
});

const mapDispatchToProps = {
  viewDashboard,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
