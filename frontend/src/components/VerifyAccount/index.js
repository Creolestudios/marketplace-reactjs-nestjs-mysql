import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import authAction from "@iso/redux/auth/actions";
import { Form, Input, Button } from "antd";
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
const { verifyAccountLink } = authAction;

const VerifyAccount = () => {
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
  };
  const dispatch = useDispatch();
  const history = useHistory();

  const [user_id, setUser_id] = useState("");
  const [token_data, setToken] = useState("");

  useEffect(() => {
    
    const url=window.location.pathname;
    const token =url.split("/").slice(-1);
    const actualToken=token[0].replace('=',''); 
    let payload = {
      link: `${actualToken}1`,
    };
      dispatch(verifyAccountLink(payload, history));
  }, []);

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
          <Heading className="section-title"><IntlMessages id="account.verified" /></Heading>
          
          <FormWrapper className="forgot-section">
          <PeraGraph className="pera">
          <IntlMessages id="account.verified.msg" />
          </PeraGraph>
            <Form {...layout} name="emasi" initialValues={{ remember: true }}>
              <Form.Item {...tailLayout}>
                <span className="info-ac">
                  <MenuLink href={`${process.env.REACT_APP_NAME}/client`}>
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

export default VerifyAccount;
