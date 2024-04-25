import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import FooterContainer from "@iso/components/Footer";
import {
  Select,
  Pagination,
  Modal,
  Button,
  Form,
  Radio,
  Space,
  Alert,
} from "antd";
import Bid1 from "@iso/assets/images/avatar.png";

import {
  PageWrapper,
  PageContainer,
  Content,
  TaskTitle,
  SuccessSituation,
  InfoSituation,
  PurpleSituation,
  DangerSituation,
  DarkInfoSituation,
} from "../../../CommonStyle";
import { ContentArea } from "../Task/style";
import {
  Detail,
  DetailHead,
  LeftBlock,
  DetailContent,
  InfoTitleWrapper,
  InfoTitle,
} from "../TaskDetails/style";
import { BidTableWrapper } from "./style";
import IntlMessages from "@iso/components/utility/intlMessages";
import { useSelector, useDispatch } from "react-redux";
import taskAction from "@iso/redux/task/actions";
import filterAction from "@iso/redux/userTypeAndFilter/actions";
import task from "@iso/redux/task/actions";
import HeadTitle from "@iso/components/Topbar";
import { socket } from "../../../socket";
import { AppConstant } from "@iso/config/constant";
// const { TextArea } = Input;
const { Option, OptGroup } = Select;
const { bidDetails, getCheckoutBidDetail } = taskAction;
function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return (
      <span>
        {" "}
        <IntlMessages id="ant.page.Previous" />
      </span>
    );
  }
  if (type === "next") {
    return (
      <span>
        <IntlMessages id="ant.page.next" />
      </span>
    );
  }
  return originalElement;
}
const { updatePagination } = filterAction;
function Bids() {
  const history = useHistory();
  const { acceptRejectBid, clearMessages } = task;
  const [value, setValue] = React.useState("defaultCard");
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = (bid) => {
    setIsModalVisible(true);
    dispatch(
      getCheckoutBidDetail({
        task_id: parseInt(id),
        bid_id: parseInt(bid.bid_id),
      })
    );
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    dispatch(clearMessages());
    setIsModalVisible(false);
  };

  let Category = useSelector((state) => state.Categories);
  let idWiseParentCategories = Category.idWiseParentCategories;

  let paginationNumber = useSelector(
    (state) => state.userTypeAndFilter.pagination.bids
  );
  let { acceptBidError, acceptBidSuccess } = useSelector((state) => state.Task);
  const { id } = useParams();
  let { allBids, activeBid } = useSelector(
    (state) => state.Task.singleBidDetails
  );
  let allbids = useSelector((state) => state.Task.singleBidDetails.allBids);
  let activebids = useSelector(
    (state) => state.Task.singleBidDetails.activeBid
  );
  let singleBidTask = useSelector((state) => state.Task.singleBidDetails.task);
  let idWisesubCategories = Category.idWiseSubCategories;
  let subcat = idWisesubCategories[singleBidTask.category_id];
  subcat =
    subcat &&
    subcat.filter((each) => each.id === singleBidTask.sub_category_id);

  if (subcat) {
    subcat.filter((each) => each.id === singleBidTask.sub_category_id);
    if (subcat.length > 0) {
      subcat = subcat[0].name;
    }
  }
  let totalbid = allBids.length;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      bidDetails({
        task_id: parseInt(id),
        page: 1,
        limit: 10,
      })
    );
  }, []);
  let checkoutBidDetails = useSelector(
    (state) => state.Task.checkoutBidDetails
  );
  const onPageChange = (page, pageSize) => {
    let pagepayload = {
      task_id: parseInt(id),
      page: page,
      limit: pageSize,
    };

    dispatch(bidDetails(pagepayload));
    let payload = {
      type: "bids",
      currentPage: {
        page: page,
        limit: pageSize,
      },
    };
    dispatch(updatePagination(payload));
  };
  const handlePayment = (e) => {
    setValue(e.target.value);
  };
  const handleAcceptBid = (bid) => {
    let payload = {
      task_id: parseInt(id),
      bid_id: bid.bid_id,
      bid_action: "ACCEPT",
      from_default_card: value === "defaultCard" ? true : false,
      from_saved_card: false,
    };

    //setIsModalVisible(false);
    if (value === "defaultCard") {
      dispatch(acceptRejectBid(payload, history));
      dispatch(clearMessages());
    } else {
      history.push(`/client/payment-card/${id}/${bid.bid_id}`);
    }
  };
  function createChat(data) {
    const message = {
      message: "Hi",
      receiver_id: data.user_id,
      task_id: singleBidTask.id,
    };
    if (!data.room_id) {
      socket.emit("msgToServer", message);
      socket.on("msgToClient", (message) => {
        message.room_id &&
          history.push(`/client/inbox/${message.data.room_id}`);
      });
      socket.on("msgToClientError", (message) => {});
    } else {
      history.push(`/client/inbox/${data.room_id}`);
    }
  }
  const handleCancelBid = (bid) => {
    let payload = {
      task_id: parseInt(id),
      bid_id: bid.bid_id,
      bid_action: "REJECT",
    };
    dispatch(acceptRejectBid(payload, history));
  };
  const handleConfirm = (bid) => {
    handleAcceptBid(bid);
    setIsModalVisible(false);
  };
  return (
    <PageWrapper>
      <PageContainer>
        <Content>
          <HeadTitle filter={true} options={["Employer", "Specialist"]} />
          <ContentArea>
            <Detail>
              <DetailHead>
                <LeftBlock>
                  <Link to="/client/task">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <i className="icon-left-arrow"></i>
                      <TaskTitle className="detail-text">
                        {singleBidTask.title}
                      </TaskTitle>
                    </div>
                  </Link>
                  {singleBidTask.task_status ===
                    AppConstant.CardStatus.Active && (
                    <SuccessSituation className="situation">
                      <IntlMessages id="Active" />
                      {/* {props.task.status} */}
                    </SuccessSituation>
                  )}

                  {singleBidTask.task_status ===
                    AppConstant.CardStatus.Open && (
                    <InfoSituation className="situation">
                      {/* {props.task.status} */}
                      <IntlMessages id="open" />
                    </InfoSituation>
                  )}
                  {singleBidTask.task_status ===
                    AppConstant.CardStatus.Archieved && (
                    <PurpleSituation className="situation">
                      <IntlMessages id="Archieved" />
                    </PurpleSituation>
                  )}
                  {singleBidTask.task_status ===
                    AppConstant.CardStatus.cancelled && (
                    <DangerSituation className="situation">
                      <IntlMessages id="cancelled" />
                    </DangerSituation>
                  )}
                  {singleBidTask.task_status ===
                    AppConstant.CardStatus.Completed && (
                    <DarkInfoSituation className="situation">
                      <IntlMessages id="completed" />
                    </DarkInfoSituation>
                  )}
                </LeftBlock>
                {/* <RightBlock>
                  <ButtonLink
                    className="edit-task silver-btn-border"
                    style={{}}
                  >
                    <IntlMessages id="button.EDITTASK" />
                  </ButtonLink>{" "}
                </RightBlock> */}
              </DetailHead>
              <DetailContent className="bid-section">
                <InfoTitleWrapper>
                  <InfoTitle>
                    <i className="icon-cunstruction"></i>
                    {idWiseParentCategories[singleBidTask.category_id]}
                  </InfoTitle>
                  <InfoTitle>
                    <i className="icon-plumbing-work"></i>
                    {subcat && subcat}
                  </InfoTitle>
                </InfoTitleWrapper>

                {/* Table */}
                <BidTableWrapper className="table">
                  <div className="table-title">
                    <div className="name">
                      {Object.keys(activeBid).length === 0 &&
                      activeBid.constructor === Object ? (
                        <a>
                          <IntlMessages id="noSpeciaistSelected" />
                        </a>
                      ) : (
                        <Link
                          to={`/client/user-profile/${activeBid.user_id}/profile`}
                        >
                          {activeBid.user_name}
                        </Link>
                      )}
                    </div>
                    <div className="rate">
                      <i className="icon-star"></i>
                      {Object.keys(activeBid).length === 0 &&
                      activeBid.constructor === Object ? (
                        <span>0</span>
                      ) : (
                        <span>
                          {activeBid.average_rating}({activeBid.total_rating})
                        </span>
                      )}
                    </div>
                  </div>

                  <table role="table" width="100%">
                    <thead>
                      <tr align="left" role="row">
                        <th role="columnheader">#</th>
                        <th role="columnheader"></th>
                        <th role="columnheader">
                          {" "}
                          <IntlMessages id="antTable.title.SpecialistName" />
                        </th>
                        <th role="columnheader">
                          <IntlMessages id="antTable.title.Bid" />
                        </th>
                        <th role="columnheader">
                          <IntlMessages id="IntroductionMessage" />
                        </th>
                        <th role="columnheader">
                          <IntlMessages id="Ratings" />
                        </th>
                        <th role="columnheader">
                          <IntlMessages id="antTable.title.actions" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allBids.length > 0 ? (
                        allBids.map((bid, index) => (
                          <tr key={index} align="left" role="row">
                            <td role="cell">{index + 1}</td>
                            <td role="cell">
                              <img
                                src={bid.user_photo ? bid.user_photo : Bid1}
                                alt=""
                              />
                            </td>
                            <td role="cell" className="name">
                              <Link
                                to={`/client/user-profile/${bid.user_id}/profile`}
                              >
                                {bid.user_name}
                              </Link>
                            </td>
                            <td role="cell" className="bid-rate">
                              {bid.bid} Kr
                            </td>
                            <td role="cell" className="intro-msg">
                              {bid.bid_message}
                            </td>
                            <td role="cell">
                              <div className="rate">
                                <i className="icon-star"></i>
                                <span>{bid.average_rating}</span>
                              </div>
                            </td>
                            <td>
                              <div className="icon">
                                <i
                                  className="icon-specialist"
                                  onClick={() => createChat(bid)}
                                />
                                {/* <Link
                                  to={{
                                    pathname: `/client/checkout`,
                                    state:{
                                      bid_id:bid.bid_id,
                                      task_id:parseInt(id)
                                    }
                                  }}
                                > */}

                                {Object.values(activebids).length === 0 &&
                                bid.bid_status === 0 ? (
                                  <>
                                    <i
                                      className="icon-correct"
                                      onClick={() => showModal(bid)}
                                    ></i>
                                    <i
                                      className="icon-cross"
                                      onClick={() => handleCancelBid(bid)}
                                    ></i>
                                  </>
                                ) : bid.bid_status === 2 ? (
                                  <DangerSituation className="situation">
                                    Rejected
                                  </DangerSituation>
                                ) : bid.bid_status === 1 ? (
                                  <SuccessSituation className="situation">
                                    Accepted
                                  </SuccessSituation>
                                ) : (
                                  ""
                                )}
                                <Modal
                                  title="Please select mode of payment"
                                  visible={isModalVisible}
                                  onOk={handleOk}
                                  onCancel={handleCancel}
                                  className={
                                    !(
                                      checkoutBidDetails?.amountData
                                        ?.amountToPay > 0 &&
                                      checkoutBidDetails?.amountData
                                        ?.amountToPay < 2.5
                                    )
                                      ? ""
                                      : "without-btns"
                                  }
                                  footer={
                                    !(
                                      checkoutBidDetails?.amountData
                                        ?.amountToPay > 0 &&
                                      checkoutBidDetails?.amountData
                                        ?.amountToPay < 2.5
                                    )
                                      ? [
                                          <div className="inbox-model-btn">
                                            <Button
                                              className="btn info-btn-border"
                                              style={{
                                                display: "inline-block",
                                                width: "auto",
                                              }}
                                              onClick={(e) =>
                                                handleConfirm(bid)
                                              }
                                            >
                                              confirm
                                            </Button>
                                            <Button
                                              className="btn btn-clear"
                                              style={{
                                                display: "inline-block",
                                                background: "none",
                                                color: "#758287",
                                                border: "none",
                                                width: "auto",
                                              }}
                                              onClick={handleCancel}
                                            >
                                              <IntlMessages id="button.cancel" />
                                            </Button>
                                          </div>,
                                        ]
                                      : []
                                  }
                                >
                                  {acceptBidError && (
                                    <div>
                                      <Alert
                                        style={{
                                          borderRadius: "40px",
                                          marginBottom: "20px",
                                        }}
                                        message={acceptBidError}
                                        type="error"
                                        showIcon
                                      />
                                    </div>
                                  )}
                                  <Form className="payment-table">
                                    <Form.Item name="payment_method">
                                      <table role="table" width="100%">
                                        <thead>
                                          <tr align="left" role="row">
                                            <th role="columnheader">
                                              <IntlMessages id="bidAmount" />
                                            </th>
                                            <th role="columnheader">
                                              <IntlMessages id="originalAmount" />
                                            </th>
                                            <th role="columnheader">
                                              <IntlMessages id="outstandingAmounts" />
                                            </th>
                                            <th role="columnheader">
                                              <IntlMessages id="amountToPay" />
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr
                                            key={index}
                                            align="left"
                                            role="row"
                                          >
                                            <td role="cell">
                                              {" "}
                                              {checkoutBidDetails?.bidData
                                                ?.bid_amount !== undefined &&
                                                `${checkoutBidDetails?.bidData?.bid_amount} kr`}
                                            </td>
                                            <td role="cell">
                                              {checkoutBidDetails?.amountData
                                                ?.originalAmount !==
                                                undefined &&
                                                `${checkoutBidDetails?.amountData?.originalAmount} kr`}
                                            </td>
                                            <td role="cell">
                                              {checkoutBidDetails?.amountData
                                                ?.outstandingAmount !==
                                                undefined &&
                                                `${checkoutBidDetails?.amountData?.outstandingAmount} kr`}
                                            </td>
                                            <td role="cell">
                                              {checkoutBidDetails?.amountData
                                                ?.amountToPay !== undefined &&
                                                `${checkoutBidDetails?.amountData?.amountToPay} kr`}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                      {checkoutBidDetails?.amountData
                                        ?.amountToPay > 0 &&
                                      checkoutBidDetails?.amountData
                                        ?.amountToPay < 2.5 ? (
                                        <p>
                                          <IntlMessages id="minimumAmountToPay" />
                                        </p>
                                      ) : (
                                        <Radio.Group
                                          onChange={handlePayment}
                                          defaultValue={value}
                                        >
                                          <Space direction="vertical">
                                            <Radio value={"defaultCard"}>
                                              <IntlMessages id="defaultCard" />
                                            </Radio>
                                            {checkoutBidDetails?.amountData
                                              ?.amountToPay !== 0 && (
                                              <Radio value={"NewCard"}>
                                                <IntlMessages id="selectAnotherCard" />
                                              </Radio>
                                            )}
                                          </Space>
                                        </Radio.Group>
                                      )}
                                    </Form.Item>
                                  </Form>
                                  {!(
                                    checkoutBidDetails?.amountData
                                      ?.amountToPay > 0 &&
                                    checkoutBidDetails?.amountData
                                      ?.amountToPay < 2.5
                                  ) && (
                                    <p className="modal-info">
                                      **
                                      <IntlMessages id="form.publishInfo" />
                                    </p>
                                  )}
                                </Modal>
                                {/* </Link> */}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </BidTableWrapper>
              </DetailContent>
            </Detail>
          </ContentArea>
          <Pagination
            total={totalbid}
            showSizeChanger
            locale={{ items_per_page: "" }}
            current={paginationNumber.page}
            itemRender={itemRender}
            onChange={onPageChange}
            //hideOnSinglePage={true}
          />
        </Content>
      </PageContainer>
      <FooterContainer />
    </PageWrapper>
  );
}

export default Bids;
