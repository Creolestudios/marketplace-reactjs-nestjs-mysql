import React from "react";
import IntlMessages from "@iso/components/utility/intlMessages";
import {
  PortfolioModelWrapper,
  LeftDetails,
  RightSlider,
  PortModelInnerDetail,
} from "./style";
import { InfoTitle } from "@iso/containers/Client/TaskDetails/style";
import { MyGallery } from "@iso/components/Slider";
import { Title } from "../../CommonStyle";
import { Price } from "@iso/components/Card/style";
import VideoImage from "@iso/assets/images/video-icon.png";

const PortfolioModel = (props) => {
  const { data } = props;
  let media = []
  if (data.media.length > 0) {
    data.media.map((each) =>
      media.push({
        original: each.media,
        thumbnail: each?.media_type === 'video' ? VideoImage : each.media,
        media_type: each?.media_type
      })
    );
  }
  return (
    <PortfolioModelWrapper>
      <LeftDetails>
        <PortModelInnerDetail>
          <ul>
            <li>
              <InfoTitle>
                <i className="icon-cunstruction"></i>
                {data.cat}
              </InfoTitle>
              <ul>
                <li>
                  <InfoTitle>
                    <i className="icon-plumbing-work"></i>
                    {data.subcat}
                  </InfoTitle>
                  <ul className="details-name">
                    {data.albumCategory.services.map((detail, i) => (
                      <li key={i}>
                        <Title className="title">{detail.service_name}</Title>
                        <Price className="price">
                          {detail.estimated_price}
                        </Price>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </PortModelInnerDetail>
      </LeftDetails>

      <RightSlider>
        {props.images[0].original ? (
          <div className="work-slider block">
            <MyGallery imgList={
              props.images.length > 0 ? media : []
            } />
          </div>
        ) : (
          <IntlMessages id="portfolio-msg" />
        )}
      </RightSlider>
    </PortfolioModelWrapper>
  );
};

export default PortfolioModel;
