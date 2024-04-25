import React, { useRef, useEffect } from "react";
import { Pagination,Alert } from "antd";
import FooterContainer from "@iso/components/Footer";
import {
  PageWrapper,
  PageContainer,
  Content,
  ButtonLink,
} from "../../../CommonStyle";
import { ContentArea, LeftBlock, RightBlock } from "./style";
import Filter from "@iso/components/Filter";
import TaskCard from "@iso/components/Card";
import HeadTitle from "@iso/components/Topbar";
import { useDispatch, useSelector } from "react-redux";
import filterAction from "@iso/redux/userTypeAndFilter/actions";
import task from "@iso/redux/task/actions";
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

function Task() {
  let pagination = useSelector(
    (state) => state.userTypeAndFilter.pagination.myTask
  );
  let userStatus = useSelector(
    (state) => state?.Auth?.userStatus
    );
  const { getTask } = task;

  let selectedType = useSelector((state) => state.userTypeAndFilter.userType);

  let AllOptions = useSelector((state) => state.userTypeAndFilter.myTaskFilter);

  const dispatch = useDispatch();
  let paginationNumber = useSelector(
    (state) => state.userTypeAndFilter.pagination.myTask
  );

  let alltask = useSelector((state) => state.Task.data.data);
  let totaPage = alltask.totalData;
  let userType = alltask.user_type;
  alltask = alltask.tasks;

  const filterRef = useRef();
  const onPageChange = (page, pageSize) => {
    let pagepayload = {
      user_type: `${selectedType}`,
      open_task: AllOptions["Open Task"] === 1 ? 1 : 0,
      active_task: AllOptions["Active Task"] === 1 ? 1 : 0,
      completed_task: AllOptions["Completed Task"] === 1 ? 1 : 0,
      cancelled_task: AllOptions["Cancelled Task"] === 1 ? 1 : 0,
      archived_task: AllOptions["Archieved Task"] === 1 ? 1 : 0,
      reported_task: AllOptions["Reported Task"] === 1 ? 1 : 0,
      resolved_task: AllOptions["Resolved Task"] === 1 ? 1 : 0,
      page: page,
      limit: pageSize,
    };
    dispatch(getTask(pagepayload));
    let payload = {
      type: "myTask",
      currentPage: {
        page: page,
        limit: pageSize,
      },
    };
    dispatch(updatePagination(payload));
  };
  useEffect(() => {


    let payloadPage = {
      type: "myTask",
      currentPage: {
        page: pagination.page,
        limit: pagination.limit,
      },
    };
    dispatch(updatePagination(payloadPage));
    let payload = {
      user_type: `${selectedType}`,
      open_task: AllOptions["Open Task"] === 1 ? 1 : 0,
      active_task: AllOptions["Active Task"] === 1 ? 1 : 0,
      completed_task: AllOptions["Completed Task"] === 1 ? 1 : 0,
      cancelled_task: AllOptions["Cancelled Task"] === 1 ? 1 : 0,
      archived_task: AllOptions["Archieved Task"] === 1 ? 1 : 0,
      reported_task: AllOptions["Reported Task"] === 1 ? 1 : 0,
      resolved_task: AllOptions["Resolved Task"] === 1 ? 1 : 0,
      page: pagination.page,
      limit: pagination.limit,
    };
    dispatch(getTask(payload));
  }, []);
  return (
    <>
      <PageWrapper>

        <PageContainer>
          <Content>
            <HeadTitle filter={false} options={["Employer", "Specialist"]} />
            <ContentArea>
              <ButtonLink
                onClick={() => {
                  filterRef.current.style.display = "block";
                  document.body.style.overflow = "hidden";
                }}
                className="filter-btn"
                style={{ float: "left", textTransform: "uppercase" }}
              >
                <IntlMessages id="filter" />
              </ButtonLink>
              <LeftBlock ref={filterRef}>
                <Filter filterRef={filterRef} />
              </LeftBlock>
              <RightBlock>
      {userStatus === 3 && <Alert message="User Suspended! Please Activate your account" type="warning" />}

                {alltask.length ? (
                  alltask.map((task, index) => (
                    <TaskCard key={index} task={task} userType={userType} />
                  ))
                ) : (
                  <h1 className="blank-task" style={{ textAlign: "center" }}>
                    <IntlMessages id="no.task" />
                  </h1>
                )}
                <Pagination
                  total={totaPage}
                  current={paginationNumber.page}
                  showSizeChanger
                  locale={{ items_per_page: "" }}
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
    </>
  );
}

export default Task;
