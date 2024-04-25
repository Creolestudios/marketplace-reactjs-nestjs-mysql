import React from "react";
import { Head, LeftSide, RightSide, Area, AreaName } from "./style";
import Tab from "@iso/components/Tab";
import { Select, Pagination } from "antd";
import IntlMessages from "@iso/components/utility/intlMessages";
import topbarAction from "@iso/redux/userTypeAndFilter/actions";
import { useSelector, useDispatch } from "react-redux";
import task from "@iso/redux/task/actions";

const { Option, OptGroup } = Select;
const { userType, clearAll } = topbarAction;

const Topbar = ({ filter, options }) => {
  const { getTask } = task;
  let type = useSelector((state) => state.userTypeAndFilter);
  const { profile } = useSelector((state) => state.Profile);
  const dispatch = useDispatch();

  function handleChange(value) {
    dispatch(userType(value));
    let payload = {
      user_type: value,
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

    dispatch(getTask(payload));
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
  }

  return (
    <Head>
      <LeftSide>
        <Tab />
        <Area>
          <i className="icon-location"> </i>
          <AreaName>{profile.city ? profile.city !== "null"? profile.city : "Copenhagen" : "Copenhagen"} </AreaName>
        </Area>
      </LeftSide>
      <RightSide active={filter} className="task-detail-rigth-side">
        <Select defaultValue={type.userType} onChange={handleChange}>
          {options.map((each, index) => (
            <Option value={each.toLowerCase()} key={index}>
              {" "}
              <IntlMessages id={`antTable.title.${each}`} />{" "}
            </Option>
          ))}
        </Select>
      </RightSide>
    </Head>
  );
};

export default Topbar;
