import React, { useState, useRef, useEffect } from "react";
import { Modal, Checkbox, Form, Pagination, Button, Alert } from "antd";
import FooterContainer from "@iso/components/Footer";
import {
  PageWrapper,
  PageContainer,
  Content,
  ButtonLink,
  UserTitle,
  PeraGraph,
} from "../../../CommonStyle";
import Tab from "@iso/components/Tab";
import {
  Head,
  LeftSide,
  Area,
  AreaName,
  ContentArea,
  LeftBlock,
  RightBlock,
  Wrapper,
} from "../Task/style";
import {
  RightSide,
  UserDetail,
  UserImg,
  UserNumberPos,
  NumberPos,
  ConfirmModal,
} from "./style";
import TaskCard from "@iso/components/Card";
import { InfoCircleOutlined } from "@ant-design/icons";
import UserImage from "@iso/assets/images/avatar.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import task from "@iso/redux/task/actions";
import profileActions from "@iso/redux/profile/actions";
import filterAction from "@iso/redux/userTypeAndFilter/actions";
import IntlMessages from "@iso/components/utility/intlMessages";

function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return (
      <span>
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

function Task(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [listOfSelectedTask, setListOfSelectedTask] = useState([]);
  const [isCheckboxDisabled, setIsCheckboxDisabled] = useState(false);
  const [isModalCheckboxChecked, setIsModalCheckboxChecked] = useState(false);
  const { getTask, inviteTaskToSpecialist } = task;
  const selectedTaskMessage = listOfSelectedTask.length;

  const { profile } = useSelector((state) => state.Profile);
  let selectedType = useSelector((state) => state.userTypeAndFilter.userType);
  const { inviteSpecialistSuccess, inviteSpecialistError } = useSelector(
    (state) => state.Task
  );
  let paginationNumber = useSelector(
    (state) => state.userTypeAndFilter.pagination.openTask
  );
  let alltask = useSelector((state) => state.Task.data.data);

  let totalPage = alltask.totalData;
  alltask = alltask.tasks;

  useEffect(() => {
    dispatch(profileActions.getProfile(id));
    let payload = {
      user_type: `${selectedType}`,
      open_task: 1,
      active_task: 0,
      completed_task: 0,
      cancelled_task: 0,
      archived_task: 0,
      reported_task: 0,
      resolved_task: 0,
      page: 1,
      limit: 10,
    };
    dispatch(getTask(payload));
    let paginationPayload = {
      type: "openTask",
      currentPage: {
        page: 1,
        limit: 10,
      },
    };
    dispatch(updatePagination(paginationPayload));
    dispatch(task.clearMessages());
  }, []);

  useEffect(() => {
    if (listOfSelectedTask.length <= 2) {
      setIsCheckboxDisabled(false);
    } else {
      setIsCheckboxDisabled(true);
    }
  }, [listOfSelectedTask]);

  const onPageChange = (page, pageSize) => {
    let pagepayload = {
      user_type: `${selectedType}`,
      open_task: 1,
      active_task: 0,
      completed_task: 0,
      cancelled_task: 0,
      archived_task: 0,
      reported_task: 0,
      resolved_task: 0,
      page: page,
      limit: pageSize,
    };
    dispatch(getTask(pagepayload));
    let payload = {
      type: "openTask",
      currentPage: {
        page: page,
        limit: pageSize,
      },
    };
    dispatch(updatePagination(payload));
  };

  const onCheckboxChecked = (e) => {
    let listTask = [...listOfSelectedTask];
    let taskId = e.target.defaultValue;
    let index = listTask.indexOf(taskId);
    if (index !== -1) {
      listTask.splice(index, 1);
      setListOfSelectedTask(listTask);
    } else {
      listTask.push(taskId);
      setListOfSelectedTask(listTask);
    }
  };

  const handleCheckbox = (e) => {
    setIsModalCheckboxChecked(e.target.checked);
  };

  const handleSubmit = () => {
    let payload = {
      task_id: listOfSelectedTask,
      specialist_id: parseInt(id),
      visible_to_others: isModalCheckboxChecked ? 1 : 0,
    };
    dispatch(inviteTaskToSpecialist(payload));
    setisModalVisible(false);
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
                  <AreaName> Copenhagen </AreaName>
                </Area>
              </LeftSide>
              <RightSide className="usermenu-rightside">
                <ButtonLink
                  onClick={() => setisModalVisible(true)}
                  className="btn"
                >
                  <IntlMessages id="inviteForTask" />
                </ButtonLink>
                <div className="task-select-indi">
                  <IntlMessages id={`Selected${selectedTaskMessage}Task`} />
                </div>
              </RightSide>
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
                    <Link
                      to={`/client/user-profile/${profile.user_id}/profile`}
                    >
                      {profile.full_name}
                    </Link>
                  </UserTitle>
                  <UserNumberPos>
                    <i className="icon-betch mtop-5"></i>
                    <NumberPos>{props.location.state?.ranking}</NumberPos>
                  </UserNumberPos>
                  <PeraGraph className="user-pera">
                    {profile.description}
                  </PeraGraph>
                </UserDetail>
              </LeftBlock>
              <RightBlock>
                {inviteSpecialistSuccess && (
                  <Alert
                    style={{ borderRadius: "40px" }}
                    message={inviteSpecialistSuccess}
                    type="success"
                    showIcon
                  />
                )}
                {inviteSpecialistError && (
                  <Alert
                    style={{ borderRadius: "40px" }}
                    message={inviteSpecialistError}
                    type="error"
                    showIcon
                  />
                )}
                {alltask.length ? (
                  alltask.map((task, index) => (
                    <TaskCard
                      key={index}
                      task={task}
                      userType="specialist"
                      isInviteSpecialist={true}
                      onCheckboxChecked={onCheckboxChecked}
                      disabled={isCheckboxDisabled}
                      isChecked={listOfSelectedTask.includes(task.taskData.id)}
                    />
                  ))
                ) : (
                  <h1 className="blank-task" style={{ textAlign: "center" }}>
                     <IntlMessages id="no.task" />
                  </h1> 
                )}
                <Pagination
                  total={totalPage}
                  showSizeChanger
                  current={paginationNumber.page}
                  onChange={onPageChange}
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
        title={<IntlMessages id="ant.modal.taskConfirmation" />}
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
              onClick={handleSubmit}
              disabled={selectedTaskMessage === 0 ? true : false}
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
              cancel
            </Button>
          </div>,
        ]}
      >
        <ConfirmModal>
          <PeraGraph className="inbox-pera">
            {selectedTaskMessage === 0 ? (
              <IntlMessages id="taskspecialist.Invite.msg" />
            ) : (
              <>
                {" "}
                <IntlMessages id="youhaveselected" /> {selectedTaskMessage}{" "}
                <IntlMessages id="tsk.msg1" />
              </>
            )}
          </PeraGraph>
          <div
            className="from-wrapper"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Checkbox
              onChange={handleCheckbox}
              // checked={isChecked}
              disabled={selectedTaskMessage === 0 ? true : false}
            >
              <IntlMessages id="tsk.msg2" />
            </Checkbox>
            <Form>
              <Form.Item
                className="w-100"
                style={{ width: "100%", marginBottom: "0" }}
                label=" "
                tooltip={{
                  title: <IntlMessages id="task.title5" />,
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

export default Task;
