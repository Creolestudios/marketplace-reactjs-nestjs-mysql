import { Form, Input, Button } from 'antd';
import { useState } from 'react';
import {
  LeftBlock,
  LeftBlockImg,
  RightBlock,
  LogoImg,
  Heading,
  FormWrapper,
} from '@iso/components/Login/Login_style';
import {
  ForgotPasswordWrapper,
  // PeraGraph,
} from '@iso/components/ForgetPassword/style';
import bg from '@iso/assets/images/login-left-img.png';
import logoFormImg from '@iso/assets/images/logo.svg';
import { PeraGraph, MenuLink } from '../../CommonStyle';
import { useDispatch, useSelector } from 'react-redux';
import authAction from '@iso/redux/auth/actions';
import { Link, Redirect, useHistory } from 'react-router-dom';
import IntlMessages from '@iso/components/utility/intlMessages';
import {
  AppConstant,
  NameRegex,
  PasswordStrengthRegex,
  PhoneNumberMaskRegex,
} from '@iso/config/constant';
import { Alert } from "antd";

const { forgotPassword } = authAction;
const ForgetPassword = () => {
  let authMessage = useSelector((state) => state.Auth.forgotMessage);

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

  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  function onFinish(value) {
    let payload = {
      email: value.email,
    };
    dispatch(forgotPassword(payload, history));
  }

  return (
    <>
      <ForgotPasswordWrapper className='wrapper forgot-wrapper'>
        <LeftBlock>
          <LeftBlockImg src={bg} />
        </LeftBlock>
        <RightBlock>
          <div className='form-inner-wrapper'>
            <MenuLink>
              <LogoImg src={logoFormImg} alt='logo-form-img' />
            </MenuLink>
            <Heading className='section-title'>
              <IntlMessages id='page.signInForgotPass' />
            </Heading>

            <FormWrapper className='forgot-section'>
              <PeraGraph className='pera'>
                <IntlMessages id='forgot.resetEmailDetail' />
              </PeraGraph>
            
            

              <Form
                {...layout}
                name='emasi'
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                  {authMessage ?<Alert type="warning" showIcon message={authMessage}  className='w-40'/>:""}
                <Form.Item
                  label={<IntlMessages id='antInput.label.email' />}
                  name='email'
                  
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
                <Button className='btn reset' htmlType='submit'>
                  <IntlMessages id='page.resetPassSubTitle' />
                </Button>
                <span className='info-ac'>
                    <IntlMessages id='forgot.DontAccount' />{' '}
                    <MenuLink href={`${process.env.REACT_APP_NAME}/client`}>
                      <IntlMessages id='forgot.returntoLogin' />
                    </MenuLink>
                  </span>
              </Form>
            </FormWrapper>
          </div>
        </RightBlock>
      </ForgotPasswordWrapper>
    </>
  );
};

export default ForgetPassword;
