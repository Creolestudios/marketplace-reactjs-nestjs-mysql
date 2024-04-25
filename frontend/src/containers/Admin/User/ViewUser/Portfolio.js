import React, { Component } from "react";
import { Row, Col, Typography } from "antd";
import { connect } from "react-redux";
import Box from "@iso/components/utility/box";
import fl1 from "@iso/assets/images/floor-img-2.jpg";
import fl2 from "@iso/assets/images/floor-img-1.jpg";
import fen3 from "@iso/assets/images/fencing-img-3.jpg";
import fen2 from "@iso/assets/images/fencing-img-2.jpg";
import fen1 from "@iso/assets/images/fencing-img-1.jpg";
import plumber1 from "@iso/assets/images/plumber-img-1.jpg";
import plumber2 from "@iso/assets/images/plumber-img-2.jpg";
import plumber3 from "@iso/assets/images/plumber-img-3.jpg";
import dashboardIcon from "@iso/assets/images/icon/dashboard-icon.svg";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import basicStyle from "@iso/assets/styles/constants";
import ViewPortfolio from "./ViewPortfolio";
import IntlMessages from "@iso/components/utility/intlMessages";
const { Title } = Typography;

class Portfolio extends Component {
  state = {
    viewPortfolio: false,
    viewPortData: {},
  };

  handleviewPortfolio = (data) => {
    this.setState({
      viewPortfolio: true,
      viewPortData: data,
    });
  };
  render() {
    const { rowStyle, colStyle } = basicStyle;
    const { portfolioData } = this.props;
    return (
      <React.Fragment>
        <Row
          style={{ rowStyle, background: "#fff" }}
          gutter={0}
          justify="start"
        >
          {this.state.viewPortfolio ? (
            <ViewPortfolio viewPortData={this.state.viewPortData} />
          ) : (
            <>
              {portfolioData.length > 0 ? (
                portfolioData.map((data) => (
                  <Col
                    lg={12}
                    md={24}
                    sm={24}
                    xs={24}
                    style={{}}
                    className="broken-floor-wrapper"
                  >
                    <Box
                      title={data.album_name}
                      onTitleClick={this.handleviewPortfolio.bind(this, data)}
                      className="broken-floor"
                    >
                      <Row key={1}>
                        <Col
                          md={22}
                          lg={22}
                          sm={22}
                          xs={22}
                          style={colStyle}
                          style={{
                            textAlign: "left",

                            color: "#758287",
                          }}
                          className="portfolio-content"
                        >
                          <div className="construct">
                            <i className="icon-cunstruction"></i>{" "}
                            <IntlMessages
                              id={`${
                                data.category_details &&
                                data.category_details[0] &&
                                data.category_details[0].category &&
                                data.category_details[0].category.name
                              }`}
                            />
                          </div>
                          <div>
                            <i className="icon-handyman"></i>
                            <IntlMessages
                              id={`${
                                data.category_details &&
                                data.category_details[1] &&
                                data.category_details[1].subCategory &&
                                data.category_details[1].subCategory[0] &&
                                data.category_details[1].subCategory[0].name
                              }`}
                            />
                          </div>
                        </Col>
                        {/* <Col
                      md={8}
                      lg={10}
                      sm={8}
                      xs={24}
                      style={colStyle}
                      style={{
                        textAlign: "left",
                        lineHeight: "18px",
                        marginBottom: "10px",
                        color: "#758287",
                      }}
                    >
                      
                    </Col> */}
                        <Col
                          md={2}
                          lg={2}
                          sm={2}
                          xs={2}
                          style={{
                            marginBottom: 16,
                            textAlignLast: "end",
                          }}
                        >
                          {data?.visibility === 1 ? (
                            <EyeOutlined style={{ textAlign: "right" }} />
                          ) : (
                            <EyeInvisibleOutlined />
                          )}
                        </Col>
                      </Row>
                      <Row key={1}>
                        {data &&
                          data.media &&
                          data.media.map((item) => (
                            <Col className="card-img" style={colStyle}>
                              <img src={item} />
                            </Col>
                          ))}
                      </Row>
                    </Box>
                  </Col>
                ))
              ) : (
                <Col className="broken-floor-wrapper">
                  <p>No Portfolio Data Available</p>
                </Col>
              )}
            </>
          )}
        </Row>
      </React.Fragment>
    );
  }
}

export default Portfolio;
