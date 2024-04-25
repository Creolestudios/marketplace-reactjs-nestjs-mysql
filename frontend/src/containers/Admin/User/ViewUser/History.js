import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { ReactComponent as SortIconBtn } from "@iso/assets/images/icon/sort-icon-whole.svg";
import { Row, Col, Form, Typography, Space, Divider, Popover } from "antd";
import Select, { SelectOption } from "@iso/components/uielements/select";
import { TableViews } from "@iso/components/Tables/AntTables";
import { isEmpty } from "lodash";
import Input from "@iso/components/uielements/input";
import Button from "@iso/components/uielements/button";
import IsoWidgetsWrapper from "@iso/containers/Global/Common/WidgetsWrapper";
import IsoWidgetBox from "@iso/containers/Global/Common/WidgetBox";
import basicStyle from "@iso/assets/styles/constants";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import IntlMessages from "@iso/components/utility/intlMessages";
import { renderCell } from "@iso/components/Tables/AntTables/configs";
import { Link, withRouter } from "react-router-dom";
import userpic from "@iso/assets/images/avatar.png";
import { ExportCSV } from "../../ExportCSV";
import userAdminAction from "@iso/redux/admin/users/actions";
import Checkbox, { CheckboxGroup } from "@iso/components/uielements/checkbox";


