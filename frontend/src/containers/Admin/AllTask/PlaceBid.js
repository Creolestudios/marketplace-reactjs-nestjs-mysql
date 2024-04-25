import React, { Component } from "react";
import moment from "moment";
import { ReactComponent as SortIconBtn } from "@iso/assets/images/icon/sort-icon-whole.svg";
import { renderCell } from "@iso/components/Tables/AntTables/configs";
import { connect } from "react-redux";
import { Row, Col, Typography, Divider, Space } from "antd";
import HeaderBreadCrumb, {
  DisabledLinkText,
} from "@iso/components/utility/headerBreadCrumb";
import { TableViews } from "@iso/components/Tables/AntTables";

import IsoWidgetsWrapper from "@iso/containers/Global/Common/WidgetsWrapper";
import IsoWidgetBox from "@iso/containers/Global/Common/WidgetBox";
import basicStyle from "@iso/assets/styles/constants";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import IntlMessages from "@iso/components/utility/intlMessages";
import { Link, withRouter } from "react-router-dom";
import taskAdminAction from "@iso/redux/admin/tasks/actions";
const { Title } = Typography;
const { viewPlaceBid } = taskAdminAction;
class PlaceBid extends Component {
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

      UsersData: [],
      pageCount: 0,
    };
  }
  componentDidMount() {
    let param = {
      task_id:
        this.props.match &&
        this.props.match.params &&
        this.props.match.params.taskid &&
        parseInt(this.props.match.params.taskid),
      page: this.state.page,
      limit: this.state.limit,
    };
    this.props.viewPlaceBid(param);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.placeBidData !== this.props.placeBidData) {
      let data = [];
      this.props.placeBidData &&
        this.props.placeBidData.allBids &&
        this.props.placeBidData.allBids.map((item) =>
          data.push({
            specialistId: item.user_id,
            key: item.bid_id,
            SpecialistName: item.user_name,
            Bid: item.bid,
            IntroductionMessage: item.bid_message,
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

  handleChange = (pagination) => {
    this.setState({
      page: pagination.current,
      limit: pagination.pageSize,
      keys: pagination.pageSize,
    });
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

  handleSearch = (e) => {
    this.setState({ search: e.target.value, page: 1 });
  };

  render() {
    const rowSelection = {
      onChange: this.onSelectChange,
    };
    const { UsersData, pageCount } = this.state;
    const { placeBidData } = this.props;
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
      UserID: item.task_id,
      Name: item.name,
      Partner: item.partner || "--",
      Email: item.email,
      InstallDate: moment(item.date).format("MMM D, 'YY - h:mma"),
    }));

    const UsersDataColumns = [
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.SpecialistName" />
            <SortIconBtn />
          </Space>
        ),
        key: "SpecialistName",
        width: 200,
        render: (object) => (
          
          <span
            style={{
              color: "#2AABE1",
              fontWeight: 700,
              cursor: "pointer",
            }}
            onClick={() =>
              this.props.history.push(
                `/admin/users/view-user/${object.specialistId}`
              )
            }
          >
            {object.SpecialistName}
          </span>
        ),
        sorter: (a, b) =>
          a.SpecialistName && a.SpecialistName.localeCompare(b.SpecialistName),
        sortDirections: ["ascend", "descend", "ascend"],
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.Bid" />
            <SortIconBtn />
          </Space>
        ),
        key: "Bid",
        width: 500,
        render: (object) => renderCell(object, "TextCell", "Bid"),
        sorter: (a, b) => a.Bid - b.Bid,
        sortDirections: ["ascend", "descend", "ascend"],

        // title: <IntlMessages id="antTable.title.Bid" />,
        // key: "Bid",
        // width: 500,
        // render: (object) => (
        //   <span
        //     style={{
        //       color: "#423F3F",
        //       fontWeight: 700,
        //     }}
        //   >
        //     {object.Bid}
        //   </span>
        // ),
        // sorter: false,
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
      {
        title: () => (
          <Space>
            <IntlMessages id="antTable.title.IntroductionMessage" />
            <SortIconBtn />
          </Space>
        ),
        key: "IntroductionMessage",
        width: 500,
        render: (object) =>
          renderCell(object, "TextCell", "IntroductionMessage"),
        sorter: (a, b) =>
          a.IntroductionMessage &&
          a.IntroductionMessage.localeCompare(b.IntroductionMessage),
        sortDirections: ["ascend", "descend", "ascend"],

        // title: <IntlMessages id="antTable.title.IntroductionMessage" />,
        // key: "IntroductionMessage",
        // width: 500,
        // render: (object) => (
        //   <p
        //     style={{
        //       wordBreak: "break-word",
        //       whiteSpace: "break-spaces",
        //     }}
        //   >
        //     {object.IntroductionMessage}
        //   </p>
        // ),
        // sorter: false,
       showSorterTooltip: window.screen.width > 768 ? true : false 
      },
    ];

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
            {(this.props?.match?.path).includes("/alltasks/reported-tasks/") ? (
              <>
                <DisabledLinkText to={`/admin/alltasks/reported-tasks`}>
                <IntlMessages id="sidebar.alltasks.reportedTasks" />
                </DisabledLinkText>
                <DisabledLinkText
                  to={`/admin/alltasks/reported-tasks/${this.props?.match?.params?.taskid}`}
                >
                  {placeBidData && placeBidData.task && placeBidData.task.title}
                </DisabledLinkText>
              </>
            ) : (
              <>
                <DisabledLinkText to={`/admin/alltasks/tasks`}>
                <IntlMessages id="sidebar.alltasks.tasks" />
                </DisabledLinkText>
                <DisabledLinkText
                  to={`/admin/alltasks/tasks/${this.props?.match?.params?.taskid}`}
                >
                  {placeBidData && placeBidData.task && placeBidData.task.title}
                </DisabledLinkText>
              </>
            )}
            <Title level={2}><IntlMessages id="placeBids" /></Title>
          </HeaderBreadCrumb>

          <LayoutContent>
            <Row gutter={0} justify="start">
              <Col lg={24} md={24} sm={24} xs={24}>
                <IsoWidgetsWrapper className="commonWidgetBox">
                  <IsoWidgetBox>
                    {/* TABLE */}
                    <TableViews.SimpleView
                      isSelection={false}
                      columns={UsersDataColumns}
                      dataSource={UsersData}
                      // rowSelection={rowSelection}
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
  placeBidData: state.AdminTask.placeBidData,
});

const mapDispatchToProps = {
  viewPlaceBid,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(PlaceBid));
