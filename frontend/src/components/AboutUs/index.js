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

const { login, changePassword } = authAction;
const Login = () => {
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

  const [email] = useState();
  // const [password, setPassword] = useState("");
  function onFinish(value) {
    let payload = {
      current_password: value.Current_password,
      new_password: value.password,
      new_confirm_password: value.Confirm_Password,
    };

    dispatch(changePassword(payload, history));
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
              <IntlMessages id="aboutUs" />
            </Heading>
            <FormWrapper>
              <p>
                <IntlMessages id="lorem" />
              </p>
              <p>
                <IntlMessages id="lorem" />
              </p>
              <p>
                <IntlMessages id="lorem" />
              </p>
            </FormWrapper>
          </div>
        </RightBlock>
      </LoginWrapper>
    </>
  );
};

export default Login;