const FormItem = Form.Item;
const { Title } = Typography;
const { viewUser } = userAdminAction;
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      search: "",
      limit: 10,
      sortedInfo: null,
      selectedRows: [],
      filextention: "Excel",
      visible: false,
      active: 0,
      suspended: 0,

      UsersData: [],
      pageCount: 0,
    };
  }
  handleVisibleChange = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };
  componentDidMount() {
    const { search, page, limit } = this.state;
    let param = {
      search,
      page,
      limit,
    };
    this.props.viewUser(param);
    console.log("heelo nnnn", this.props.userData)
    console.log("this page his", this.props.userData.count)
    let data = [];
    this.props.userData &&
      this.props.userData.reportHistory &&
      this.props.userData.reportHistory.map((item, key) =>
        data.push({
          key: key,
          // photo: item.profile_photo ? item.profile_photo : userpic,
          // userid: item.user_id,
          // username: item.user_name,
          // email_address: item.email,
          // types_of_services: item.types_of_services,
          // last_active: item.last_active,
          last_update_at: item.last_update_at,
          reported_at: item.reported_at,
          reported_by: item.reported_by,
          status: item.status
        })
      );
    console.log("data list", data)
    this.setState({
      UsersData: data,
      pageCount: this.props.userData ? this.props.userData.count : 0,
    });

  }
  componentDidUpdate(prevProps) {
    console.log("updated comp prev", prevProps.userData)
    console.log("updated comp new", this.props.userData)
    console.log("checking status", prevProps.userData !== this.props.userData)
    if (prevProps.userData !== this.props.userData) {
      console.log("this page his", this.props.userData)
      let data = [];
      this.props.userData &&
        this.props.userData.reportHistory &&
        this.props.userData.reportHistory.map((item, key) =>
          data.push({
            key: key,
            // photo: item.profile_photo ? item.profile_photo : userpic,
            // userid: item.user_id,
            // username: item.user_name,
            // email_address: item.email,
            // types_of_services: item.types_of_services,
            // last_active: item.last_active,
            last_update_at: item.last_update_at,
            reported_at: item.reported_at,
            reported_by: item.reported_by,
            status: item.status
          })
        );
      console.log("data list", data)
      this.setState({
        UsersData: data,
        pageCount: this.props.userData ? this.props.userData.count : 0,
      });
    }
  }
  callTaskApi = () => {
    const {
      active,
      suspended,
      search,
      page,
      limit,
    } = this.state;
    let param = {
      active,
      suspended,
      search,
      page,
      limit,
    };
    this.props.viewUser(param);
  };

  handleChangeForSelect = (value) => {
    this.setState({
      filextention: value,
    });
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };

  handleChange = (pagination) => {
    this.setState({
      page: pagination.current,
      limit: pagination.pageSize,
      keys: pagination.pageSize,
    });
    let param = {
      search: this.state.search,
      page: pagination.current,
      limit: pagination.pageSize,
    };
    this.props.viewUser(param);
  };

  handleViewUserDetailes = (id) => {
    // this.props.getUserDetailes({
    //   userId: id,
    // });
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value, page: 1 });
    let param = {
      search: e.target.value,
      page: 1,
      limit: this.state.limit,
    };
    this.props.viewUser(param);
  };
  handleFilterSubmit = () => {
    this.callTaskApi();
    this.setState({
      visible: !this.state.visible,
    });
  };
  handleFilter = (e, name) => {
    if (
      name === "active" ||
      name === "suspended"
    ) {
      this.setState({ [name]: e.target.value === 0 ? 1 : 0 });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  render() {
    const { UsersData, pageCount, active, suspended } = this.state;
    const rowSelection = {
      onChange: this.onSelectChange,
    };

    const { rowStyle, colStyle } = basicStyle;
    const newData = [...this.state.selectedRows]
    // const newData = this.state.selectedRows.filter(
    //   (x) => data.filter((i) => i.user_id === x.userid)[0]
    // );

    const fileTypes = this.state.filextention === "CSV" ? ".csv" : ".xlsx";
    // let UsersData = data;

    const headers = [
      { label: "User ID", key: "UserID" },
      { label: "Name", key: "Name" },
      { label: "Email", key: "Email" },
      { label: "Partner Name", key: "Partner" },
      { label: "Install Date", key: "Install Date" },
    ];

    const dataOfExel = newData.map((item) => ({
      UserID: item.userid,
      Name: item.username,
      Email: item.email_address,
      TypeOfService: item.types_of_services || "--",
      LastActive: item.last_active || "--",
    }));

    const UsersDataColumns = [
      // {
      //   key: "photo",
      //   width: 500,
      //   render: (object) => <img src={object.photo} />,
      // },
      // {
      //   title: () => {
      //     return (
      //       <Space>
      //         <IntlMessages id="antTable.title.userId" />
      //         <SortIconBtn />
      //       </Space>
      //     );
      //   },
      //   key: "userid",
      //   width: 500,
      //   render: (object, record) => {
      //     return {
      //       children: <Link to={`/admin/users/view-user/${object.userid}`}><span onClick={() => this.handleViewUserDetailes(object.userid)}>{object.userid}</span></Link>,
      //     };
      //   },
      //   // render: (object) => renderCell(object, "TextCell", "userid"),
      //   sorter: (a, b) => a.userid && (a.userid - b.userid),
      //   sortDirections: ["ascend", "descend", "ascend"],
      //  showSorterTooltip: window.screen.width > 768 ? true : false 
      // },
      {
        title: () => (
          <>
            <IntlMessages id="antTable.title.reportedBy" />
          </>
        ),
        render: (object, record) => {
          console.log("this is object", object)
          return {
            children: <span>{object.reported_by}</span>,
          };
        },
        key: "Reported By",
        width: 500,
        // render: (object) => renderCell(object, "TextCell", "username"),

      },

      {
        title: () => (
          <>
            <IntlMessages id="antTable.title.lastUpdate" />
          </>
        ),
        key: "last_update_at",
        width: 500,
        sorter: (a, b) =>
          a.last_update_at && (moment(a.last_update_at).unix() - moment(b.last_update_at).unix()),
        sortDirections: ["ascend", "descend", "ascend"],
        showSorterTooltip: window.screen.width > 768 ? true : false,

        render: (object, record) => {
          return {
            children: <span>{object.last_update_at}</span>,
          };
        },
      },
      {
        title: () => (
          <>
            <IntlMessages id="antTable.title.reportedAt" />

          </>
        ),
        key: "reported_at",
        width: 500,
        render: (object, record) => {
          return {
            children: <span>{object.reported_at}</span>,
          };
        },
      },
      {
        title: () => (
          <>
            <IntlMessages id="antTable.title.status" />
          </>
        ),
        key: "reported_at",
        width: 500,
        render: (object, record) => {
          return {
            children: <span>{object.status ? "Reviewed" : "Pending"}</span>,
          };
        },
      },

    ];

    return (
      <React.Fragment>

        <Row gutter={0} justify="start">
          <Col lg={24} md={24} sm={24} xs={24}>
            <IsoWidgetsWrapper className="commonWidgetBox">
              <IsoWidgetBox>
                {/* TABLE */}
                <TableViews.SimpleView
                  isSelection={true}
                  columns={UsersDataColumns}
                  dataSource={UsersData}
                  rowSelection={false}
                  isPaginate={{
                    current: this.state.page,
                    defaultCurrent: 1,
                    total: pageCount,
                    pageSizeOptions: ["5", "10", "15"],
                    showSizeChanger: true,
                    showTotal: (total, range) =>
                      `${range[0]}-${range[1]} of ${total}`,
                    showQuickJumper: true,
                  }}
                  onChange={this.handleChange}
                />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.AdminUser.userHistoryData,
});

const mapDispatchToProps = {
  viewUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(History));
