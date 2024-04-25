import React from "react";
import { ModelContent } from "./style";
import { MyGallery } from "@iso/components/Slider";
import "@iso/containers/Client/TaskDetails/style";

const Model = (props) => {
  return (
    <ModelContent>
      <MyGallery
        imgList={props.images}
        hideThumbnail={true}
        hideIndex={true}
        {...props}
      />
    </ModelContent>
  );
};

export default Model;
