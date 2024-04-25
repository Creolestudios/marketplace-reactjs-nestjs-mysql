import React, { Component } from "react";
import { Col, Card, Collapse, Carousel } from "antd";
import basicStyle from "@iso/assets/styles/constants";
import fen3 from "@iso/assets/images/fencing-img-3.jpg";
import fen2 from "@iso/assets/images/fencing-img-2.jpg";
import fen1 from "@iso/assets/images/fencing-img-1.jpg";
import plumber1 from "@iso/assets/images/plumber-img-1.jpg";
import plumber2 from "@iso/assets/images/plumber-img-2.jpg";
import { withRouter } from "react-router-dom";
import IsoWidgetsWrapper from "@iso/containers/Global/Common/WidgetsWrapper";
import CarouselStyleWrapper from "@iso/components/uielements/styles/Carousel.styles.js";
import {
  PlusSquareOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import IntlMessages from "@iso/components/utility/intlMessages";
const Panel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

class ViewPortfolio extends Component {
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
    const { rowStyle, colStyle } = basicStyle;
    const { viewPortData } = this.props;
    return (
      <React.Fragment>
        <Col lg={24} md={24} sm={24} xs={24}>
          <IsoWidgetsWrapper className="learnMoreOwnAppError">
            <Card
              style={{
                backgroundColor: "#F8FAFB",
              }}
            >
              <div
                className="learnMoreSec"
                style={{
                  color: "#423F3F",
                  fontWeight: 400,
                  fontSize: 16,
                  textAlign: "start",
                }}
              >
                {" "}
                {viewPortData.album_name}
              </div>
            </Card>
          </IsoWidgetsWrapper>
        </Col>
        <Col lg={11} md={24} sm={24} xs={24} style={{ marginTop: "15px" }}>
          <div className="supportFaqsWrapperNested">
            <Collapse
              expandIconPosition={"left"}
              style={{ marginLeft: 10 }}
              ghost={true}
            >
              <Collapse.Panel
                header={
                  viewPortData.category_details &&
                  viewPortData.category_details[0] &&
                  viewPortData.category_details[0].category &&
                  viewPortData.category_details[0].category.name
                }
                key={
                  viewPortData.category_details &&
                  viewPortData.category_details[0] &&
                  viewPortData.category_details[0].category &&
                  viewPortData.category_details[0].category.id
                }
              >
                <div className="supportFaqsWrapperNested">
                  <Collapse
                    expandIconPosition={"left"}
                    // expandIcon={(panelProps) => <PlusSquareOutlined />} //{/* <MinusSquareOutlined />; */}
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <MinusSquareOutlined />
                      ) : (
                        <PlusSquareOutlined />
                      )
                    }
                    ghost={true}
                  >
                    <Collapse.Panel
                      header={
                        viewPortData.category_details &&
                        viewPortData.category_details[1] &&
                        viewPortData.category_details[1].subCategory &&
                        viewPortData.category_details[1].subCategory[0] &&
                        viewPortData.category_details[1].subCategory[0].name
                      }
                      key={
                        viewPortData.category_details &&
                        viewPortData.category_details[1] &&
                        viewPortData.category_details[1].subCategory &&
                        viewPortData.category_details[1].subCategory[0] &&
                        viewPortData.category_details[1].subCategory[0].id
                      }
                    >
                      {viewPortData.category_details &&
                        viewPortData.category_details[1] &&
                        viewPortData.category_details[1].subCategory &&
                        viewPortData.category_details[1].subCategory[1] &&
                        viewPortData.category_details[1].subCategory[1]
                          .services &&
                        viewPortData.category_details[1].subCategory[1].services.map(
                          (item1) => (
                            <Panel>
                              <div
                                style={{
                                  textAlignLast: "left",
                                }}
                              >
                                <span>{item1.service_name}</span>
                              </div>
                              <p
                                className="ant-content"
                                style={{
                                  textAlignLast: "right",
                                  fontWeight: 700,
                                  color: "#423F3F",
                                }}
                              >
                                {item1.estimated_price}Kr{" "}
                              </p>
                            </Panel>
                          )
                        )}
                    </Collapse.Panel>
                  </Collapse>
                </div>
              </Collapse.Panel>
            </Collapse>
          </div>
        </Col>
        <Col lg={13} md={24} sm={24} xs={24} className="portfolio-carousel">
          <Carousel
            asNavFor={this.state.nav}
            touchMove={false}
            dots={false}
            ref={(carousel) => (this.media = carousel)}
          >
            {viewPortData &&
              viewPortData.media &&
              viewPortData.media.map((data) => (
                <div
                  style={{
                    display: "inline-block",
                  }}
                >
                  <img src={data} style={{ width: 584, height: 365 }} />
                </div>
              ))}
          </Carousel>
          <CarouselStyleWrapper className="abc">
            <Carousel
              slidesToShow={3}
              infinite={false}
              afterChange={this.onChange}
              // centerMode={true}
              asNavFor={this.state.media}
              draggable={true}
              ref={(carousel) => (this.nav = carousel)}
              swipeToSlide={true}
              touchThreshold={50}
              focusOnSelect={true}
              dots={false}
              arrows={true}
              nextArrow={<ArrowRightOutlined />}
              prevArrow={<ArrowLeftOutlined />}
              style={{
                width: "78%",
                float: "left",
              }}
            >
              {viewPortData &&
                viewPortData.media &&
                viewPortData.media.map((data) => (
                  <div
                    style={{
                      width: 0,
                    }}
                  >
                    <img
                      src={data}
                      style={{
                        width: 142,
                        height: 120,
                        // border:
                        //   this.state.active === 0 ? "2px solid #FCAE1D" : "",
                      }}
                    />
                  </div>
                ))}
            </Carousel>
          </CarouselStyleWrapper>
        </Col>
      </React.Fragment>
    );
  }
}

export default withRouter(ViewPortfolio);
