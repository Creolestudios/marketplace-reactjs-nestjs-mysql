import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { ReactComponent as SortIconBtn } from "@iso/assets/images/icon/sort-icon-whole.svg";
import { Row, Col, Form, Typography, Space, Divider ,Popover} from "antd";
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
import { ExportCSV } from "../ExportCSV";
import userAdminAction from "@iso/redux/admin/users/actions";
import Checkbox, { CheckboxGroup } from "@iso/components/uielements/checkbox";


const FormItem = Form.Item;
const { Title } = Typography;
const { viewUser } = userAdminAction;
class Users extends Component {
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
  }
  componentDidUpdate(prevProps) {
    if (prevProps.userData !== this.props.userData) {
      let data = [];
      this.props.userData &&
        this.props.userData.userData &&
        this.props.userData.userData.map((item) =>
          data.push({
            key: item.user_id,
            photo: item.profile_photo ? item.profile_photo : userpic,
            userid: item.user_id,
            username: item.user_name,
            email_address: item.email,
            types_of_services: item.types_of_services,
            last_active: item.last_active,
          })
        );
      this.setState({
        UsersData: data,
        pageCount: this.props.userData ? this.props.userData.totalData : 0,
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

  handleChange = (pagination , filter ,sorter) => {
    this.setState({
      page: pagination.current,
      limit: pagination.pageSize,
      keys: pagination.pageSize,
    });
    let param = {
      suspended:this.state.suspended,
      search: this.state.search,
      page: pagination.current,
      limit: pagination.pageSize,
      "order_by": sorter.columnKey,
      "order_by_type": sorter.order === "ascend" ? "ASC" : "DESC",
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
    const { UsersData, pageCount,active , suspended} = this.state;
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
      {
        key: "photo",
        width: 500,
        render: (object) => <img src={object.photo} />,
      },
      {
        title: () => {
          return (
            <Space>
              <IntlMessages id="antTable.title.userId" />
              <SortIconBtn />
            </Space>
          );
        },
        key: "user_id",
        width: 500,
        render: (object, record) => {
          return {
            children: <Link to={`/admin/users/view-user/${object.userid}`}><span onClick={() => this.handleViewUserDetailes(object.userid)}>{object.userid}</span></Link>,
          };
        },
        // render: (object) => renderCell(object, "TextCell", "userid"),
        sorter: (a, b) => a.userid && (a.userid - b.userid),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.UserName" />
            <SortIconBtn />
          </Space>
        ),
        render: (object, record) => {
          return {
            children: <Link to={`/admin/users/view-user/${object.userid}`}><span onClick={() => this.handleViewUserDetailes(object.userid)}>{object.username}</span></Link>,
          };
        },
        key: "user_name",
        width: 500,
        // render: (object) => renderCell(object, "TextCell", "username"),
        sorter: (a, b) => a.username && a.username.localeCompare(b.username),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="form.apply.email" />
            <SortIconBtn />
          </Space>
        ),
        render: (object, record) => {
          return {
            children: <Link to={`/admin/users/view-user/${object.userid}`}><span onClick={() => this.handleViewUserDetailes(object.userid)}>{object.email_address}</span></Link>,
          };
        },
        key: "user_email",
        width: 500,
        // render: (object) => renderCell(object, "TextCell", "email_address"),
        sorter: (a, b) => a.email_address && a.email_address.localeCompare(b.email_address),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.types_of_services" />
            <SortIconBtn />
          </Space>
        ),
        key: "type_of_services",
        width: 500,
        render: (object, record) => {
          return {
            children: <Link to={`/admin/users/view-user/${object.userid}`}><span onClick={() => this.handleViewUserDetailes(object.userid)}>{object.types_of_services}</span></Link>,
          };
        },
        // render: (object) => renderCell(object, "TextCell", "types_of_services"),
        sorter: (a, b) =>
          a.types_of_services && (a.types_of_services - b.types_of_services),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.last_active" />
            <SortIconBtn />
          </Space>
        ),
        key: "last_active",
        width: 500,
        sorter: (a, b) =>
          a.last_active && (moment(a.last_active).unix() - moment(b.last_active).unix()),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false ,

        render: (object, record) => {
          return {
            children: <Link to={`/admin/users/view-user/${object.userid}`}><span onClick={() => this.handleViewUserDetailes(object.userid)}>{object.last_active}</span></Link>,
          };
        },
      },
      {
        key: "actions-view",
        width: 200,
        render: (object) => (
          <Row>
            <Col>
              <Link to={`/admin/users/view-user/${object.userid}`}>
                <Button
                  onClick={() => this.handleViewUserDetailes(object.userid)}
                  style={{
                    color: "#758287",
                    borderColor: "#758287",
                  }}
                  className="view-btn"
                >
                  <span><IntlMessages id="View" /></span>
                </Button>
              </Link>
            </Col>
          </Row>
        ),
      },
    ];

    return (
      <React.Fragment>
        <LayoutContentWrapper>
          <Divider
            type="vertical"
            style={{
              height: 44,
              borderWidth: "thick",
              background: "#E5E5E5",
            }}
          />
          <Title className="title" level={2}>
            <IntlMessages id="sidebar.users" />
          </Title>

          <LayoutContent className="isoLayoutHeaderActionWrapper">
            <Row className="topbar-wrapper" gutter={20}>
              <Col md={12} sm={12} xs={24} className="exportToSelect">
                <FormItem label={<IntlMessages id="page.global.exportTo" />}>
                  <Select
                    value={this.state.filextention}
                    className="exportSelectInput"
                    onChange={this.handleChangeForSelect}
                  >
                    {["Excel", "CSV"].map((item, index) => (
                      <SelectOption key={index} value={item}>
                        {item}
                      </SelectOption>
                    ))}
                  </Select>
                </FormItem>
                <div className="exportBtn">
                  <Button
                    type="primary"
                    onClick={() => ExportCSV(dataOfExel, "Users", fileTypes)}
                  >
                    <IntlMessages id="button.export" />
                  </Button>
                </div>
              </Col>

              <Col md={12} sm={12} xs={24} className="searchUsers">
                <FormItem>
                  <Input
                    size="large"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder="Search here"
                  />
                </FormItem>

                <Popover
                  trigger="click"
                  content={
                    <Form layout="vertical">
                      <div style={{width: 700}} className="filter-wrapper">
                        <span><IntlMessages id="Account_Status" /></span>
                        <Row key={1} className="message-filter">
                         
                        
                          <Col
                            md={5}
                            lg={5}
                            sm={12}
                            xs={24}
                            className="check-complete"
                          >
                            <Checkbox
                              value={active}
                              checked={active && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "active")
                              }
                            >
                              <IntlMessages id="Active" />
                            </Checkbox>
                          </Col>
                          <Col
                            md={5}
                            lg={5}
                            sm={12}
                            xs={24}
                            className="check-complete"
                          >
                            <Checkbox
                              value={suspended}
                              checked={suspended && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "suspended")
                              }
                            >
                              <IntlMessages id="Suspend" />
                            </Checkbox>
                          </Col>

                        </Row>
                        <Divider />
                        <Row key={1}>
                          <Col className="filter-btn-wrapper">
                            <Button
                              type="primary"
                              onClick={this.handleFilterSubmit}
                            >
                              <IntlMessages id="apply" />
                            </Button>
                          </Col>
                          <Col className="filter-btn-wrapper">
                            <Button
                              onClick={this.handleReset}
                              style={{
                                color: "#758287",
                                borderColor: "#758287",
                              }}
                            >
                              <IntlMessages id="rest" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  }
                  visible={this.state.visible}
                  onVisibleChange={this.handleVisibleChange}
                  placement="bottomRight"
                  title={"Filter"}
                  className="filter-popover"
                >
                  <Button
                    style={{
                      color: "#758287",
                    }}
                    className="filter-btn"
                  >
                    <IntlMessages id="filter" />
                  </Button>
                </Popover>
                {/* <Datepicker format={dateFormatList} /> */}
              </Col>
            </Row>
            <Row style={{ padding: 30 }} gutter={0} justify="start">
              <Col lg={24} md={24} sm={24} xs={24}>
                <IsoWidgetsWrapper className="commonWidgetBox">
                  <IsoWidgetBox>
                    {/* TABLE */}
                    <TableViews.SimpleView
                      isSelection={true}
                      columns={UsersDataColumns}
                      dataSource={UsersData}
                      rowSelection={rowSelection}
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
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.AdminUser.viewUserData,
});

const mapDispatchToProps = {
  viewUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Users));
