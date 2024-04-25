import React from "react";
import { Form, Input, Button } from "antd";
import IntlMessages from "@iso/components/utility/intlMessages";
import { useState, useEffect } from "react";
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
import { useDispatch,useSelector } from "react-redux";
import authAction from "@iso/redux/auth/actions";
import { useHistory, useLocation } from "react-router-dom";
import {
    AppConstant,
    NameRegex,
    PasswordStrengthRegex,
    PhoneNumberMaskRegex,
  } from "@iso/config/constant";
import { Alert } from "antd";

const ResetPassword = () => {
  const location = useLocation();
  const { pathname } = location;
  let testPath = pathname.split("/")

  let selectedPath = pathname.split("/").slice(-1)[0];
  let authMessage = useSelector((state) => state.Auth.resetForgotPasswordMessage);

const { resetForgotPassword } = authAction;

  const dispatch = useDispatch();
  const history = useHistory();

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
      link: `${selectedPath}`,
      new_password: data.password,
      new_confirm_password: data.ConfirmPassword,
    };
    dispatch(resetForgotPassword(payload, history));
  };
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
            <Heading className="section-title"><IntlMessages id="form.label.resetPassword" /></Heading>
            
            <FormWrapper className="forgot-section">
            <PeraGraph className="pera">
            <IntlMessages id="form.lable.newPassword" />
            </PeraGraph>
           
              <Form {...layout} name="emasi" initialValues={{ remember: true }} onFinish={handleReset}>
              {authMessage ?<Alert type="warning" showIcon  message={authMessage}  className='w-40' />:""}
              <IntlMessages id="form.labelPassword">
                  {(placeholder) => (
                    <Form.Item
                      label={<IntlMessages id="form.labelPassword" />}
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
                      <Input.Password placeholder={placeholder} />
                    </Form.Item>
                  )}
                </IntlMessages>
                <IntlMessages id="form.label.confirmpassword">
                  {(placeholder) => (
                   <Form.Item
                   label={<IntlMessages id="form.label.confirmpassword" />}
                   name="ConfirmPassword"
                   rules={[
                     {
                       required: true,
                       message: AppConstant.FormValidation.passwordRequired,
                     },
                     {
                       pattern: PasswordStrengthRegex,
                       message: AppConstant.FormValidation.passwordValid,
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
                      <Input.Password placeholder={placeholder} />
                    </Form.Item>
                  )}
                </IntlMessages>                
                <Button className="btn reset" htmlType="submit">
                <IntlMessages id="page.saveButton" />
                </Button>
              </Form>
            </FormWrapper>
          </div>
        </RightBlock>
      </ForgotPasswordWrapper>
    </>
  );
};

export default ResetPassword;
