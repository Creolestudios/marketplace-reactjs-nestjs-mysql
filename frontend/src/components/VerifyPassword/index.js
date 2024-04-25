import React from "react";
import { Form, Input, Button } from "antd";
import { useState, useEffect } from "react";
import { SignupWrapper, FormWrapper, LeftBlockImg } from "./style";
import {
  LeftBlock,
  RightBlock,
  LogoImg,
  Heading,
} from "@iso/components/Login/Login_style";
import { MenuLink } from "../../CommonStyle";
import logo from "../../assets/images/logo.svg";
import bg from "../../assets/images/signup-left-img.png";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import authAction from "@iso/redux/auth/actions";
import IntlMessages from "@iso/components/utility/intlMessages";
import { AppConstant, PasswordStrengthRegex } from "@iso/config/constant";
import { Alert } from "antd";
  
const { resetForgotPassword } = authAction;
const VerifyPassword = () => {
  let authMessage = useSelector((state) => state.Auth.resetForgotPasswordMessage);

  const dispatch = useDispatch();
  const history = useHistory();

  const layout = {
    labelCol: {
      xs: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
    },
  };

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});
  const [user_id, setUser_id] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    forceUpdate({});
    const paramsData = new URLSearchParams(window.location.search);
    const token = paramsData.get("token");
    const userId = paramsData.get("user_id");
    setUser_id(userId);
    setToken(token);
  }, [user_id, token]);

  const handleReset = (data) => {
    let payload = {
      link: `?user_id=${user_id}&token=${token}`,
      new_password: data.password,
      new_confirm_password: data.ConfirmPassword,
    };
    dispatch(resetForgotPassword(payload, history));
  };

  return (
    <>
      <SignupWrapper className="wrapper">
        <LeftBlock className="sign-up-left">
          <LeftBlockImg className="sign-up-img" src={bg} />
        </LeftBlock>
        <RightBlock className="sign-up-right">
          <div className="form-inner-wrapper">
            <MenuLink>
              <LogoImg src={logo} alt="logo-form-img" />
            </MenuLink>
            <Heading>
              <IntlMessages id="page.resetPassword" />
            </Heading>
            <FormWrapper>
            {authMessage ?<Alert message={authMessage}  className='w-40' type="success" showIcon />:""}

              <Form
                form={form}
                name="horizontal_login"
                onFinish={handleReset}
                layout="inline"
                {...layout}
                initialValues={{ remember: true }}
              >
                <Form.Item
                  className="w-50"
                  label={<IntlMessages id="antInput.label.password" />}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: AppConstant.FormValidation.passwordRequired,
                    },
                    {
                      pattern: PasswordStrengthRegex,
                      message: AppConstant.FormValidation.passwordValid,
                    },
                  ]}
                >
                  <Input.Password placeholder= {<IntlMessages id="password" />} />
                </Form.Item>
                <Form.Item
                  label={<IntlMessages id="antInput.label.confirmPassword" />}
                  name="ConfirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: AppConstant.FormValidation.confirmPassword,
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          AppConstant.FormValidation.passwordMatch
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder={<IntlMessages id="antInput.label.confirmPassword" />} />
                </Form.Item>
                <div style={{ width: "100%" }}>
                  <Button htmlType="submit" className="btn sign-up-btn">
                    <IntlMessages id="page.resetPassword" />
                  </Button>
                </div>
              </Form>
            </FormWrapper>
          </div>
        </RightBlock>
      </SignupWrapper>
    </>
  );
};

export default VerifyPassword;
