import React, { useState } from "react";
import FooterContainer from "@iso/components/Footer";
import { Tabs, Modal } from "antd";
import {
  PageWrapper,
  PageContainer,
  Content,
  TaskTitle,
  ContentBottom,
} from "../../../CommonStyle";
import Tab from "@iso/components/Tab";
import { Head, LeftSide, Area, AreaName, ContentArea } from "../Task/style";
import {
  Detail,
  DetailHead,
  LeftBlock,
  DetailContent,
} from "../TaskDetails/style";
import { TabWrapper } from "../UserProfile/style";
import WorkPortfolio from "@iso/components/WorkPortfolio";
import { ProfolioWrapper } from "../MyPortfolio/style";
import Img1 from "@iso/assets/images/plumber-img-1.jpg";
import Img2 from "@iso/assets/images/plumber-img-2.jpg";
import Img3 from "@iso/assets/images/plumber-img-3.jpg";
import Img4 from "@iso/assets/images/plumber-img-1.jpg";
import Img5 from "@iso/assets/images/plumber-img-2.jpg";
import Img6 from "@iso/assets/images/plumber-img-3.jpg";
import PortfolioModelDetail from "@iso/components/PortfolioModelDetail";
import IntlMessages from "@iso/components/utility/intlMessages";
import {
  AppConstant,
} from "@iso/config/constant";
const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
    description:
      "Imperdiet viverra massa vitae etiam fermentum cursus amet. Urna sed vehicula tellus mauris. Quisque eget eget ipsum tempor varius tincidunt. ",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
    description:
      "Imperdiet viverra massa vitae etiam fermentum cursus amet. Urna sed vehicula tellus mauris. Quisque eget eget ipsum tempor varius tincidunt. ",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
    description:
      "Imperdiet viverra massa vitae etiam fermentum cursus amet. Urna sed vehicula tellus mauris. Quisque eget eget ipsum tempor varius tincidunt. ",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
    description:
      "Imperdiet viverra massa vitae etiam fermentum cursus amet. Urna sed vehicula tellus mauris. Quisque eget eget ipsum tempor varius tincidunt. ",
  },
];

const portfolioDetail = [
  {
    title: "broken floor",
    type: "Construction & Repair",
    requirment: "Handyman for an hour",
    isvisiable: true,
    images: [
      { url: Img1 },
      { url: Img2 },
      { url: Img3 },
      { url: Img4 },
      { url: Img5 },
      { url: Img6 },
    ],
    details: [
      {
        name: "Window Repair",
        value: "23 Kr",
      },
      {
        name: "Broken Tiles Repair",
        value: "33 Kr",
      },
      {
        name: "Repairing Sink Leakage",
        value: "40 Kr",
      },
    ],
  },
  {
    title: "fencing",
    type: "Construction & Repair",
    requirment: "Plumbing Work",
    isvisiable: false,
    images: [{ url: Img1 }, { url: Img2 }, { url: Img3 }],
    details: [
      {
        name: "Window Repair",
        value: "23 Kr",
      },
      {
        name: "Broken Tiles Repair",
        value: "33 Kr",
      },
      {
        name: "Repairing Sink Leakage",
        value: "40 Kr",
      },
    ],
  },
  //   {
  //     title: "plumbing",
  //     type: "Construction & Repair",
  //     requirment: "Handyman for an hour",
  //     isvisiable: false,
  //     images: [
  //       { url: Img1 },
  //       { url: Img2 },
  //       { url: Img3 },
  //       { url: Img4 },
  //       { url: Img5 },
  //       { url: Img6 },
  //     ],
  //   },
];

function Portfolio() {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isCurrentPortfolio, setisCurrentPortfolio] = useState();

  const handleTitleClick = (i) => {
    setisCurrentPortfolio(portfolioDetail[i]);
    setisModalVisible(true);
  };
  return (
    <>
      <PageWrapper>
        <PageContainer>
          <Content>
            <Head>
              <LeftSide>
                <Tab />
                <Area>
                  <i className="icon-location"> </i>
                  <AreaName> Copenhagen </AreaName>
                </Area>
              </LeftSide>
            </Head>
            <ContentArea>
              <Detail className="profile">
                <DetailHead>
                  <LeftBlock>
                    <a>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <TaskTitle className="detail-text">
                          <IntlMessages id="page.myAccountTitle" />
                        </TaskTitle>
                      </div>
                    </a>
                  </LeftBlock>
                </DetailHead>
                <DetailContent className="profile-details portfolio">
                  <TabWrapper>
                    <Tabs defaultActiveKey="2" onChange={callback}>
                      <TabPane tab={<IntlMessages id="topbar.myprofile" />} key={AppConstant.key.One}>
                        {/* <Profile /> */}
                      </TabPane>
                      <TabPane tab={<IntlMessages id="Portfolio" />} key={AppConstant.key.Two}>
                        {/* Content of Tab Pane 2 */}
                      </TabPane>
                      <TabPane tab={<IntlMessages id="tab.createAlbum" />} key={AppConstant.key.Three}>
                        {/* Content of Tab Pane 2 */}
                      </TabPane>
                      <TabPane tab={<IntlMessages id="Types.of.services" />} key={AppConstant.key.Four}>
                        {/* Content of Tab Pane 3 */}
                      </TabPane>
                    </Tabs>
                  </TabWrapper>
                </DetailContent>
              </Detail>
            </ContentArea>
            <ContentBottom>
              <ProfolioWrapper>
                {portfolioDetail.map((data, i) => (
                  <WorkPortfolio
                    data={data}
                    key={i}
                    onTitleClicked={() => handleTitleClick(i)}
                  />
                ))}
              </ProfolioWrapper>
            </ContentBottom>
          </Content>
        </PageContainer>
      </PageWrapper>
      <FooterContainer />

      <Modal
        width={1100}
        title={isCurrentPortfolio?.title}
        centered={true}
        visible={isModalVisible}
        onCancel={() => setisModalVisible(false)}
        footer={false}
      >
        <PortfolioModelDetail images={images} data={isCurrentPortfolio} />
      </Modal>
    </>
  );
}

export default Portfolio;
