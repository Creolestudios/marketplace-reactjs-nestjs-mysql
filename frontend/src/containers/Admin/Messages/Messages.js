import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { cloneDeep, merge, keyBy, values } from "lodash";
import { ReactComponent as SortIconBtn } from "@iso/assets/images/icon/sort-icon-whole.svg";
import {
  Row,
  Col,
  Form,
  Typography,
  Space,
  message,
  Divider,
  List,
  Popover,
  Avatar,
  Alert,
} from "antd";
import {
  MsgText,
  Msg,
  MsgCount,
  Img,
  Name,
  PdfElement,
  Nodata,
  MsgBox,
  Time,
  ChatSidebar
} from "./style";
import Select, { SelectOption } from "@iso/components/uielements/select";
import InfiniteScroll from "react-infinite-scroll-component";
import ViewBtn from "@iso/assets/images/icon/view-btn.svg";
import { TableViews, dataList } from "@iso/components/Tables/AntTables";
import Modal from "@iso/components/uielements/modal";
import { ArrowRightOutlined } from "@ant-design/icons";
import Box from "@iso/components/utility/box";
import { isEmpty } from "lodash";
import Checkbox, { CheckboxGroup } from "@iso/components/uielements/checkbox";
import examplePic from "@iso/assets/images/bio-profile-image.png";

