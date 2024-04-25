import React, { PureComponent } from "react";
import moment from "moment";
import {
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import Datepicker from "@iso/components/uielements/datePicker";
import Box from "@iso/components/utility/box";
import isEmpty from "lodash/isEmpty";
import { Form, Empty } from "antd";

export default class UsersChart extends PureComponent {
  render() {
    const dateFormatList = ["YYYY-MM-DD", "YYYY-MM-DD"];
    const { userChartData, signUp_start_date, signUp_end_date } = this.props;
    return (
      <Box
        title={"User Sign-ups"}
        backGColor={"#FFFFFF"}
        borderBottom={"0px"}
        renderChildren={
          <div className="d-flex chart-wrapper">
            {/* <Form.Item label={"Start Date"}> */}
              <Datepicker
                format={dateFormatList}
                name="signUp_start_date"
                value={moment(signUp_start_date, "YYYY-MM-DD")}
                placeholder="Pick Date"
                allowClear={false}
                onChange={(e, val) =>
                  this.props.handleDate(e, val, "signUp_start_date")
                }
                disabledDate={(current) => {
                  return current > moment();
                }}
              />
            {/* </Form.Item> */}
            <span style={{margin: "5px"}}>to</span>
            {/* <Form.Item label={"End Date"}> */}
              <Datepicker
                format={dateFormatList}
                placeholder="Pick Date"
                allowClear={false}
                name="signUp_end_date"
                value={moment(signUp_end_date, "YYYY-MM-DD")}
                onChange={(e, val) =>
                  this.props.handleDate(e, val, "signUp_end_date")
                }
                disabledDate={(current) => {
                  return current > moment();
                }}
              />
            {/* </Form.Item> */}
          </div>
        }
      >
        <ResponsiveContainer width="100%" height={200}>
          {isEmpty(userChartData) ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <BarChart
              width={500}
              height={145}
              data={userChartData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              barSize={70}
              barCategoryGap={10}
            >
              <XAxis
                dataKey="name"
                scale="point"
                padding={{ left: 40, right: 40 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="0 0" />

              <Bar dataKey="Users" fill={"#2AABE1"} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </Box>
    );
  }
}
