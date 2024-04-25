import { createGlobalStyle } from "styled-components";
import { palette, font } from "styled-theme";
import { transition } from "@iso/lib/helpers/style_utils";
import HeeboThin from "@iso/cra/public/fonts/Heebo-Thin.ttf";
import HeeboExtraLight from "@iso/cra/public/fonts/Heebo-ExtraLight.ttf";
import HeeboLight from "@iso/cra/public/fonts/Heebo-Light.ttf";
import HeeboRegular from "@iso/cra/public/fonts/Heebo-Regular.ttf";
import HeeboMedium from "@iso/cra/public/fonts/Heebo-Medium.ttf";
import HeeboSemiBold from "@iso/cra/public/fonts/Heebo-SemiBold.ttf";
import HeeboBold from "@iso/cra/public/fonts/Heebo-Bold.ttf";
import HeeboExtraBold from "@iso/cra/public/fonts/Heebo-ExtraBold.ttf";
import HeeboBlack from "@iso/cra/public/fonts/Heebo-Black.ttf";
// import 'antd/dist/antd.css';

const GlobalStyles = createGlobalStyle`

  /*-----------------------------------------------*/
  /* Font Family */
  /*-----------------------------------------------*/
  @font-face {
    font-family: 'Heebo';
    src: url(${HeeboThin});
    font-weight: 100;
  }
  @font-face {
    font-family: 'Heebo';
    src: url(${HeeboExtraLight});
    font-weight: 200;
  }
  @font-face {
    font-family: 'Heebo';
    src: url(${HeeboLight});
    font-weight: 300;
  }
  @font-face {
    font-family: 'Heebo';
    src: url(${HeeboRegular});
    font-weight: 400;
  }
  @font-face {
    font-family: 'Heebo';
    src: url(${HeeboMedium});
    font-weight: 500;
  }
  @font-face {
    font-family: 'Heebo';
    src: url(${HeeboSemiBold});
    font-weight: 600;
  }
  @font-face {
    font-family: 'Heebo';
    src: url(${HeeboBold});
    font-weight: 700;
  }
  @font-face {
    font-family: 'Heebo';
    src: url(${HeeboExtraBold});
    font-weight: 800;
  } 
   @font-face {
    font-family: 'Heebo';
    src: url(${HeeboBlack});
    font-weight: 900;
  }

  .ant-btn{
    border-radius: 4px;
  }


  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    font-size: 32px;
    font-weight: 700;
    color: #fff;
  }

  .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: #f8f8f8!important;
  }

  .ant-row.ant-form-item {
    margin-bottom: 5px;
  }

  .has-success.has-feedback {
    .ant-select {
      .ant-select-selection {
        .ant-select-selection__rendered {
          .ant-select-selection__placeholder {
            display: none !important;
          }
        }
      }
    }
  }

  /*-----------------------------------------------*/
  // style for project category menu [ScrumBoard]
  /*-----------------------------------------------*/
  .project-category {
    .ant-select-dropdown-menu {
      .ant-select-dropdown-menu-item {
        padding: 8px 12px;
        color: #000000;
        font-family: 'Heebo';
        font-weight: 400;
      }
    }
  }

  /*-----------------------------------------------*/
  // style for project menu [ScrumBoard]
  /*-----------------------------------------------*/
  .ant-dropdown {
    &.project-menu {
      width: 280px;
      top: 133px !important;

      .ant-dropdown-menu {
        padding: 0;
        overflow: hidden;

        .ant-dropdown-menu-item {
          min-height: 54px;
          line-height: auto;
          display: flex;
          align-items: center;
          padding: 10px 20px;

          &:first-child {
            padding: 0;
            border-bottom: 1px solid #f4f6fd;

            &:hover,
            &:focus {
              background-color: #ffffff;
            }
          }

          &:hover,
          &:focus {
            background-color: #F3F5FD;
          }

          &:last-child {
            background-color: #E6EAF8;
          }
        }
      }
    }
  }

  /*-----------------------------------------------*/
  // style for popover [ScrumBoard]
  /*-----------------------------------------------*/
  .ant-popover {
    .ant-checkbox-group {
      display: flex;
      flex-direction: column;
      .ant-checkbox-group-item {
        margin: 5px 0;
        span {
          font-size: 14px;
          color: #788195;
          text-transform: capitalize;
        }
      }
    }
  }

  /*-----------------------------------------------*/
  // style for modal [ScrumBoard]
  /*-----------------------------------------------*/
  .ant-modal-wrap {
    .ant-modal {
      .ant-modal-content {
        .ant-modal-body {
          .render-form-wrapper {
            padding: 10px;
            h2 {
              margin: 0;
            }
            form {
              padding: 15px 0 3px;
              .field-container {
                margin-bottom: 26px;
              }
            }
          }
        }
      }
    }
  }


/*-----------------------------------------------*/
  // style form previous GlobalStyles
  /*-----------------------------------------------*/

  .ant-table-thead > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr.ant-table-row-hover:not(.ant-table-expanded-row) > td, .ant-table-thead > tr:hover:not(.ant-table-expanded-row) > td, .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background: #f8f8f8!important;
}

font-family: ${font("primary", 0)};

h1,
h2,
h3,
h4,
h5,
h6,
a,
p,
li,
input,
textarea,
span,
div,
img,
svg {
  &::selection {
    background: ${palette("primary", 0)};
    color: #fff;
  }
}

.ant-row:not(.ant-form-item) {
  ${
    "" /* margin-left: -8px;
  margin-right: -8px; */
  };
  &:before,
  &:after {
    display: none;
  }
}

.ant-row > div {
  padding: 0;
}

.ant-form-item {
  .ant-form-item-label {
    & > label {
      height: 100%;
      color: ${palette("label", 0)};
      &:after {
        content: '';
      }
    }
  }
}

.isoLeftRightComponent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.isoCenterComponent {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
/********** Add Your Global CSS Here **********/

body {
  -webkit-overflow-scrolling: touch;
}

html h1,
html h2,
html h3,
html h4,
html h5,
html h6,
html a,
html p,
html li,
input,
textarea,
span,
div,
html,
body,
html a {
  margin-bottom: 0;
  font-family: 'Heebo', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
}

html ul {
  -webkit-padding-start: 0px;
  list-style: none;
  margin-bottom: 0;
}

.scrollbar-track-y,
.scrollbar-thumb-y {
  width: 5px !important;
}

.scrollbar-track-x,
.scrollbar-thumb-x {
  height: 5px !important;
}

.scrollbar-thumb {
  border-radius: 0 !important;
}

.scrollbar-track {
  background: rgba(222, 222, 222, 0.15) !important;
}

.scrollbar-thumb {
  border-radius: 0 !important;
  background: rgba(0, 0, 0, 0.5) !important;
}

/* Title Stlye */
h1.ant-typography, h2.ant-typography, .ant-typography h1, .ant-typography h2 {
  color: ${palette("text", 0)} !important;
}

.ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow:after,
.ant-popover-placement-bottomLeft
  > .ant-popover-content
  > .ant-popover-arrow:after,
.ant-popover-placement-bottomRight
  > .ant-popover-content
  > .ant-popover-arrow:after,
.ant-popover-placement-top > .ant-popover-content > .ant-popover-arrow:after,
.ant-popover-placement-topLeft
  > .ant-popover-content
  > .ant-popover-arrow:after,
.ant-popover-placement-topRight
  > .ant-popover-content
  > .ant-popover-arrow:after {
  left: 0;
  margin-left: -4px;
}

/* Instagram Modal */

.ant-modal-wrap.instagram-modal .ant-modal {
  max-width: 935px;
  width: 100% !important;
}

@media only screen and (max-width: 991px) {
  .ant-modal-wrap.instagram-modal .ant-modal {
    padding: 0 60px;
  }
}

@media only screen and (max-width: 767px) {
  .ant-modal-wrap.instagram-modal .ant-modal {
    max-width: 580px;
  }
}

.ant-modal-wrap.instagram-modal .ant-modal-content {
  border-radius: 0;
}

.ant-modal-wrap.instagram-modal .ant-modal-content button.ant-modal-close {
  position: fixed;
  color: #fff;
}

.ant-modal-wrap.instagram-modal .ant-modal-content button.ant-modal-close i {
  font-size: 24px;
}

.ant-modal-wrap.instagram-modal .ant-modal-content .ant-modal-body {
  padding: 0;
}

/********** Add Your Global RTL CSS Here **********/

/* Popover */

html[dir='rtl'] .ant-popover {
  text-align: right;
}

/* Ecommerce Card */

html[dir='rtl'] .isoCardInfoForm .ant-input {
  text-align: right;
}

/* Modal */

html[dir='rtl'] .has-success.has-feedback:after,
html[dir='rtl'] .has-warning.has-feedback:after,
html[dir='rtl'] .has-error.has-feedback:after,
html[dir='rtl'] .is-validating.has-feedback:after {
  left: 0;
  right: auto;
}

html[dir='rtl'] .ant-modal-close {
  right: inherit;
  left: 0;
}

html[dir='rtl'] .ant-modal-footer {
  text-align: left;
}

html[dir='rtl'] .ant-modal-footer button + button {
  margin-left: 0;
  margin-right: 8px;
}

html[dir='rtl'] .ant-confirm-body .ant-confirm-content {
  margin-right: 42px;
}

html[dir='rtl'] .ant-btn > .anticon + span,
html[dir='rtl'] .ant-btn > span + .anticon {
  margin-right: 0.5em;
}

html[dir='rtl'] .ant-btn-loading span {
  margin-left: 0;
  margin-right: 0.5em;
}

html[dir='rtl']
  .ant-btn.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline) {
  padding-left: 25px;
  padding-right: 29px;
}

html[dir='rtl']
  .ant-btn.ant-btn-loading:not(.ant-btn-circle):not(.ant-btn-circle-outline)
  .anticon {
  margin-right: -14px;
  margin-left: 0;
}

/* Confirm */

html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-body > .anticon {
  margin-left: 16px;
  margin-right: 0;
  float: right;
}

html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-btns {
  float: left;
}

html[dir='rtl'] .ant-modal.ant-confirm .ant-confirm-btns button + button {
  margin-right: 10px;
  margin-left: 0;
}

/* Message */

html[dir='rtl'] .ant-message .anticon {
  margin-left: 8px;
  margin-right: 0;
}

/* Pop Confirm */

html[dir='rtl'] .ant-popover-message-title {
  padding-right: 20px;
  padding-left: 0;
}

html[dir='rtl'] .ant-popover-buttons {
  text-align: left;
}

/* Notification */

html[dir='rtl']
  .ant-notification-notice-closable
  .ant-notification-notice-message {
  padding-left: 24px;
  padding-right: 0;
}

html[dir='rtl']
  .ant-notification-notice-with-icon
  .ant-notification-notice-message,
html[dir='rtl']
  .ant-notification-notice-with-icon
  .ant-notification-notice-description {
  margin-right: 48px;
}

html[dir='rtl'] .ant-notification-notice-close {
  right: auto;
  left: 16px;
}

html[dir='rtl'] .ant-notification-notice-with-icon {
  left: 0;
}

/* Dropzone */

html[dir='rtl'] .dz-hidden-input {
  display: none;
}

/* Helper Styles */
.flex-vertical{
  flex-direction: column !important;
}

.d-block {
  display:block;
}

.w-content {
  width: fit-content;
}

.w-100 {
  width: 100%;
}

.w-50 {
  width: 100%;
}

.w-25 {
  width: 25%;
}

.ml-auto {
  margin-left: auto;
}

.mr-auto {
  margin-left: auto;
}

.mb-3 {
  margin-bottom: 2.5em;
}

/* Custom Styles */
.isoRecentBoxWrapper {
  height: 200px;
  overflow: auto;
  .isoRecentBoxItem {
    display: flex;
    justify-content: space-between;
  }
}

.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
     border-color: ${palette("primary", 0)} !important;
     border-right-width: 0px !important;
}
.ant-select-focused.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
  border-color: ${palette("primary", 0)} !important;
  box-shadow: none !important;
}

.isoListComponentWrapper {
  &.ant-list {
    .ant-list-item {
      border-bottom: none;
      .ant-typography{
        color: ${palette("text", 0)};
        font-size: 15px;
      }
    }
  }
}

.ant-pagination-item-active:focus a, .ant-pagination-item-active:hover a {
  color: white !important;
}



.ant-form-item-label > label.ant-form-item-required::before {
  content: '' !important;
}
.ant-form-item-label > label{
  height: 42px !important;
  @media only screen and (max-width: 575px) {
    height: 100% !important;
  }
} 

.iconNoBorder {
  border: 0;
  background: transparent;
  outline: transparent;
  cursor: pointer;
}

.dashboardContent {
  .isoBoxWrapper{
    padding: 0px;

    .isoBoxHeaderWrapper{
      padding: 30px;
      margin-bottom: 0px;
    }

    .isoBoxChildrenWrapper{
      margin-top: 0px;
      padding: 30px;
    }

    .isoBoxFooterWrapper{
      padding: 30px;
    }

    .ant-form-item{
      margin-bottom: 20px;

      &:last-child{
        margin-bottom: 0px;
      }
    }
  }

  @media (max-width: 767px){
    .isoBoxWrapper{
      .isoBoxHeaderWrapper, .isoBoxChildrenWrapper, .isoBoxFooterWrapper{
        padding: 20px;
      }
    }
  }
}



.customLinksWrapper{
  .isoBoxWrapper{
    .ant-form-item-label{
      text-align:right;
    }
  }

  @media (max-width: 991px){
    .isoBoxWrapper{
      .ant-form-item-label{
        text-align:left;
      }
    }    
  }
}

.dashboardPhoneImg{
  width: 43.5%;
  margin: 0 auto;
  img{
    margin: 0 auto;
  }

  @media only screen and (max-width: 1600px) {
    width: 54.5%;
  }

  @media only screen and (max-width: 1400px) {
    width: 64%;
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
  }

}

.isoBoxFooterWrapper{
  padding: 30px;
  .dashboardButtonwrapper{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    span{
      &.ant-typography{
        display: inline-block;
        color: ${palette("label", 0)};
        margin-top: 20px;
        width: 100%;
      }
    }
    @media only screen and (max-width: 480px){
      text-align: center;
      justify-content: center;
    }
  }
}

.dashboardContent{
  .isoTexteditor{
    .isoBoxWrapper{
      .isoBoxChildrenWrapper{
        padding: 0px 0 30px;
        .ql-toolbar{
          margin-bottom: 20px;
          &.ql-snow{
            background-color: ${palette("grayscale", 13)};
            border: 0px;
            border-bottom: 1px solid ${palette("border", 0)};
            padding: 10px 30px;
            .ql-formats{
              border: 1px solid ${palette("border", 5)};
              border-radius: 4px;
              background-color: ${palette("text", 5)};
              .ql-picker{
                color: ${palette("label", 0)};
                height: 32px;
                line-height: 30px;
                font-weight: 400;
                .ql-picker-label{
                  &:focus{
                    outline: none;
                  }
                }
              }
              .ql-stroke{
                stroke: ${palette("label", 0)};
              }
            }
            &+ .ql-container{
              min-height: 100px;
              &.ql-snow{
                border-top: 1px solid ${palette("border", 0)};
                margin: 0 30px;
                .ql-editor{
                  min-height: 100px;
                }
              }
            }
          }
        }
        .ql-snow{
          &.ql-toolbar{
            button{
              height: 30px;
              width: 34px;
            }
          }
        }
      }
    }  
  }

  @media (max-width: 767px){
    .isoTexteditor{
      .isoBoxWrapper{
        .isoBoxChildrenWrapper{
          .ql-toolbar{
            &.ql-snow{
              padding: 10px 20px;
              &+.ql-container{
                &.ql-snow{
                  margin: 0 20px;
                }
              }
            }
          }
        } 
      } 
    } 
  }

  @media (max-width: 480px){
    .isoTexteditor{
      .isoBoxWrapper{
        .isoBoxChildrenWrapper{
          .ql-toolbar{
            &.ql-snow{
              .ql-formats{
                .ql-picker{
                  height: 28px;
                  line-height: 28px;
                }
              }
            }
            &.ql-toolbar{
              button{
                height: 28px;
                width: 32px;
              }
            }
          }
        } 
      } 
    } 
  }
}

.isoWidgetsWrapper{
  .isoBoxWrapper{
    .launchIconSwitch{
      .ant-typography{
        display: inline-block;
        vertical-align: middle;
        width: calc(100% - 35%);
        padding-right: 10px;
        color: ${palette("label", 0)};
        @media only screen and (max-width: 480px){
          margin-right: 0px;
          width: calc(100% - 50px);
        }
      }
    }
  }
}

.isoLayoutContentWrapper{
  .dashboardLinksWrapper{
    .isoBoxWrapper{
      .isoBoxChildrenWrapper{
        padding: 0px;
        .linksLabelwrapper{
          background-color: ${palette("grayscale", 13)};
          margin: 0 0 25px 0 !important;
          padding: 0 30px;
          border-bottom: 1px solid ${palette("border", 0)};
          >div{
            padding: 14px 0;
            margin-bottom: 0 !important;
          }
        }
        .dashboardLinkscheckbox{
          padding: 0 30px;
          .ant-row{
            .ant-col{
              color: ${palette("text", 0)};
              font-size: 15px;
              .ant-checkbox-wrapper-checked{
                .ant-checkbox-checked{
                  .ant-checkbox-inner{
                    &:after{
                      top: 6px;
                      left: 2.5px;
                      width: 5.5px;
                      height: 9.5px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    @media only screen and (max-width: 575px){
      .isoBoxWrapper{
        .isoBoxChildrenWrapper{
          .linksLabelwrapper{
            >div{
              padding: 14px 0 !important;
            }
          } 
        } 
      } 
    }

    @media only screen and (max-width: 400px){
      .isoBoxWrapper{
        .linksLabelwrapper{
          >div{
            text-align: center;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 767px){
    .dashboardLinksWrapper{
      .isoBoxWrapper{
        .isoBoxChildrenWrapper{
          .linksLabelwrapper, .dashboardLinkscheckbox{
            padding: 0 20px;
          }
        } 
      } 
    } 
  }
}

.dashboardContent{
  .bioPhotoWrapper{
    width: 150px;
    height: 150px;
    border-radius: 4px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center center;
  }
}

.dashboardlinksName{
  font-size: 12px;
  color: ${palette("label", 0)};
  @media (max-width: 1199px){
    font-size: 11px;
  }
}

.isoContentMainLayout{
  .ant-spin-nested-loading{
    >div{
      >.ant-spin{
        height: 100vh;
      }
    } 
  }   
}

.isoWidgetBox {
  padding: 0px !important;
  border: 0 !important;
  .isoSimpleTable {
    table {
      th,td {
        border-color: #E6E7EB;
      }
      th {
        background: #F7F8FA;
        border-bottom : 1px solid #E6E7EB;
      }
      td {
        .table-action-btns-grp {
          .ant-col {
            button {
              border:0;
              padding: 0;
            }
            & + .ant-col {
              margin-left: 20px;
              @media only screen and (max-width: 991px) {
                margin-left: 15px;
              }
            }
          }
          @media only screen and (max-width: 991px) {
            flex-wrap: nowrap;
            button {
              img { 
                width:35px;
              }
            }
          }
        }
      }
    }
    .ant-table-footer {
      padding: 16px;
    }
    .ant-pagination {
      padding: 0 16px;
    }
  }
}
.isoLayoutContentWrapper {  
  .isoBoxWrapper {
    padding:0;
    .isoBoxChildrenWrapper {
      .ant-form-item {
        margin-bottom: 20px;
        .quill {
          border:1px solid #CACACA;
          border-radius: 4px;
          .ql-snow {
            border:none;
            &.ql-toolbar {
              background: #F7F8FA;
              border-radius: 4px 4px 0px 0px;
              .ql-formats {
                background: #FFFFFF;
                border: 1px solid #CACACA;
                border-radius: 4px;
                .ql-stroke {
                  stroke: #8D8E90;
                }
                .ql-fill {
                  fill: #8D8E90;
                }
                .ql-picker-label {
                  color: #8D8E90;
                }
              }
            }
            .ql-blank {
              &:before {
                font-style: normal;
                left: 10px;
                color: #8D8E90;
              }
            }
            .ql-editor {
              padding: 6px 10px;
            }
          }
        }
      }
      @media only screen and (max-width: 768px)
      {
        .ant-form-item-label {
          text-align: left;
        }
      }
    }
  }
}
.ant-input {
  &::-webkit-input-placeholder {
    color: #8D8E90 !important;
  }
}
.ant-modal-wrap {
  display:flex;
  .ant-modal {
    margin: auto;
    top:0;
    max-width: 100%;
    padding: 0 15px;
    .ant-modal-content {
      .ant-modal-close {
        right: 14px;
        top: 14px;
      }
      .ant-modal-body {
        padding:0;
        .ant-typography {
          padding: 24px 24px 0px 24px;
        }
        .ant-divider {
          border-top: 1px solid #E6E7EB;
        }
        p {
          padding: 0px 24px 24px 24px; 
          min-height: 100px;
        }
      }
      @media only screen and (max-width: 768px) {
        .ant-modal-close {
          right: 0px;
          top: 0px;
        }
        .ant-modal-body {
          .ant-typography {
            padding: 15px 15px 0px 15px;
            font-size: 20px;
          }
          .ant-divider {
            margin: 15px 0;
          }
          p {
            padding: 0px 15px 15px 15px; 
          }
        } 
      }
    }
  }
}

.loanSettingsFees{
  padding: 30px;
  .isoWidgetBox{
    border: 0px;
    .ant-form-item{
      margin-bottom: 20px;
    }
  }
  @media only screen and (max-width: 991px) {
    .ant-form-item-label {
      text-align:left;
    }
  }
  @media only screen and (max-width: 767px) {
    padding: 20px;
  }
}

.loanButtonWrapper{
  width: 100%;
  padding: 30px !important;
  border-top: 1px solid ${palette("border", 0)};
  .ant-btn{
    min-width: auto !important;
  }
  @media only screen and (max-width: 767px) {
    padding: 20px !important;
  }
}

.loanAddNewFees {
  .ant-typography{
    padding: 30px;
    margin-bottom: 0px;
    border-bottom: 1px solid ${palette("border", 0)};
  }
  .isoWidgetsWrapper{
    padding: 30px;
  }
  @media (max-width: 991px){
    .isoWidgetsWrapper{
      .isoWidgetBox{
        .ant-row{
          .ant-form-item{
            >.ant-form-item-label{
              text-align: left;
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .ant-typography, .isoWidgetsWrapper{
      padding: 20px;
    }
  }
}
.isoLayoutContentWrapper {
  .addNewContentChecklist {
    @media only screen and (max-width: 768px) {
      .isoInputWrapper {
        .contentChecklistLabel {
          label 
          {
            margin-bottom:15px;
            text-align: left;
          }
        }
        .ant-form-item {
          margin-bottom:15px;
        }
      }
    }
  }
}
.isoLayoutContentWrapper{
  .calculatorDefaultValues{
    padding: 0px;
    margin-bottom: 30px;
    .isoBoxHeaderWrapper{
      padding: 30px;
    }
    .isoBoxChildrenWrapper{
      padding: 0px;
      .ant-form-horizontal{
        >.ant-row{
          padding: 10px 20px 0px;
          &:last-child{
            padding: 10px 20px 10px;
          }
        }
      }
    }
  }
  .calculatorsLoanFactors{
    padding: 0px;
    .isoBoxHeaderWrapper{
      padding: 30px;
      margin-bottom: 0px;
    }
    .isoBoxChildrenWrapper{
      padding: 0px;
      margin-top: 0px;
      .isoWidgetsWrapper{
        table {
          min-width: 900px;
          .ant-table-thead{
            tr{
              th{
                border-bottom: 1px solid ${palette("border", 0)};
                text-align: center;
              }
            }
          }
          .ant-table-tbody{
            tr{
              td{
                .ant-form-item{
                  margin-bottom: 0px;
                }
                .table-action-btns-grp{
                  button{
                    padding: 0px;
                    border: 0px;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1199px) {
    .calculatorDefaultValues{
      &.vaFundingFee{
        .ant-form-item-label{
          text-align: left;
        }
      }
    }
  }
  @media only screen and (max-width: 767px) {
    .calculatorDefaultValues,.calculatorsLoanFactors{
      .isoBoxHeaderWrapper{
        padding: 20px;
      }
    }
  }
  @media only screen and (max-width: 480px) {
    .isoBoxChildrenWrapper{
      .row-spacing{
        flex-direction: column;
        .ant-col{
          &+.ant-col{
            margin-top: 15px;
          }
        }
      }
    }
  }
}
.title-with-button {
  padding: 30px 30px 0px 60px !important;
  @media only screen and (max-width: 768px) {
    padding: 20px 20px 0px 15px !important;
    .customTabHeaderItems {
      flex-wrap: wrap;
    }
    .switch-button {
      margin-bottom:10px;
    }
  }
}
.switch-button {
  button {
    margin-left:15px;
  }
}
.row-spacing {
  padding:0 25px 25px;
  @media only screen and (max-width: 767px) {
    padding: 0 20px 25px;
  }
}
.submitbtnwrapper {
  margin: 25px 0 5px;
}
.cal-disclaimer {
  &.isoBoxWrapper {
    .isoBoxHeaderWrapper{
      padding: 30px;
    }
    .isoBoxChildrenWrapper {
      padding: 0;
      .isoWidgetsWrapper {
        padding: 10px 25px 5px;
      }
    }
  }
  .submitbtnwrapper {
    margin: 25px ;
  } 
  @media (max-width: 767px){
    &.isoBoxWrapper {
      .isoBoxHeaderWrapper{
        padding: 20px;
      }
      .isoBoxChildrenWrapper{
        .isoWidgetsWrapper{
          padding: 10px 20px 5px;
        }
      }
    }
  }
}

.marketingQrCode{
  .qrCodeTitle{
    padding: 30px;
    margin-bottom: 0px;
    border-bottom: 1px solid ${palette("border", 0)};
  }
  .loQrCode{
    padding: 30px;
    border-bottom: 1px solid ${palette("border", 0)};
    .ant-form-item-label{
      text-align: left;
    }
    .ant-form-item-control-input{
      min-height: 42px;
      span{
        color: ${palette("text", 0)};
      }
    }
    .qrCodeSize{
      .ant-form-item{
        align-items: center;
      }
    }
  }
  .qrCodeBtnWrapper{
    padding: 30px;
    .ant-btn{
      min-width: auto;
    }
  }
  @media (max-width: 767px){
    .qrCodeTitle, .loQrCode, .qrCodeBtnWrapper{
      padding: 20px;
    }
  }

}

.qrCodePickSize{
  a{
    display: inline-block;
    border: 2px solid transparent;
    border-radius: 4px;
    &.active{
      border: 2px solid ${palette("primary", 0)};
    }
    &:not(:last-child){
      margin-right: 7px;
    }
    .isoImgWrapper{
      padding: 5px;
      &.small{
        width: 40px;
      }
      &.medium{
        width: 60px;
      }
      &.large{
        width: 80px;
      }
      &.extralarge{
        width: 100px;
      }
    }
  }
  @media (max-width: 400px){
    display: flex;
    align-items: center;
    flex-direction: column;
    a{
      &:not(:last-child){
        margin-right: 0px;
        margin-bottom: 5px;
      }
    }
  }
}

.qrCodePickSizeTable{
  a{
    display: inline-block;
    border: 2px solid transparent;
    border-radius: 4px;
    &.active{
      border: 2px solid ${palette("primary", 0)};
    }
    &:not(:last-child){
      margin-right: 7px;
    }
    .isoImgWrapper{
      padding: 5px;
      &.small{
        width: 40px;
      }
      &.medium{
        width: 60px;
      }
      &.large{
        width: 80px;
      }
      &.extralarge{
        width: 100px;
      }
    }
  }
  @media (max-width: 400px){
    a{
      &:not(:last-child){
        margin-right: 0px;
        margin-bottom: 5px;
      }
    }
  }
}


.coBrandingOfficerTable{
  .table-action-btns-grp{
    button{
      padding: 0px;
      border: 0px;
      cursor: pointer;
    }
  }
}

.loanFactorsTableGlobal{
  .ant-table-container{
    table{
      tr{
        th:first-child, td:first-child{
          padding-left: 250px;
        }
      }  
      tr{
        th:last-child, td:last-child{
          padding-right: 200px;
        }
      }
    }
  }
  @media (max-width: 1550px){
    .ant-table-container{
      table{
        tr{
          th:first-child, td:first-child{
            padding-left: 220px;
          }
        }  
        tr{
          th:last-child, td:last-child{
            padding-right: 170px;
          }
        }
      }
    } 
  }
  @media (max-width: 1440px){
    .ant-table-container{
      table{
        tr{
          th:first-child, td:first-child{
            padding-left: 160px;
          }
        }  
        tr{
          th:last-child, td:last-child{
            padding-right: 120px;
          }
        }
      }
    } 
  }
  @media (max-width: 1199px){
    .ant-table-container{
      table{
        tr{
          th:first-child, td:first-child{
            padding-left: 16px;
          }
        }  
        tr{
          th:last-child, td:last-child{
            padding-right: 16px;
          }
        }
      }
    } 
  }
}

.loanFactorsAffordabilityTable{
  .ant-table-container{
    table{
      tr{
        th:first-child, td:first-child{
          padding-left: 250px;
        }
      }  
      tr{
        th:last-child, td:last-child{
          padding-right: 270px;
        }
      }
    }
  } 
  @media (max-width: 1550px){
    .ant-table-container{
      table{
        tr{
          th:first-child, td:first-child{
            padding-left: 290px;
          }
        }  
        tr{
          th:last-child, td:last-child{
            padding-right: 240px;
          }
        }
      }
    } 
  }
  @media (max-width: 1440px){
    .ant-table-container{
      table{
        tr{
          th:first-child, td:first-child{
            padding-left: 240px;
          }
        }  
        tr{
          th:last-child, td:last-child{
            padding-right: 220px;
          }
        }
      }
    } 
  }
  @media (max-width: 1370px){
    .ant-table-container{
      table{
        tr{
          th:first-child, td:first-child{
            padding-left: 140px;
          }
        }  
        tr{
          th:last-child, td:last-child{
            padding-right: 180px;
          }
        }
      }
    } 
  }
  @media (max-width: 1199px){
    .ant-table-container{
      table{
        tr{
          th:first-child, td:first-child{
            padding-left: 16px;
          }
        }  
        tr{
          th:last-child, td:last-child{
            padding-right: 16px;
          }
        }
      }
    } 
  }
}

.documentTable{
  table{
    .ant-table-tbody{
      .ant-col{
        button{
          padding: 0px;
          border: 0px;
          cursor: pointer;
        }
      }
      tr{
        td:last-child{
          .ant-col{
            &+.ant-col{
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}
/* learning center */
.isoLayoutContentWrapper{ 
  .commonWidgetBox{
    .isoWidgetBox{
      .contentLearningCenter{
        .isoSimpleTable{
          .ant-table-thead{
            tr:first-child{
              th:first-child{
                padding-left: 14px;
              }
            }
          }
        }
      }
      .ant-spin-container{
        .ant-table-footer{
          padding: 30px;
          .userBorrowViewBtn{
            padding: 0px;
          }
        }
      }
    }
  }
}
.ant-modal-wrap{
  .restoreDefaultsPopup{
    .ant-modal-content{
      .ant-modal-body, .ant-modal-footer{
        padding: 30px;
      }
       .ant-modal-body{
        padding-top: 55px;
      }
      .ant-modal-footer{
        .ant-btn{
          padding: 0 19px;
          height: 42px;
          color: #4FB263;
          background-color: #fff;
          min-width: auto;
          border-radius: 4px;
          text-transform: uppercase;
          font-weight: 500;
          text-align: center;
          font-size: 14px;
          line-height: 1.5;
          border: 1px solid #4FB263;
          transition: all 0.3s cubic-bezier(0.215,0.61,0.355,1);
          &.ant-btn-primary{
            background-color: #4FB263;
            border-color: #4FB263;
            color: #fff;
            &:hover{
              background-color: #3e8f4e;
              border-color: #3e8f4e;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
/* */

/* My account page css */
.myAccountUserDetails{
  padding: 30px 30px 10px;
  .isoWidgetsWrapper{
    .ant-row{
      .ant-form-item{
        margin-bottom: 20px;
      }
    }
  }
  @media (max-width: 991px){
    .isoWidgetsWrapper{
      .ant-row{
        .ant-form-item{
          .ant-form-item-label{
            text-align: left;
          }
        }
      }   
    }
  } 
  @media (max-width: 575px){
    padding: 20px 20px 10px;
  }
}

.myAccountCommonInfo{
  .isoLayoutHeaderContentWrapper{
    border: 1px solid ${palette("border", 0)};
    padding: 30px;
    .ant-typography{
      margin-bottom: 0px;
    }
  }
  .myAccountCommonContent{
    border-top: 0px;
    padding: 30px;
    .isoWidgetsWrapper{
      .ant-row{
        .ant-form-item{
          margin-bottom: 20px;
        }
      }
      .myAccountAddress{
        >.ant-col{
          padding-left: 4px !important;
        }
      }
    }
  }
  @media (max-width: 991px){
    .myAccountCommonContent{
      .isoWidgetsWrapper{
        .ant-row{
          .ant-form-item{
            .ant-form-item-label{
              text-align: left;
            }
          }
        }
        .myAccountAddress{
          >.ant-col{
            padding-left: 10px !important;
          }
        }
      }
    }
  }
  @media (max-width: 575px){
    .isoLayoutHeaderContentWrapper{
      padding: 20px;
    }
    .myAccountCommonContent{
      padding: 20px;
    }
  }
}

.myAccountSaveBtn{
  padding: 0 0 30px 60px;
  @media (max-width: 575px){
    padding: 0 0 20px 40px;
  }
}

/* My account page css ends */

/* Settings page css */
.commonSettingsDiv{
  .passwordSettings{
    .ant-typography{
      margin: 0px;
      padding: 30px;
      font-size: 17px;
      border-bottom: 1px solid ${palette("border", 0)};
    }
    .ant-form-horizontal{
      .passwordsWrapper{
        padding: 30px;
        border-bottom: 1px solid ${palette("border", 0)};
        .ant-row{
          .ant-form-item{
            margin-bottom: 20px;
          }
        }
      }
      .submitbtnwrapper{
        margin: 0px;
        padding: 30px;
      }
    }
  }
  @media (max-width: 991px){
    .passwordSettings{
      .ant-form-horizontal{
        .passwordsWrapper{
          .ant-row{
            .ant-form-item{
              .ant-form-item-label{
                text-align: left;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 575px){
    .passwordSettings{
      .ant-typography{
        padding: 20px;
      }
      .ant-form-horizontal{
        .passwordsWrapper, .submitbtnwrapper{
          padding: 20px;
        }
      } 
    } 
  }  
}
.passwordSettingsDiv{
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxHeaderWrapper{
      padding: 30px;
      margin: 0px;
    }
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 30px 30px 14px 30px;
      .ant-row{
        >.ant-col{
          color: ${palette("text", 0)};
        }
      }
    }
  }
  @media (max-width: 575px){
    .isoBoxWrapper{
      .isoBoxHeaderWrapper, .isoBoxChildrenWrapper{
        padding: 20px;
      }
    } 
  }
}

/* Settings page css ends */

/* upload button css */
.uploadPhotobtn{
  position: relative;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  background-color: #4FB263;
  border-color: #4FB263;
  color: #fff;
  padding: 9px 19px;
  border-radius: 4px;
  margin-right: 30px;
  text-transform: uppercase;
  ${transition()};
  .ant-input{
    text-indent: -999px;
    position: absolute;
    padding: 0px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    opacity: 0;
    cursor: pointer;
    border: 0px;
    height: 100%;
  }
  &:hover{
    background-color: ${palette("primary", 15)};
  }

  @media (max-width: 480px){
    .uploadPhotobtn{
      margin-right: 0px;
      margin-bottom: 20px;
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }
}

.uploadPhotobtnWrapper{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  .uploadPhotobtn{
    background-color: ${palette("text", 5)};
    border: 1px solid #4FB263;
    color: #4FB263;
    &:hover{
      border-color: ${palette("text", 15)};
      color: ${palette("text", 15)};
    } 
  }
}

/* */

/* style for p tag in popup */
.ant-modal-wrap{
  .ant-modal{
    .ant-modal-content{
      .ant-modal-body{
        p{
          min-height: auto;
          padding-bottom: 15px;
        }
      } 
    } 
  } 
} 
/* */

/* profile bio mobile design */
.isoLayoutContentWrapper{
  .profileBioContent{
    .dashboardPhoneImg{
      position: relative;
      .mobile-content{
        position: absolute;
        top: 10%;
        left: 0;
        width: 80%;
        height: 80%;
        background-color: #fff;
        right: 0;
        margin: auto;
        border-radius: 15px;
        overflow: hidden;
        .mobile-body{
          padding: 15px;
          .bioMobileTitle{
            text-align: center;
            color: ${palette("primary", 0)};
            font-size: 17px;
            line-height: 24px;
            margin: 0 0 15px 0;
          }
          > img{
            width: 120px;
            margin-bottom: 25px;
          }
          .profileBioMobileOutput{
            .bioBgcolorWrap{
              background-color: ${palette("primary", 0)};
              padding: 10px 10px 15px;
              border-radius: 4px;
              margin-bottom: 20px;
              .profileUserContent {
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
                margin: 0 0 20px 0;
                .profileImagWrap{
                  margin-right: 5%;
                  margin-top: -10%;
                  width: 37%;
                  img{
                    width: 100%;
                    border-radius: 4px;
                    object-fit: cover;
                  }
                }
                .profileUserDetails{
                  width: calc(100% - 42%);
                  h4, h5{
                    color: ${palette("text", 5)};
                  }
                  .userName{
                    font-size: 16px;
                    font-weight: 700;
                    line-height: 20px;
                  }
                  .userDesignation, .userCode{
                    font-size: 13px;
                    line-height: 18px;
                    font-weight: 400;
                  }
                  .userCode{
                    span{
                      text-transform: uppercase;
                    }
                  }
                }
              }
              .profileSocialLinks{
                padding: 0 10px;
                .profileSocialListing{
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  &:first-child{
                    li{
                      margin-bottom: 15px;
                    }
                  }
                  li{
                    background-color: ${palette("text", 5)};
                    width: 18%;
                    padding: 4% 0;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    svg{
                      height: 20px;
                    }
                  }
                }
              }
            }
            .userBioDescription{
              height: 100%;
              h3, p{
                font-size: 15px;
                line-height: 20px;
                color: ${palette("text", 0)};
              }
              h3{
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: 1199px){
    .profileBioContent {
      .dashboardPhoneImg {
        .mobile-content {
          .mobile-body{
            padding: 10px;
            > img{
              width: 100px;
              margin-bottom: 20px;
            }
            .bioMobileTitle{
              font-size: 15px;
              line-height: 22px;
              margin: 0 0 10px 0;
            }
            .profileBioMobileOutput {
              .bioBgcolorWrap {
                padding: 7px 7px 12px;
                margin-bottom: 15px;
                .profileUserContent {
                  .profileImagWrap{
                    width: 55px;
                    margin-right: 7px;
                    margin-top: -15px;
                  }
                  .profileUserDetails{
                    width: calc(100% - 62px);
                    .userName{
                      font-size: 15px;
                    }
                    .userDesignation, .userCode{
                      font-size: 12px;
                      line-height: 17px;
                    }
                  }
                }
                .profileSocialLinks {
                  .profileSocialListing {
                    &:first-child{
                      li{
                        margin-bottom: 10px;
                      }
                    }
                    li{
                      width: 28px;
                      height: 28px;
                      padding: 0;
                    }
                  }
                }    
              }
              .userBioDescription{
                h3, p{
                  font-size: 14px;
                  line-height: 18px;
                }
                h3{
                  margin-bottom: 5px;
                }
              }
            }      
          }
        }
      }
    }      
  }
  @media (max-width: 991px){
    .profileBioContent{
      .dashboardPhoneImg{
        width: 90%;
        .mobile-content {
          .mobile-body {
            .profileBioMobileOutput {
              .bioBgcolorWrap {
                .profileUserContent{
                  margin: 0 0 10px 0;
                }
              }
            }
          }
        }        
      }
    }
  }
  @media (max-width: 767px){
    .profileBioContent {
      .dashboardPhoneImg{
        width: 48%;
        >img{
          margin: inherit;
        }
      }
    }  
  }
  @media (max-width: 575px){
    .profileBioContent {
      .dashboardPhoneImg{
        .mobile-content {
          .mobile-body {
            > img{
              width: 80px;
            }
            .profileBioMobileOutput {
              .bioBgcolorWrap {
                .profileUserContent {
                  .profileImagWrap{
                    width: 50px;
                  }
                  .profileUserDetails{
                    width: calc(100% - 57px);
                    .userName{
                      font-size: 13px;
                    }
                    .userDesignation, .userCode{
                      font-size: 10px;
                      line-height: 16px;
                    }
                  }
                }
                .profileSocialLinks{
                  padding: 0 5px;
                  .profileSocialListing {
                    li{
                      width: 24px;
                      height: 24px;
                      svg{
                        width: 11px;
                        height: 15px;
                      }
                    }
                  }  
                }
              }
              .userBioDescription {
                h3,p{
                  font-size: 12px;
                  line-height: 16px;
                }
              }  
            }      
          }
        }    
      }
    }  
  }
  @media (max-width: 480px){
    .profileBioContent {
      .dashboardPhoneImg{
        width: 100%;
        >img{
          width: 100%;
        }
        .mobile-content {
          .mobile-body {
            .bioMobileTitle{
              font-size: 16px;
              line-height: 24px;
              margin: 0 0 12px 0;
            }
            > img{
              width: 100px;
              margin-bottom: 25px;
            }
            .profileBioMobileOutput {
              .bioBgcolorWrap {
                .profileUserContent {
                  .profileImagWrap{
                    width: 60px;
                  }
                  .profileUserDetails{
                    width: calc(100% - 68px);
                    .userName{
                      font-size: 15px;
                    }
                    .userDesignation, .userCode{
                      font-size: 12px;
                      line-height: 18px;
                    }
                  }
                }
                .profileSocialLinks{
                  padding: 0 10px;
                  .profileSocialListing {
                    li{
                      width: 30px;
                      height: 30px;
                      svg{
                        width: 14px;
                        height: 18px;
                      }
                    }
                  }  
                }
              }
              .userBioDescription {
                h3,p{
                  font-size: 14px;
                  line-height: 20px;
                }
              }  
            }
          }  
        }   
      }
    }  
  }
}
.dashboardLinkscheckbox {
  .ant-checkbox-disabled {
    .ant-checkbox-inner {
      background-color: #f5f5f5 !important;
    }
  }
}
/* */


`;

export default GlobalStyles;
