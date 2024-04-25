import React from "react";
import { Checkbox, Form, Button } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { TaskTitle } from "../../CommonStyle";
import {
  WorkPorfolioWrapper,
  WorkPortfolioHeader,
  WorkPortfolioContent,
  WorkPortfolioImage,
  Figure,
} from "./style";
import {
  InfoTitleWrapper,
  InfoTitle,
} from "@iso/containers/Client/TaskDetails/style";
import portfolioActions from "@iso/redux/portfolio/actions";

const WorkPortfolio = (props) => {
  const dispatch = useDispatch();
  const { data, isCheckboxVisiable, onTitleClicked, category, subCategory, activeButton } =
    props;
  const handleCheck = (e) => {
    if (Object.values(props.albumForm.getFieldsValue(true)).indexOf(true) > -1) {
      activeButton(true)
    } else {
      activeButton(false)
    }

  }
  return (
    <>
      <WorkPorfolioWrapper className="asf">
        <WorkPortfolioHeader>
          {isCheckboxVisiable ? (
            <Form.Item name={data?.album_id} valuePropName="checked">
              <Checkbox name={data?.album_id} onChange={handleCheck}></Checkbox>
            </Form.Item>
          ) : (
            ""
          )}
          <div onClick={() => onTitleClicked()}>
            <TaskTitle className="title" >
              {data?.album_name}
            </TaskTitle>
            <InfoTitleWrapper className="portfolio-info-header">
              <InfoTitle>
                <i className="icon-cunstruction"></i>
                {category}
              </InfoTitle>
              <InfoTitle>
                <i className="icon-plumbing-work"></i>
                {subCategory}
              </InfoTitle>
            </InfoTitleWrapper>
          </div>
          {isCheckboxVisiable ? (
            <div
              className="icon"
              onClick={() =>
                dispatch(portfolioActions.changeAlbumStatus(data.album_id))
              }

            >
              <i
                className={
                  data.visibility ? "icon-visiable" : "icon-invisiable"
                }
              ></i>
            </div>
          ) : (
            ""
          )}
        </WorkPortfolioHeader>
        <WorkPortfolioContent>
          <WorkPortfolioImage onClick={() => onTitleClicked()}>
            {data.media.map((d) =>
              d.media ? (
                <Figure>
                  {d.media_type == "image" ? <img src={d.media} alt="img" /> : <video>
                    <source src={d.media} type="video/mp4"></source>
                  </video>}

                </Figure>
              ) : (
                <div
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  {/* here we need to add upload button, and upload modal box should open up to add media, however we can not do that because in order to do that we will have to change the CancleTaskModel component and as that component is used multiple sides, we need to discuss before making such change . uploadMedia component is in progress*/}
                  {/* <Button onClick={handleUpload}>Upload</Button> */}
                </div>
              )
            )}
          </WorkPortfolioImage>
        </WorkPortfolioContent>
      </WorkPorfolioWrapper>
    </>
  );
};

export default WorkPortfolio;
