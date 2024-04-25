import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import TextArea from "antd/lib/input/TextArea";
import { Form, Input, Button } from "antd";
import { BottomWrapper } from "../TaskView/style";
import { SmallTitle } from "../../CommonStyle";
import { BidFormWrapper } from "./style";
import taskAction from "@iso/redux/task/actions";
import IntlMessages from "@iso/components/utility/intlMessages";
import { AppConstant, zipCodeRegex, BudgetNumber } from "@iso/config/constant";

const { placeBid } = taskAction;

const TaskEdit = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  //bid_amount
  const [form] = Form.useForm();
  form.setFields([
    {
      name: "message",
      value: props.message,
    },
  ]);
  form.setFields([
    {
      name: "bid",
      value: props.amount,
    },
  ]);
  const layout = {
    labelCol: {
      xs: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
    },
  };
  //props.data.task.id
  const handleSubmit = (value) => {
    let payload = {
      task_id: props.data.task.id,
      bid_amount: parseFloat(value.bid),
      bid_message: value.message,
    };
    dispatch(placeBid(payload, history));
    props.setisEditBid(false);
  };
  return (
    <>
      <BottomWrapper style={{ margin: "0" }}>
        <SmallTitle className="title">
          <IntlMessages id={props.amount ? "taskeditbid" : "taskplacebid"} />
        </SmallTitle>
        <div className="bid bid-box">
          <BidFormWrapper>
            <Form
              onFinish={handleSubmit}
              form={form}
              name="edit-bid"
              layout="inline"
              {...layout}
              type="number"
              initialValues={{ remember: true }}
            >
              <IntlMessages id="input-placeholder">
                {(placeholder) => (
                  <Form.Item
                    className="w-100"
                    label={<IntlMessages id="antTable.title.Bid" />}
                    name="bid"
                    rules={[
                      {
                        required: true,
                        message: <IntlMessages id="taskedit-msg" />,
                      },
                      {
                        pattern: BudgetNumber,
                        message: AppConstant.FormValidation.budgetRange,
                      },
                    ]}
                  >
                    <Input placeholder={placeholder} />
                  </Form.Item>
                )}
              </IntlMessages>

              <IntlMessages id="input-placeholder1">
                {(placeholder) => (
                  <Form.Item
                    className="w-100"
                    label={<IntlMessages id="feedback.alert.message" />}
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: <IntlMessages id="taskedit-msg1" />,
                      },
                    ]}
                  >
                    <TextArea
                      placeholder={placeholder}
                      rows={4}
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  </Form.Item>
                )}
              </IntlMessages>

              <Button
                htmlType="submit"
                className="info-btn-border btn"
                type="primary"
                style={{
                  display: "inline-block",
                  float: "left",
                }}
              >
                <IntlMessages
                  id={props.amount ? "form.label.save" : "taskplacebid"}
                />
              </Button>
            </Form>
          </BidFormWrapper>
        </div>
      </BottomWrapper>
    </>
  );
};

export default TaskEdit;
