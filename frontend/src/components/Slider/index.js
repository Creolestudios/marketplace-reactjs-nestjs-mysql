import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/scss/image-gallery.scss';
import 'react-image-gallery/styles/css/image-gallery.css';
import '@iso/assets/scss/App.scss';
import './sliderStyle.css';
export const MyGallery = (props) => {
  const galleryRef = React.useRef();
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [imageList, setImageList] = useState(props?.imgList);

  useEffect(() => {
    setImageList(props?.imgList);
    props.slideToIndex &&
      (props.imgRef
        ? props.imgRef.current.slideToIndex(props.slideToIndex)
        : galleryRef.current.slideToIndex(props.slideToIndex));
  }, []);

  useEffect(() => {
    const result = [];
    props?.imgList?.map((item) =>
      item.media_type === 'video'
        ? result.push({
            ...item,
            renderItem: () => _renderVideo(item),
            embedUrl: item?.original
          })
        : result.push(item)
    );
    setImageList(result);
  }, [props?.imgList]);

  const _renderVideo = (item) => {
    return (
      <div>
        {item?.media_type === 'video' ? (
          <div className='video-wrapper'>
            <a className='close-video' onClick={_toggleShowVideo(item)}></a>
            <video muted>
             <source   src={item.original} type="video/mp4"></source>
           </video>
          </div>
        ) : (
          <a onClick={_toggleShowVideo(item)}>
            <div className='play-button'></div>
            <img className='image-gallery-image' src={item.original} />
          </a>
        )}
      </div>
    );
  };

  const _toggleShowVideo = (item) => {
    if (item.media_type === 'video') {
      setShowPlayButton(true);
    }
  };
  // console.log('###89', imageList, props?.imgList);

  return (
    <ImageGallery
      ref={props.imgRef ? props.imgRef : galleryRef}
      items={imageList}
      showBullets={true}
      lazyLoad={true}
      onClick={props?.onImageClick}
      showPlayButton={false}
      showFullscreenButton={false}
      showThumbnails={props.hideThumbnail ? false : true}
      showIndex={props.hideIndex ? true : false}
    />
  );
};