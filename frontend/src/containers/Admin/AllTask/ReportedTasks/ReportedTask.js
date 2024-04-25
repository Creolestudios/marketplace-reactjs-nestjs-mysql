import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { ReactComponent as SortIconBtn } from "@iso/assets/images/icon/sort-icon-whole.svg";
import { Row, Col, Form, Typography, Space, Divider, Popover } from "antd";
import Select, { SelectOption } from "@iso/components/uielements/select";
import { TableViews, dataList } from "@iso/components/Tables/AntTables";
import Input from "@iso/components/uielements/input";
import Button from "@iso/components/uielements/button";
import IsoWidgetsWrapper from "@iso/containers/Global/Common/WidgetsWrapper";
import IsoWidgetBox from "@iso/containers/Global/Common/WidgetBox";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import IntlMessages from "@iso/components/utility/intlMessages";
import { renderCell } from "@iso/components/Tables/AntTables/configs";
import { Link, withRouter } from "react-router-dom";
import Datepicker from "@iso/components/uielements/datePicker";
import Checkbox, { CheckboxGroup } from "@iso/components/uielements/checkbox";
import taskAdminAction from "@iso/redux/admin/tasks/actions";
import categoryAction from "@iso/redux/categoriesAndServices/actions";
import { ExportCSV } from "../../ExportCSV";
const { viewReportedTask } = taskAdminAction;
const { getCategories } = categoryAction;
const FormItem = Form.Item;
const { RangePicker } = Datepicker;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const { Title } = Typography;

class ReportedTask extends Component {
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
      date: "",
      active_task: 0,
      completed_task: 0,
      cancelled_task: 0,
      reported_task: 1,
      reported_task_active: 0,
      reported_task_completed: 0,
      category: "",
      sub_category: [],
      city: "",
      task_budget: [],
      budget_object: [],
      task_without_bid: 0,
      urgent_task: 0,
      created_by_business: 0,
      created_by_freelancer: 0,
      start_date: "",
      end_date: "",

