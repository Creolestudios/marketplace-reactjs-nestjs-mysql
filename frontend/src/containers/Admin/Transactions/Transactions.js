import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { ReactComponent as SortIconBtn } from "@iso/assets/images/icon/sort-icon-whole.svg";
import {
  Row,
  Col,
  Form,
  Typography,
  Space,
  Divider,
  Popover,
  Badge,
} from "antd";
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
import Datepicker from "@iso/components/uielements/datePicker";
import Checkbox, { CheckboxGroup } from "@iso/components/uielements/checkbox";

import { ExportCSV } from "../ExportCSV";
import transactionAdminAction from "@iso/redux/admin/transaction/actions";
const { viewTransaction } = transactionAdminAction;
const FormItem = Form.Item;
const { RangePicker } = Datepicker;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

const { Title } = Typography;

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 10,
      sortedInfo: null,
      selectedRows: [],
      filextention: "Excel",
      visible: false,

      transaction_failure: 0,
      transaction_success: 0,
      start_date: "",
      end_date: "",
      date: "",
      search: "",

      UsersData: [],
      pageCount: 0,
    };
  }

  callTaskApi = () => {
    const {
      transaction_failure,
      transaction_success,
      start_date,
      end_date,
      search,
      page,
      limit,
    } = this.state;
    let param = {
      transaction_failure,
      transaction_success,
      start_date,
      end_date,
      search,
      page,
      limit,
    };
    if (start_date === "") {
      delete param["start_date"];
    }
    if (end_date === "") {
      delete param["end_date"];
    }
    this.props.viewTransaction(param);
  };
  componentDidMount() {
    this.callTaskApi();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.viewTransactionData !== this.props.viewTransactionData) {
      let data = [];

      this.props.viewTransactionData &&
        this.props.viewTransactionData.transactionData &&
        this.props.viewTransactionData.transactionData.map((item) =>
          data.push({
            key: item.id,
            TransID: item.id,
            task_id: item.task_id,
            Sender: item.sender,
            Recipient: item.recipient,
            Amount: item.amount,
            status: item.status === 1 ? "Success" : "Failure",
            date: item.date && moment(item.date).format("YYYY/MM/DD h:mm a"),
            OutstandingAmount: item.outStandingBalance,
          })
        );
      this.setState({
        UsersData: data,
        pageCount: this.props.viewTransactionData
          ? this.props.viewTransactionData.totalData
          : 0,
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

  handleChange = (pagination) => {
    this.setState(
      {
        page: pagination.current,
        limit: pagination.pageSize,
        keys: pagination.pageSize,
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

  handleFilter = (e, name) => {
    if (name === "transaction_failure" || name === "transaction_success") {
      this.setState({ [name]: e.target.value === 0 ? 1 : 0 });
    } else if (name === "date") {
      this.setState({
        start_date: e && e[0] && moment(e[0]).format("YYYY-MM-DD"),
        end_date: e && e[1] && moment(e[1]).format("YYYY-MM-DD"),
        date: e,
      });
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
  handleStatusColor = (status) => {
    return (
      <>
        <div>
          <Badge
            color={status === "Success" ? "#0FD346" : "#ED4C5C"}
            text={status}
          />
        </div>
      </>
    );
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value, page: 1 }, () =>
      this.callTaskApi()
    );
  };

  handleReset = () => {
    this.setState(
      {
        transaction_failure: 0,
        transaction_success: 0,
        start_date: "",
        end_date: "",
        date: "",
        search: "",
        visible: !this.state.visible,
      },
      () => this.callTaskApi()
    );
  };

  render() {
    const rowSelection = {
      onChange: this.onSelectChange,
    };
    const {
      UsersData,
      transaction_failure,
      transaction_success,
      date,
      search,
      page,
      pageCount,
    } = this.state;
    const { rowStyle, colStyle } = basicStyle;

    const newData = [...this.state.selectedRows];
    // const newData = this.state.selectedRows.filter(
    //   (x) => data.filter((i) => i.user_id === x.task_id)[0]
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
      TransID: item.TransID,
      TaskID: item.task_id,
      Sender: item.Sender || "--",
      Recipient: item.Recipient || "--",
      Amount: item.Amount || "--",
      Status: item.status || "--",
      Date: item.date || "--",
      OutstandingAmount: item.OutstandingAmount || "--",
    }));

    const UsersDataColumns = [
      {
        title: () => {
          return (
            <Space>
              <IntlMessages id="antTable.title.TransID" />
              <SortIconBtn />
            </Space>
          );
        },
        key: "TransID",
        width: 500,
        render: (object) => renderCell(object, "TextCell", "TransID"),
        sorter: (a, b) => a.TransID.localeCompare(b.TransID, undefined,{ numeric: true }),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
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
        render: (object) => (
          <span
            style={{
              color: "#2AABE1",
              fontWeight: 700,
              cursor: 'pointer'
            }}
            onClick={() =>
              this.props.history.push(
                `/admin/alltasks/tasks/${object.task_id}/`
              )
            }
          >
            {object.task_id}
          </span>
        ),
         sorter: (a, b) => a.task_id && a.task_id - b.task_id,
       sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.Sender" />
            <SortIconBtn />
          </Space>
        ),
        key: "Sender",
        width: 500,
        render: (object) => renderCell(object, "TextCell", "Sender"),
        sorter: (a, b) => a.Sender && a.Sender.localeCompare(b.Sender),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },

      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.Recipient" />
            <SortIconBtn />
          </Space>
        ),
        key: "Recipient",
        width: 500,
        render: (object) => renderCell(object, "TextCell", "Recipient"),
        sorter: (a, b) => a.Recipient && a.Recipient.localeCompare(b.Recipient),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.Amount" />
            <SortIconBtn />
          </Space>
        ),
        key: "Amount",
        width: 500,
        render: (object) => (
          <span
            style={{
              color: "#423F3F",
              fontWeight: 700,
            }}
          >
            {object.Amount + ' kr'}
          </span>
        ),
        sorter: (a, b) => a.Amount && a.Amount - b.Amount,
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      // {
      //   title: () => (
      //     <Space>
      //       <IntlMessages id="antTable.title.Mode" />
      //       <SortIconBtn />
      //     </Space>
      //   ),
      //   key: "Mode",
      //   width: 500,
      //   render: (object) => renderCell(object, "TextCell", "Mode"),
      //   sorter: (a, b) => a.Mode && a.Mode.localeCompare(b.Mode),
      //   sortDirections: ["ascend", "descend", "ascend"],
      // },
      {
        title: () => (
          <Space style={{width: "70px"}}>
            <IntlMessages id="antTable.title.Status" />
            <SortIconBtn />
          </Space>
        ),
        key: "status",
        width: 700,
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
        sorter: (a, b) =>
          a.date && moment(a.date).unix() - moment(b.date).unix(),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false ,
        render: (object, record) => {
          return {
            children: <span>{moment(object.date).format('DD/MM/YYYY h:mm a')}</span>,
          };
        },
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.OutstandingAmount" />
            <SortIconBtn />
          </Space>
        ),
        key: "OutstandingAmount",
        width: 500,
        //render: (object) => renderCell(object+' kr', "TextCell", "OutstandingAmount"),
        render: (object) => (
          <span
            // style={{
            //   color: "#423F3F",
            //   //fontWeight: 700,
            // }}
          >
            {object.OutstandingAmount? object.OutstandingAmount + ' kr':"--"}
          </span>
        ),
        sorter: (a, b) =>
          a.OutstandingAmount &&
          a.OutstandingAmount - b.OutstandingAmount,
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
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
          <Title level={2}><IntlMessages id="page.title.transactions"/></Title>

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

                <div
                  className="exportBtn"
                  style={{
                    marginRight: "auto",
                  }}
                >
                  <Button
                    type="primary"
                    onClick={() =>
                      ExportCSV(dataOfExel, "Transactions", fileTypes)
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
                    value={search}
                    onChange={this.handleSearch}
                    placeholder="Search here"
                  />
                </FormItem>
                {/* <Datepicker format={dateFormatList} /> */}

                <Popover
                  trigger="click"
                  content={
                    <div
                      style={{
                        width: 600,
                      }}
                      className="filter-wrapper"
                    >
                      {/* <span>Mode</span>
                      <Row key={1} className="message-filter">
                        <Col
                          md={8}
                          lg={7}
                          sm={8}
                          xs={24}
                          className="check-open"
                        >
                          <Checkbox>Credit/Debit Card</Checkbox>
                        </Col>
                        <Col
                          md={16}
                          lg={5}
                          sm={16}
                          xs={24}
                          className="check-active"
                        >
                          <Checkbox>Bank Transfer</Checkbox>
                        </Col>
                      </Row> */}
                      {/* <Divider /> */}

                      <span><IntlMessages id="showTask"/></span>
                      <Row key={1} className="message-filter">
                        <Col
                          md={6}
                          lg={8}
                          sm={8}
                          xs={24}
                          className="check-open"
                        >
                          <Checkbox
                            value={transaction_success}
                            checked={transaction_success && 1}
                            onChange={(e) =>
                              this.handleFilter(e, "transaction_success")
                            }
                          >
                            <IntlMessages id="feedback.alert.successTitle"/>
                          </Checkbox>
                        </Col>
                        <Col
                          md={18}
                          lg={8}
                          sm={16}
                          xs={24}
                          className="check-active"
                        >
                          <Checkbox
                            value={transaction_failure}
                            checked={transaction_failure && 1}
                            onChange={(e) =>
                              this.handleFilter(e, "transaction_failure")
                            }
                          >
                            <IntlMessages id="fail"/>
                          </Checkbox>
                        </Col>
                      </Row>
                      <Divider />
                      <span><IntlMessages id="antTable.title.Date"/></span>
                      <Row key={1} className="date-wrapper">
                        <Col lg={24} sm={24} xs={24} xl={24}>
                          <RangePicker
                            size="large"
                            format={dateFormatList}
                            name="date"
                            value={date}
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
                            <IntlMessages id="apply"/>
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
                            <IntlMessages id="rest"/>
                          </Button>
                        </Col>
                      </Row>
                    </div>
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
                    <IntlMessages id="filter"/>
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
                        current: page,
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
  viewTransactionData: state.AdminTransaction.viewTransactionData,
});

const mapDispatchToProps = {
  viewTransaction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Transactions));