import DocumentImg from "@iso/assets/images/Docs.svg";
import ChatImgIcon from "@iso/assets/images/chat-Image-icon.svg";
import Input from "@iso/components/uielements/input";
import Button from "@iso/components/uielements/button";
import IsoWidgetsWrapper from "@iso/containers/Global/Common/WidgetsWrapper";
import IsoWidgetBox from "@iso/containers/Global/Common/WidgetBox";
import basicStyle from "@iso/assets/styles/constants";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import LayoutContent from "@iso/components/utility/layoutContent";
import LayoutHeaderActionWrapper from "@iso/components/utility/layoutHeaderActionWrapper";
import LayoutHeaderWrapper from "@iso/components/utility/layoutHeaderWrapper";
import IntlMessages from "@iso/components/utility/intlMessages";
import { renderCell } from "@iso/components/Tables/AntTables/configs";
import { Link, withRouter } from "react-router-dom";
import Datepicker from "@iso/components/uielements/datePicker";
import userpic from "@iso/assets/images/avatar.png";
import singleTick from "@iso/assets/images/icon/icons_check.svg";
import doubleTick from "@iso/assets/images/icon/icons_double-check.svg";
import {
  PaperClipOutlined,
  SendOutlined,
  CloseCircleOutlined,
  FilePdfOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { ExportCSV } from "../ExportCSV";
import jwt_decode from "jwt-decode";
import { socket } from "../../..//socket";
import categoryAction from "@iso/redux/categoriesAndServices/actions";
import chatAction from "@iso/redux/chat/actions";
const { chatListingAdminHistory, mediaHistory, deleteChatData, chatHistory } =
  chatAction;
const { getCategories } = categoryAction;
const { RangePicker } = Datepicker;
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
const FormItem = Form.Item;

const { Title } = Typography;
const token =
  localStorage.getItem("id_token") || sessionStorage.getItem("id_token");
const { user_id } = token ? jwt_decode(token) : {};
let chatDayDiff = 0;
let chatDayDiffPrev = 0;
class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,

      limit: 10,
      sortedInfo: null,
      selectedRows: [],
      filextention: "Excel",
      visible: false,
      show: false,

      open_task: 0,
      active_task: 0,
      completed_task: 0,
      cancelled_task: 0,
      reported_task: 0,
      category: null,
      sub_category: [],
      start_date: "",
      end_date: "",
      date: "",
      search: "",

      activeData: {},
      chatHistoryData: [],
      totalData: 0,
      usersChat: [],
      isModalVisible: false,
      isClick: false,
      visible: false,
      mediaImages: [],
      mediaImagesView: [],
      alertError: [],
      isLoading: false,
      limit: 10,
      page: 1,
      mediaLimit: 10,
      mediaPage: 1,
      attachementData: [],
      attachmentTotal: 0,
      modalVisible: false,
      modalImage: null
    };
  }
  componentDidMount() {
    this.props.getCategories();
    this.getChatListing();
    socket.on("msgToClient", (messageRes) => {
      let chat = [{ ...messageRes.data }, ...this.state.usersChat];
      this.setState({
        usersChat:
          this.state.activeData &&
          this.state.activeData.room_id === messageRes.data.room_id
            ? chat
            : this.state.usersChat,
        message: "",
        messageView: "",
        mediaImages: [],
        mediaImagesView: [],
      });
      this.getChatListing();
    });
    socket.on("msgToClientError", (message) => {
      console.log("admin msg error", message);
    });
    socket.on("readMsgToClient", (message) => {
      this.getChatListing();
      // this.getChat();
    });
    socket.on("readMsgToClientError", (message) => {
      console.log("admin msg read error", message);
    });
  }
  componentDidUpdate(prevProps) {
    const { chatData, chatMessages, deleteChatRes, chatMedia } = this.props;

    if (prevProps.chatData !== chatData) {
      let active =
        chatData &&
        chatData.chatData &&
        chatData.chatData.find(
          (data) =>
            data.room_id ===
            (this.props?.match?.params?.roomId &&
              parseInt(this.props.match.params.roomId))
        );
      this.setState(
        {
          chatHistoryData: chatData && chatData.chatData,
          activeData: active
            ? active
            : chatData && chatData.chatData && chatData.chatData[0]
            ? chatData.chatData[0]
            : {},
        },
        () => {
          !(chatData && chatData.chatData.length === 0) && this.getChat();

          this.state.activeData !== undefined &&
            Object.values(this.state.activeData).length !== 0 &&
            this.state.activeData &&
            this.state.activeData.unreadCount > 0 &&
            this.readChat(
              [],
              this.state.activeData && this.state.activeData.room_id,
              true
            );
        }
      );
    }
    if (prevProps.chatMessages !== chatMessages) {
      let chat = merge(
        keyBy(chatMessages && chatMessages.chat, "message_id"),
        keyBy(this.state.usersChat, "message_id")
      );
      // Object.assign(this.state.usersChat, chatMessages && chatMessages.chat);
      this.setState({
        usersChat: values(chat).reverse(),
        totalData: chatMessages && chatMessages.totalData,
        // alertError:
        //   chatMessages &&
        //   chatMessages.room_status &&
        //   !chatMessages.room_status.active
        //     ? [chatMessages.room_status.message]
        //     : [],
      });
    }
    if (prevProps.chatMedia !== chatMedia) {
      let dat = [
        ...this.state.attachementData,
        ...(chatMedia && chatMedia.attachments),
      ];
      // merge(
      //   keyBy(chatMedia && chatMedia.attachments, "message_id"),
      //   keyBy(this.state.attachementData, "message_id")
      // );
      // Object.assign(
      //   chatMedia && chatMedia.attachments,
      //   this.state.attachementData
      // );
      this.setState({
        attachementData: dat,
        attachmentTotal: chatMedia && chatMedia.totalData,
      });
    }
    if (prevProps.deleteChatRes !== deleteChatRes) {
      this.getChatListing();
      this.setState({
        isModalVisible: false,
        page: 1,
        activeData: {},
        usersChat: [],
      });
    }
  }
  getChatListing = () => {
    const {
      open_task,
      active_task,
      completed_task,
      cancelled_task,
      reported_task,
      category,
      sub_category,
      start_date,
      end_date,
      search,
      page,
      limit,
    } = this.state;
    let param = {
      open_task,
      active_task,
      completed_task,
      cancelled_task,
      reported_task,
      category,
      sub_category,
      start_date,
      end_date,
      search,
      page,
      limit,
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
    this.props.chatListingAdminHistory(param);
  };
  getChat = () => {
    const { limit, activeData, page } = this.state;
    let param = {
      room_id: activeData && activeData.room_id,
      page: page,
      limit: limit,
    };
    this.props.chatHistory(param);
    this.setState({ page: page + 1 });
  };
  readChat = (chat_id, room_id, read_all) => {
    let param = {
      chat_id,
      room_id,
      read_all,
    };
    socket.emit("readMsgToServer", param);
  };
  handleSearch = (e) => {
    if (e.target.value.length <= 50) {
      this.setState({ search: e.target.value, page: 1 });
    }
  };
  showDrawer = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };
  callMedia = () => {
    this.props.mediaHistory({
      room_id: this.state.activeData.room_id,
      limit: 10,
      page: this.state.mediaPage,
    });
  };

  deleteChat = () => {
    const { activeData, chat_type } = this.state;
    this.props.deleteChatData({
      room_id: activeData && activeData.room_id,
      room_status: chat_type === 1 ? 1 : 2,
    });
  };

  sentMsg = () => {
    const { activeData, mediaImages, message } = this.state;

    const messageData = {
      files: mediaImages ? mediaImages : null,
      message: message,
      room_id: activeData.room_id,
      receiver_id:
        user_id !== activeData.sender_id
          ? activeData.sender_id
          : activeData.receiver_id && activeData.receiver_id[0],
      task_id: activeData.task.id,
    };
    if (message !== undefined || mediaImages.length !== 0) {
      socket.emit("msgToServer", messageData);
    } else {
      this.setState({ alertError: ["Please write something to chat"] });
    }
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible: !this.state.visible });
  };
  handleShow = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  handleFilter = (e, name) => {
    if (
      name === "open_task" ||
      name === "active_task" ||
      name === "completed_task" ||
      name === "cancelled_task" ||
      name === "reported_task"
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
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  handleFilterSubmit = () => {
    this.getChatListing();
    this.setState({
      show: !this.state.show,
      usersChat: [],
      page: 1,
      activeData: {},
    });
  };

  handleReset = () => {
    this.setState(
      {
        open_task: 0,
        active_task: 0,
        completed_task: 0,
        cancelled_task: 0,
        reported_task: 0,
        category: "",
        sub_category: [],
        start_date: "",
        search: "",
        end_date: "",
        date: "",
        show: !this.state.show,
      },
      () => this.getChatListing()
    );
  };
  handleClickforDocs = (e) => {
    let images = [...this.state.mediaImages];
    let imagesView = [...this.state.mediaImagesView];
    this.setState({ alertError: [] }); // to remove already showed error message
    if (Object.values(e.target.files).length < 10 && images.length < 10) {
      Object.values(e.target.files).map((dat) => {
        if (
          [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "application/pdf",
            "application/doc",
            "application/xls",
            "application/mp4",
          ].includes(dat.type) &&
          dat.size / 1024 / 1024 < 2
        ) {
          imagesView.push(dat);
          var file = dat;
          var reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onloadend = function (e) {
            images.push({
              fileBuffer: new Blob([new Uint8Array(reader.result)], {
                type: dat.type,
              }),
              fileName: dat.name,
              fileMime: dat.type,
            });
          }.bind(this);
        } else if (
          [
            "video/quicktime",
            "video/x-quicktime",
            "image/mov",
            "audio/aiff",
            "audio/x-midi",
            "audio/x-wav",
            "video/avi",
            "video/mp4",
            "application/mp4",
          ].includes(dat.type) &&
          dat.size / 1024 / 1024 < 5
        ) {
          imagesView.push(dat);
          var file = dat;
          var reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onloadend = function (e) {
            images.push({
              fileBuffer: new Blob([new Uint8Array(reader.result)], {
                type: dat.type,
              }),
              fileName: dat.name,
              fileMime: dat.type,
            });
          }.bind(this);
        } else {
          let msg = [...this.state.alertError];
          msg.push(`file named ${dat.name}`);
          this.setState({
            alertError: msg,
          });
        }
      });
    }

    this.setState({ mediaImages: images, mediaImagesView: imagesView });
  };
  changeChat = (data) => {
    chatDayDiff = 0;
    chatDayDiffPrev = 0;
    this.setState(
      {
        activeData: data,
        usersChat: [],
        message: "",
        page: 1,
        attachementData: [],
        attachmentTotal: 0,
        visible: false,
      },
      () => {
        // this.props.history.replace(`/client/inbox/${data.room_id}`);
        this.getChat();
        this.state.activeData !== undefined &&
          Object.values(this.state.activeData).length !== 0 &&
          this.state.activeData &&
          this.state.activeData.unreadCount > 0 &&
          this.readChat(
            [],
            this.state.activeData && this.state.activeData.room_id,
            true
          );
      }
    );
  };
  removeImage = (index) => {
    const { mediaImages, mediaImagesView } = this.state;
    let image = [...mediaImages];
    let imageView = [...mediaImagesView];
    image.splice(index, 1);
    imageView.splice(index, 1);
    this.setState({ mediaImages: image, mediaImagesView: imageView });
  };

  typeMsg = (e) => {
    if (e.target.value.length < 600) {
      const chatMessage = e.target.value.split(" ");
      // for (let i = 0; i < chatMessage.length; i++) {
      //   const msg = chatMessage[i];
      //   const mask = msg.substring(0, msg.length).replace(/./g, "*");
      //   if (msg.length >= 7) {
      //     chatMessage.splice(i, 1, mask);
      //   } else if (msg.includes("@") || msg.includes("www")) {
      //     chatMessage.splice(i, 1, mask);
      //   } else if (/(http(s?)):\/\//i.test(msg)) {
      //     chatMessage.splice(i, 1, mask);
      //   }
      // }
      this.setState({
        message: e.target.value,
        messageView: chatMessage.join(" "),

        alertError: [],
      }); // to remove already showed error message
    } else {
      this.setState({
        alertError: ["Length of message should not be greter than 600"],
      });
    }
  };
  render() {
    const {
      usersChat,
      activeData,
      visible,
      show,
      message,
      open_task,
      active_task,
      completed_task,
      reported_task,
      cancelled_task,
      category,
      sub_category,
      date,
      totalData,
      alertError,
      mediaImagesView,
    } = this.state;
    const { chatData, allCategoriesData } = this.props;
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
          <Title level={2}> <IntlMessages id="sidebar.messages"/> </Title>

          <LayoutContent className="isoLayoutHeaderActionWrapper message-layout">
            <Row gutter={20} className="message-search-user topbar-wrapper">
              <Col md={24} xs={24} className="searchUsers">
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
                        style={
                          {
                            // width: 600,
                          }
                        }
                        className="filter-wrapper"
                      >
                        <span><IntlMessages id="task_status" /></span>
                        <Row key={1} className="message-filter task-checkbox">
                          <Col
                            md={6}
                            lg={6}
                            sm={24}
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
                              <IntlMessages id="open"/>
                            </Checkbox>
                          </Col>
                          <Col
                            md={6}
                            lg={6}
                            sm={24}
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
                              <IntlMessages id="active"/>
                            </Checkbox>
                          </Col>
                          <Col
                            md={6}
                            lg={6}
                            sm={24}
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
                              <IntlMessages id="completed"/>
                            </Checkbox>
                          </Col>
                          <Col
                            md={6}
                            lg={6}
                            sm={24}
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
                              <IntlMessages id="Cancelled"/>
                            </Checkbox>
                          </Col>
                          <Col
                            md={6}
                            lg={6}
                            sm={24}
                            xs={24}
                            className="check-report"
                          >
                            <Checkbox
                              value={reported_task}
                              checked={reported_task && 1}
                              onChange={(e) =>
                                this.handleFilter(e, "reported_task")
                              }
                            >
                              <IntlMessages id="Reported"/>
                            </Checkbox>
                          </Col>
                        </Row>
                        <Divider />
                        <Row key={1} className="catagory-wrapper ">
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
                              <div className="custom"> <Select
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
                              </Select></div>
                             
                            </FormItem>
                          </Col>
                        </Row>
                        <Divider />

                        <Row key={1} className="date-wrapper">
                          <Col lg={24} sm={24} xs={24} xl={24}>
                            <p>Date</p>
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
                    </Form>
                  }
                  visible={show}
                  onVisibleChange={this.handleShow}
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
            <Row
              style={{ padding: 30 }}
              gutter={0}
              justify="start"
              // align="top"
              className="message-wrapper"
            >
              <Col lg={9} md={24} sm={24} xs={24} className="messages">
                <ChatSidebar>
                <List
                  size="large"
                  bordered
                  dataSource={chatData && chatData.chatData}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <span>
                          {moment(new Date(item.created)).format("hh:mm A")}{" "}
                          {item.unreadCount !== 0 && (
                            <MsgCount>{item.unreadCount}</MsgCount>
                          )}
                        </span>,
                      ]}
                      onClick={() => this.changeChat(item)}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar.Group>
                            <Avatar
                              src={
                                item.users &&
                                item.users[0] &&
                                item.users[0].profile_photo
                                  ? item.users[0].profile_photo
                                  : userpic
                              }
                            />
                            <Avatar
                              src={
                                item.users &&
                                item.users[1] &&
                                item.users[1].profile_photo
                                  ? item.users[1].profile_photo
                                  : userpic
                              }
                            />
                          </Avatar.Group>
                        }
                        title={
                          <a href="#">
                            {item.users &&
                              item.users[0] &&
                              item.users[0].full_name}{" "}
                            -{" "}
                            {item.users &&
                              item.users[1] &&
                              item.users[1].full_name}
                          </a>
                        }
                        description={item.message}
                      />
                    </List.Item>
                  )}
                />
                </ChatSidebar>
              </Col>
              <Col lg={15} md={24} sm={24} xs={24} className="messagebox">
                {Object.values(activeData).length !== 0 ? (
                  <>
                    <MsgBox>
                      <Box
                        className="msg-title"
                        backGColor={"#FFFFFF"}
                        title={
                          <div>
                            {" "}
                            <Avatar.Group>
                              <Avatar
                                src={
                                  activeData &&
                                  activeData.users &&
                                  activeData.users[0] &&
                                  activeData.users[0].profile_photo
                                    ? activeData.users[0].profile_photo
                                    : userpic
                                }
                              />
                              <Avatar
                                src={
                                  activeData &&
                                  activeData.users &&
                                  activeData.users[1] &&
                                  activeData.users[1].profile_photo
                                    ? activeData.users[1].profile_photo
                                    : userpic
                                }
                              />
                              <h3>
                                {activeData &&
                                  activeData.users &&
                                  activeData.users[0].full_name}{" "}
                                -{" "}
                                {activeData &&
                                  activeData.users &&
                                  activeData.users[1].full_name}
                              </h3>
                              {/* <p>(Employer)</p> */}
                            </Avatar.Group>
                          </div>
                        }
                        renderChildren={
                          <p style={{ fontWeight: 700, color: "#423F3F" }}>
                            <IntlMessages id="bid"/> -{" "}
                            {activeData &&
                              activeData.bid_details &&
                              activeData.bid_details.bid_amount}{" "}
                            Kr
                          </p>
                        }
                        footer={
                          <Row>
                            <Col
                              xxl={24}
                              xl={24}
                              lg={24}
                              sm={24}
                              xs={24}
                              className="message-type-box"
                            >
                              {alertError.length !== 0 &&
                                alertError.map((data) => (
                                  <Alert
                                    style={{ borderRadius: "40px" }}
                                    message={data}
                                    type="warning"
                                    showIcon
                                  />
                                ))}
                              {mediaImagesView.map((data, index) =>
                                data.type.split("/")[0] === "image" ? (
                                  <div>
                                    <img src={URL.createObjectURL(data)} />
                                    <CloseCircleOutlined
                                      onClick={() => this.removeImage(index)}
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <PdfElement>
                                      <FilePdfOutlined />
                                      <span>{data.name}</span>
                                    </PdfElement>
                                    <CloseCircleOutlined
                                      onClick={() => this.removeImage(index)}
                                    />
                                  </div>
                                )
                              )}
                              <Input
                                size="large"
                                placeholder="Type Here"
                                value={message}
                                onChange={(e) => this.typeMsg(e)}
                                suffix={
                                  <>
                                    {/* <Popover
                                trigger="click"
                                content={
                                  <div
                                    style={{
                                      width: 150,
                                      height: 80,
                                    }}
                                  >
                                    <p style={{ padding: 7 }}>
                                      <label style={{ cursor: "pointer" }}>
                                        <PictureOutlined />
                                        <img
                                          src={ChatImgIcon}
                                          style={{
                                            width: 20,
                                            paddingBottom: 2,
                                          }}
                                        />

                                        <span
                                          style={{
                                            padding: 25,
                                            fontSize: 18,
                                            color: "black",
                                          }}
                                        >
                                          Image
                                        </span>
                                        <input
                                          type="file"
                                          accept="image/png, image/jpeg"
                                          onChange={this.handleClickforimage}
                                          style={{
                                            width: 0,
                                            display: "contents",
                                          }}
                                        />
                                      </label>
                                    </p>
                                    <p style={{ padding: 7 }}>
                                      <label style={{ cursor: "pointer" }}>
                                        <img
                                          src={DocumentImg}
                                          style={{
                                            width: 20,

                                            marginRight: 17,
                                            paddingBottom: 5,
                                          }}
                                        />
                                        <span
                                          style={{
                                            padding: 7,
                                            fontSize: 18,
                                            color: "black",
                                          }}
                                        >
                                          Document
                                        </span>
                                        <input
                                          type="file"
                                          accept="application/pdf"
                                          // accept="application/pdf,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                          onChange={this.handleClickforDocs}
                                          style={{
                                            width: 0,
                                            display: "contents",
                                          }}
                                        />
                                      </label>
                                    </p>
                                  </div>
                                }
                                visible={visible}
                                onVisibleChange={this.handleVisibleChange}
                              >
                                <PaperClipOutlined
                                  rotate={135}
                                  style={{ fontSize: 20, color: "gray" }}
                                />
                              </Popover> */}
                                    <label
                                      style={{
                                        cursor: "pointer",
                                        // width: 30,
                                        // height: 30,
                                      }}
                                      className="myAccontButton"
                                    >
                                      {/* <PaperClipOutlined
                                        rotate={135}
                                        style={{ fontSize: 20, color: "gray" }}
                                      /> */}
                                      <input
                                        type={
                                          activeData.task?.task_status !== 1
                                            ? "file"
                                            : ""
                                        }
                                        multiple
                                        onClick={() =>
                                          activeData.task?.task_status === 1 &&
                                          this.setState({
                                            alertError: [
                                              "No attachment can be sent because task status is open",
                                            ],
                                          })
                                        }
                                        style={{
                                          width: 0,
                                          display: "none",
                                        }}
                                      />
                                    </label>
                                    <Button
                                      style={{
                                        width: "44px",
                                        height: "100%",
                                        float: "right",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 0 0 10px",
                                        background: "#FCAE1D",
                                        border: "none",
                                        color: "#FFFFFF",
                                      }}
                                      icon={<SendOutlined />}
                                      onClick={this.sentMsg}
                                    ></Button>
                                  </>
                                }
                              />
                            </Col>
                          </Row>
                        }
                      >
                        {/* <div
                    className="customScrollBarForChat"
                      style={{
                        height: 300,
                        overflowY: "scroll",
                      }}
                  > */}
                        <Link
                          to={`/admin/alltasks/tasks/${
                            activeData.task && activeData.task.id
                          }`}
                        >
                          <Divider className="header-divider">
                            {activeData.task && activeData.task.title
                              ? activeData.task.title
                              : ""}
                          </Divider>
                        </Link>
                        {/* <div key={8}>
                      <Row
                        gutter={[0, 24]}
                        style={{
                          justifyContent: "flex-end",
                        }}
                        key={7}
                      > */}
                        <div
                          id="scrollableDiv"
                          style={{
                            height: 300,
                            overflow: "auto",
                            display: "flex",
                            flexDirection: "column-reverse",
                          }}
                        >
                          <InfiniteScroll
                            dataLength={usersChat.length} //This is important field to render the next data
                            next={this.getChat}
                            style={{
                              overflow: "initial",
                              display: "flex",
                              flexDirection: "column-reverse",
                            }} //To put endMessage and loader to the top.
                            inverse={true}
                            hasMore={
                              usersChat.length < totalData ? true : false
                            }
                            loader={<h4>Loading...</h4>}
                            scrollableTarget="scrollableDiv"
                          >
                            {usersChat.map((data, index, arr) => {
                              let det = arr[index - 1];
                              let prevDate =
                                det &&
                                moment(
                                  moment(det.created_at).format("DD-MM-YYYY"),
                                  "DD-MM-YYYY"
                                );

                              let currDate = moment(
                                moment(data.created_at).format("DD-MM-YYYY"),
                                "DD-MM-YYYY"
                              );
                              let preseDate = moment();
                              chatDayDiffPrev =
                                det &&
                                moment(preseDate).diff(
                                  moment(prevDate),
                                  "days"
                                );

                              chatDayDiff =
                                det &&
                                moment(prevDate).diff(moment(currDate), "days");
                              let lastDiff = moment(preseDate).diff(
                                moment(currDate),
                                "days"
                              );
                              return (
                                <>
                                  {chatDayDiff !== 0 && chatDayDiff && (
                                    <Divider className="Msg-content-divider">
                                      {chatDayDiffPrev === 0
                                        ? "Today"
                                        : chatDayDiffPrev === 1
                                        ? "Yesterday"
                                        : moment()
                                            .subtract(chatDayDiffPrev, "days")
                                            .format("DD/MM/YYYY")}
                                    </Divider>
                                  )}
                                  {data.media.length === 0 ? (
                                    <MsgText
                                      className={
                                        user_id ===
                                          (data.sender_data &&
                                            data.sender_data.id) && "right"
                                      }
                                    >
                                      <Name className="name">
                                        {(data.sender_data &&
                                          data.sender_data.id) === user_id
                                          ? "You"
                                          : data.sender_data &&
                                            data.sender_data.full_name}
                                      </Name>
                                      <Msg
                                        className={
                                          user_id ===
                                            (data.sender_data &&
                                              data.sender_data.id) && "msg"
                                        }
                                      >
                                        {data.message}
                                      </Msg>
                                      <Time className="time">
                                        {moment(
                                          new Date(data.created_at)
                                        ).format("hh:mm A")}
                                      </Time>
                                      {user_id ===
                                        (data.sender_data &&
                                          data.sender_data.id) && (
                                        <div className="msg-status">
                                          {data.is_read === 0 ? (
                                            <img src={singleTick} />
                                          ) : (
                                            <img src={doubleTick} />
                                          )}
                                        </div>
                                      )}
                                    </MsgText>
                                  ) : (
                                    <MsgText
                                      className={
                                        user_id ===
                                          (data.sender_data &&
                                            data.sender_data.id) && "right"
                                      }
                                    >
                                      <Name className="name">
                                        {(data.sender_data &&
                                          data.sender_data.id) === user_id
                                          ? "You"
                                          : data.sender_data &&
                                            data.sender_data.full_name}
                                      </Name>
                                      {data.media.map((item) => (
                                        <Img src={item.filename} alt="img" onClick={() => this.setState({
                                          modalVisible:true,
                                          modalImage: item.filename,
                                        })} />
                                      ))}
                                      <Msg
                                        className={
                                          user_id ===
                                            (data.sender_data &&
                                              data.sender_data.id) && "msg"
                                        }
                                      >
                                        {data.message}
                                      </Msg>
                                      <Time className="time">
                                        {moment(
                                          new Date(data.created_at)
                                        ).format("hh:mm A")}
                                      </Time>
                                      {user_id ===
                                        (data.sender_data &&
                                          data.sender_data.id) && (
                                        <div className="msg-status">
                                          {data.is_read === 0 ? (
                                            <img src={singleTick} />
                                          ) : (
                                            <img src={doubleTick} />
                                          )}
                                        </div>
                                      )}
                                    </MsgText>
                                  )}
                                  {index + 1 === totalData && (
                                    <Divider className="Msg-content-divider">
                                      {lastDiff === 0
                                        ? "Today"
                                        : lastDiff === 1
                                        ? "Yesterday"
                                        : moment()
                                            .subtract(lastDiff, "days")
                                            .format("DD/MM/YYYY")}
                                    </Divider>
                                  )}
                                </>
                              );
                            })}
                          </InfiniteScroll>
                        </div>

                        {/* </Row>
                    </div> */}
                        {/* </div> */}
                      </Box>
                    </MsgBox>
                  </>
                ) : (
                  <Nodata>
                    <p><IntlMessages id="noDataFound"/></p>
                  </Nodata>
                )}
              </Col>
            </Row>
          </LayoutContent>
        </LayoutContentWrapper>
        <Modal
        title="Image"
        centered
        visible={this.state.modalVisible}
        onOk={() => this.setState({
          modalVisible:false
         })}
        onCancel={() => this.setState({
          modalVisible:false
         })}
         footer={null}
        width={800}
        bodyStyle={{height: 500}}
      >
        <div style={{display: "flex", justifyContent: "center"}}>
        <Img src={this.state.modalImage} style={{ width: "40vh",
         height: "50vh"}} alt="img"  />
        </div>
     
      </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  chatData: state.Chat.chatDataAdmin,
  chatMessages: state.Chat.chatMessages,
  allCategoriesData: state.Categories.allCategoriesData,
});

const mapDispatchToProps = {
  chatListingAdminHistory,
  mediaHistory,
  deleteChatData,
  chatHistory,
  getCategories,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Messages));