      UsersData: [],
      pageCount: 0,
      order_by: '',
      order_by_type: '',
    };
  }
  componentDidMount() {
    this.callTaskApi();
    this.props.getCategories();
  }

  callTaskApi = () => {
    const {
      active_task,
      completed_task,
      cancelled_task,
      reported_task,
      reported_task_active,
      reported_task_completed,
      category,
      sub_category,
      budget_object,
      city,
      task_without_bid,
      urgent_task,
      created_by_business,
      created_by_freelancer,
      start_date,
      end_date,
      search,
      page,
      limit,
      order_by,
      order_by_type,
    } = this.state;
    let param = {
      active_task,
      completed_task,
      cancelled_task,
      reported_task,
      reported_task_active,
      reported_task_completed,
      category,
      sub_category,
      budget_object,
      city,
      task_without_bid,
      urgent_task,
      created_by_business,
      created_by_freelancer,
      start_date,
      end_date,
      search,
      page,
      limit,
      order_by,
      order_by_type,
    };
    if (sub_category.length === 0) {
      delete param["sub_category"];
    }
    if (start_date === "") {
      delete param["start_date"];
    }
    if (end_date === "") {
      delete param["end_date"];
    }
    if (budget_object.length === 0) {
      delete param["budget_object"];
    }
    if (order_by === "") {
      delete param["order_by"];
    }
    if (order_by_type === "") {
      delete param["order_by_type"];
    }
    this.props.viewReportedTask(param);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.taskData !== this.props.taskData) {
      let data = [];
      this.props.taskData &&
        this.props.taskData.data &&
        this.props.taskData.data.map((item) =>
          data.push({
            key: item.task.index,
            task_id: item.task.id,
            category: item.task.category_name,
            sub_category: item.task.sub_category_name,
            task_title: item.task.task_title,
            Reporter: item.task.reported_task_reporter,
            Accused: item.task.reported_task_accused,
            date: item.task.date && moment(item.task.date).format("YYYY/MM/DD"),
          })
        );
      this.setState({
        UsersData: data,
        pageCount: this.props.taskData ? this.props.taskData.totalData : 0,
      });
    }
  }
  handleChangeForSelect = (value) => {
    this.setState({
      filextention: value,
    });
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRows });
  };
  handleChange = (pagination ,filter ,sorter) => {
    this.setState(
      {
        page: pagination.current,
        limit: pagination.pageSize,
        keys: pagination.pageSize,
        order_by: sorter.columnKey,
        order_by_type: sorter.order === "ascend" ? "ASC" : "DESC",
      },
      () => this.callTaskApi()
    );
  };
  handleReset = () => {
    this.setState(
      {
        active_task: 0,
        completed_task: 0,
        cancelled_task: 0,
        reported_task: 1,
        reported_task_active: 0,
        reported_task_completed: 0,
        category: "",
        sub_category: [],
        city: "",
        task_budget: [],
        budget_object: [],
        task_without_bid: 0,
        urgent_task: 0,
        created_by_business: 0,
        created_by_freelancer: 0,
        start_date: "",
        end_date: "",
        date: "",
        visible: !this.state.visible,
      },
      () => this.callTaskApi()
    );
  };

  handleViewUserDetailes = (id) => {
    // this.props.getUserDetailes({
    //   task_id: id,
    // });
  };
  handleVisibleChange = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  handleStatusColor = (status) => {
    return (
      <p
        style={{
          backgroundColor:
            status === "Open"
              ? "#2aabe1"
              : status === "Active"
              ? "#29ef38"
              : status === "Archive"
              ? "#d30fb4"
              : status === "Completed"
              ? "#0fd346"
              : status === "Cancellation requested by employer"
              ? "#c56767"
              : status === "Cancellation requested by specialist"
              ? "#9c5f5f"
              : status === "Cancelled"
              ? "#ed4c5c"
              : status === "Reported"
              ? "#d41023"
              : status === "Payment pending"
              ? "#fcae1f"
              : "#fcae1f",
          borderRadius: 2,
          color: "white",
          padding: "0px 15px",
          width: "fit-content",
        }}
      >
        {status}
      </p>
    );
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value, page: 1 }, () =>
      this.callTaskApi()
    );
  };

  handleFilter = (e, name) => {
    if (
      name === "active_task" ||
      name === "completed_task" ||
      name === "cancelled_task" ||
      name === "task_without_bid" ||
      name === "urgent_task" ||
      name === "created_by_business" ||
      name === "created_by_freelancer"
    ) {
      this.setState({ [name]: e.target.value === 0 ? 1 : 0 });
    } else if (name === "category" || name === "sub_category") {
      if (name === "category") {
        this.setState({ sub_category: [] });
      }
      this.setState({ [name]: e });
    } else if (name === "date") {
      this.setState({
        start_date: e && e[0] && moment(e[0]).format("YYYY-MM-DD"),
        end_date: e && e[1] && moment(e[1]).format("YYYY-MM-DD"),
        date: e,
      });
    } else if (name === "task_budget") {
      let val = [];
      e.map((dat) => {
        val.push({
          start_value: dat.split("-")[0] && parseInt(dat.split("-")[0]),
          end_value: dat.split("-")[1] && parseInt(dat.split("-")[1]),
        });
      });
      this.setState({ [name]: e, budget_object: val });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  handleFilterSubmit = () => {
    this.callTaskApi();
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    const rowSelection = {
      onChange: this.onSelectChange,
    };
    const { allCategoriesData } = this.props;
    const {
      UsersData,
      pageCount,
      active_task,
      completed_task,
      cancelled_task,
      task_without_bid,
      urgent_task,
      created_by_business,
      created_by_freelancer,
      category,
      sub_category,
      city,
      date,
      task_budget,
    } = this.state;
    const newData = [...this.state.selectedRows];
    // const newData = this.state.selectedRows.filter(
    //   (x) => UsersData.filter((i) => i.user_id === x.task_id)[0]
    // );
    const fileTypes = this.state.filextention === "CSV" ? ".csv" : ".xlsx";

    const headers = [
      { label: "User ID", key: "task_id" },
      { label: "Name", key: "Name" },
      { label: "Email", key: "Email" },
      { label: "Partner Name", key: "Partner" },
      { label: "Install Date", key: "Install Date" },
    ];

    const dataOfExel = newData.map((item) => ({
      Task_ID: item.task_id,
      Name: item.task_title,
      Category: item.category,
      Sub_category: item.sub_category,
      Reporter: item.Reporter || "--",
      Accused: item.Accused || "--",
      Date: item.date || "--",
    }));
    const UsersDataColumns = [
      {
        title: () => {
          return (
            <Space>
              <IntlMessages id="antTable.title.task_id" />
              <SortIconBtn />
            </Space>
          );
        },
        key: "task_id",
        width: 500,
        render: (object, record) => {
          return {
            children: (
                <Link to={`/admin/alltasks/reported-tasks/${object.task_id}`}>
                <span
                  onClick={() => this.handleViewUserDetailes(object.task_id)}
                >
                  {object.task_id}
                </span>
              </Link>
            ),
          };
        },
        // render: (object) => renderCell(object, "TextCell", "task_id"),
        sorter: (a, b) => a.task_id && a.task_id - b.task_id,
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.category" />
            <SortIconBtn />
          </Space>
        ),
        key: "category",
        width: 500,
        render: (object, record) => {
          return {
            children: (
                <Link to={`/admin/alltasks/reported-tasks/${object.task_id}`}>
                <span
                  onClick={() => this.handleViewUserDetailes(object.task_id)}
                >
                  {object.category}
                </span>
              </Link>
            ),
          };
        },
        // render: (object) => renderCell(object, "TextCell", "category"),
        sorter: (a, b) => a.category && a.category.localeCompare(b.category),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.sub_category" />
            <SortIconBtn />
          </Space>
        ),
        key: "sub_category",
        width: 500,
        render: (object, record) => {
          return {
            children: (
                <Link to={`/admin/alltasks/reported-tasks/${object.task_id}`}>
                <span
                  onClick={() => this.handleViewUserDetailes(object.task_id)}
                >
                  {object.sub_category}
                </span>
              </Link>
            ),
          };
        },
        // render: (object) => renderCell(object, "TextCell", "sub_category"),
        sorter: (a, b) =>
          a.sub_category && a.sub_category.localeCompare(b.sub_category),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.task_title" />
            <SortIconBtn />
          </Space>
        ),
        key: "task_title",
        width: 500,
        render: (object, record) => {
          return {
            children: (
                <Link to={`/admin/alltasks/reported-tasks/${object.task_id}`}>
                <span
                  onClick={() => this.handleViewUserDetailes(object.task_id)}
                >
                  {object.task_title}
                </span>
              </Link>
            ),
          };
        },
        // render: (object) => renderCell(object, "TextCell", "task_title"),
        sorter: (a, b) =>
          a.task_title && a.task_title.localeCompare(b.task_title),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.Reporter" />
            <SortIconBtn />
          </Space>
        ),
        key: "reporter",
        width: 500,
        render: (object, record) => {
          return {
            children: (
                <Link to={`/admin/alltasks/reported-tasks/${object.task_id}`}>
                <span
                  onClick={() => this.handleViewUserDetailes(object.task_id)}
                >
                  {object.Reporter}
                </span>
              </Link>
            ),
          };
        },
        // render: (object) => renderCell(object, "TextCell", "Reporter"),
        sorter: (a, b) => a.Reporter && a.Reporter.localeCompare(b.Reporter),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.Accused" />
            <SortIconBtn />
          </Space>
        ),
        key: "accused",
        width: 500,
        render: (object, record) => {
          return {
            children: (
                <Link to={`/admin/alltasks/reported-tasks/${object.task_id}`}>
                <span
                  onClick={() => this.handleViewUserDetailes(object.task_id)}
                >
                  {object.Accused}
                </span>
              </Link>
            ),
          };
        },
        // render: (object) => renderCell(object, "TextCell", "Accused"),
        sorter: (a, b) => a.Accused && a.Accused.localeCompare(b.Accused),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },

      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.Date" />
            <SortIconBtn />
          </Space>
        ),
        key: "date",
        width: 500,
        sorter: (a, b) =>
          a.date && moment(a.date).unix() - moment(b.date).unix(),
        sortDirections: ["ascend", "descend", "ascend"],
        render: (object, record) => {
          return {
            children: (
                <Link to={`/admin/alltasks/reported-tasks/${object.task_id}`}>
                <span
                  onClick={() => this.handleViewUserDetailes(object.task_id)}
                >
                 {moment(object.date).format("DD/MM/YYYY")}
                </span>
              </Link>
            ),
          };
        },
        // render: (object, record) => {
        //   return {
        //     children: <span>{moment(object.date).format("DD/MM/YYYY")}</span>,
        //   };
        // },
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        key: "actions-view",
        width: 200,
        render: (object) => (
          <Row>
            <Col>
              <Link to={`/admin/alltasks/reported-tasks/${object.task_id}`}>
                <Button
                  onClick={() => this.handleViewUserDetailes(object.task_id)}
                  style={{
                    color: "#758287",
                    borderColor: "#758287",
                  }}
                  className="view-btn"
                >
                  VIEW
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
          <Title level={2}>
            <IntlMessages id="reportedTask" />
          </Title>

          <LayoutContent className="isoLayoutHeaderActionWrapper">
            <Row className="topbar-wrapper" gutter={20}>
              <Col md={12} xs={24} className="exportToSelect">
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
                    onClick={() =>
                      ExportCSV(dataOfExel, "Reported_Tasks", fileTypes)
                    }
                  >
                    <IntlMessages id="button.export" />
                  </Button>
                </div>
              </Col>

              <Col md={12} xs={24} className="searchUsers">
                <FormItem>
                  <Input
                    size="large"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder="Search here"
                  />
                </FormItem>
                {/* <Datepicker format={dateFormatList} /> */}

                <Popover
                  trigger="click"
                  content={
                    <Form layout="vertical">
                      <div
                        style={{
                          width: 600,
                        }}
                        className="filter-wrapper"
                      >
                        <span>
                          <IntlMessages id="task_status" />
                        </span>
                        <Row key={1} className="message-filter">
                          <Col
                            md={18}
                            lg={6}
                            sm={16}
                            xs={24}
                            className="check-open"
                          >
                            <Checkbox
                              value={active_task}
                              checked={true}
                              disabled={true}
                              onChange={(e) =>
                                this.handleFilter(e, "active_task")
                              }
                            >
                              <IntlMessages id="Reported" />
                            </Checkbox>
                          </Col>
                          {/* <Col
                            md={18}
                            lg={6}
                            sm={16}
                            xs={24}
                            className="check-complete"
                          >
                            <Checkbox
                              value={completed_task}
                              checked={completed_task && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "completed_task")
                              }
                            >
                              <IntlMessages id="completed" />
                            </Checkbox>
                          </Col> */}
                        </Row>
                        <Divider />
                        <Row key={1} className="catagory-wrapper">
                          <Col md={12} lg={12} sm={12} xs={24}>
                            <FormItem label={"Category"}>
                              <Select
                                value={category}
                                name="category"
                                className="exportSelectInput filter-category"
                                onChange={(e) =>
                                  this.handleFilter(e, "category")
                                }
                                placeholder="Select"
                              >
                                {allCategoriesData &&
                                  allCategoriesData.map((item, index) => (
                                    <SelectOption
                                      key={index}
                                      value={item.parentCategoryData.id}
                                    >
                                      {item.parentCategoryData.name}
                                    </SelectOption>
                                  ))}
                              </Select>
                            </FormItem>
                          </Col>
                          <Col md={12} lg={12} sm={12} xs={24}>
                            <FormItem label={"Sub-Category"}>
                            <div className="custom">
                            <Select
                                value={sub_category}
                                mode="multiple"
                                allowClear
                                name="sub_category"
                                className="exportSelectInput filter-category"
                                onChange={(e) =>
                                  this.handleFilter(e, "sub_category")
                                }
                                placeholder=""
                              >
                                {allCategoriesData &&
                                  allCategoriesData.find(
                                    (dat) =>
                                      dat.parentCategoryData.id === category
                                  ) !== undefined &&
                                  allCategoriesData &&
                                  allCategoriesData
                                    .find(
                                      (dat) =>
                                        dat.parentCategoryData.id === category
                                    )
                                    .subCategoryData.map((item, index) => (
                                      <SelectOption key={index} value={item.id}>
                                        {item.name}
                                      </SelectOption>
                                    ))}
                              </Select>
                            
                            </div>
                             
                            </FormItem>
                          </Col>
                          <Col md={12} lg={12} sm={12} xs={24}>
                            <FormItem
                              label={<IntlMessages id="City" />}
                              className="filter-catagory-space fils-space"
                            >
                              <Input
                                type="text"
                                name="city"
                                value={city}
                                onChange={(e) => this.handleFilter(e)}
                              />
                            </FormItem>
                          </Col>
                          <Col md={12} lg={12} sm={12} xs={24}>
                            <FormItem name="Task_Budget" label="Task Budget">
                              <div
                                class="custom"
                                // ref={inputField}
                              >
                                <Select
                                  placeholder="Select"
                                  mode="multiple"
                                  className="exportSelectInput filter-category"
                                  onChange={(e) =>
                                    this.handleFilter(e, "task_budget")
                                  }
                                  value={task_budget}
                                  optionLabelProp="label"
                                  // getPopupContainer={() => inputField.current}
                                >
                                  <SelectOption value="10-50">
                                    <IntlMessages id="10k-50k" />
                                  </SelectOption>
                                  <SelectOption value="50-100">
                                    <IntlMessages id="50k-100" />
                                  </SelectOption>
                                  <SelectOption value="100-150">
                                    <IntlMessages id="100k-150k" />
                                  </SelectOption>
                                  <SelectOption value="150-200">
                                    <IntlMessages id="150k-200k" />
                                  </SelectOption>
                                  <SelectOption value="200-250">
                                    <IntlMessages id="200k-250k" />
                                  </SelectOption>
                                </Select>
                              </div>
                            </FormItem>
                          </Col>
                        </Row>
                        <Divider />
                        <span>
                          <IntlMessages id="showTask" />
                        </span>
                        <Row key={1} className="show-task-wrapper">
                          <Col
                            md={10}
                            lg={10}
                            sm={12}
                            xs={24}
                            className="check-task"
                          >
                            <Checkbox
                              value={created_by_business}
                              checked={created_by_business && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "created_by_business")
                              }
                            >
                              <IntlMessages id="repotedByEmployee" />
                            </Checkbox>
                          </Col>
                          <Col
                            md={10}
                            lg={10}
                            sm={12}
                            xs={24}
                            className="check-task report-freelance"
                          >
                            <Checkbox
                              value={created_by_freelancer}
                              checked={created_by_freelancer && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "created_by_freelancer")
                              }
                            >
                              <IntlMessages id="reportedByFreelancer" />
                            </Checkbox>
                          </Col>
                        </Row>
                        <Divider />
                        <span>Date</span>
                        <Row key={1} className="date-wrapper">
                          <Col lg={24} sm={24} xs={24} xl={24}>
                            <RangePicker
                              size="large"
                              format={dateFormatList}
                              name="date"
                              value={date}
                              style={{ height: "35px" }}
                              disabledDate={(current) => {
                                return current > moment();
                              }}
                              onChange={(e) => this.handleFilter(e, "date")}
                            />
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
                  className="filter-title"
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
  taskData: state.AdminTask.viewReportedTaskData,
  allCategoriesData: state.Categories.allCategoriesData,
});

const mapDispatchToProps = {
  viewReportedTask,
  getCategories,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ReportedTask));
