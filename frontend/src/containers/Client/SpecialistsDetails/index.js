import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Modal, Checkbox, Form, Button } from "antd";
import profileActions from "@iso/redux/profile/actions";
import { getToken } from "@iso/lib/helpers/utility";
import jwt_decode from "jwt-decode";
import FooterContainer from "@iso/components/Footer";
import { InfoCircleOutlined } from "@ant-design/icons";
import IntlMessages from "@iso/components/utility/intlMessages";

import {
  PageWrapper,
  PageContainer,
  Content,
  ButtonLink,
  PeraGraph,
  UserTitle,
} from "../../../CommonStyle";
import Tab from "@iso/components/Tab";
import UserImage from "@iso/assets/images/avatar.png";
import {
  Head,
  LeftSide,
  RightSide,
  Area,
  AreaName,
  ContentArea,
  LeftBlock,
  RightBlock,
} from "../Task/style";
import {
  UserDetail,
  UserImg,
  UserNumberPos,
  NumberPos,
  ConfirmModal,
} from "./style";

import TaskCard from "@iso/components/Card";
import filterAction from "@iso/redux/userTypeAndFilter/actions";
import task from "@iso/redux/task/actions";


function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return <span><IntlMessages id="ant.page.Previous" /></span>;
  }
  if (type === "next") {
    return <span><IntlMessages id="ant.page.next" /></span>;
  }
  return originalElement;
}

function SpecialistsDetail() {
  const { clearAllPages } = filterAction;
  let pagination = useSelector((state) => state.userTypeAndFilter.pagination.myTask);
  const { getTask } = task;
  let selectedType = useSelector((state) => state.userTypeAndFilter.userType);

  let AllOptions = useSelector((state) => state.userTypeAndFilter.myTaskFilter);
  const token = getToken().get("idToken");
  const { user_id } = token ? jwt_decode(token) : {};
  const dispatch = useDispatch();
  let userStatus = useSelector(
    (state) => state?.Auth?.userStatus
    );
    //let userStatus='1'
  useEffect(() => {
    dispatch(
      clearAllPages()
    );
    if(userStatus ===1){
    dispatch(profileActions.getProfile(user_id));
    let payload = {
      user_type: `${selectedType}`,
      open_task: AllOptions["Open"] === 1 ? 1 : 0,
      active_task: AllOptions["Active"] === 1 ? 1 : 0,
      completed_task: AllOptions["Completed"] === 1 ? 1 : 0,
      cancelled_task: AllOptions["Cancelled"] === 1 ? 1 : 0,
      archived_task: AllOptions["Archieved Tasks"] === 1 ? 1 : 0,
      reported_task: AllOptions["Reported Tasks"] === 1 ? 1 : 0,
      resolved_task: AllOptions["Resolved Tasks"] === 1 ? 1 : 0,
      page: pagination.page,
      limit: pagination.limit,
    };
  
    dispatch(getTask(payload));
  }
  }, []);
  const { profile } = useSelector((state) => state.Profile);
  let alltask = useSelector((state) => state.Task.data.data);
  let userType = alltask.user_type;
  alltask = alltask.tasks;
  let totalPage = alltask.totalData;
  const [isModalVisible, setisModalVisible] = useState(false);

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
                  <AreaName>{profile.city ? profile.city : "Copenhagen" }  </AreaName>
                </Area>
              </LeftSide>
            
            </Head>
            <ContentArea>
              <LeftBlock className="usermenu-block">
                <UserDetail>
                  {profile && profile.profile_photo ? (
                    <UserImg>
                      <img src={profile.profile_photo} alt="img" />
                    </UserImg>
                  ) : (
                    <UserImg>
                      <img src={UserImage} alt="img" />
                    </UserImg>
                  )}
                  <UserTitle className="user-pera">
                    {profile.full_name}
                  </UserTitle>
                  {/* <UserNumberPos>
                    <i className="icon-betch mtop-5"></i>
                    <NumberPos>001</NumberPos>
                  </UserNumberPos> */}
                  <PeraGraph className="user-pera">
                    {profile.description}
                  </PeraGraph>
                </UserDetail>
              </LeftBlock>
              <RightBlock >
                {alltask.length
                  ? alltask.map((task, index) => (
                      <TaskCard key={index} task={task} userType={userType} />
                    ))
                  : <h1 className="blank-task" style={{ textAlign: "center" ,height :"320px"}}>
                  <IntlMessages id="no.task" />
                </h1>}
                <Pagination
                  total={totalPage}
                  showSizeChanger
                  itemRender={itemRender}
                  //hideOnSinglePage={true}
                />
              </RightBlock>
            </ContentArea>
          </Content>
        </PageContainer>
      </PageWrapper>
      <FooterContainer />

      <Modal
        className="inbox-modal"
        width={458}
        title="Task Invitation Confirmation"
        centered={true}
        visible={isModalVisible}
        onCancel={() => setisModalVisible(false)}
        footer={[
          <div className="inbox-model-btn">
            <Button
              className="btn info-btn-border"
              style={{
                display: "inline-block",
                width: "auto",
              }}
              onClick={() => setisModalVisible(false)}
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
              onClick={() => setisModalVisible(false)}
            >
              <IntlMessages id="cancel" />
              cancel
            </Button>
          </div>,
        ]}
      >
        <ConfirmModal>
          <PeraGraph className="inbox-pera">
          <IntlMessages id="spl.pera1" />
          </PeraGraph>
          <div
            className="from-wrapper"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Checkbox>
            <IntlMessages id="spl.pera2" />
            </Checkbox>
            <Form>
              <Form.Item
                className="w-100"
                style={{ width: "100%", marginBottom: "0" }}
                label=" "
                tooltip={{
                  title:
                    <IntlMessages id="sp.details.title" />,
                  icon: <InfoCircleOutlined />,
                }}
              ></Form.Item>
            </Form>
          </div>
        </ConfirmModal>
      </Modal>
    </>
  );
}

export default SpecialistsDetail;
