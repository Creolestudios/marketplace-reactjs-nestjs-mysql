import React from "react";
import { SmallTitle, ButtonLink, Title } from "../../CommonStyle";
import { Form, Input, Button } from "antd";
import { BottomWrapper } from "../TaskView/style";
import { FormWrapper } from "../SignUp/style";
import TextArea from "antd/lib/input/TextArea";
import IntlMessages from "@iso/components/utility/intlMessages";


const TaskPlaceBid = () => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: {
      xs: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
    },
  };
  return (
    <>
      <BottomWrapper className="place-bid">
        <SmallTitle className="title"><IntlMessages id="placeBid" /></SmallTitle>
        <div className="bid">
        <FormWrapper>
              <Form
                form={form}
                name="edit-bid"
                layout="inline"
                {...layout}
                initialValues={{ remember: true }}
              >
                <Form.Item
                  className="w-100"
                  label="Bid"
                  name="bid"
                  rules={[
                    { required: true, message: <IntlMessages id="task-palce-msg" /> },
                  ]}
                >
                  <Input defaultValue="25 Kr" />
                </Form.Item>
                <Form.Item className="w-100"
                  label={<IntlMessages id="sidebar.messages" />}
                  name="message"
                  rules={[
                    { required: true, message: <IntlMessages id="task-palce-msg" /> },
                  ]}
                >
                  <TextArea
                    placeholder= {<IntlMessages id="input-placeholder1" />}
                    defaultValue="Duis sed ut consectetur mauris, eu venenatis nisl suscipit id. Non viverra pharetra, iaculis leo arcu volutpat arcu adipiscing faucibus. Eu."
                    rows={4}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
                <Button
                  htmlType="submit" 
                  className="info-btn-border btn"
                  type="primary"
                  style={{
                    display: "inline-block",
                    float: "left",
                  }}
                >
                <IntlMessages id="placeBid" />
                </Button>
              </Form>
            </FormWrapper>
          </div>
      </BottomWrapper>
    </>
  );
};

export default TaskPlaceBid;
