import { Form, Input, Checkbox, Button, Alert } from "antd";
import { useState } from "react";
import { createFromIconfontCN } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import IntlMessages from "@iso/components/utility/intlMessages";
import "@iso/assets/scss/Login.scss";
import authAction from "@iso/redux/auth/actions";
// import "containers/TaskDetailsSpecialists/node_modules/assets/style.css";
// import { Button } from "../../../CommonStyle";
import {
  LoginWrapper,
  LeftBlock,
  LeftBlockImg,
  RightBlock,
  LogoImg,
  Heading,
  FormWrapper,
} from "@iso/components/Login/Login_style";
import bg from "@iso/assets/images/login-left-img.png";
import logoFormImg from "@iso/assets/images/logo.png";
import { AppConstant, PasswordStrengthRegex } from "@iso/config/constant";
const { login } = authAction;
const Login = () => {
  let authMessage = useSelector((state) => state.Auth.loginMessage);
  let history = useHistory();
  const dispatch = useDispatch();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
  };

  const IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  });

  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  function onFinish(value) {
    if (value.remember_me) {
      localStorage.setItem("remember_me", value.remember_me);
    }
    let payload = {
      email: value.email,
      password: value.password,
    };

    dispatch(login(payload, history, "admin"));
  }
  return (
    <>
      <LoginWrapper className="wrapper">
        <LeftBlock>
          <LeftBlockImg src={bg} />
        </LeftBlock>
        <RightBlock className="form-wrapper">
          <LogoImg src={logoFormImg} alt="logo-form-img" />
          <Heading
            style={{
              textTransform: "capitalize",
            }}
          >
            Log in
          </Heading>
          <FormWrapper className="admin-form-wrapper">
            {authMessage ? (
              <Alert
                banner
                message={authMessage}
                className="w-40"
                closable
                showIcon
              />
            ) : (
              ""
            )}
            <Form
              {...layout}
              name="emasi"
              initialValues={{
                remember_me: false,
              }}
              onFinish={onFinish}
              className="admin-form"
            >
              <Form.Item
                label={<IntlMessages id="antInput.label.email" />}
                name="email"
                rules={[
                  {
                    required: true,
                    message: AppConstant.FormValidation.emailRequired,
                  },
                  {
                    type: "email",
                    message: AppConstant.FormValidation.emailInvalid,
                  },
                ]}
                value={email}
              >
                <Input
                  style={{ borderRadius: "4px" }}
                  placeholder="abcd@gmail.com"
                />
              </Form.Item>

              <Form.Item
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
                <Input.Password
                  style={{ borderRadius: "4px" }}
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                name="remember_me"
                className="remember-text"
                valuePropName="checked"
                style={{ textAlign: "left", marginBottom: "35px" }}
              >
                <Checkbox>
                  <IntlMessages id="page.signInRememberMe" />
                </Checkbox>
              </Form.Item>
              <Form.Item {...tailLayout}>
                {/* <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  Login
                </Button> */}
                <Form.Item {...tailLayout}>
                  <Button
                    style={{
                      borderRadius: "4px",
                      marginBottom: "20px",
                    }}
                    className="btn btn-login admin-btn-login"
                    type="primary"
                    htmlType="submit"
                  >
                    <IntlMessages id="page.logInButton" />
                  </Button>
                </Form.Item>
                {/* <a
                  style={{ display: "block", marginTop: "5px" }}
                  className="login-form-forgot"
                  href=""
                > */}
                <Link
                  to="/admin/forgotpassword"
                  style={{ display: "inline-block", marginTop: "10px" }}
                  className="login-form-forgot"
                >
                  Forgot Password?
                </Link>
                {/* </a> */}
              </Form.Item>
            </Form>
          </FormWrapper>
        </RightBlock>
      </LoginWrapper>
    </>
  );
};

export default Login;
