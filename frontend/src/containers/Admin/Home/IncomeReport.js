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

export default class IncomeReport extends PureComponent {
  render() {
    const dateFormatList = ["YYYY-MM-DD", "YYYY-MM-DD"];
    const { incomeChartData, income_start_date, income_end_date } = this.props;
    return (
      <Box
        title={"Income Report"}
        backGColor={"#FFFFFF"}
        borderBottom={"0px"}
        renderChildren={
          <div className="d-flex flex-nowrap">
            {/* <Form.Item label={"Start Date"}> */}
            <Datepicker
              format={dateFormatList}
              placeholder="Pick Date"
              name="income_start_date"
              allowClear={false}
              value={moment(income_start_date, "YYYY-MM-DD")}
              onChange={(e, val) =>
                this.props.handleDate(e, val, "income_start_date")
              }
              disabledDate={(current) => {
                return current > moment();
              }}
            />
            {/* </Form.Item> */}
            <span style={{ margin: "5px" }}>to</span>
            {/* <Form.Item label={"End Date"}> */}
            <Datepicker
              format={dateFormatList}
              placeholder="Pick Date"
              name="income_end_date"
              allowClear={false}
              value={moment(income_end_date, "YYYY-MM-DD")}
              onChange={(e, val) =>
                this.props.handleDate(e, val, "income_end_date")
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
          {isEmpty(incomeChartData) ? (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <BarChart
              width={500}
              height={145}
              data={incomeChartData}
              margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
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

              <Bar dataKey="Income" fill={"#FCD50A"} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </Box>
    );
  }
}
