import React, { Component } from "react";
import { Row, Col, Typography, Form, Divider } from "antd";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import userpic from "@iso/assets/images/avatar.png";
import LayoutContent from "@iso/components/utility/layoutContent";
import Button from "@iso/components/uielements/button";
import basicStyle from "@iso/assets/styles/constants";
import LayoutContentWrapper from "@iso/components/utility/layoutWrapper";
import Input from "@iso/components/uielements/input";
import { CameraOutlined } from "@ant-design/icons";
import IntlMessages from "@iso/components/utility/intlMessages";
import {
  AppConstant,
  NameRegex,
  PasswordStrengthRegex,
} from "@iso/config/constant";
import { isEmpty } from "lodash";
import profileAdminAction from "@iso/redux/admin/profile/actions";
const { viewProfile, saveProfile } = profileAdminAction;
const { Title } = Typography;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    md: { span: 24 },
    lg: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    md: { span: 22 },
    lg: { span: 17 },
    offset: 3,
  },
};
class MyAccount extends Component {
  state = {
    viewAll: false,
    image_URL: userpic,
    profile_image: "",
    email: "",
    name: "",
    password: "",
    confirm_password: "",
  };
  formRef = React.createRef();
  formRef1 = React.createRef();
  componentDidMount() {
    this.props.viewProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    const { viewProfileData } = this.props;
    if (prevProps.viewProfileData !== viewProfileData) {
      this.formRef.current.setFieldsValue({
        name:
          viewProfileData &&
          viewProfileData.admin &&
          viewProfileData.admin.full_name,
        email:
          viewProfileData &&
          viewProfileData.admin &&
          viewProfileData.admin.email,
        password: "",
        confirm_password: "",
      });
      this.setState({
        name:
          viewProfileData &&
          viewProfileData.admin &&
          viewProfileData.admin.full_name,
        email:
          viewProfileData &&
          viewProfileData.admin &&
          viewProfileData.admin.email,
        password: "",
        confirm_password: "",
        image_URL:
          viewProfileData &&
          viewProfileData.admin &&
          viewProfileData.admin.profile_photo,
      });
    }
  }

  handleViewAll = () => {
    this.setState({
      viewAll: true,
    });
  };

  handleBack = () => {
    this.setState({
      viewAll: false,
    });
  };

