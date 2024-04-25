import React, { PureComponent } from "react";
import moment from "moment";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import Box from "@iso/components/utility/box";
import Datepicker from "@iso/components/uielements/datePicker";
import { Form } from "antd";

const style = {
  right: 85,
  bottom: 170,
};

const legend = [1, 2];

export default class TaskChart extends PureComponent {
  render() {
    const { taskReport, tasks_start_date, tasks_end_date } = this.props;

    const dateFormatList = ["YYYY-MM-DD", "YYYY-MM-DD"];

    const COLORS = [
      "#0FC8D3",
      "#D30FB4",
      "#4285F4",
      "#FF5F00",
      "#ED4C5C",
      "#0FD346",
      "#00BBF5",
    ];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };

    return (
      <Box
        title={"Tasks"}
        backGColor={"#FFFFFF"}
        borderBottom={"0px"}
        renderChildren={
          <div className="d-flex flex-nowrap">
            {/* <Form.Item label={"Start Date"}> */}
            <Datepicker
              format={dateFormatList}
              name="tasks_start_date"
              value={moment(tasks_start_date, "YYYY-MM-DD")}
              placeholder="Pick Date"
              allowClear={false}
              onChange={(e, val) =>
                this.props.handleDate(e, val, "tasks_start_date")
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
              allowClear={false}
              name="tasks_end_date"
              value={moment(tasks_end_date, "YYYY-MM-DD")}
              onChange={(e, val) =>
                this.props.handleDate(e, val, "tasks_end_date")
              }
              disabledDate={(current) => {
                return current > moment();
              }}
            />
            {/* </Form.Item> */}
          </div>
        }
      >
        <div style={{ width: "100%", height: 200 }}>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart width={400} height={145}>
              <Pie
                isAnimationActive={false}
                dataKey="value"
                data={taskReport}
                outerRadius={"50%"}
                cx={80}
                cy={80}
                labelLine={false}
                // label={renderCustomizedLabel}
              >
                {taskReport &&
                  taskReport.map((entry, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} key={index} />
                  ))}
              </Pie>
              <Legend
                iconSize={25}
                iconType="plainline"
                width={135}
                height={180}
                layout="vertical"
                verticalAlign="middle"
                wrapperStyle={style}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Box>
    );
  }
}
