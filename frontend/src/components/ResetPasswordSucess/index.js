import { Form, Input, Button } from "antd";
import { useState } from "react";
import IntlMessages from "@iso/components/utility/intlMessages";
import {
  LeftBlock,
  LeftBlockImg,
  RightBlock,
  LogoImg,
  Heading,
  FormWrapper,
} from "@iso/components/Login/Login_style";
import {
  ForgotPasswordWrapper,
  // PeraGraph,
} from "@iso/components/ForgetPassword/style";
import bg from "@iso/assets/images/login-left-img.png";
import logoFormImg from "@iso/assets/images/logo.svg";
import { PeraGraph, MenuLink } from "../../CommonStyle";
const ForgetPassword = () => {
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
  };

  // const IconFont = createFromIconfontCN({
  //   scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  // });

  const [email] = useState();
  // const [password, setPassword] = useState("");

  return (
    <>
      <ForgotPasswordWrapper className="wrapper forgot-wrapper">
        <LeftBlock>
          <LeftBlockImg src={bg} />
        </LeftBlock>
        <RightBlock>
          <div className="form-inner-wrapper">
            <MenuLink>
              <LogoImg src={logoFormImg} alt="logo-form-img" />
            </MenuLink>
            <Heading className="section-title"><IntlMessages id="form.label.password-verify" /></Heading>
            
            <FormWrapper className="forgot-section">
            <PeraGraph className="pera">
              
            </PeraGraph>
              <Form {...layout} name="emasi" initialValues={{ remember: true }}>
                <Form.Item {...tailLayout}>
                  <span className="info-ac">
                    <MenuLink href="\client">
                    <IntlMessages id="return-msg" />
        
                    </MenuLink>
                  </span>
                </Form.Item>
              </Form>
            </FormWrapper>
          </div>
        </RightBlock>
      </ForgotPasswordWrapper>
    </>
  );
};

export default ForgetPassword;
