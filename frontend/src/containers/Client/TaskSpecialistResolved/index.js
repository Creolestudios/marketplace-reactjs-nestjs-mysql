import React, { useState } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import FooterContainer from "@iso/components/Footer";
import { Select, Checkbox, Rate, Input, Modal, Button } from "antd";
import UploadComponent from "@iso/components/UploadComponent";
import FullViewImgModel from "@iso/components/FullViewImgModel";
import {
  PageWrapper,
  PageContainer,
  Content,
  TaskTitle,
  SuccessSituation,
  ButtonLink,
  SmallTitle,
  PeraGraph,
  ContentBottom,
} from "../../../CommonStyle";
import Tab from "@iso/components/Tab";
import {
  Head,
  LeftSide,
  RightSide,
  Area,
  AreaName,
  ContentArea,
} from "../Task/style";
import {
  Detail,
  DetailHead,
  LeftBlock,
  DetailContent,
  InfoTitleWrapper,
  InfoTitle,
  JobInfo,
  Box,
  Info,
  WorkDetail,
  Budget,
  DescHd,
  Amount,
  DescriptionPera,
  RatingBox,
  SubTitle,
} from "../TaskDetails/style";
import Header from "@iso/components/Header";
import { Price } from "@iso/components/Card/style";
import { MyGallery } from "@iso/components/Slider";
import ViewBox from "@iso/components/TaskView";
import EditBox from "@iso/components/TaskEdits";
const { TextArea } = Input;
const { Option, OptGroup } = Select;

const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
];

function handleChange(value) {
  console.log(`selected ${value}`);
}

