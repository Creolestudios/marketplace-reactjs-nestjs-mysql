import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { cloneDeep, merge, keyBy, values } from "lodash";
import userpic from "../../../assets/images/avatar.png";
import { Link, withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScroll1 from "react-infinite-scroll-component";
import singleTick from "@iso/assets/images/icon/icons_check.svg";
import doubleTick from "@iso/assets/images/icon/icons_double-check.svg";

import {
  Select,
  Input,
  Divider,
  Form,
  Dropdown,
  Menu,
  Drawer,
  Modal,
  Button,
  Alert,
} from "antd";
import FooterContainer from "@iso/components/Footer";
import {
  PageWrapper,
  PageContainer,
  Content,
  ButtonLink,
  Time,
  PeraGraph,
  FormWrapper,
  DateView,
  MenuLink,
} from "../../../CommonStyle";
import Tab from "@iso/components/Tab";
import {
  Head,
  LeftSide,
  RightSide,
  Area,
  AreaName,
  ContentArea,
} from "../Task/style";
import Header from "@iso/components/Header";
import {
  MsgBox,
  MsgBoxWrapper,
  MsgNameBox,
  InboxWrapper,
  MsgNameHeader,
  MsgContent,
  NameBoxWrapper,
  NameBox,
  MsgInfo,
  MsgCount,
  Name,
  MsgNameMsg,
  Avtar,
  Figure,
  MsgBoxHeader,
  MsgBoxContent,
  MsgText,
  Msg,
  Img,
  AttachmentElement,
  AttachmentClient,
  PastAttachmentWrapper,
  AttachmentBox,
  PdfElement,
  ImgElement,
} from "./style";
import MsgAvtar1 from "@iso/assets/images/img-list.png";
import MsgAvtar2 from "@iso/assets/images/bid-img-2.jpg";
import MsgAvtar3 from "@iso/assets/images/bid-img-3.jpg";
import MsgAvtar4 from "@iso/assets/images/bid-img-4.jpg";
import MsgAvtar5 from "@iso/assets/images/bid-img-5.jpg";
import attachment from "@iso/assets/images/attachment.jpg";
import {
  SendOutlined,
  LinkOutlined,
  MoreOutlined,
  CloseCircleOutlined,
  UserOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  FileOutlined,
} from "@ant-design/icons";
import IntlMessages from "@iso/components/utility/intlMessages";
import { socket } from "../../..//socket";
import chatAction from "@iso/redux/chat/actions";
const {
  chatListingHistory,
  chatHistory,
  chatRead,
  mediaHistory,
  deleteChatData,
} = chatAction;
const { Search } = Input;
const { Option } = Select;

const token =
  localStorage.getItem("id_token") || sessionStorage.getItem("id_token");
const { user_id } = token ? jwt_decode(token) : {};
let chatDayDiff = 0;
let chatDayDiffPrev = 0;
class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messageView: "",
      activeData: {},
      chatHistoryData: [],
      totalData: 0,
      usersChat: [],
      chat_type: 1,
      roleValue: 2,
      chat_by: 2,
      search: "",
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
    };
  }

  componentDidMount() {
    this.getChatListing();
    socket.on("msgToClient", (messageRes) => {
      console.log("1111", this.state.usersChat);
      let chat = [{ ...messageRes.data }, ...this.state.usersChat];
      this.setState({
        usersChat:
          this.state.activeData &&
          this.state.activeData.room_id === messageRes.data.room_id
            ? chat
            : this.state.usersChat,
        // message: "",
        messageView: "",
        mediaImages: [],
        mediaImagesView: [],
      });
      this.getChatListing();
    });
    socket.on("msgToClientError", (message) => {
      console.log("client msg error", message);
    });
    socket.on("readMsgToClient", (message) => {
      this.getChatListing();
      // this.getChat();
    });
    socket.on("readMsgToClientError", (message) => {
      console.log("client msg error read", message);
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
      console.log("chat", chat);
      // Object.assign(this.state.usersChat, chatMessages && chatMessages.chat);
      this.setState({
        usersChat: values(chat).reverse(),
        totalData: chatMessages && chatMessages.totalData,
        alertError:
          chatMessages &&
          chatMessages.room_status &&
          !chatMessages.room_status.active
            ? [chatMessages.room_status.message]
            : [],
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
    const { chat_by, chat_type, search } = this.state;
    this.props.chatListingHistory({
      chat_by: chat_by,
      chat_type: chat_type,
      search: search,
    });
  };
  getChat = () => {
    const { limit, activeData, page } = this.state;
    let param = {
      room_id: activeData && activeData.room_id,
      page: page,
      limit: limit,
    };
    this.props.chatHistory(param);
  };
  readChat = (chat_id, room_id, read_all) => {
    let param = {
      chat_id,
      room_id,
      read_all,
    };
    console.log("ssss", param);
    socket.emit("readMsgToServer", param);
  };
  handleChange = (e) => {
    this.setState({ roleValue: e, chat_by: e.value, page: 1 }, () =>
      this.getChatListing()
    );
  };
  onSearch = (e) => {
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
  let emptyMessage = /^\s+$/.test(message)
    const messageData = {
      files: mediaImages ? mediaImages : null,
      message: message && !emptyMessage && message ,
      room_id: activeData.room_id,
      receiver_id:
        user_id !== activeData.sender_id
          ? activeData.sender_id
          : activeData.receiver_id,
      task_id: activeData.task.id,
    };

    if (message !== "" || mediaImages.length !== 0) {
      socket.emit("msgToServer", messageData);
      this.setState({ message: "" });
    } else {
      this.setState({ alertError: ["Please write something to chat"] });
    }
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
  showHideTrash = (flag) => {
    if (flag) {
      this.setState(
        { chat_type: 2, page: 1, activeData: {}, usersChat: [] },
        () => this.getChatListing()
      );
    } else {
      this.setState(
        { chat_type: 1, page: 1, activeData: {}, usersChat: [] },
        () => this.getChatListing()
      );
    }
  };

  changeChat = (data) => {
    chatDayDiff = 0;
    chatDayDiffPrev = 0;
    this.setState(
      {
        activeData: data,
        usersChat: [],
        message: "",
        messageView: "",
        page: 1,
        attachementData: [],
        attachmentTotal: 0,
        visible: false,
      },
      () => {
        this.props.history.replace(`/client/inbox/${data.room_id}`);
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
      chatHistoryData,
      usersChat,
      activeData,
      isModalVisible,
      isClick,
      visible,
      roleValue,
      message,
      mediaImagesView,
      alertError,
      isLoading,
      chat_type,
      totalData,
      search,
      page,
      attachementData,
      mediaPage,
      attachmentTotal,
    } = this.state;

    return (
      <>
        <PageWrapper>
          <PageContainer>
            <Content>
              <Head>
                <LeftSide>
                  <Tab />
                  <Area>
                    <i className="icon-location"> </i>
                    <AreaName>
                      {" "}
                      <IntlMessages id="Copenhagen" />{" "}
                    </AreaName>
                  </Area>
                </LeftSide>
                <RightSide className="search-task inbox-search">
                  <Search
                    placeholder="Search"
                    value={search}
                    onChange={this.onSearch}
                    onSearch={this.getChatListing}
                  />
                </RightSide>
              </Head>
              <ContentArea>
                <InboxWrapper>
                  <MsgNameBox>
                    <MsgNameHeader>
                      {chat_type === 1 ? (
                        <Select
                          labelInValue
                          defaultValue={{ value: roleValue }}
                          onChange={this.handleChange}
                        >
                          <Option value={2}>
                            <IntlMessages id="all" />
                          </Option>
                          <Option value={0}>
                            <IntlMessages id="antTable.title.Employer" />
                          </Option>
                          <Option value={1}>
                            <IntlMessages id="antTable.title.Specialist" />
                          </Option>
                        </Select>
                      ) : (
                        <div
                          className="trash-wrapper"
                          onClick={() => this.showHideTrash(false)}
                        >
                          <i className="icon-left-arrow trash-left-icon"></i>
                          <span className="btn-trash">
                            <IntlMessages id="trash" />
                          </span>
                        </div>
                      )}
                      {chat_type === 1 && (
                        <Button
                          // ref={btnRef}
                          // onClick={() => {
                          //   this.setState({isClick: true})
                          //   btnRef.current.style.margin = '0';
                          // }}
                          onClick={() => this.showHideTrash(true)}
                          className="btn-trash"
                        >
                          <IntlMessages id="Trash" />
                        </Button>
                      )}
                    </MsgNameHeader>
                    <MsgContent>
                      {chatHistoryData &&
                        chatHistoryData.map((data, i) => (
                          <NameBoxWrapper onClick={() => this.changeChat(data)}>
                            <Avtar>
                              <Figure>
                                <img
                                  src={
                                    data.users.find((dat) => dat.id !== user_id)
                                      .profile_photo
                                      ? data.users.find(
                                          (dat) => dat.id !== user_id
                                        ).profile_photo
                                      : userpic
                                  }
                                  alt="img"
                                />
                              </Figure>
                            </Avtar>
                            <NameBox className="chat-img">
                              <Name
                                className={
                                  data.room_id === activeData.room_id
                                    ? "active"
                                    : null
                                }
                              >
                                {
                                  data.users.find((dat) => dat.id !== user_id)
                                    .full_name
                                }
                              </Name>
                              <MsgNameMsg>{data.message}</MsgNameMsg>
                            </NameBox>
                            <MsgInfo className="chat-date">
                              <Time className="time">
                                {data.created &&
                                  moment(new Date(data.created)).format(
                                    "hh:mm A"
                                  )}
                              </Time>
                              {data.unreadCount !== 0 && (
                                <MsgCount>{data.unreadCount}</MsgCount>
                              )}
                            </MsgInfo>
                          </NameBoxWrapper>
                        ))}
                    </MsgContent>
                  </MsgNameBox>

                  <MsgBox>
                    {Object.values(activeData).length !== 0 ? (
                      <>
                        <MsgBoxWrapper className="msg-parent">
                          <MsgBoxHeader className="header-main">
                            <i className="icon-left-arrow back-btn"></i>
                            <Avtar>
                              <Figure>
                                <img
                                  src={
                                    activeData.users &&
                                    activeData.users.find(
                                      (dat) => dat.id !== user_id
                                    ).profile_photo
                                      ? activeData.users &&
                                        activeData.users.find(
                                          (dat) => dat.id !== user_id
                                        ).profile_photo
                                      : userpic
                                  }
                                  alt="img"
                                />
                              </Figure>
                            </Avtar>
                            <NameBox>
                              <Name className="box-title">
                                {activeData.users &&
                                  activeData.users.find(
                                    (dat) => dat.id !== user_id
                                  ).full_name}
                              </Name>
                              <MsgNameMsg className="name-special">
                                {activeData.users &&
                                activeData.users.find(
                                  (dat) => dat.id !== user_id
                                ).id === activeData.task &&
                                activeData.task.employer_id ? (
                                  <IntlMessages id="antTable.title.Employer" />
                                ) : (
                                  <IntlMessages id="antTable.title.Specialist" />
                                )}
                              </MsgNameMsg>
                            </NameBox>
                            {chat_type === 1 ? (
                              <div className="header-right-drop">
                                <Dropdown
                                  placement="bottomRight"
                                  overlay={
                                    <Menu className="hd-drop">
                                      <Menu.Item key="0">
                                        <MenuLink
                                          className="inbox-dropdown-item"
                                          href={`${process.env.REACT_APP_NAME}/client/user-profile/${
                                            user_id !== activeData.sender_id
                                              ? activeData.sender_id
                                              : activeData.receiver_id
                                          }/profile`}
                                        >
                                          <i className="icon-profile"></i>{" "}
                                          <span>
                                            {" "}
                                            <IntlMessages id="ViewProfile" />{" "}
                                          </span>
                                        </MenuLink>
                                      </Menu.Item>
                                      <Menu.Item
                                        key="1"
                                        onClick={() => this.showDrawer()}
                                      >
                                        <MenuLink
                                          className="inbox-dropdown-item"
                                          href="javascript:void(0)"
                                          onClick={() => this.callMedia()}
                                        >
                                          <i className="icon-pin"></i>{" "}
                                          <span>
                                            <IntlMessages id="PastAttachments" />
                                          </span>
                                        </MenuLink>
                                      </Menu.Item>
                                      <Menu.Item key="3">
                                        <MenuLink
                                          className="inbox-dropdown-item"
                                          href="javascript:void(0)"
                                          onClick={() =>
                                            this.setState({
                                              isModalVisible: true,
                                            })
                                          }
                                        >
                                          <i className="icon-delete"></i>{" "}
                                          <span>
                                            <IntlMessages id="MovetoTrash" />
                                          </span>
                                        </MenuLink>
                                      </Menu.Item>
                                    </Menu>
                                  }
                                  trigger={["click"]}
                                >
                                  <MenuLink
                                    className="ant-dropdown-link"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    <MoreOutlined />
                                  </MenuLink>
                                </Dropdown>
                              </div>
                            ) : (
                              <Button
                                onClick={() =>
                                  this.setState({ isModalVisible: true })
                                }
                                className="btn danger-btn-border"
                              >
                                <IntlMessages id="button.DELETE" />
                              </Button>
                            )}
                          </MsgBoxHeader>
                          <Link
                            to={
                              activeData.users &&
                              activeData.users.find((dat) => dat.id !== user_id)
                                .id === activeData.task &&
                              activeData.task.employer_id
                                ? `/client/task-details/employer/${
                                    activeData.task && activeData.task.id
                                  }`
                                : `/client/task-details/specialist/${
                                    activeData.task && activeData.task.id
                                  }`
                            }
                          >
                            <Divider className="header-divider">
                              {activeData.task && activeData.task.title
                                ? activeData.task.title
                                : ""}
                            </Divider>
                          </Link>
                          <MsgBoxContent>
                            <PeraGraph className="msg-box-pera">
                              <IntlMessages id="marketplaceRecommends" />
                            </PeraGraph>
                            {/* <Divider className="Msg-content-divider">
                              Yesterday
                            </Divider>
                            <MsgText>
                              <Msg>Hi... when will you start the work?</Msg>
                              <Time className="time">5:00 PM</Time>
                            </MsgText>
                            <MsgText className="right">
                              <Msg className="msg">Soon</Msg>
                              <Msg className="msg">I guess from Monday.</Msg>
                              <Time className="time">5:30 PM</Time>
                            </MsgText> */}

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
                                next={() =>
                                  this.setState({ page: page + 1 }, () =>
                                    this.getChat()
                                  )
                                }
                                style={{
                                  overflow: "initial",
                                  display: "flex",
                                  flexDirection: "column-reverse",
                                }} //To put endMessage and loader to the top.
                                inverse={true}
                                hasMore={
                                  usersChat.length < totalData ? true : false
                                }
                                loader={
                                  <h4>
                                    <IntlMessages id="loading" />
                                  </h4>
                                }
                                scrollableTarget="scrollableDiv"
                              >
                                {usersChat.map((data, index, arr) => {
                                  let det = arr[index - 1];
                                  let prevDate =
                                    det &&
                                    moment(
                                      moment(det.created_at).format(
                                        "DD-MM-YYYY"
                                      ),
                                      "DD-MM-YYYY"
                                    );

                                  let currDate = moment(
                                    moment(data.created_at).format(
                                      "DD-MM-YYYY"
                                    ),
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
                                    moment(prevDate).diff(
                                      moment(currDate),
                                      "days"
                                    );
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
                                                .subtract(
                                                  chatDayDiffPrev,
                                                  "days"
                                                )
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
                                            <Img
                                              src={item.filename}
                                              alt="img"
                                            />
                                          ))}
                                          {data.message && (
                                            <Msg
                                              className={
                                                user_id ===
                                                  (data.sender_data &&
                                                    data.sender_data.id) &&
                                                "msg"
                                              }
                                            >
                                              {data.message}
                                            </Msg>
                                          )}

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
                          </MsgBoxContent>
                          <FormWrapper>
                            <Form>
                              {alertError.length !== 0 &&
                                alertError.map((data) => (
                                  <Alert
                                    style={{ borderRadius: "40px" }}
                                    message={data}
                                    type="warning"
                                    showIcon
                                  />
                                ))}
                              <Form.Item>
                                {mediaImagesView.map((data, index) =>
                                  data.type.split("/")[0] === "image" ? (
                                    <div className="img-wrapper">
                                      <img src={URL.createObjectURL(data)} />
                                      <CloseCircleOutlined
                                        className="close-btn"
                                        onClick={() => this.removeImage(index)}
                                      />
                                    </div>
                                  ) : (
                                    <div className="img-wrapper file-wrapper">
                                      <PdfElement>
                                        <FileOutlined />
                                        <span>{data.name}</span>
                                      </PdfElement>
                                      <CloseCircleOutlined
                                        className="close-btn"
                                        onClick={() => this.removeImage(index)}
                                      />
                                    </div>
                                  )
                                )}
                                {chat_type === 1 && (
                                  <Input
                                    placeholder="Type message here"
                                    addonAfter={
                                      <>
                                        <label
                                          style={{
                                            cursor: "pointer",
                                            // width: 30,
                                            // height: 30,
                                          }}
                                          className="myAccontButton"
                                        >
                                          <LinkOutlined
                                            style={{ padding: "0 10px 0 0" }}
                                          />

                                          <input
                                            type={
                                              activeData.task?.task_status !== 1
                                                ? "file"
                                                : ""
                                            }
                                            multiple
                                            onClick={() =>
                                              activeData.task?.task_status ===
                                                1 &&
                                              this.setState({
                                                alertError: [
                                                  <IntlMessages id="chat.taskopenerror" />,
                                                ],
                                              })
                                            }
                                            onChange={this.handleClickforDocs}
                                            style={{
                                              width: 0,
                                              display: "none",
                                            }}
                                          />
                                        </label>
                                        <SendOutlined
                                          style={{ padding: "0 10px 0 0" }}
                                          onClick={this.sentMsg}
                                        />
                                      </>
                                    }
                                    value={message}
                                    onChange={(e) => this.typeMsg(e)}
                                  />
                                )}
                              </Form.Item>
                            </Form>
                          </FormWrapper>
                        </MsgBoxWrapper>
                        <Drawer
                          title="Past Attachments"
                          placement="right"
                          closable={true}
                          onClose={this.onClose}
                          visible={visible}
                          getContainer={false}
                          style={{ position: "absolute" }}
                        >
                          <PastAttachmentWrapper
                            id="mediaScrollableDiv"
                            style={{
                              overflow: "auto",
                              height: "100%",
                            }}
                          >
                            {attachementData.length > 1 ? (
                              <InfiniteScroll1
                                dataLength={attachementData.length} //This is important field to render the next data
                                next={() =>
                                  this.setState(
                                    { mediaPage: mediaPage + 1 },
                                    () => this.callMedia()
                                  )
                                }
                                hasMore={
                                  attachementData.length < attachmentTotal
                                    ? true
                                    : false
                                }
                                loader={
                                  <h4>
                                    <IntlMessages id="loading" />
                                  </h4>
                                }
                                scrollableTarget="mediaScrollableDiv"
                              >
                                {console.log(
                                  "attachementData",
                                  attachementData
                                )}
                                {attachementData &&
                                  attachementData.map((data) => (
                                    <AttachmentBox>
                                      <AttachmentClient>
                                        <Name className="name">
                                          {(data.sender_data &&
                                            data.sender_data.id) === user_id
                                            ? "You"
                                            : data.sender_data &&
                                              data.sender_data.full_name}
                                        </Name>
                                        ,
                                        <DateView className="date">
                                          {moment(
                                            new Date(data.created_at)
                                          ).format("DD/MM/YYYY")}
                                        </DateView>
                                        <Time className="time">
                                          {moment(
                                            new Date(data.created_at)
                                          ).format("hh:mm A")}
                                        </Time>
                                      </AttachmentClient>
                                      {data.media &&
                                        data.media.map((item) => (
                                          <AttachmentElement>
                                            {item.mimetype === "image" ? (
                                              <ImgElement>
                                                <img
                                                  src={item.filename}
                                                  alt=""
                                                />
                                              </ImgElement>
                                            ) : (
                                              <a
                                                href={item.filename}
                                                target="_blank"
                                                download
                                                rel="noopener noreferrer"
                                              >
                                                <PdfElement>
                                                  <FilePdfOutlined />
                                                  <span>
                                                    {item.originalname}
                                                  </span>
                                                </PdfElement>
                                              </a>
                                            )}
                                          </AttachmentElement>
                                        ))}
                                    </AttachmentBox>
                                  ))}
                              </InfiniteScroll1>
                            ) : (
                              <MsgBoxWrapper className="msg-parent trash-parent">
                                <p>
                                  <IntlMessages id="noDataFound" />
                                </p>
                              </MsgBoxWrapper>
                            )}
                          </PastAttachmentWrapper>
                        </Drawer>
                      </>
                    ) : (
                      <MsgBoxWrapper className="msg-parent trash-parent">
                        <h1 className="blank-task" style={{ textAlign: "center"}}>
                          <IntlMessages id="noDataFound" />
                        </h1>
                      </MsgBoxWrapper>
                    )}
                  </MsgBox>
                </InboxWrapper>
              </ContentArea>
            </Content>
          </PageContainer>
        </PageWrapper>
        <FooterContainer />

        <Modal
          className="inbox-modal"
          width={458}
          title="Delete Chat"
          centered={true}
          visible={isModalVisible}
          onCancel={() => this.setState({ isModalVisible: false })}
          footer={[
            <div className="inbox-model-btn">
              <Button
                className="btn danger-btn-border"
                style={{
                  display: "inline",
                  width: "auto",
                }}
                onClick={() => this.deleteChat()}
              >
                <IntlMessages id="YESDELETE" />
              </Button>
              <Button
                className="btn"
                style={{
                  display: "inline",
                  background: "none",
                  color: "#758287",
                  border: "none",
                  width: "auto",
                }}
                onClick={() => this.setState({ isModalVisible: false })}
              >
                <IntlMessages id="button.CANCEL" />
              </Button>
            </div>,
          ]}
        >
          <PeraGraph className="inbox-pera">
            {chat_type === 2
              ? "Deleting this chat will delete it permanently and you will not be able to recover it. Do you want to continue?"
              : "Deleting this chat will move it to trash. Do you want to continue?"}
          </PeraGraph>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  chatData: state.Chat.chatData,
  chatMessages: state.Chat.chatMessages,
  chatMessagesRead: state.Chat.chatMessagesRead,
  deleteChatRes: state.Chat.deleteChatRes,
  chatMedia: state.Chat.chatMedia,
});

const mapDispatchToProps = {
  chatListingHistory,
  chatHistory,
  chatRead,
  mediaHistory,
  deleteChatData,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Inbox));
