import React, { useState, useEffect } from "react";
import FooterContainer from "@iso/components/Footer";
import { Radio, Form, Select, Input, Drawer, Button, Space } from "antd";
import {
  PageWrapper,
  PageContainer,
  Content,
  TaskTitle,
  ContentBottom,
  ButtonLink,
  Title,
  FormWrapper,
} from "../../../CommonStyle";
import Tab from "@iso/components/Tab";
import { Head, LeftSide, Area, AreaName } from "../Task/style";
import Header from "@iso/components/Header";
import {
  CardBlock,
  AddNewCardBlock,
  CardHeader,
  CardContent,
  CardBox,
  CardInfoWrapper,
  LeftInfo,
  RightInfo,
  CardNumber,
  ExpiryDate,
  DefaultText,
  CardImg,
  CardForm,
} from "./style";
import americanExpress from "@iso/assets/images/americanExpress.svg";
import dinersClub from "@iso/assets/images/dinersClub.svg";
import discover from "@iso/assets/images/discover.svg";
import jcb from "@iso/assets/images/jcb.svg";
import masterCard from "@iso/assets/images/masterCard.svg";
import unionPay from "@iso/assets/images/unionPay.svg";
import visa from "@iso/assets/images/visa.svg";
import unknown from "@iso/assets/images/unknown.svg";
import Notification from "@iso/components/Notification";
import IntlMessages from "@iso/components/utility/intlMessages";
import { useDispatch, useSelector } from "react-redux";
import cardAction from "@iso/redux/myCard/actions";
import MaskedInput from "antd-mask-input";
import task from "@iso/redux/task/actions";

const { addCard, listCard, deleteSavedCard } = cardAction;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const cardImage = {
  "American Express": americanExpress,
  "Diners Club": dinersClub,
  Discover: discover,
  JCB: jcb,
  MasterCard: masterCard,
  unionPay: unionPay,
  Visa: visa,
  Unknown: unknown,
};

function Checkout(props) {
  const { acceptRejectBid } = task;

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState("");
  const [setisModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [listOfYear, setListOfYear] = useState([]);
  const [value, setValue] = React.useState(1);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  // const removeRef = useRef();

  // const checkRef = useRef();

  let cardDetail = useSelector((state) => {
    return state.MyCard.cardDetails;
  });

  let isCardAdded = useSelector((state) => {
    return state.MyCard.cardAdded;
  });

  useEffect(() => {
    dispatch(listCard());
  }, []);

  const handleSubmit = (data) => {};
  const handlePayment = (e) => {
    setValue(e.target.value);
  };
  const handleAcceptBid = () => {
    let payload = {
      task_id: props.location.state.task_id,
      bid_id: props.location.state.bid_id,
      bid_action: "ACCEPT",
      from_default_card: value === "defaultCard" ? true : false,
      from_saved_card: false,
      charge_details: "Details of task 4 payment BID 2",
    };
    dispatch(acceptRejectBid(payload));
  };
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
                  <AreaName><IntlMessages id="Copenhagen" />  </AreaName>
                </Area>
              </LeftSide>
            </Head>
            <ContentBottom>
              <CardBlock>
                <CardHeader>
                  <TaskTitle className="title">
                    <IntlMessages id="MyCards" />
                  </TaskTitle>
                </CardHeader>
                <CardContent>
                  <ul className="card-container">
                    {cardDetail.length ? (
                      cardDetail.map((card, index) => (
                        <li
                          onClick={() => {
                            setActiveLink(card.card_id);
                            // checkRef(checked);
                          }}
                          className={
                            activeLink === card.card_id ? "active" : ""
                          }
                          key={index}
                        >
                          <CardBox>
                            <Radio
                              // ref={checkRef}
                              checked={activeLink === card.card_id}
                            ></Radio>
                            <CardInfoWrapper>
                              <LeftInfo>
                                <Title className="title">
                                  {card.card_name ? card.card_name : ""}
                                </Title>

                                <CardNumber>
                                  **** **** **** {card.card_last_4}
                                </CardNumber>
                                <ExpiryDate>
                                <IntlMessages id="experingOn" />   {card.card_exp_month}/
                                  {card.card_exp_year}
                                </ExpiryDate>
                                <DefaultText>
                                  {card.card_default === true
                                    ? "(Default)"
                                    : ""}
                                </DefaultText>
                              </LeftInfo>
                              <RightInfo>
                                <CardImg
                                  src={`${cardImage[card.card_brand]}`}
                                  alt="img"
                                />
                              </RightInfo>
                            </CardInfoWrapper>
                          </CardBox>
                        </li>
                      ))
                    ) : (
                      <p><IntlMessages id="NoCardAvailable" /></p>
                    )}
                  </ul>
                </CardContent>
              </CardBlock>
              <AddNewCardBlock>
                <CardHeader>
                  <TaskTitle className="title">
                    <IntlMessages id="AddNewCard" />
                  </TaskTitle>
                </CardHeader>
                <CardContent>
                  <CardForm className="my-cards">
                    <FormWrapper>
                      <Form
                        form={form}
                        {...formItemLayout}
                        name="control-hooks"
                        onFinish={handleSubmit}
                      >
                        <Form.Item name="payment_method">
                          <Radio.Group onChange={handlePayment} value={value}>
                            <Space direction="vertical">
                              <Radio value={"defaultCard"}><IntlMessages id="defaultCard" /></Radio>
                              <Radio value={"NewCard"}>
                              <IntlMessages id="selectAnotherCard" />
                              </Radio>
                            </Space>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item className="w-100 btn-wrapper">
                          <Button
                            style={{ width: "auto" }}
                            className="btn"
                            htmlType="submit"
                            // onClick={() => setisModalVisible(true)}
                            onClick={handleAcceptBid}
                          >
                            <IntlMessages id="page.saveButton" />
                          </Button>
                          <Button
                            style={{ width: "auto" }}
                            className="btn btn-cancel"
                            onClick={() => {
                              form.resetFields();
                            }}
                          >
                            <IntlMessages id="button.cancel" />
                          </Button>
                        </Form.Item>
                      </Form>
                    </FormWrapper>
                  </CardForm>
                </CardContent>
              </AddNewCardBlock>
            </ContentBottom>
          </Content>
        </PageContainer>
      </PageWrapper>
      <FooterContainer />

      <Drawer
        width={410}
        title="Notifications"
        placement="right"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <Notification />
      </Drawer>
    </>
  );
}

export default Checkout;