function TaskDetailReported() {
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isFullModalVisible, setisFullModalVisible] = useState(false);
  const [isEditBid, setisEditBid] = useState(false);
  const editClicked = () => {
    setisEditBid(true);
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
              <RightSide className="task-detail-rigth-side">
                <Select defaultValue="employer" onChange={handleChange}>
                  <Option value="employer"> <IntlMessages id="employer" /> </Option>
                  <Option value="specialist"> <IntlMessages id="specialist" /> </Option>
                </Select>
              </RightSide>
            </Head>
            <ContentArea>
              <Detail>
                <DetailHead>
                  <LeftBlock>
                    <a href="\task">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <i className="icon-left-arrow"></i>
                        <TaskTitle className="detail-text">
                        <IntlMessages id="PlumberRequiredForAJob" />
                        </TaskTitle>
                      </div>
                    </a>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <SuccessSituation className="situation">
                        Active{/* {props.task.status} */}
                      </SuccessSituation>
                      {/* <TextDanger className="re-name">Reported</TextDanger> */}
                    </div>
                  </LeftBlock>
                  {/* <RightBlock>
                    <Button className="edit-task silver-btn-border">
                      edit task
                    </Button>
                  </RightBlock> */}
                </DetailHead>
                <DetailContent>
                  <InfoTitleWrapper>
                    <InfoTitle>
                      <i className="icon-cunstruction"></i>
                      <IntlMessages id="cANDr" />
                    </InfoTitle>
                    <InfoTitle>
                      <i className="icon-plumbing-work"></i>
                      <IntlMessages id="plumbing.work" />
                    </InfoTitle>
                  </InfoTitleWrapper>
                  <JobInfo>
                    <Box>
                      <Info>
                        <SmallTitle className="title"><IntlMessages id="antTable.title.Specialist" /></SmallTitle>
                        <SubTitle
                          className="subtitle"
                          style={{ color: "#2AABE1", fontWeight: "700" }}
                        >
                          <a href=""> <IntlMessages id="jack.kline" /> </a>
                        </SubTitle>
                      </Info>
                      <i className="icon-specialist"></i>
                    </Box>
                    <Box>
                      <Info>
                        <SmallTitle className="title"><IntlMessages id="StartDate" /></SmallTitle>
                        <SubTitle className="subtitle">15/01/2021</SubTitle>
                      </Info>
                    </Box>
                    <Box>
                      <Info>
                        <SmallTitle className="title"><IntlMessages id="EndDate" /></SmallTitle>
                        <SubTitle className="subtitle">21/01/2021</SubTitle>
                      </Info>
                    </Box>
                    <Box>
                      <Info>
                        <SmallTitle className="title"><IntlMessages id="City" /></SmallTitle>
                        <SubTitle className="subtitle">Edmonton</SubTitle>
                      </Info>
                    </Box>
                    <Box className="border-remove">
                      <Info>
                        <SmallTitle className="title"><IntlMessages id="form.profile.zipCode" /></SmallTitle>
                        <SubTitle className="subtitle"><IntlMessages id="t5a.qaz" /></SubTitle>
                      </Info>
                    </Box>
                    <Box className="specialist">
                      <Info>
                        <SmallTitle className="title"><IntlMessages id="bids" /></SmallTitle>
                        <SubTitle
                          className="subtitle"
                          style={{ color: "#2AABE1", fontWeight: "700" }}
                        >
                          <a href=""> 36 </a>
                        </SubTitle>
                      </Info>
                    </Box>
                  </JobInfo>
                  <WorkDetail>
                    {/* Slider */}
                    <div className="work-slider block">
                      <MyGallery
                        imgList={images}
                        onImageClick={() => setisFullModalVisible(true)}
                      />
                    </div>

                    {/* Description Details */}
                    <div className="work-description block">
                      <DescHd className="desc-hd">
                        <Budget className="specialist">
                          <SmallTitle><IntlMessages id="estimatedBudget" /></SmallTitle>
                          <Price>35 Kr</Price>
                        </Budget>
                        <Amount>
                          <SmallTitle><IntlMessages id="bidAmount" /></SmallTitle>
                          <Price>38 Kr</Price>
                        </Amount>
                      </DescHd>
                      <Checkbox
                        style={{
                          color: "#758287",
                          textAlign: "left",
                          width: "100%",
                        }}
                      >
                        <IntlMessages id="contact.msgshare" />
                      </Checkbox>
                      <DescriptionPera>
                        <SmallTitle>Description</SmallTitle>
                        <PeraGraph className="desc-pera">
                          Nisi, rutrum id id aliquet sit. Bibendum hac nibh quis
                          faucibus a nam ac. Tellus adipiscing maecenas nibh
                          facilisis ipsum egestas adipiscing sollicitudin vel.
                          Cras facilisi aliquet purus velit tempus nulla ut orci
                          duis. Volutpat vel in vel proin non.
                        </PeraGraph>
                        <PeraGraph className="desc-pera">
                          Leo at lacinia integer sed leo purus viverra.
                          Tristique donec cras auctor justo ornare scelerisque
                          urna enim id. Sit libero odio ac sed aenean nunc,
                          elementum nam odio. Rhoncus dolor, curabitur quam
                          vehicula cras tempor habitant in id. Vitae elementum
                          ullamcorper ultricies in massa elit. Velit fermentum
                          consequat, leo placerat consequat suspendisse. Viverra
                          eget pulvinar id etiam facilisi massa sem.
                        </PeraGraph>
                      </DescriptionPera>
                      <div className="task-resolved">
                        <SmallTitle>Task Resolved by Admin</SmallTitle>
                        <PeraGraph className="desc-pera">
                        <IntlMessages id="desc.pera5" />
                        </PeraGraph>
                      </div>
                    </div>
                  </WorkDetail>
                </DetailContent>
              </Detail>
            </ContentArea>
            <ContentBottom>
              <RatingBox>
                <SmallTitle className="title">
                <IntlMessages id="page.addRatingsAndReview" />
                </SmallTitle>
                <Rate
                  style={{
                    width: "100%",
                    textAlign: "left",
                    margin: "0 0 20px",
                  }}
                />
                <TextArea
                  placeholder={<IntlMessages id="placeholder.enterYourReviewHere" />}
                  rows={4}
                  autoSize={{ minRows: 4, maxRows: 4 }}
                />
                <Button
                  className="info-btn-border btn"
                  style={{
                    display: "inline-block",
                    float: "left",
                    width: "auto",
                  }}
                >
                  <IntlMessages id="button.submit" />
                </Button>
              </RatingBox>

              {!isEditBid ? (
                <ViewBox onEditClicked={editClicked} />
              ) : (
                <EditBox />
              )}
            </ContentBottom>
          </Content>
        </PageContainer>

        <Modal
          width={888}
          title={<IntlMessages id="add_proof" />}
          centered={true}
          visible={isModalVisible}
          onCancel={() => setisModalVisible(false)}
          footer={[
            <Button
              className="info-btn-border"
              style={{
                color: "#2aabe1",
                background: "none",
                border: "1px solid #2aabe1",
                display: "inline-block",
                float: "left",
                width: "auto",
              }}
              type="primary"
              onClick={() => setisModalVisible(false)}
            >
              <IntlMessages id="button.submit" />
            </Button>,
          ]}
        >
          <UploadComponent />
        </Modal>

        {/* full image view model */}
        <Modal
          className="full-view-images-model"
          width={1055}
          // title="Cancel Task"
          centered={true}
          visible={isFullModalVisible}
          onCancel={() => setisFullModalVisible(false)}
          footer={null}
        >
          <div className="work-slider block">
            <FullViewImgModel images={images} />
          </div>
        </Modal>
      </PageWrapper>
      <FooterContainer />
    </>
  );
}

export default TaskDetailReported;
