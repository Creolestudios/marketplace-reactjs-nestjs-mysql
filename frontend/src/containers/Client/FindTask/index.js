import React, { useRef, useState ,useEffect } from "react";
import { Pagination, Input, Button,message } from "antd";
import FooterContainer from "@iso/components/Footer";
import {
  PageWrapper,
  PageContainer,
  Content,
  ButtonLink,
  SmallTitle,
} from "../../../CommonStyle";
import Tab from "@iso/components/Tab";
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
import Filter from "@iso/components/FindFilter";
import TaskCard from "@iso/components/FindTaskCard";
import IntlMessages from "@iso/components/utility/intlMessages";
import { useDispatch, useSelector } from "react-redux";
import filterAction from "@iso/redux/userTypeAndFilter/actions";
import task from "@iso/redux/task/actions";
import { Alert } from "antd";

const { Search } = Input;
const { findTask } = task;

function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return (
      <span>
        <IntlMessages id="ant.page.Previous" />
      </span>
    );
  }
  if (type === "next") {
    return <span><IntlMessages id="ant.page.next" /></span>;
  }
  return originalElement;
}
const { updatePagination , clearAll ,updateFindTaskCategory, otherField ,searchValue} = filterAction;

function Task() {
  let pagination = useSelector(
    (state) => state.userTypeAndFilter.pagination.findTask
  );
  let userStatus = useSelector(
  (state) => state?.Auth?.userStatus
  );
  let { findTaskCategoryFilter ,otherFields , searchText } = useSelector(
    (state) => state.userTypeAndFilter
  );

  useEffect(() => {
    let payload = {
      budget_object: otherFields.task_budget ? otherFields.task_budget : null, 
      zip_code: otherFields.zipCode && otherFields.zipCode,
      task_with_no_bid: AllOptions["Tasks with no bids"] === 1  ? 1 : 0,
      remote_work: AllOptions["Remote Work"] === 1 ? 1 : 0,
      nemid_authorization: AllOptions["NemID Autorization"] === 1 ? 1 : 0,
      task_urgent: AllOptions["Urgent Task"] === 1 ? 1 : 0,
      task_for_freelance: AllOptions["Tasks for freelancer"] === 1 ? 1 : 0,
      task_for_business: AllOptions["Tasks for business"] === 1 ? 1 : 0,
      placed_bids: AllOptions["Placed Bids"] === 1 ? 1 : 0,
      page: pagination.page,
      limit: pagination.limit,
      category: findTaskCategoryFilter.category
      ? findTaskCategoryFilter.category
      : null,
    sub_category: findTaskCategoryFilter.sub_category
      ? findTaskCategoryFilter.sub_category
      : null,
      // search_radius: !sliderFreez ? radius : null,
      title_search: searchText,
    };
    let payloadPage = {
      type: "myTask",
      currentPage: {
        page: 1,
        limit: 10,
      },
    };
    dispatch(findTask(payload));
    dispatch(updatePagination(payloadPage));
  }, [])
  
  //let userStatus=1
  const dispatch = useDispatch();
  const onSearch = (value) => {
    dispatch(searchValue(value))
    dispatch(
      updateFindTaskCategory({
        category: null,
        sub_category: null,
      })
    );
    dispatch(otherField({
      zipCode: null ,
      selectedBudget: null,
      task_budget: null,
    }))
    let payloadPage = {
      type: "findTask",
      currentPage: {
        page: 1,
        limit: 10,
      },
    };
    dispatch(updatePagination(payloadPage));
    dispatch(
      clearAll({
        payload: {
          "Placed Bids": 0,
          "Tasks for business": 0,
          "Tasks for freelancer": 0,
          "Urgent Task": 0,
          "Tasks with no bids": 0,
          "NemID Autorization": 0,
          "Remote Work": 0,
        },
        type: "findTaskFilter",
      })
    );
    let payload = {
      task_budget: [0, -1],
      task_with_no_bid: AllOptions["Tasks with no bids"] === 1 ? 1 : 0,
      remote_work: 0,
      nemid_authorization: 0,
      task_urgent: 0,
      task_for_freelance: 0,
      task_for_business: 0,
      placed_bids: 0,
      page: 1,
      limit: 10,
      title_search: value,
    };
    dispatch(findTask(payload));
  };
  let AllOptions = useSelector(
    (state) => state.userTypeAndFilter.findTaskFilter
  );

  let paginationNumber = useSelector(
    (state) => state.userTypeAndFilter.pagination.findTask
  );

  let allfindtask = useSelector((state) => state.Task.findTask.tasks);
  if(userStatus===3){
    allfindtask=[]
  }
  let suggestedTask = useSelector((state) => state.Task.TotalSuggested);
  let totaPage = useSelector((state) => state.Task.findTask.totalData);
  const [Active] = useState(false);
  const filterRef = useRef();
  const onPageChange = (page, pageSize) => {
    let pagepayload = {
      budget_object: otherFields.task_budget ? otherFields.task_budget : null, 
      task_with_no_bid: AllOptions["Tasks with no bids"] === 1 ? 1 : 0,
      remote_work: AllOptions["Remote Work"] === 1 ? 1 : 0,
      nemid_authorization: AllOptions["NemID Autorization"] === 1 ? 1 : 0,
      task_urgent: AllOptions["Urgent Task"] === 1 ? 1 : 0,
      task_for_freelance: AllOptions["Tasks for freelancer"] === 1 ? 1 : 0,
      task_for_business: AllOptions["Tasks for business"] === 1 ? 1 : 0,
      placed_bids: AllOptions["Placed Bids"] === 1 ? 1 : 0,
      page: page, //
      limit: pageSize, //
      category: findTaskCategoryFilter.category
        ? findTaskCategoryFilter.category
        : null,
      sub_category: findTaskCategoryFilter.sub_category
        ? findTaskCategoryFilter.sub_category
        : null,
      title_search: searchText,
    };
    dispatch(findTask(pagepayload));
    let payload = {
      type: "findTask",
      currentPage: {
        page: page,
        limit: pageSize,
      },
    };
    dispatch(updatePagination(payload));
  };
  return (
    <>
  <PageWrapper>
        <PageContainer>
          <Content>
            <Head>
              <LeftSide>
          
                <Tab />
                {!sessionStorage.getItem("is_guest") &&  <Area>
                  <i className="icon-location"> </i>
                  <AreaName>
                    <IntlMessages id="Copenhagen" />
                  </AreaName>
                </Area>}
               
              </LeftSide>
              <RightSide className="search-task">
              <IntlMessages id="label.search">
                      {(placeholder) => (
                       <Search placeholder= {placeholder} onSearch={onSearch} defaultValue={searchText}/>
                      )}
                    </IntlMessages>
                
              </RightSide>
            </Head>
            <ContentArea>
              <ButtonLink
                onClick={() => {
                  filterRef.current.style.display = "block";
                  document.body.style.overflow = Active ? "" : "hidden";
                }}
                className="filter-btn find-filter-btn"
                style={{ float: "left", textTransform: "uppercase" }}
                disabled={userStatus===3}
              >
                <IntlMessages id="filters" />
              </ButtonLink>
              <LeftBlock ref={filterRef}>
                <Filter filterRef={filterRef} />
              </LeftBlock>
              <RightBlock>
              {userStatus === 3 && <Alert message="User Suspended! Please Activate your account" type="warning" />}

                <div className="sug-title">
                  <SmallTitle className="sug-text">
                    <IntlMessages id="findTask.suggestedTask" />
                  </SmallTitle>
                  <div className="task-count">{suggestedTask.length}</div>
                </div>
                {/* {demoTasks.map((task, index) => (
                  <TaskCard key={index} task={task} userType='specialist' />
                ))} */}
                {allfindtask.length
                  ? allfindtask.map((task, index) => (
                      <TaskCard key={index} task={task} userType="specialist" />
                    ))
                  : <h1 className="blank-task" style={{ textAlign: "center" }}>
                  <IntlMessages id="no.task" />
                </h1>}
                <Pagination
                  total={userStatus === 1 ?totaPage : 1}
                  showSizeChanger
                  locale={{ items_per_page: '' }}
                  onChange={onPageChange}
                  itemRender={itemRender}
                  current={paginationNumber.page}
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
