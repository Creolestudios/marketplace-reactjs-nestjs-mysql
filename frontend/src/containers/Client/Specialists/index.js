import React, { useRef, useState, useEffect } from "react";
import { Pagination, Input, message } from "antd";
import FooterContainer from "@iso/components/Footer";
import IntlMessages from "@iso/components/utility/intlMessages";
import {
  PageWrapper,
  PageContainer,
  Content,
  ButtonLink,
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
import TaskCard from "@iso/components/CardSpecialist";
import SpecialistFilter from "@iso/components/SpecialistFilter";
import { useDispatch, useSelector } from "react-redux";
import filterAction from "@iso/redux/userTypeAndFilter/actions";
import task from "@iso/redux/task/actions";
import { Alert } from "antd";

const { getSpecialist } = task;

const { Search } = Input;
const onSearch = (value) => console.log(value);
function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return <span>  <IntlMessages id="ant.page.Previous" /></span>;
  }
  if (type === "next") {
    return <span><IntlMessages id="ant.page.next" /></span>;
  }
  return originalElement;
}

function Specialist() {
  let pagination = useSelector(
    (state) => state.userTypeAndFilter.pagination.specialistList
  );
  const { updatePagination, clearAllPages } = filterAction;
  const { profile } = useSelector((state) => state.Profile);
  let {specialistListFilter ,otherSpecialistField} = useSelector(
    (state) => state.userTypeAndFilter
  );
  let allSpecialist = useSelector(
    (state) => state.Task.specialist_List.specialists
  );
  let totalPage = useSelector((state) => state.Task.specialist_List.totalData);
  let paginationNumber = useSelector(
    (state) => state.userTypeAndFilter.pagination.specialistList
  );

  //pageType Specialists
  const dispatch = useDispatch();

  const [Active] = useState(false);
  const filterRef = useRef();
  let userStatus = useSelector(
    (state) => state?.Auth?.userStatus
  );
  //let userStatus='1'

  useEffect(() => {
  
    let payload = {
      business: specialistListFilter["business"] === 1 ? 1 : 0,
      freelancer: specialistListFilter["freelancer"] === 1 ? 1 : 0,
      rating_above_4: specialistListFilter["Rating above 4"] === 1 ? 1 : 0,
      nemid_authorization: specialistListFilter["Nemid authorization"] === 1 ? 1 : 0,

      search: "",
      page: pagination.page,
      limit: pagination.limit,
    };

    dispatch(getSpecialist(payload));

  }, []);
  const onSearch = (value) => {
    let payload = {
      business: 1,
      freelancer: 1,
      rating_above_4: 0,
      nemid_authorization: 0,
      search: value,
      page: 1,
      limit: 10,
    };
    dispatch(getSpecialist(payload));
  };
  const onPageChange = (page, pageSize) => {
    let pagePayload = {
      business: specialistListFilter["business"] === 1 ? 1 : 0,
      freelancer: specialistListFilter["freelancer"] === 1 ? 1 : 0,
      rating_above_4: specialistListFilter["Rating above 4"] === 1 ? 1 : 0,
      nemid_authorization: specialistListFilter["Nemid authorization"] === 1 ? 1 : 0,
      search: "",
      page: page,
      limit: pageSize,
      category: otherSpecialistField.category,
      sub_category: otherSpecialistField.sub_category,
    };
    dispatch(getSpecialist(pagePayload));
    let payload = {
      type: "specialistList",
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
                {!sessionStorage.getItem("is_guest") && <Area>
                  <i className="icon-location"> </i>
                  <AreaName>
                    {profile.city ? profile.city : "Copenhagen"}{" "}
                  </AreaName>
                </Area>}
              </LeftSide>
              <RightSide className="search-task">

                <IntlMessages id="label.search">
                  {(placeholder) => (
                    <Search placeholder={placeholder} onSearch={onSearch} disabled={userStatus === 3} />
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
                className="filter-btn specialist-filter"
                style={{ float: "left", textTransform: "uppercase" }}
                disabled={userStatus === 3}
              >
                <IntlMessages id="filter" />
              </ButtonLink>
              <LeftBlock ref={filterRef}>
                <SpecialistFilter filterRef={filterRef} />
              </LeftBlock>
              <RightBlock>
                {userStatus === 3 && <Alert message="User Suspended! Please Activate your account" type="warning" />}
                {allSpecialist.length
                  ? allSpecialist.map((task, index) => (
                    <TaskCard key={index} task={task} pageType="specialist" />
                  ))
                  : <h1 className="blank-task" style={{ textAlign: "center" }}>
                    <IntlMessages id="no.specialist" />
                  </h1>}
                {/* {demoTasks.map((task ,index) => (
                  <TaskCard
                    task={task}
                    key={index}
                    userType="Specialist"
                    pageType="Specialists"
                  />
                ))} */}
                <Pagination
                  total={totalPage}
                  showSizeChanger
                  onChange={onPageChange}
                  itemRender={itemRender}
                  locale={{ items_per_page: '' }}
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

export default Specialist;
