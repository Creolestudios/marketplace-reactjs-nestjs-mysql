import { Form, Input, Button } from "antd";
import { useState } from "react";
import IntlMessages from "@iso/components/utility/intlMessages";
import { useDispatch, useSelector } from "react-redux";

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
import authAction from "@iso/redux/auth/actions";
import { Alert } from "antd";

const SignupSucess = () => {
  const { signup, checkAuthorization, verify, nemId } = authAction;

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

  const [email] = useState();
  // const [password, setPassword] = useState("");
  let authMessage = useSelector((state) => state.Auth.signUpMessage);
  let verificationMessage = useSelector((state) => state.Auth.verificationMessage);
  let userEmail = useSelector((state) => state.Auth.userEmail);
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
            <Heading className="section-title"><IntlMessages id="form.label.signup-msg" /></Heading>

            <FormWrapper className="forgot-section">
              <PeraGraph className="pera">{authMessage}</PeraGraph>
              <Form {...layout} name="emasi" initialValues={{ remember: true }}>
                {verificationMessage ? <Alert message={verificationMessage} className='w-40' type="warning" showIcon /> : ""}
                <Form.Item {...tailLayout}>
                  <span className="info-ac">
                    <MenuLink href={`${process.env.REACT_APP_NAME}/client`}
                    ><IntlMessages id="return-msg" /></MenuLink>
                  </span>
                </Form.Item>
                <Form.Item>
                  <span className="already-ac">
                    <IntlMessages id="form.label.resend-link" />
                    <MenuLink
                      style={{
                        display: "block",
                        marginTop: "0",
                        fontWeight: "700",
                        letterSpacing: "0.3px",
                      }}
                      className="continue-login"
                      onClick={() => dispatch(verify({ email: userEmail }))}
                    >
                      <IntlMessages id="resend" />
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

export default SignupSucess;
