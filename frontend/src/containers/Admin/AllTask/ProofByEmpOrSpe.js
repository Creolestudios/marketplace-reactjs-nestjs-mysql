import React, { Component } from "react";
import { Row, Col, Typography, Carousel, Empty } from "antd";
import { connect } from "react-redux";

import fen3 from "@iso/assets/images/fencing-img-3.jpg";
import fen2 from "@iso/assets/images/fencing-img-2.jpg";
import fen1 from "@iso/assets/images/fencing-img-1.jpg";
import plumber1 from "@iso/assets/images/plumber-img-1.jpg";
import plumber2 from "@iso/assets/images/plumber-img-2.jpg";
import IntlMessages from "@iso/components/utility/intlMessages";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import CarouselStyleWrapper from "@iso/components/uielements/styles/Carousel.styles.js";

const { Title } = Typography;

class ProofByEmpOrSpe extends Component {
  state = {
    media: null,
    nav: null,
    active: 0,
  };

  componentDidMount = () => {
    this.setState({
      media: this.media,
      nav: this.nav,
    });
  };

  onChange = (a, b, c) => {
    this.setState({
      active: a,
    });
  };
  render() {
    const { proofData } = this.props;
    return (
      <React.Fragment>
        {proofData &&
        (proofData.media.length !== 0 || proofData.reason !== null) ? (
          <Row>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Carousel
                asNavFor={this.state.nav}
                touchMove={false}
                dots={false}
                ref={(carousel) => (this.media = carousel)}
              >
                {proofData &&
                  proofData.media &&
                  proofData.media.map((item) =>
                    item.mimetype === "image" ? (
                      <div
                        style={{
                          display: "inline-block",
                        }}
                      >
                        <img
                          src={item.filename}
                          style={{ width: 584, height: 365 }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "inline-block",
                        }}
                      >
                        <video width="100%" height="240" controls>
                          <source src={item.filename} type="video/mp4" />
                          <IntlMessages id="yourBrawserDoes" />
                        </video>
                      </div>
                    )
                  )}
              </Carousel>
              <CarouselStyleWrapper className="abc">
                <Carousel
                  slidesToShow={3}
                  infinite={false}
                  afterChange={this.onChange}
                  centerMode={false}
                  asNavFor={this.state.media}
                  draggable={true}
                  ref={(carousel) => (this.nav = carousel)}
                  swipeToSlide={true}
                  touchThreshold={50}
                  focusOnSelect={true}
                  dots={false}
                  arrows
                  nextArrow={<ArrowRightOutlined />}
                  prevArrow={<ArrowLeftOutlined />}
                  style={{
                    width: "90%",
                    float: "center",
                  }}
                >
                  {proofData &&
                    proofData.media &&
                    proofData.media.map((item) =>
                      item.mimetype === "image" ? (
                        <div
                          style={{
                            width: 0,
                          }}
                        >
                          <img
                            src={item.filename}
                            style={{
                              width: 123,
                              height: 123,
                              border:
                                this.state.active === 0
                                  ? "2px solid #FCAE1D"
                                  : "",
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: 0,
                          }}
                        >
                          <video width="100%" height="140">
                            <source src={item.filename} type="video/mp4" />
                            <IntlMessages id="yourBrawserDoes" />
                          </video>
                        </div>
                      )
                    )}
                </Carousel>
              </CarouselStyleWrapper>
            </Col>
            <Col
              lg={12}
              md={24}
              sm={24}
              xs={24}
              className="proof-wrapper"
              style={{
                textAlign: "start",
                color: "#758287",
              }}
            >
              <h3><IntlMessages id="reasonForReportingTask" /></h3>
              <p>{proofData && proofData.reason}</p>
            </Col>
          </Row>
        ) : (
          <Col md={24} xs={24}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Col>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(ProofByEmpOrSpe);
