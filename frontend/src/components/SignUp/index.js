import React from "react";
import moment from "moment";
import { Form, Input, Checkbox, DatePicker, Button } from "antd";
import bussiness from "../../assets/images/bussiness1-grey.svg";
import freelancer from "../../assets/images/freelancer1-grey.svg";
import freelancerBlue from "../../assets/images/freelancer1.svg";
import bussinessBlue from "../../assets/images/bussiness1.svg";

import { useState, useEffect } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
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
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import authAction from "@iso/redux/auth/actions";
import IntlMessages from "@iso/components/utility/intlMessages";
import {
  AppConstant,
  NameRegex,
  PasswordStrengthRegex,
  PhoneNumberMaskRegex,
} from "@iso/config/constant";
import { Alert } from "antd";

const { signup, signupValue } = authAction;
const SignUp = () => {
  let authMessage = useSelector((state) => state.Auth.signUpMessage);
  let signupValues = useSelector((state) => state.Auth.signup);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("BUSINESS");
  const [age, setAge] = useState(13);
  const [nemIdVerify, setNemIdVerify] = useState(false);
  const [nemId, setNemId] = useState(null);

  let nemIdData = useSelector((state) => state.Auth.nemId_data);
  if (nemIdData && !nemIdVerify) {
    const verified = nemIdData.verified ? nemIdData.verified : false;
    const nemID = nemIdData.sub_nemid ? nemIdData.sub_nemid : null;

    setNemIdVerify(verified);
    setNemId(nemID);
  }
  const history = useHistory();

  const baseURL = process.env.REACT_APP_API_URL;
  const toggleClass = (e) => {
    setUserType(e);
  };
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
  const [value, setValue] = useState();
  // To disable submit button at the beginning.
  useEffect(() => {
    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem("signupValues");
    let data = JSON.parse(retrievedObject);
    if (JSON.parse(retrievedObject)) {
      form.setFieldsValue({
        fullname: data.fullname,
        email: data.email,
        date: data.date ? moment(`${data.date}`) : null,
      });
    }
    handleDateValidation(data?.date && moment(`${data.date}`));
    forceUpdate({});
  }, []);

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  }

  const handleLogin = (data) => {
    localStorage.clear();

    let datee = moment(value).format("YYYY-MM-DD");
    let payload = {
      full_name: data.fullname,
      birth_date: `${datee}`,
      sub_nemid: nemId,
      nemid_verified: nemIdVerify ? 1 : 0,
      email: data.email,
      work_as: `${userType}`,
      password: data.password,
      confirm_password: data.ConfirmPassword,
    };
    dispatch(signup(payload, history));
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleDateValidation = (val) => {
    setValue(val);

    var today = new Date();
    var birthDate = new Date(moment(val).format("YYYY-MM-DD"));
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  };
  const handleSingup = () => {
    var now = new Date().getTime();
    localStorage.setItem("setupTime", now);
    let data = form.getFieldsValue([
      "fullname",
      "password",
      "email",
      "date",
      "ConfirmPassword",
    ]);
    localStorage.setItem("signupValues", JSON.stringify(data));
    //dispatch(signupValue({data: data}))
    var hours = 1; // to clear the localStorage after 1 hour(if someone want to clear after 8hrs simply change hours=8)
    var now = new Date().getTime();
    localStorage.setItem("setupTime", now);
  };
  var hours = 1; // to clear the localStorage after 1 hour(if someone want to clear after 8hrs simply change hours=8)
  var now = new Date().getTime();
  var setupTime = localStorage.getItem("setupTime");
  if (localStorage.getItem("setupTime")) {
    if (now - setupTime > (hours / 12) * 60 * 60 * 1000) {
      localStorage.clear();
    }
  } else {
    localStorage.setItem("setupTime", now);
  }
  return (
    <>
      <SignupWrapper className='wrapper'>
        <LeftBlock className='sign-up-left'>
          <LeftBlockImg className='sign-up-img' src={bg} />
        </LeftBlock>
        <RightBlock className='sign-up-right'>
          <div className='form-inner-wrapper'>
            <MenuLink>
              <LogoImg src={logo} alt='logo-form-img' />
            </MenuLink>
            <Heading>
              <IntlMessages id='page.signUpButton' />
            </Heading>

            <FormWrapper>
              <Form
                form={form}
                name='horizontal_login'
                onFinish={handleLogin}
                layout='inline'
                {...layout}
                initialValues={{ remember: true }}
              >
                {authMessage ? (
                  <Alert
                    message={authMessage}
                    className='w-40'
                    type='warning'
                    showIcon
                  />
                ) : (
                  ''
                )}
                <Form.Item
                  className='w-50'
                  label={<IntlMessages id='antInput.label.fullName' />}
                  name='fullname'
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: AppConstant.FormValidation.nameRequired,
                    },
                    {
                      pattern: NameRegex,
                      message: AppConstant.FormValidation.nameValid,
                    },
                  ]}
                >
                  <Input placeholder='Full Name' />
                </Form.Item>
                <Form.Item
                  label={<IntlMessages id='antInput.label.email' />}
                  name='email'
                  type='email'
                  onChange={(e) => handleEmail(e)}
                  rules={[
                    {
                      required: true,
                      message: AppConstant.FormValidation.emailRequired,
                    },
                    {
                      type: 'email',
                      message: AppConstant.FormValidation.emailInvalid,
                    },
                  ]}
                  value={email}
                >
                  <Input placeholder='email@example.com' />
                </Form.Item>
                <Form.Item
                  className='w-50'
                  name='date'
                  label={<IntlMessages id='antInput.label.dateOfBirth' />}
                  rules={[
                    {
                      required: true,
                      message: <IntlMessages id='form.label.dobReqMsg' />,
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (age >= 13) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          AppConstant.FormValidation.ageInvalid
                        );
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    disabledDate={disabledDate}
                    onChange={handleDateValidation}
                    className='birth-date'
                    placeholder='Select date (YYYY-MM-DD)'
                  />
                </Form.Item>
                <Form.Item
                  className='nem-id'
                  label='NemID Authorization'
                  name='nemid'
                  rules={[
                    {
                      required: !nemIdVerify && age <= 18,
                      message: <IntlMessages id='form.label.nemid-msg' />,
                    },
                  ]}
                >
                  <Input
                    placeholder={
                      nemIdVerify ? 'Verified' : 'NemID Authorization'
                    }
                    disabled={nemIdVerify}
                  />
                  <Button
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    disabled={nemIdVerify}
                    className='verify-btn'
                    type='primary'
                    href={baseURL + 'auth/oidc'}
                    onClick={handleSingup}
                  >
                    verify
                  </Button>
                </Form.Item>
                <Form.Item
                  className='w-100'
                  style={{ width: '100%' }}
                  label={<IntlMessages id='antInput.label.pleaseSelect' />}
                  tooltip={{
                    title: <IntlMessages id='form.label.signup-title' />,
                    icon: <InfoCircleOutlined />,
                  }}
                >
                  <div className='select-items'>
                    <div
                      className={
                        userType == 'BUSINESS' ? 'item active' : 'item'
                      }
                      onClick={() => toggleClass('BUSINESS')}
                    >
                      <img
                        src={
                          userType === 'BUSINESS' ? bussinessBlue : bussiness
                        }
                        alt='img-1'
                      />
                      <span>
                        <IntlMessages id='SignUp.Bussiness' />
                      </span>
                    </div>
                    <div
                      className={
                        userType == 'FREELANCE' ? 'item active' : 'item'
                      }
                      onClick={() => toggleClass('FREELANCE')}
                    >
                      <img
                        src={
                          userType === 'FREELANCE' ? freelancerBlue : freelancer
                        }
                        alt='img-2'
                      />
                      <span>
                        <IntlMessages id='SignUp.Freelancer' />
                      </span>
                    </div>
                  </div>
                </Form.Item>
                <Form.Item
                  className='w-50'
                  label={<IntlMessages id='antInput.label.password' />}
                  name='password'
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
                  <Input.Password placeholder='Password' />
                </Form.Item>
                <Form.Item
                  label={<IntlMessages id='antInput.label.confirmPassword' />}
                  name='ConfirmPassword'
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: AppConstant.FormValidation.confirmPassword,
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          AppConstant.FormValidation.passwordMatch
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder='Confirm Password' />
                </Form.Item>
                <Form.Item
                  className='terms-condition'
                  name='terms_condition'
                  rules={[
                    {
                      required: true,
                      transform: (value) => value || undefined,
                      type: 'boolean',
                      message: AppConstant.FormValidation.terms_condition,
                    },
                  ]}
                  valuePropName='checked'
                >
                  <Checkbox>
                    <IntlMessages id='page.signUpTermsConditionsnew' />{' '}
                    <Link
                      to='/termsAndConditions'
                      target='_blank'
                      style={{ fontWeight: 'normal' }}
                    >
                      {' '}
                      <IntlMessages id='TermsandConditions' />{' '}
                    </Link>{' '}
                    <IntlMessages id='ofMarketplace' />
                  </Checkbox>
                </Form.Item>
                <div style={{ width: '100%' }}>
                  <Button htmlType='submit' className='btn sign-up-btn'>
                    <IntlMessages id='page.signUpButton' />
                  </Button>
                </div>
                <span className='already-ac'>
                  <IntlMessages id='SignUp.checkBoxText' />
                  <MenuLink
                    href={`${process.env.REACT_APP_NAME}/client`}
                    style={{
                      display: 'block',
                      marginTop: '0',
                      fontWeight: '700',
                      letterSpacing: '0.3px',
                    }}
                    className='continue-login'
                  >
                    <IntlMessages id='page.logInButton' />
                  </MenuLink>
                </span>
                <Form.Item>
                  {/* <span className="already-ac">
                    Resend Verification Link?
                    <MenuLink
                      style={{
                        display: "block",
                        marginTop: "0",
                        fontWeight: "700",
                        letterSpacing: "0.3px",
                      }}
                      className="continue-login"
                      onClick={() => dispatch(verify({ email: email }))}
                    >
                      Resend
                    </MenuLink>
                  </span> */}
                </Form.Item>
              </Form>
            </FormWrapper>
          </div>
        </RightBlock>
      </SignupWrapper>
    </>
  );
};

export default SignUp;
