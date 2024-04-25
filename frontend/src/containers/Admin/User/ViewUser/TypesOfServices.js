import React, { Component } from "react";
import { Row, Col, Collapse } from "antd";
import { connect } from "react-redux";
import basicStyle from "@iso/assets/styles/constants";
import { PlusSquareOutlined } from "@ant-design/icons";
import { MinusSquareOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
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

class TypesOfServices extends Component {
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
    const { serviceData } = this.props;
    return (
      <React.Fragment>
        <Col lg={24} md={24} sm={24} xs={24}>
          <div className="supportFaqsWrapper">
            {serviceData.length>0 ?
              serviceData.map((dat) => (
                <Collapse
                  expandIconPosition={"left"}
                  //   style={{ width: "max-content" }}
                  ghost={true}
                >
                  <Collapse.Panel
                    header={
                      dat.parentCategoryData && dat.parentCategoryData.name
                    }
                    key={dat.parentCategoryData && dat.parentCategoryData.id}
                  >
                    {dat.subCategoryData &&
                      dat.subCategoryData.map((item) => (
                        <div className="supportFaqsWrapperNested">
                          <Collapse
                            expandIconPosition={"left"}
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
                              header={item.data && item.data.name}
                              key={item.data && item.data.id}
                            >
                              {item.services &&
                                item.services.map((item1) => (
                                  <Panel>
                                    <div
                                      style={{
                                        textAlign: "left",
                                      }}
                                    >
                                      <span>{item1.name}</span>
                                    </div>
                                    <p
                                      className="ant-content"
                                      style={{
                                        textAlignLast: "right",
                                        fontWeight: 700,
                                        color: "#423F3F",
                                      }}
                                    >
                                      {`${item1.estimated_price} `}
                                      <IntlMessages id="kr" />
                                    </p>
                                  </Panel>
                                ))}
                            </Collapse.Panel>
                          </Collapse>
                        </div>
                      ))}
                  </Collapse.Panel>
                </Collapse>
              )):<Col
              style={{background: "#fff"}}
              className="broken-floor-wrapper"
            ><p>No Service Data Available</p></Col>}
          </div>
        </Col>
      </React.Fragment>
    );
  }
}

export default withRouter(TypesOfServices);