  handleClickforDocs = (e) => {
    if (e.target.files[0]) {
      if (
        !["image/png", "image/jpeg", "image/jpg"].includes(
          e.target.files[0].type
        )
      ) {
        // notification.open({
        //   message: 'Please select only image files',
        // });
        return;
      }
      this.setState({
        profile_image: e.target.files[0],
      });
      var file = e.target.files[0];
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);

      reader.onloadend = function (e) {
        this.setState({
          image_URL: [reader.result],
        });
      }.bind(this);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onFinish = (values) => {
    let param = {
      name: values.name,
      profile_image: this.state.profile_image,
    };
    let formData = new FormData();
    Object.keys(param).forEach((key) => formData.append(key, param[key]));
    this.props.saveProfile(formData);
  };

  onFinishPassword = (values) => {
    let param = {
      name: this.state.name,
      password: values.password,
      confirm_password: values.confirm_password,
      profile_image: this.state.profile_image,
    };
    let formData = new FormData();
    Object.keys(param).forEach((key) => formData.append(key, param[key]));
    this.props.saveProfile(formData);
  };

  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { image_URL } = this.state;
    return (
      <React.Fragment>
        <LayoutContentWrapper>
          <Divider
            type="vertical"
            style={{
              height: 44,
              borderWidth: "thick",
              background: "#E5E5E5",
            }}
          />
          <Title level={2}> <IntlMessages id="page.myAccountTitle" /></Title>
          <LayoutContent style={{ marginTop: "30px" }}>
            <Row
              style={{
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Col
                xl={6}
                lg={6}
                style={colStyle}
                className="my-acc-img-wrapper"
              >
                <div className="MyaccImage">
                  <img
                    className="isoImgWrapper"
                    src={image_URL}
                    style={{
                      width: "160px",
                      height: "160px",
                      borderRadius: "4px",
                    }}
                  />
                  <label
                    style={{
                      cursor: "pointer",
                      width: 30,
                      height: 30,
                    }}
                    className="myAccontButton"
                  >
                    <CameraOutlined
                      style={{
                        width: 30,
                        fontSize: 20,
                        background: "#FCAE1D",
                        color: "aliceblue",
                        marginRight: 17,
                        paddingBottom: 5,
                      }}
                    />

                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={this.handleClickforDocs}
                      style={{ width: 0, display: "none" }}
                    />
                  </label>
                </div>
              </Col>

              <Col xl={18} lg={18} className="my-acc-form-wrapper ">
                <Form ref={this.formRef} onFinish={this.onFinish}>
                  <Row>
                    <Col lg={12} md={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label={"Name"}
                        name="name"
                        required={false}
                        colon={false}
                        style={{
                          flexDirection: "column",
                        }}
                        rules={[
                          {
                            required: true,
                            message:
                              AppConstant.FormValidation.firstnameRequired,
                          },
                          {
                            pattern: NameRegex,
                            message: AppConstant.FormValidation.nameValid,
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Enter Here" />
                      </FormItem>
                    </Col>
                    <Col lg={12} md={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label={"Email Address"}
                        name="email"
                        required={false}
                        colon={false}
                        style={{
                          flexDirection: "column",
                        }}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: AppConstant.FormValidation.emailRequired,
                          },
                          {
                            type: "email",
                            message: AppConstant.FormValidation.emailInvalid,
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Enter Here" disabled />
                      </FormItem>
                    </Col>
                    <Col lg={12} md={12} xs={24} className="choice-btn-wrapper">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="save-btn"
                      >
                        <IntlMessages id="page.saveButton"/>
                      </Button>
                      <Button className="cancel-btn"><IntlMessages id="button.CANCEL"/></Button>
                    </Col>
                    <Divider
                      style={{
                        border: "1px solid #CDCDCD",
                      }}
                    />
                  </Row>
                </Form>
                <Form ref={this.formRef1} onFinish={this.onFinishPassword}>
                  <Row>
                    <Col lg={12} md={12} xs={24}>
                      <FormItem
                        {...formItemLayout}
                        label={"Password"}
                        name="password"
                        required={false}
                        colon={false}
                        style={{
                          flexDirection: "column",
                        }}
                        rules={[
                          {
                            required: true,
                            message:
                              AppConstant.FormValidation.passwordRequired,
                          },
                          {
                            pattern: PasswordStrengthRegex,
                            message: AppConstant.FormValidation.passwordValid,
                          },
                        ]}
                      >
                        <Input size="large" placeholder="Password" />
                      </FormItem>
                    </Col>
                    <Col lg={12} md={12} xs={24} className="catagory-wrapper">
                      <FormItem
                        {...formItemLayout}
                        label={"Confirm Password"}
                        name="confirm_password"
                        required={false}
                        colon={false}
                        style={{
                          flexDirection: "column",
                        }}
                        rules={[
                          {
                            required: true,
                            message: AppConstant.FormValidation.confirmPassword,
                          },
                          ({ getFieldValue }) => ({
                            validator(rule, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }

                              return Promise.reject(
                                AppConstant.FormValidation.passwordMatch
                              );
                            },
                          }),
                        ]}
                      >
                        <Input size="large" placeholder="Confirm Password" />
                      </FormItem>
                    </Col>
                    <Col lg={12} md={12} xs={24} className="choice-btn-wrapper">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="save-btn"
                      >
                        <IntlMessages id="page.saveButton"/>
                      </Button>
                      <Button className="cancel-btn"><IntlMessages id="button.CANCEL"/></Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  viewProfileData: state.AdminProfile.viewProfileData,
  saveProfileRes: state.AdminProfile.saveProfileRes,
});

const mapDispatchToProps = {
  viewProfile,
  saveProfile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MyAccount));
