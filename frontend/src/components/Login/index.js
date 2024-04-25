import { Form, Input, Checkbox, Divider, Button, message } from "antd";
import { useState } from "react";
// import { createFromIconfontCN } from "@ant-design/icons";
import { MenuLink } from "../../CommonStyle";
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
import logoFormImg from "@iso/assets/images/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import authAction from "@iso/redux/auth/actions";
import { Link, Redirect, useHistory } from "react-router-dom";
import IntlMessages from "@iso/components/utility/intlMessages";
import {
  AppConstant,
  NameRegex,
  PasswordStrengthRegex,
  PhoneNumberMaskRegex,
} from "@iso/config/constant";
import { Alert } from "antd";

const { login , guest } = authAction;
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

  // const IconFont = createFromIconfontCN({
  //   scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js",
  // });
  const baseURL = process.env.REACT_APP_API_URL;

  const [email] = useState();
  // const [password, setPassword] = useState("");
  function onFinish(value) {
    if (value.remember_me) {
      localStorage.setItem("remember_me", value.remember_me);
    }
    let payload = {
      email: value.email,
      password: value.password,
    };

    dispatch(login(payload, history, "client"));
  }
  const handleGuest = () => {
    let payload = {
      unique_id: AppConstant.unique_id
    };

    dispatch(guest(payload, history, "client"));
  }
  return (
    <>
      <LoginWrapper className="wrapper">
        <LeftBlock>
          <LeftBlockImg src={bg} />
        </LeftBlock>
        <RightBlock>
          <div className="form-inner-wrapper">
            <MenuLink>
              <LogoImg src={logoFormImg} alt="logo-form-img" />
            </MenuLink>

            <Heading>
              <IntlMessages id="login.heading" />
            </Heading>
            <FormWrapper>
              <Form
                {...layout}
                name="emasi"
                initialValues={{
                  remember_me: false,
                }}
                onFinish={onFinish}
              >
                {authMessage ? (
                  <Alert
                    type="warning"
                    showIcon
                    closable
                    message={authMessage}
                    className="w-40"
                  />
                ) : (
                  ""
                )}

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
                  <Input placeholder="email@example.com" />
                </Form.Item>

                <Form.Item
                  label={<IntlMessages id="antInput.label.password" />}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: AppConstant.FormValidation.passwordRequired,
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
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
                  <Button
                    className="btn btn-login"
                    type="primary"
                    htmlType="submit"
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <IntlMessages id="page.logInButton" />
                  </Button>
                  <span className="info-ac">
                    <IntlMessages id="page.signInCreateAccount" />{" "}
                    <MenuLink href={`${process.env.REACT_APP_NAME}/client/SignUp`}>
                      {" "}
                      <IntlMessages id="page.signInRegisterHere" />
                    </MenuLink>
                  </span>
                  <Link
                    to="/client/forgotpassword"
                    style={{ display: "inline-block", marginTop: "10px" }}
                    className="login-form-forgot"
                  >
                    <IntlMessages id="page.forgetPassSubTitle" />
                  </Link>
                </Form.Item>
                <Divider>
                  {" "}
                  <IntlMessages id="OR" />
                </Divider>
                <Button
                  className="btn btn-social-fb"
                  href={baseURL + "auth/facebook"}
                >
                  <i className="icon-facebook"></i>
                  <IntlMessages id="page.loginWithFacebook" />
                </Button>

                <Button
                  className="btn btn-social-google"
                  href={baseURL + "auth/google"}
                >
                  <i className="icon-google"></i>
                  <IntlMessages id="page.loginWithGoogle" />
                </Button>              
                <MenuLink className="continue-login" onClick={handleGuest}>
                  <IntlMessages id="page.continueWithoutLogin" />
                </MenuLink>
              </Form>
            </FormWrapper>
          </div>
        </RightBlock>
      </LoginWrapper>
    </>
  );
};

export default Login;
