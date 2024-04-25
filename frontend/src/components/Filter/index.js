import React, { useEffect,useState } from "react";
import { Checkbox, Button, Divider, Form } from "antd";
import { TaskTitle } from "../../CommonStyle";
import { FilterWrapper } from "./style";
import IntlMessages from "@iso/components/utility/intlMessages";
import task from "@iso/redux/task/actions";
import filterAction from "@iso/redux/userTypeAndFilter/actions";

import { useDispatch, useSelector } from "react-redux";

// const { Option, OptGroup } = Select;

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const Filter = (props) => {
  const [myTaskForm] = Form.useForm();
  const [pref, setPref] = useState([]);
  const [defatulPref, setDefaultPref] = useState([]);
  let selectedType = useSelector((state) => state.userTypeAndFilter.userType);
  let pagination = useSelector((state) => state.userTypeAndFilter.pagination.myTask.page);
  let AllOptions = useSelector((state) => state.userTypeAndFilter.myTaskFilter);
  const plainOptions = Object.keys(AllOptions);
  if (selectedType === "specialist") {
    plainOptions.shift();
  }
  let userStatus = useSelector((state) => state.Auth.userStatus)
  const defaultCheckedList = plainOptions.filter(
    (ele) => AllOptions[ele] === 1
  );
  
  useEffect(() => {

  setPref(defaultCheckedList)
  }, [selectedType,pagination])
  const { getTask } = task;
  const { updateMyTaskFilter, clearAll, updatePagination } = filterAction;
  const dispatch = useDispatch();

  // const [indeterminate, setIndeterminate] = React.useState(true);
  // const [checkAll, setCheckAll] = React.useState(false);


  const handleSubmit = (data) => {
    if (window.screen.width < 768) {
      props.filterRef.current.style.display = "none";
      document.body.style.overflow = "";
    }
    let payload = {
      user_type: `${selectedType}`,
      open_task: pref.includes("Open Task") ? 1 : 0,
      active_task: pref.includes("Active Task") ? 1 : 0,
      completed_task: pref.includes("Completed Task") ? 1 : 0,
      cancelled_task: pref.includes("Cancelled Task") ? 1 : 0,
      archived_task: pref.includes("Archieved Task") ? 1 : 0,
      reported_task: pref.includes("Reported Task") ? 1 : 0,
      resolved_task: pref.includes("Resolved Task") ? 1 : 0,

      page: 1,
      limit: 10,
    };
    dispatch(updateMyTaskFilter({
      "Open Task": pref.includes("Open Task") ? 1 : 0,
      "Active Task": pref.includes("Active Task") ? 1 : 0,
      "Completed Task": pref.includes("Completed Task") ? 1 : 0,
      "Cancelled Task": pref.includes("Cancelled Task") ? 1 : 0,
      "Archieved Task": pref.includes("Archieved Task") ? 1 : 0,
      "Reported Task": pref.includes("Reported Task") ? 1 : 0,
      "Resolved Task": pref.includes("Resolved Task") ? 1 : 0,
    }))
    let payloadPage = {
      type: "myTask",
      currentPage: {
        page: 1,
        limit: 10,
      },
    };
    dispatch(updatePagination(payloadPage));
   
    dispatch(getTask(payload));
  };

  const onChange = (e) => {
    setPref(e)
  };
  const handleClearAll = () => {
    if (window.screen.width < 768) {
      props.filterRef.current.style.display = "none";
      document.body.style.overflow = "";
    }
    dispatch(
      clearAll({
        payload: {
          "Open Task": 0,
          "Active Task": 0,
          "Completed Task": 0,
          "Cancelled Task": 0,
          "Archieved Task": 0,
          "Reported Task": 0,
          "Resolved Task": 0,
        },
        type: "myTaskFilter",
      })
    );
    let payload = {
      user_type: `${selectedType}`,
      open_task: 0,
      active_task: 0,
      completed_task: 0,
      cancelled_task: 0,
      archived_task: 0,
      reported_task: 0,
      resolved_task: 0,
      page: 1,
      limit: 10,
    };
  setPref([])
    dispatch(getTask(payload));
    let payloadPage = {
      type: "myTask",
      currentPage: {
        page: 1,
        limit: 10,
      },
    };
    dispatch(updatePagination(payloadPage));
  };
  return (
    <>
      <Form
        {...formItemLayout}
        form={myTaskForm}
        name="MyTaskFilter-Form"
        onFinish={handleSubmit}
      >
        <FilterWrapper className="filter-section">
          <div className="filter-header">
            <div className="title">Filters</div>
            <span
              onClick={() => {
                props.filterRef.current.style.display = "none";
                document.body.style.overflow = "";
              }}
              className="icon-cross"
            ></span>
          </div>
          <TaskTitle className="filter-title">
            <IntlMessages id="task_status" />
          </TaskTitle>
          <div>
            <Form.Item name="allfilter" valuePropName="checked">
              <Checkbox.Group options={plainOptions} value={pref} onChange={onChange} />

            </Form.Item>

          </div>
       <div className="filter-footer">
            <Divider />
            <Button
              className="apply-btn btn btn-border"
              style={{ float: "left" }}
              // onClick={() => handleSubmit()}
              htmlType="submit"
              disabled={userStatus === 3}
            >
              <IntlMessages id="button.apply" />
            </Button>
            <Button
              className="clear-btn btn btn-clear"
              onClick={() => handleClearAll()}
              style={{ float: "right" }}
              disabled={userStatus === 3}
            >
              <IntlMessages id="clear_all" />
            </Button>
          </div>
        </FilterWrapper>
      </Form>

    </>
  );
};

export default Filter;


