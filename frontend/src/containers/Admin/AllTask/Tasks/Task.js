import React, { Component } from "react";
import moment from "moment";
import { ReactComponent as SortIconBtn } from "@iso/assets/images/icon/sort-icon-whole.svg";
import { Row, Col, Form, Typography, Space, Divider, Popover } from "antd";
import Select, { SelectOption } from "@iso/components/uielements/select";
import { TableViews, dataList } from "@iso/components/Tables/AntTables";
import { isEmpty } from "lodash";
import { connect } from "react-redux";
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
import Datepicker from "@iso/components/uielements/datePicker";
import Checkbox, { CheckboxGroup } from "@iso/components/uielements/checkbox";
import taskAdminAction from "@iso/redux/admin/tasks/actions";
import categoryAction from "@iso/redux/categoriesAndServices/actions";
import { ExportCSV } from "../../ExportCSV";
const { viewTask } = taskAdminAction;
const { getCategories } = categoryAction;
const FormItem = Form.Item;
const { RangePicker } = Datepicker;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const { Title } = Typography;

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      search: "",
      limit: 10, //limit
      sortedInfo: null,
      selectedRows: [],
      filextention: "Excel",
      visible: false,
      date: "",
      open_task: 0,
      active_task: 0,
      completed_task: 0,
      cancelled_task: 0,
      resolved_task: 0,
      reported_task: 0,
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
      order_by_type:''
    };
  }

  componentDidMount() {
    this.callTaskApi();
    this.props.getCategories();
  }

  callTaskApi = () => {
    const {
      open_task,
      active_task,
      completed_task,
      cancelled_task,
      reported_task,
      resolved_task,
      category,
      sub_category,
      city,
      task_without_bid,
      budget_object,
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
      open_task,
      active_task,
      completed_task,
      cancelled_task,
      reported_task,
      resolved_task,
      category,
      sub_category,
      city,
      task_without_bid,
      urgent_task,
      created_by_business,
      created_by_freelancer,
      start_date,
      end_date,
      budget_object,
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
    this.props.viewTask(param);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.taskData !== this.props.taskData) {
      let data = [];
      this.props.taskData &&
        this.props.taskData.data &&
        this.props.taskData.data.map((item) =>
          data.push({
            key: item.task.id,
            task_id: item.task.id,
            category: item.task.category_name,
            sub_category: item.task.sub_category_name,
            task_title: item.task.task_title,
            Employer: item.employer.name,
            Specialist: item.specialist.name,
            status:
              item.task.task_status === 1
                ? "Open"
                : item.task.task_status === 2
                ? "Active"
                : item.task.task_status === 3
                ? "Archive"
                : item.task.task_status === 4
                ? "Completed"
                : item.task.task_status === 5
                ? "Cancellation requested by employer"
                : item.task.task_status === 6
                ? "Cancellation requested by specialist"
                : item.task.task_status === 7
                ? "Cancelled"
                : item.task.reported_task_status === 1
                ? "Resolved"
                : item.task.task_status === 8
                ? "Reported"
                : item.task.task_status === 9 && "Payment pending",
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

  handleViewUserDetailes = (id) => {
    // this.props.getUserDetailes({
    //   task_id: id,
    // });
  };

  handleFilterSubmit = () => {
    this.callTaskApi();
    this.setState({
      visible: !this.state.visible,
    });
  };

  handleReset = () => {
    this.setState(
      {
        open_task: 0,
        active_task: 0,
        completed_task: 0,
        cancelled_task: 0,
        resolved_task: 0,
        reported_task: 0,
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
        search: "",
        end_date: "",
        date: "",
        visible: !this.state.visible,
      },
      () => this.callTaskApi()
    );
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
              :status === "Archive"
              ? "#d30fb4"
              :status === "Completed"
              ? "#0fd346"
              :status === "Resolved"
              ? "#0fd346"
              :status === "Cancellation requested by employer"
              ? "#c56767"
              :status === "Cancellation requested by specialist"
              ? "#9c5f5f"
              :status === "Cancelled"
              ? "#ed4c5c"
              :status === "Reported"
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
      name === "open_task" ||
      name === "active_task" ||
      name === "completed_task" ||
      name === "cancelled_task" ||
      name === "task_without_bid" ||
      name === "urgent_task" ||
      name === "created_by_business" ||
      name === "created_by_freelancer"||
      name === "resolved_task"
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

  render() {
    const rowSelection = {
      onChange: this.onSelectChange,
    };
    const { allCategoriesData } = this.props;
    const {
      UsersData,
      pageCount,
      open_task,
      active_task,
      completed_task,
      resolved_task,
      cancelled_task,
      task_without_bid,
      urgent_task,
      created_by_business,
      created_by_freelancer,
      category,
      sub_category,
      city,
      date,
      task_budget
    } = this.state;
    const { rowStyle, colStyle } = basicStyle;
    const newData = [...this.state.selectedRows];
    // const newData = this.state.selectedRows.filter(
    //   (x) => UsersData.filter((i) => i.task_id === x.task_id)[0]
    // );
    const fileTypes = this.state.filextention === "CSV" ? ".csv" : ".xlsx";

    const headers = [
      { label: "Task ID", key: "task_id" },
      { label: "Task Name", key: "task_title" },
      { label: "Category", key: "category" },
      { label: "Sub Category", key: "sub_category" },
      { label: "Employer", key: "employer" },
      { label: "Specialist", key: "specialist" },
      { label: "Date", key: "date" },
    ];

    const dataOfExel = newData.map((item) => ({
      Task_ID: item.task_id,
      Name: item.task_title,
      Category: item.category,
      Sub_category: item.sub_category,
      Employer: item.Employer || "--",
      Specialist: item.Specialist || "--",
      Date: item.date,
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
        render: (object) => renderCell(object, "TextCell", "task_id"),
        sorter: (a, b) => a.task_id - b.task_id,
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
        render: (object) => renderCell(object, "TextCell", "category"),
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
        render: (object) => renderCell(object, "TextCell", "sub_category"),
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
        render: (object) => renderCell(object, "TextCell", "task_title"),
        sorter: (a, b) =>
          a.task_title && a.task_title.localeCompare(b.task_title),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.Employer" />
            <SortIconBtn />
          </Space>
        ),
        key: "employer",
        width: 500,
        render: (object) => renderCell(object, "TextCell", "Employer"),
        sorter: (a, b) => a.Employer && a.Employer.localeCompare(b.Employer),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.Specialist" />
            <SortIconBtn />
          </Space>
        ),
        key: "specialist",
        width: 500,
        render: (object) => renderCell(object, "TextCell", "Specialist"),
        sorter: (a, b) =>
          a.Specialist && a.Specialist.localeCompare(b.Specialist),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.Status" />
            <SortIconBtn />
          </Space>
        ),
        key: "status",
        width: 500,
        render: (object) => this.handleStatusColor(object.status),
        sorter: (a, b) => a.status && a.status.localeCompare(b.status),
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
        sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false ,
        render: (object, record) => {
          return {
            children: <span>{object.date}</span>,
          };
        },
      },
      {
        key: "actions-view",
        width: 200,
        render: (object) => (
          <Row>
            <Col>
              <Link to={`/admin/alltasks/tasks/${object.task_id}/`}>
                <Button
                  onClick={() => this.handleViewUserDetailes(object.task_id)}
                  style={{
                    color: "#758287",
                    borderColor: "#758287",
                  }}
                  className="view-btn"
                >
                  <IntlMessages id="View" />
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
          <Title level={2}><IntlMessages id="sidebar.alltasks.tasks" /></Title>

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
                    onClick={() => ExportCSV(dataOfExel, "Task", fileTypes)}
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
                      <div style={{width: 700}} className="filter-wrapper">
                        <span><IntlMessages id="task_status" /></span>
                        <Row key={1} className="message-filter">
                          <Col
                            md={4}
                            lg={4}
                            sm={12}
                            xs={24}
                            className="check-open"
                          >
                            <Checkbox
                              value={open_task}
                              checked={open_task && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "open_task")
                              }
                            >
                              <IntlMessages id="open" />
                            </Checkbox>
                          </Col>
                          <Col
                            md={4}
                            lg={4}
                            sm={12}
                            xs={24}
                            className="check-active"
                          >
                            <Checkbox
                              value={active_task}
                              checked={active_task && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "active_task")
                              }
                            >
                              <IntlMessages id="active" />
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
                              value={completed_task}
                              checked={completed_task && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "completed_task")
                              }
                            >
                              <IntlMessages id="completed" />
                            </Checkbox>
                          </Col>
                          <Col
                            md={5}
                            lg={5}
                            sm={12}
                            xs={24}
                            className="check-cancel"
                          >
                            <Checkbox
                              value={cancelled_task}
                              checked={cancelled_task && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "cancelled_task")
                              }
                            >
                              <IntlMessages id="Cancelled" />
                            </Checkbox>
                          </Col>
                          <Col
                            md={5}
                            lg={5}
                            sm={12}
                            xs={24}
                            className="check-cancel"
                          >
                            <Checkbox
                              value={resolved_task}
                              checked={resolved_task && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "resolved_task")
                              }
                            >
                              Resolved
                            </Checkbox>
                          </Col>
                        </Row>
                        <Divider />
                        <Row key={1} className="catagory-wrapper">
                          <Col
                            md={12}
                            lg={12}
                            sm={12}
                            xs={24}
                            style={{ padding: "0 0px" }}
                          >
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
                          <Col
                            md={12}
                            lg={12}
                            sm={12}
                            xs={24}
                            style={{ padding: "0 0px" }}
                          >
                            <FormItem label={"Sub-Category"}>
                              <div className="custom">
                              <Select
                                value={sub_category}
                                mode="multiple"
                                style={{
                                  width: '100%',
                                }}
                                placeholder="Select"
                                allowClear
                                name="sub_category"
                                className="exportSelectInput filter-category"
                                onChange={(e) =>
                                  this.handleFilter(e, "sub_category")
                                }
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
                              label={"City"}
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
                                  onChange={(e) =>
                                    this.handleFilter(e, "task_budget")
                                  }
                                  value={task_budget}
                                  className="exportSelectInput filter-category"
                                  optionLabelProp="label"
                                  // getPopupContainer={() => inputField.current}
                                >
                                  <SelectOption value="10-50">
                                    10Kr - 50Kr
                                  </SelectOption>
                                  <SelectOption value="50-100">
                                    50Kr - 100Kr
                                  </SelectOption>
                                  <SelectOption value="100-150">
                                    100Kr - 150Kr
                                  </SelectOption>
                                  <SelectOption value="150-200">
                                    150Kr - 200Kr
                                  </SelectOption>
                                  <SelectOption value="200-250">
                                    200Kr - 250Kr
                                  </SelectOption>
                                </Select>
                              </div>
                            </FormItem>

                            {/* <FormItem
                              label={"Task Budget"}
                              className="filter-catagory-space"
                            >
                              <Select
                                value={this?.state?.filextention}
                                className="exportSelectInput filter-category"
                                onChange={this.handleChangeForSelect}
                                placeholder="Select"
                              >
                                {["Excel", "CSV"].map((item, index) => (
                                  <SelectOption key={index} value={item}>
                                    {item}
                                  </SelectOption>
                                ))}
                              </Select>
                            </FormItem> */}
                          </Col>
                        </Row>
                        <Divider />
                        <span><IntlMessages id="showTask" /></span>
                        <Row key={1} className="message-filter">
                          <Col
                            md={8}
                            lg={6}
                            sm={12}
                            xs={24}
                            className="task-no-bid"
                          >
                            <Checkbox
                              value={task_without_bid}
                              checked={task_without_bid && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "task_without_bid")
                              }
                            >
                              <IntlMessages id="taskWithNoBids" />
                            </Checkbox>
                          </Col>
                          <Col
                            md={8}
                            lg={5}
                            sm={12}
                            xs={24}
                            className="urgent-task"
                          >
                            <Checkbox
                              value={urgent_task}
                              checked={urgent_task && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "urgent_task")
                              }
                            >
                              <IntlMessages id="urgenyTask" />
                            </Checkbox>
                          </Col>
                          <Col
                            md={8}
                            lg={8}
                            sm={12}
                            xs={24}
                            className="business-task"
                          >
                            <Checkbox
                              value={created_by_business}
                              checked={created_by_business && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "created_by_business")
                              }
                            >
                              <IntlMessages id="createdByBusines" />
                            </Checkbox>
                          </Col>
                          <Col
                            md={8}
                            lg={8}
                            sm={12}
                            xs={24}
                            className="freelance-task"
                          >
                            <Checkbox
                              value={created_by_freelancer}
                              checked={created_by_freelancer && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "created_by_freelancer")
                              }
                            >
                              <IntlMessages id="createdByFreelincer" />
                            </Checkbox>
                          </Col>
                        </Row>
                        <Divider />
                        <span><IntlMessages id="antTable.title.Date" /></span>
                        <Row key={1} className="date-wrapper">
                          <Col lg={24} sm={24} xs={24} xl={24}>
                            <RangePicker
                              size="large"
                              format={dateFormatList}
                              name="date"
                              value={date}
                              style={{height:"35px"}}
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
  taskData: state.AdminTask.viewTaskData,
  allCategoriesData: state.Categories.allCategoriesData,
});

const mapDispatchToProps = {
  viewTask,
  getCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Task));
