import styled, { createGlobalStyle } from "styled-components";
import { palette } from "styled-theme";
import SearchIcon from "@iso/assets/images/search.svg";
export const DashboardGlobalStyles = createGlobalStyle`
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
  /* font-family: 'Heebo', sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
}

html ul {
  -webkit-padding-start: 0px;
  list-style: none;
  margin-bottom: 0;
}

/* Title Stlye */
h1.ant-typography, h2.ant-typography, .ant-typography h1, .ant-typography h2 {
  color: #423F3F !important;
}

/* Export Select Input Style */
.exportSelectInput {
  text-align:left;

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

.ant-popover-placement-bottom > .ant-popover-content > .ant-popover-arrow:after,
.ant-popover-placement-bottomLeft
  > .ant-popover-content
  > .ant-popover-arrow:after,
.ant-popover-placement-bottomRight
{
  // width:380px;
}
.filter-wrapper 
{
  padding:12px 16px;
}
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
  // margin-left: -4px;
}
.ant-popover-inner-content
{
  padding:0;
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



/* Activity tab */
.isoContentMainLayout{
  .activityUserMainHeader{
    padding-right: 15px;
    .ant-typography{
      margin-bottom: 20px;
    }
  }
  @media (max-width: 767px){
    .activityUserMainHeader{
      padding-right: 25px;
      padding-left: 45px;
    }
  }
  @media (max-width: 575px){
    .activityUserMainHeader{
      padding-right: 15px;
      padding-left: 35px;
    }
    .isoLayoutHeaderActionWrapper{
      
      .ant-row.ant-form-item
      {
        border-radius: 4px 4px 0 4px;
      }
      .ant-row{
        .ant-col{
          .ant-form-item{
            margin-bottom:20px!important;
            .ant-form-item-label{
             
              
              padding: 0px 10px 0 0;
            }
          }
        }
      }
      >.ant-row{
        >.ant-col{
          padding: 15px 0 0;
          margin-bottom:20px;
        }
      }
      @media (max-width: 575px)
      {
        padding: 0px 15px;
      }
    }
  }
}
.isoLayoutHeaderActionWrapper.message-layout 
  {
    padding-left:0px!important;
    padding-right:0px!important;
    .message-search-user
    {
      padding-left:20px!important;
      padding-right:20px!important;
    }
  }
  .message-filter
  {

    padding-top:10px;
    .freelance-task 
    {
      padding-top: 10px;
    }
    @media (max-width:767px)
    {
      .business-task, .check-complete, .check-cancel
      {
        padding-top: 10px;
      }
      
      
    }
    @media (max-width:576px)
    {
      .urgent-task, .check-complete, .check-cancel, .check-active, .report-freelance,
      .check-report
      {
        padding-top: 10px!important;
      }
    }
  }
  
  .catagory-wrapper
  {
    
    .filter-category
    {
      max-width:210px;
      @media (max-width:575px)
      {
        max-width:50%;
      }
    }
    
    .sub-catagory 
    {
      .ant-form-item
      {
        margin-bottom: 30px!important;
      }
    }
    .catagory-item
    {
      .ant-row
      {
        display:block;
        text-align: left;
      }
    }
    
    .ant-col
    {
      .ant-form-item.filter-catagory-space 
      {
        margin-bottom:0px!important;
      }
      .ant-form-item
      {
        margin-bottom:20px!important;
        .ant-form-item-label 
        {
          >label 
          {
            height:21px!important;
          }
        }
        .ant-form-item-control
        {
          margin-top:10px;
          .add-btn
          {
            padding:16px 16px!important;
            margin-left:10px;
            height:30px;
            width:30px;
            align-self:center;
          }
            
        }
        
        
      }
    }
    
  }
  .filter-btn-wrapper
  {
    display:flex;
    .ant-btn
    {
      margin-right:20px!important;
    }
    @media (max-width: 600px)
    {
      
    }
  }
  .show-task-wrapper 
  {
    margin-top:10px;
  }
  .date-wrapper 
  {
    .ant-col
    {
      .ant-picker-large
      {
        width:calc(100% - 80px);
        margin-top:10px;
        border-radius: 4px;
        .ant-picker-input > input
        {
          font-size: 13px;
        }
        
        
      }
    }
    
  }
  
.isoLayoutHeaderActionWrapper{
  .topbar-wrapper 
      {
        padding: 0px 20px 20px;
      }
  .filter-btn-wrapper 
  {
    display:flex;
    .ant-btn
    {
      margin-right:20px!important;
    }
  }
 
  .message-wrapper
  {
    align-items:flex-start!important;
    border-top: 1px solid #E5E5E5;
    .messages
    {
      border-right:1px solid #E5E5E5;
      border-top:1px solid #E5E5E5;

    }
    
    .ant-list-bordered
    {
      border:none;
    }
    .ant-list-bordered.ant-list-lg .ant-list-item 
    {
        align-items:start;
       
        padding: 10px;
       
        .ant-list-item-meta-avatar
        {
          margin-right: 10px!important;
          .ant-avatar-group .ant-avatar 
          {
            border-radius:4px;
            width:46px;
            height:46px;
          }
          .ant-avatar-group .ant-avatar:not(:first-child)
          {
            margin-left: -20px;
          }
        }
        .ant-list-item-meta-content
        {
            text-align:left;
            .ant-list-item-meta-title 
            {
              font-size:14px;
              line-height:22px;
            }
            .ant-list-item-meta-description
            {
                font-size: 12px;
            }
        }
        .ant-list-item-action
        {
          margin-left:16px!important;
          li
          {
            font-size: 10px;
            padding-right: 0px;
          }
        }
    }
    .messagebox
    {
      .isoBoxWrapper
      {
        border:none;
        border-left: 1px solid #E5E5E5;
        border-top: 1px solid #E5E5E5;
        .isoBoxHeaderWrapper
        {
          padding:15px 20px;
          .isoBoxTitle
          {
            .ant-avatar-group 
            {
              h3 
              {
                width: calc(100% - 205px);
                margin-left: 10px;
                font-size: 16px;
                line-height: 30px;
              }
              p
              {
                width: calc(100% - 205px);
                margin-top: 22px;
                margin-left: 0px;
                font-size: 14px;
                line-height: 25px;
                color: #758287;
              }
              .ant-avatar
              {
                width:46px;
                height:46px;
                border-radius:4px;
              }
              
            }
            .ant-avatar-group .ant-avatar:not(:first-child)
            {
              margin-left: -20px;
            }
          }

        }
        .isoBoxFooterWrapper
        {
          border-top:1px solid transparent;
          .ant-row 
          {
            .message-type-box
            {
              .ant-input-affix-wrapper-lg
              {
                background-color: #F8FAFB;
                border-radius: unset;
                border: 1px solid transparent;
                .ant-input 
                {
                  background-color: #F8FAFB;
                }
              }

            }
          }
        }
      }
      
    }
  }
  .ant-row{
    align-items:center;
    .ant-col 
    {
      .ant-form.item
      {
        margin-bottom: 30px!important;
      }
    }
    
    &.ant-form-item{
      
    }
    .userDetailButton{
      display: flex;
      justify-content: flex-end;
      .userDetailDelete{
        min-width: auto;
        margin-left: 15px;
      }
    }
    .ant-btn{
      padding: 0 10px;
      border-color: #cdcdcd;
      margin: 0 auto;
      &.ant-btn-primary{
        min-width: auto;
      }
    }
    .edit-add-button
    {
      display: flex;
      align-items:center;
    }
    .ant-btn.view-btn 
    {
      padding: 8px 25px;
      margin:0px;
      &:hover
      {
        
        background-color: #758287;
        span 
        {
          color:#ffffff!important;
        }
      }
    }
    .ant-btn-tag{
      padding: 0px;
      min-width: auto;
    }
    .ant-form-item-control{
      .ant-select-arrow{
        top: 48%;
      }
    }
    .searchUsers{
      padding: 0px !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
      margin-left: auto;
      text-align: right;
      .ant-row {
        width: 230px;
        max-width: 100%;
        display: inline-block;
        margin-bottom: 0px!important;
        @media (max-width: 991px) {
          width:160px;
        }
        @media (max-width: 768px) {
          // width:calc(100% - 103px);
         width:100%;
         
        }
        @media (max-width: 600px)
        {
          // width:calc(100% - 103px);
          width:100%;
          text-align:left;
        }
        @media (max-width: 480px)
        {
          width:100%;
        }
      }
      .ant-btn {
        margin: 0 0 0 15px;
        display: inline-block;
        font-size: 14px !important;
        @media (max-width: 768px)
        {
          text-align:center;
          
          
        }
        @media (max-width: 600px)
        {
          width:100%;
          margin:0px;
          margin-top:10px;
          
        }
        @media (max-width: 480px)
        {
          width:100%;
          margin:0px;
          margin-top:10px;
          
        }
      }
      
      .filter-category
      {
        padding-right:10px;
        max-width:210px;
      }  
      
      .ant-form-item-control-input-content{
        
        position: relative;
        &:after{
          content: '';
          position: absolute;
          right: 7px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
           background-image: url(${SearchIcon});
          background-repeat: no-repeat;
          background-size: 18px auto;
          background-position: center;
          cursor: pointer;
        }
        .ant-input{
          padding: 6px 30px 6px 10px;
          height: 35px;
          border: 0.5px solid #cdcdcd;
          &::placeholder{
            color: #cdcdcd;
          }
        }
      }
      @media (max-width:575px)
      {
        margin-top:0px!important;
        margin-bottom:0px!important;
        .filter-btn
        {
          margin-top:0px!important;
        }
      }
      @media (max-width:768px)
      {
        display: flex;
      }
      @media (max-width:600px)
      {
        display: block;
      }
      .filter-btn 
      {
        font-weight:700!important;
        &:hover, &:focus
        {
          font-weight:700!important;
          border-color: #FCAE1D!important;
          color: #FCAE1D!important;
        }
        
      }
    }
/* add */
.exportToSelect{
  height: 35px;
  text-align: left;
  padding-left: 0px!important;
  @media (max-width: 1200px){
    margin: 0 0 0px;
  }
  @media (max-width:767px)
  {
    margin-bottom:20px;
  }
  .ant-row {
    display:inline-block;
    width: auto;
  }
  .ant-form-item-control {
    width: 120px;
    display: inline-block;
    margin-right: 15px;
    @media (max-width: 991px) {
      width: 82px;
    }
  }
  .ant-form-item{
    height: 100%;
    label{
      height: 35px;
      color: #758287;
      font-size: 14px;
    }
    .ant-select{
      .ant-select-arrow{
        display: flex;
        align-items: flex-end;
        &:before{
          content: "\\e910";
          display: block;
          font-family: 'icomoon' !important;
          font-size: 7px;
          color: #758287;

        }
        img{
          display: none;
        }
      }
      .ant-select-selector{
        height: 35px;
        border: 1px solid #cdcdcd!important;
      }
    }
  }
}
.exportBtn{
  height: 35px;
  display: inline-block;
  
  @media (max-width: 1200px){
    margin: 0 0 20px;
  }
  button{
    height: 35px;
    font-size: 14px;
    font-weight: 700;
    text-shadow: none;
    box-shadow: none;
    border: 1px solid #fcae1d;

    &:hover. &:active 
    {
      background-color: #ffffff!important;
      color: #fcae1d!important;
      border-color: #fcae1d;
    }
  }
}
.add-catagory-btn
    {
      span 
      {
        font-weight: 700;
      }
      &:hover
      {
        border-color: #fcae1d;
        span
        {
          color: #fcae1d;
        }
      }
    }
.ant-select{
  .ant-select-selection-item {
    font-size: 14px;
    font-weight: 400;
    
  }
}
&.ant-row-start{
  padding: 0 !important;
}

  }
  @media (max-width: 1199px){
    .ant-row{
      .searchUsers{
        // padding: 0 12.5px 0px !important;
        margin-left: 0px;
        &.altSearchUser{
          margin-left: auto;
          padding: 0px !important;
        }
      }
    }
  }
  @media (max-width: 991px){
    .ant-row{
      .generateReportBtn{
        padding: 15px 0 0 0;
        &.activityCalculations{
          padding: 0px;
        }
      }
      .userDetailButton{
        justify-content: flex-start;
        margin-top: 15px;
      }
      .searchUsers{
        margin-bottom: 0px;
        &.altSearchUser{
          margin-left: 0;
          padding: 0 12.5px 0px !important;
        }
      }
    }
  }
  @media (max-width: 575px){
    .ant-row{
      .generateReportBtn{
        &.activityCalculations{
          padding: 15px 0 0 0;
        }
      }
      .searchUsers{
       
        margin-top: 10px;
        .ant-form-item-control-input-content{
          &:after{
            width: 16px;
            height: 16px;
            background-size: 15px auto;
           
          }
        }
      }
    }
    
    .pushNotificationBtn, .generateReportBtn{
      flex: 0 0 50%;
      max-width: 50%;
    }
    .exportToSelect, .exportBtn 
    {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
  @media (max-width: 480px){
    .exportToSelect, .exportBtn, .pushNotificationBtn, .generateReportBtn{
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
  
}

.row-dragging {
  background: #fafafa;
  border: 1px solid #ccc;
}

.row-dragging td {
  padding: 16px;
  visibility: hidden;
}

.row-dragging .drag-visible {
  visibility: visible;
}

/* my ac frimasked */
.my-acc-img-wrapper 
{
  text-align:start;
}
.MyaccImage{    
    width: 160px; /*328 co je 1/3 - 20margin left*/
    height: 160px;
    line-height: 20px;
    margin-top: 0px;
    
    margin-right:0px;
    display:inline-block;
    position:relative;
}

.myAccontButton {
    position:absolute;
    bottom:-7px;
    right:-7px;
    .anticon-camera
    {
      width:30px;
      height:30px;
      margin-bottom: unset;
      padding-bottom: unset!important;
      border-radius:4px;
      svg
      {
        margin-top:5px!important;
      }
    }
}
.my-acc-form-wrapper
{
  .ant-form-item-label
  {
    text-align:left;
    margin-bottom: 0px;
  }
  .ant-col
  {
    margin-left:unset!important;
    margin-right:unset!important;

  }
  .ant-form-item-control-input-content
  {
    text-align:left;
  }
  @media(max-width: 991px)
  {
    margin-top:30px;
  }
}
.d-flex {
    display: flex;
    flex-wrap: wrap;
  }

/* faqs */
.supportFaqsWrapper{
  .ant-collapse{
    border: 0px;
    background-color: transparent;
    .ant-collapse-item{
      border-bottom: 0px;
      border: 1px solid ${palette("border", 0)};
      ${"" /* margin-bottom: 30px; */}
      &:last-child{
        border: 1px solid ${palette("border", 0)};
      }
      .ant-collapse-header{
        font-size: 14px;
        color:#423F3F;
        font-weight: 700;
        background-color: #fff;
        text-align-last: start;
        padding: 20px 35px;
       
        ${
          "" /* &:before{
          content: ''; 
          position: absolute;
          width: 0px;
          height: 0px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 8px solid #1F2428;
          right: 30px;
          top: 50%;
          transform: translateY(-50%);
        } */
        }
        .ant-collapse-arrow{
          padding: 0 !important;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .ant-collapse-content{
        border-top: 1px solid ${palette("border", 0)};
        color: ${palette("label", 0)};
        .ant-collapse-content-box{
          padding: 20px;
          background: #fff;
        }
      }
      &.ant-collapse-item-active{
        .ant-collapse-header{
          &:before{
            transform:rotate(-180deg);
          }
        }
      }
    }
  }
  @media (max-width: 575px){
    .ant-collapse {
      .ant-collapse-item {
        .ant-collapse-header{
          padding: 20px 35px;
        }
        .ant-collapse-content {
          .ant-collapse-content-box{
            padding: 20px;
          }
        }
      }
    }
  }
}
/* */


/* faqs */
.supportFaqsWrapperNested{
  .ant-collapse{
    border: 0px;
    background-color: transparent;
    .ant-collapse-item{
      border-bottom: 0px;
      border: 0px solid ${palette("border", 0)};
      ${"" /* margin-bottom: 30px; */}
      &:last-child{
        border: 0px solid ${palette("border", 0)};
      }
      .ant-collapse-header{
        font-size: 14px;
        color:#423F3F;
        font-weight: 10;
        background-color: #fff;
        text-align-last: start;
        padding: 0 35px;
        .ant-collapse-arrow{
          padding: 0 !important;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
        }
      }
      .ant-collapse-content{
        border-top: 0px solid ${palette("border", 0)};
        color: ${palette("label", 0)};
        .ant-collapse-content-box{
          padding: 20px 50px;
        }
      }
      &.ant-collapse-item-active{
        .ant-collapse-header{
          &:before{
            transform:rotate(-180deg);
          }
        }
      }
    }
  }
  @media (max-width: 575px){
    .ant-collapse {
      .ant-collapse-item {
        .ant-collapse-header{
          padding: 0 30px;
        }
        .ant-collapse-content {
          .ant-collapse-content-box{
            padding: 10px;
          }
        }
      }
    }
  }
}

.isoLayoutContentWrapper{
 
  .broken-floor-wrapper 
  {
    padding: 20px 10px 10px 20px;
    @media (max-width:991px)
    {
      padding: 20px 20px 10px;
    }
  }
  .fencing-wrapper 
  {
    padding: 20px 20px 10px 10px;
    @media (max-width:991px)
    {
      padding: 10px 20px;
    }
  }
  .plumbing-wrapper 
  {
    padding:10px 10px 10px 20px;
    @media (max-width:991px)
    {
      padding: 10px 20px 20px;
    }
  }
  .suspend-btn 
  {
    padding:8px 25px;
    span
    {
      color: #ffffff!important;
      font-weight: 700;
    }
    &:hover
    {
      background-color:#ffffff!important;
      color: #ed4c5c!important;
      border: 1px solid #ed4c5c!important;
    }
  }
  .user-info
  {
    @media (max-width:1200px)
    {
      margin-top: 20px;
    }
  }
  .authentication
  {
    text-align:left;
  }
  .user-detail-content
  {
    .isoUserProfileWidgetItem
    {
      p
      {
        min-width:115px!important;
      }
      &:first-child
      {
        padding-top:0px;
      }
      &:last-child
      {
        padding-bottom:0px;
      }
    }
    @media (max-width:1200px)
    {
      margin-top:20px;
      li
      {
        &:first-child
        {
          padding-top:0px;
        }
      }
    }
  }
  .user-detail-earn 
  {
    margin-top:20px;
  }
  .choice-btn-wrapper
  {
    display:flex;
    .ant-btn
    {
      margin-right:20px;
    }
    .save-btn
    {
      padding:8px 25px;
      font-weight: 700;
    }
    .cancel-btn
    {
      padding:8px 25px;
      color: #758287;
      border-color: #cdcdcd;
      font-weight: 700;
      &:hover
      {
        background-color: #758287!important;
        color: #ffffff!important;
      }
    }
  }
  .ant-form-item
  {
    margin-bottom: 30px!important;
  }
  .add-category-wrapper
  {
    margin-left:0px!important;
    margin-right: 0px!important;
    .ant-col 
    {
      
      padding-left: 0px!important;
    }
  }
  
  .task-details-wrapper
  {
    text-align:left;
    .btn-view-message
    {
      margin-left: auto;
      font-weight:700;
      &:hover, &:active
      {
        background-color: white;
        color: #fcae1d!important;
      }
    }
    .btn-view-proof
    {
      margin-left:auto;
      font-weight: 700;
      &:hover
      {
        background-color: #758287!important;
        color: #ffffff!important;
      }
    }
    .task-details
    {
      .rp-task-name
      {
        margin-right:5px;
        color: #2AABE1;
        font-weight:700;
      }
      .rp-task-value 
      {
        margin:0px
      }
      .active-status
      {
        background-color:#0FD346;
        color:#ffffff;
        padding: 0 5px;
        border-radius: 2px;
      }
      margin-top: 30px;
      margin-left:80px;
      h3 
      {
        font-size: 16px;
      }
      h4.active-status
      {
        background-color:#0FD346!important;;
        color:#ffffff!important;
      }
      .ant-col
      {
       
        li:first-of-type
        {
          padding-top:20px!important;
        }
        
      }
      .budget-wrapper
      {
        margin-top:30px!important;
        width:100%;
        .ant-col
        {
          span
          {
            font-weight:700;
            font-size: 14px;
          
          }
        }
        .budget
        {
          h2 
          {
            font-weight:700;
            font-size: 16px;
            color: #2AABE1;
          }
        }
        
      }
      .about-task
        {
          margin-top: 30px;
          .about-task-title
          {
            font-size:16px;
            color: #423F3F;
          }
        }
        .about-task-text-wrapper
          {
            .about-task-text
            {
              
                font-size:14px;
              color:#758287;
              margin-top:10px;
              
              
            }
          }
      @media (max-width: 600px)
      {
        margin-left:0px;
      }
      .task-detail-content
      {
        .employer-name
        {
          color: #fcae1d;
        }
      }
    }
    .rp-task-btn-wrapper
    {
      display: flex;
    }
    @media (max-width: 991px)
    {
      margin-top: 50px;
    }
    
  }
  .task-carousel-wrapper
  {
    
    .task-img-wrapper
    {
      .slick-list
      {
        border-radius: 4px;
      }
      .task-big-img
      {
        border-radius: 4px;
        img 
        {
          width:100%;
          height:365px;
          margin-left: auto;
          margin-right: auto;
        }
        
      }
    }
    .task-carousel
    {
      height:190px;
      .rp-task-img
      {
        border-radius: 4px;
        img 
        {
          width: 123px;
          height: 123px;
          margin-left:auto;
          margin-right:auto;
        }
      }
    }
  }
  .view-proof-layout
  {
    
    padding: 0px;
  }
  .payments
  {
    padding-bottom:20px;
    .payment-field
    {
      margin-bottom:20px!important;
      .ant-form-item-label
      {
        width:125px;
        margin-right: 20px;
        text-align:left;
      }
      .exportSelectInput
      {
        .ant-select-selector
        {
          border: 1px solid #cdcdcd!important;
          padding:1px 20px;
          .ant-select-focus
          {
            box-shadow: none!important;
          }
        }
      }
      .payment-input
      {
        font-style:normal;
        font-size: 14px;
        border:1px solid #cdcdcd!important;
        border-radius:4px!important;
        &:placeholder
        {
          font-style: normal!important;
        }
        &:focus
        {
          border-color: #cdcdcd!important;
          box-shadow: 0 0 2px 1px  #FCAE1D;
        }
      }
    }
    .resolve-btn
    {
      padding:8px 25px!important;
      font-weight:700;
      &:hover ,&:active
      {
        background-color: #ffffff;
        color:#fcae1d!important;
      }
    }
    
  }
  .proof-wrapper 
  {
    padding-left: 60px;
    @media (max-width:991px)
    {
      padding-left: 0px;
      margin-top: 30px;
    }
  }
  .view-proof-wrapper 
  {
    margin-top:25px;
    margin-bottom:30px;
    padding: 0 20px;
    @media (max-width:991px)
    {
      .ant-col 
      {
        div div 
        {
          flex-direction:column;
        }
      }
    }
    
  }
  .commonWidgetBox{
    width: 100%;
    .commonWidgetTitle{
      padding: 25px 30px;
      margin: 0px;
    }
    .isoWidgetBox{
      padding: 0px;
      border: 0px;
      .isoSimpleTable{
        .ant-table-thead{
          background: #fff;
          > tr{
            > th{
              color: ${palette("label", 0)};
              font-size: 14px;
              line-height: 16px;
              background-color: #F8FAFB;
              padding:20px 30px;
              .ant-table-column-sorters 
              {
                padding: 0px;
              }
            }
          }
          tr{
            th{
              &.callbackComments{
                ${"" /* width: 400px; */}
              }
              .ant-space-item{
                color: #758287;
                font-size: 14px;
                font-weight: 700;
              }
              .ant-table-selection{
                .ant-checkbox-wrapper{
                  .ant-checkbox{
                    .ant-checkbox-inner{
                      border: 1px solid #cdcdcd;
                    }
                  }
                }
              }
            }
            &:first-child{
              th{
                &:first-child{
                  padding-left: 15px;
                  border-radius: 10px 0 0 10px;
                }
                &:last-child{
                  padding-right: 0px;
                  border-radius: 0 10px 10px 0;
                }
              }
            }
          }
        }
        .ant-table-tbody{
          tr{
            td{
              font-size: 15px;
              line-height: 22px;
              color: ${palette("text", 0)};
              // padding-top: 30px;
              // padding-bottom: 30px;
              // padding-right:16px;
              // padding: 30px 0px;
              padding: 20px 30px;
              vertical-align: middle;
              &.callbackComments{
                word-break: break-word;
                white-space: break-spaces;
                max-width: 0px

              }
              &:first-child{
                // padding-left: 18px;
              }
              &:last-child{
                padding-right: 15px;
              }
              p, span{
                color: #423F3F;
                font-size: 14px;
              }
              img{
                width: 40px;
                height: 40px;
              }
              .ant-btn{
                border-color: #cdcdcd !important;
                color: #758287 !important;
                font-size: 14px;
                font-weight: 700;
                height: 35px;
                span{
                  color: #758287;
                }
              }
            }
          }
          .table-action-btns-grp{
            button{
              padding: 0px;
              border: 0px;
              cursor: pointer;
            }
            .ant-col:not(:first-child){
              margin-left: 20px;
            }
          }
        }
        .ant-spin-container{
          .ant-pagination{
            .ant-pagination-options
            {
              .ant-select-selector
              {
                color:#758287;
              }
            }
            padding: 0 0px 0 0;
            .ant-pagination-prev, .ant-pagination-next{
              border: 0px;
              margin-right:6px;
              border-radius:4px;
            }
          }
        }
      }
    }
    .viewUserDetailActivity, .contentChecklists{
      .isoSimpleTable {
        .ant-table-thead {
          tr:first-child {
            th:first-child{
              padding-left: 20px;
            }
          }
        }
        .ant-table-tbody{
          tr{
            td:first-child{
              padding-left: 20px;
            }
          }
        }
        .ant-table-footer{
          padding: 30px 20px;
          .ant-btn{
            min-width: auto;
          }
          .ant-btn-tag{
            padding: 0px;
            &.checklistsTagBtn{
              margin-left: 25px;
            }
          }
        }
      }
    }
  }
  .userPushNotification{
    width: 100%;
    .commonWidgetTitle{
      padding: 25px 30px;
      margin: 0px;
      border-bottom: 1px solid ${palette("border", 0)};
    }
    .isoWidgetsWrapper{
      padding: 30px 30px 0px;
      .isoWidgetBox{
        border: 0px;
        border-top: 1px solid ${palette("border", 0)};
        border-bottom: 1px solid ${palette("border", 0)};
        textarea{
          border: 1px solid ${palette("grayscale", 12)};
          border-radius: 2px;
        }
      }
    }
    .submitbtnwrapper{
      padding: 30px;
      width: 100%;
      border-top: 1px solid ${palette("border", 0)};
      .ant-btn{
        min-width: auto;
      }
    }
  }
  @media (max-width: 767px){
    padding: 30px 20px;
    .commonWidgetBox{
      .commonWidgetTitle{
        padding: 20px;
      }
      .viewUserDetailActivity .isoSimpleTable .ant-table-footer,
      .contentChecklists .isoSimpleTable .ant-table-footer{
        padding: 20px 15px;
      }
    }
  }
  @media (max-width: 575px){
  
    .my-acc-form-wrapper, .my-acc-img-wrapper
    {
      padding: 0 10px;
    }
    .commonWidgetBox {
      .isoWidgetBox {
        .isoSimpleTable {
          .ant-table-thead {
            tr{
              &:first-child {
                th{
                  &:first-child{
                    padding-left: 20px;
                  }
                  &:last-child{
                    padding-right: 20px;
                  }
                }
              }
            }
          }
          .ant-table-tbody{
            tr{
              td{
                &:first-child{
                  padding-left: 20px;
                }
                &:last-child{
                  padding-right: 20px;
                }
              }
            }
          }
        }
        .ant-spin-container {
          .ant-table-footer{
            padding: 20px;
          }
        }
      }
    }
  }
  h2.ant-typography{
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    margin: 0;
    color: #423F3F;
  }
}

.isoLayoutHeaderActionWrapper{
  border: 1px solid #e5e5e5;
  margin-top: 30px;
  .userDetailMainHeader{
    margin-top: 20px;
    width: 100%;
    align-items: start;
    .userDetailHeaderLeft{
      width: 100%;
      align-items: center;
      .ant-form-item-control-input{
       margin-top:10px;
        .ant-form-item-control-input-content{
          
          color: ${palette("text", 0)};
        }
      }
    }
  }
 
}

.addNewContentChecklist{
  width: 100%;
  > div{
    background-color: transparent;
    border: 0px;
  }
  .isoInputWrapper{
    padding: 30px;
    background-color: ${palette("text", 5)};
    .contentChecklistLabel{
      margin-right: 30px;
      label{
        margin-bottom: 0px;
        width: 100%;
        text-align: right;
      }
    }
    .ant-form-item{
      margin-bottom: 0px;
    }
    &.contentChecklistName{
      margin-bottom: 30px;
      border: 1px solid ${palette("border", 0)};
      .ant-row{
        align-items: center;
      }
    }
    &.contentChecklistsItems{
      border: 1px solid ${palette("border", 0)};
      border-bottom: 0px;
      .ant-row{
        align-items: center;
      }
      .contentChecklistSavebtn{
        margin-left: auto;
        .ant-btn{
          min-width: auto;
        }
      }
    }
  }
  .contentChecklistTable{
    border: 1px solid ${palette("border", 0)};
    border-top: 0px;
    .isoSimpleTable {
      .ant-table-thead{
        tr:first-child{
          th:first-child{
            padding-left: 14px;
          }
        }
        tr:first-child{
          th:last-child{
            padding-left: 14px;
          }
        }
      }
      .ant-table-tbody{
        tr{
          td:first-child{
            padding-left: 30px;
            
          }
          td:last-child{
            padding-left: 30px;
          }
        }
        .table-action-btns-grp{
          button{
            padding: 0px;
            border: 0px;
            cursor: pointer
          }
        }
      }
      .ant-spin-container{
        .ant-pagination{
          padding: 0 40px 0 0;
          .ant-pagination-prev, .ant-pagination-next{
            border: 0px;
          }
        }
      }
    }
  }
}

.autoResponderEditor {
  margin-left: 3.7%;
  @media (max-width: 991px){
    margin-left: 0px;
  }
}
.isoLayoutContentWrapper{
  .dashboardButtonwrapper{
    .responderRestoreDefault{
      border: 0px;
      padding: 0px;
      min-width: auto;
    }
  }
}

/* billing primary-lo */
.adminBillingPrimaryLo{
  .adminRow{
    width: 100%;
    .primaryUserProfile{
      padding-right: 30px;
      .primaryUserDetail{
        border: 1px solid ${palette("border", 0)};
        .isoWidgetBox{
          padding: 30px 30px 0 30px !important;
          border-bottom: 1px solid ${palette("border", 0)} !important;
          .primaryLoUserWrap{
            flex-direction: column;
            .primaryLoUserImage{
              margin-bottom: 30px;
            }
            .primaryLoUserDetails{
              .isoUserProfileWidgetWrapper{
                display: flex;
                flex-direction: column;
                .isoUserProfileWidgetItem{
                  p{
                    color: #423F3F;
                    width: 50%;
                    font-size: 16px;
                  }
                  h4{
                    color: ${palette("text", 0)};
                    width: 50%;
                    text-align: left;
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
        .primaryLoButtonWrap{
          padding: 30px;
          display: flex;
          .ant-btn-primary{
            margin: 0 30px 0 0;
          }
        }
      }
    }
    .primaryBrandApp{
      .primaryBrandRow{
        .brandedAppSubscriptionSec{
          padding-bottom: 30px;
        }
        .isoBoxWrapper{
          padding: 0px;
          .isoBoxHeaderWrapper{
            padding: 30px;
            margin-bottom: 0px;
          }
          
          .isoBoxChildrenWrapper{
            margin: 0px;
            padding: 30px;
            .isoUserProfileWidgetWrapper{
              display: flex;
              flex-direction: column;
              .isoUserProfileWidgetItem{
                p{
                  color: ${palette("label", 0)};
                  width: 50%;
                  font-size: 16px;
                }
                h4{
                  color: ${palette("text", 0)};
                  width: 50%;
                  text-align: left;
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
  .billingOtherSection{
    .isoLayoutContentWrapper{
      padding: 30px 0 0 0;
      .commonWidgetBox{
        .isoBoxWrapper{
          .isoBoxChildrenWrapper{
            .ant-table-footer{
              .ant-row{
                .ant-col{
                  .ant-btn{
                    padding: 0px;
                  }
                }
              }
            }
          }
        }
      }
    }
    &.billingNotesSection{
      .isoLayoutContentWrapper{
        padding: 30px 30px 0 0;
      }
    }
  }
  @media (max-width: 991px){
    .adminRow {
      .primaryUserProfile{
        padding-right: 0px;
        padding-bottom: 30px;
      }
    }
    .billingOtherSection{
      &.billingNotesSection {
        .isoLayoutContentWrapper{
          padding: 30px 0px 0 0;
        }
      }
    }
  }
  @media (max-width: 767px){
    .billingOtherSection{
      .cal-disclaimer{
        &.isoBoxWrapper {
          .isoBoxHeaderWrapper{
            padding: 30px;
          }
        }
      }
    }
  }
  @media (max-width: 575px){
    .adminRow {
      .primaryUserProfile {
        .primaryUserDetail {
          .isoWidgetBox{
            padding: 20px !important;
            .primaryLoUserWrap {
              .primaryLoUserImage{
                margin-bottom: 20px;
                img{
                  width: 100px;
                  height: 100px;
                }
              }
              .primaryLoUserDetails {
                .isoUserProfileWidgetWrapper {
                  .isoUserProfileWidgetItem {
                    p, h4{
                      font-size: 14px;
                    }
                  }
                }
              }
            }
          }
          .primaryLoButtonWrap{
            padding: 20px;
          }
        }
      }
      .primaryBrandApp {
        .primaryBrandRow {
          .isoBoxWrapper {
            .isoBoxHeaderWrapper, .isoBoxChildrenWrapper{
              padding: 20px;
            }
            .isoBoxChildrenWrapper{
              .isoUserProfileWidgetWrapper {
                .isoUserProfileWidgetItem {
                  p, h4{
                    font-size: 14px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .billingOtherSection{
      .cal-disclaimer{
        &.isoBoxWrapper {
          .isoBoxHeaderWrapper{
            padding: 20px;
          }
        }
      }
    }
  }
  @media (max-width: 480px){
    .adminRow {
      .primaryUserProfile {
        .primaryUserDetail {
          .isoWidgetBox {
            .primaryLoUserWrap {
              .primaryLoUserDetails {
                .isoUserProfileWidgetWrapper{
                  .isoUserProfileWidgetItem{
                    flex-wrap: wrap;
                    padding: 10px 0;
                    p, h4{
                      width: 100%;
                    }
                  }
                }
              }
            }
          }
          .primaryLoButtonWrap{
            flex-wrap: wrap;
            a{
              width: 100%;
              margin: 0px;
            }
            .ant-btn-primary{
              margin: 0 0 20px 0;
            }
          }
        }
      }
      .primaryBrandApp {
        .primaryBrandRow {
          .isoBoxWrapper {
            .isoBoxChildrenWrapper {
              .isoUserProfileWidgetWrapper {
                .isoUserProfileWidgetItem {
                  flex-wrap: wrap;
                  padding: 10px 0;
                  p, h4{
                    width: 100%;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

.billingPrimaryLoAddPage{
  .commonWidgetBox{
    width: 100%;
    .isoBoxWrapper{
      padding: 0px;
      .isoBoxHeaderWrapper{
        margin-bottom: 0px;
      }
      .isoBoxChildrenWrapper{
        margin: 0px;
        .isoWidgetsWrapper{
          padding: 30px;
          border-bottom: 1px solid ${palette("border", 0)};
          .ant-input{
            &:hover{
              border-color: ${palette("primary", 0)};
            }
          }
        }
        .submitbtnwrapper{
          margin: 0px;
          padding: 30px;
        }
      }
    }
  }
  @media (max-width: 767px){
    .cal-disclaimer{
      &.isoBoxWrapper {
        .isoBoxHeaderWrapper{
          padding: 30px;
        }
      }
    }
  }
  @media (max-width: 575px){
    .cal-disclaimer{
      &.isoBoxWrapper {
        .isoBoxHeaderWrapper{
          padding: 20px;
        }
      }
    }
    .commonWidgetBox {
      .isoBoxWrapper {
        .isoBoxChildrenWrapper {
          .isoWidgetsWrapper, .submitbtnwrapper{
            padding: 20px;
          }
        }
      }
    }
  }
}
/* */

/* admin user */
.adminUserLo{
  .adminUserLoDetails{
    border: 1px solid ${palette("border", 0)};
    .isoWidgetBox{
      padding: 30px !important;
      border-bottom: 1px solid ${palette("border", 0)} !important;
      .adminUserRow{
        .adminUserProfileImage{
          width: 100%;
          margin-bottom: 30px;
        }
        .adminUserColumn{
          width: 50%;
          .isoUserProfileWidgetWrapper{
            display: flex;
            flex-direction: column;
            .isoUserProfileWidgetItem{
              p{
                color: ${palette("label", 0)};
                width: 50%;
                font-size: 16px;
              }
              h4{
                color: ${palette("text", 0)};
                width: 50%;
                text-align: left;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    .adminUserBtnWrapper{
      padding: 30px;
      display: flex;
      .ant-btn{
        margin-right: 30px;
      }
    }
  }
  @media(max-width: 767px){
    .adminUserLoDetails {
      .isoWidgetBox {
        .adminUserRow {
          .adminUserColumn {
            width: 100%;
            .isoUserProfileWidgetWrapper {
              .isoUserProfileWidgetItem {
                flex-wrap: wrap;
                padding: 10px 0px;
                p{
                  width: 40%;
                }
                h4{
                  width: 60%
                }
              }
            }
          }
        }
      }
    }
  }
  @media(max-width: 575px){
    .adminUserLoDetails {
      .isoWidgetBox {
        padding: 20px !important;
        .adminUserRow {
          .adminUserProfileImage{
            img{
              width: 120px;
              height: 120px;
            }
          }
          .adminUserColumn {
            .isoUserProfileWidgetWrapper {
              .isoUserProfileWidgetItem {
                p, h4{
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
      .adminUserBtnWrapper{
        padding: 20px;
      }
    }
  }
  @media(max-width: 480px){
    .adminUserLoDetails {
      .isoWidgetBox {
        .adminUserRow {
          .adminUserColumn {
            .isoUserProfileWidgetWrapper {
              .isoUserProfileWidgetItem {
                p,h4{
                  width: 100%;
                }
              }
            }
          }
        }
      }
      .adminUserBtnWrapper{
        flex-wrap: wrap;
        a{
          width: 100%;
          .ant-btn{
            margin: 0px;
          }
        }
        .ant-btn{
          margin-right: 0px;
          margin-bottom: 20px;
        }
      }
    }
  }
}
.userReferredPopup{
  .ant-modal-content{
    border-radius: 0px;
    .ant-modal-close{
      right: 30px !important;
      top: 30px !important;
      .ant-modal-close-x{
        width: 20px;
        height: 21px;
        line-height: 21px;
        svg{
          path{
            stroke: ${palette("label", 0)};
            stroke-width: 1.5px;
          }
        }
      }
    }
    .ant-modal-body{
      padding: 0px !important;
      .referredTitle{
        padding: 30px;
        border-bottom: 1px solid ${palette("border", 0)};
        .ant-typography{
          padding: 0px;
          margin: 0px;
          font-size: 17px;
          font-weight: 700;
          color: ${palette("text", 0)};
        }
      }
      .referredToListing{
        padding: 30px;
        li{
          font-size: 15px;
          font-weight: 700;
          color: ${palette("primary", 0)};
          margin-bottom: 20px;
        }
      }
    }
  }
  @media(max-width: 575px){
    .ant-modal-content {
      .ant-modal-close{
        right: 20px !important;
        top: 20px !important;
        .ant-modal-close-x {
          width: 18px;
          height: 18px;
          line-height: 18px;
          svg{
            width: 18px;
            height: 18px;
          }
        }
      }
      .ant-modal-body {
        .referredTitle{
          padding: 20px;
        }
        .referredToListing{
          padding: 20px;
          li{
            margin-bottom: 12px;
          }
        }
      }
    }
  }
}
.userDefaultHeader{
  padding-bottom: 25px !important;
  .isoHeaderBreadCrumbWrapper{
    margin-bottom: 25px;

  }
}
.userDefaultsTabsSection{
  padding-top: 0px !important;
}
.userDefaultMortgageGuide{
  .isoBoxWrapper{
    .isoBoxHeaderWrapper{
      padding: 30px;
      margin-bottom: 0px;
    }
    .isoBoxChildrenWrapper{
      margin-top: 0px;
      padding: 30px;
      .switchLabel{
        color: ${palette("text", 0)};
        font-size: 15px;
      }
    }
  }
  @media (max-width: 575px){
    .isoBoxWrapper {
      .isoBoxHeaderWrapper, .isoBoxChildrenWrapper{
        padding: 20px;
      }
    }
  }
}
.userDefaultLoanPrograms{
  .isoWidgetBox{
    .isoSimpleTable{
      .ant-table-content{
        .ant-table-thead{
          tr{
            &:first-child{
              th{
                &:first-child{
                  padding-left: 10px;
                }
              }
            }
          }
        }
        .ant-table-tbody{
          tr{
            td{
                padding-left: 10px;
                div{
                  color: ${palette("text", 0)};
                  svg{
                    margin-right: 30px !important;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

.ant-modal-wrap{
  .userLoanProgramsPopup, .userLearnCenterPopup{
    &.ant-modal {
      .ant-modal-content {
        border-radius: 0px;
        .ant-modal-close{
          right: 30px;
          top: 35px;
          .ant-modal-close-x{
            width: 22px;
            height: 22px;
            line-height: 22px;
          }
        }
        .ant-modal-body {
          .ant-typography{
            padding: 30px 30px;
            margin: 0px;
            border-bottom: 1px solid ${palette("border", 0)};
          }
          .ql-snow{
            .ql-editor{
              padding: 30px;
              color: ${palette("text", 0)};
              min-height: 300px;
              font-size: 15px;
            }
          }
        }
      }
    }
  }
  @media(max-width: 575px){
    .userLoanProgramsPopup, .userLearnCenterPopup{
      &.ant-modal {
        .ant-modal-content {
          .ant-modal-close{
            right: 20px;
            top: 23px;
          }
          .ant-modal-body {
            .ant-typography{
              padding: 20px;
            }
            .ql-snow {
              .ql-editor{
                padding: 20px;
              }
            }
          }
        }
      }
    }
  }
}
.usersDefaultCalculator{
  &.cal-disclaimer{
    &.isoBoxWrapper {
      .isoBoxHeaderWrapper{
        padding: 30px;
        margin: 0px;
      }
      .isoBoxChildrenWrapper{
        margin: 0px;
        .isoWidgetsWrapper{
          padding: 30px;
          .ant-input{
            &:hover{
              border-color: ${palette("primary", 0)};
            }
          }
        }
      }
    }
  }
  @media (max-width: 575px){
    &.cal-disclaimer{
      &.isoBoxWrapper {
        .isoBoxHeaderWrapper{
          padding: 20px;
        }
        .isoBoxChildrenWrapper{
          .isoWidgetsWrapper{
            padding: 20px;
          }
        }
      }
    }
  }
}
.isoLayoutContentWrapper {
  .commonWidgetBox {
    .userLoContentTable {
      &.contentChecklists{
        .isoSimpleTable {
          .ant-table-thead {
            tr{
              &:first-child {
                th{
                  &:first-child{
                    padding-left: 14px;
                    border-radius: 4px 0 0 4px;
                  }
                }
              }
            }
          }
          .ant-table-tbody {
            tr{
              td{
                &:first-child{
                  padding-left: 30px;
                }
              }
            }
          }
        }
      }
    }
  }
  @media(max-width: 575px){
    .commonWidgetBox {
      .userLoContentTable{
        &.contentChecklists {
          .isoSimpleTable {
            .ant-table-thead {
              tr{
                &:first-child {
                  th{
                    &:first-child{
                      padding-left: 4px;
                    }
                  }
                }
              }
            }
            .ant-table-tbody {
              tr{
                td{
                  &:first-child{
                    padding-left: 20px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .isoHeaderBreadCrumbWrapper{
    margin-bottom: 30px;
    
   .title{
    font-size: 20px;
    display: flex;
    align-items: center;
    @media(max-width: 767px){
      font-size: 18px;
    }
    @media (max-width: 767px) {
    font-size: 16px;
  }
  }
}
}
.userLoChecklistDetails{
  .commonWidgetBox{
    width: 100%;
    .contentChecklists{
      .isoWidgetBox{
        padding: 30px !important;
        .userLoChecklistLabel{
          .ant-form-item-label{
            text-align: left;
          }
          .ant-form-item-control{
            .ant-form-item-control-input{
              min-height: 42px;
              .userLoChecklistValue{
                color: ${palette("text", 0)};
                width: 100%;
                display: inline-block;
                margin: 10px 0;
              }
            }
          }
        }
      }
    }
  }
  @media(max-width: 767px){
    .commonWidgetBox {
      .contentChecklists {
        .isoWidgetBox {
          .userLochecklistFirstCol {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
  @media(max-width: 575px){
    .commonWidgetBox {
      .contentChecklists {
        .isoWidgetBox{
          padding: 20px !important;
          .userLoChecklistLabel {
            .ant-form-item-control {
              .ant-form-item-control-input {
                .userLoChecklistValue{
                  margin: 7px 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
.userLoLegalSection{
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 30px;
      span{
        font-size: 15px;
        color: ${palette("text", 0)};
        p{
          margin-bottom: 20px;
          &:last-child{
            margin-bottom: 0px;
          }
        }
      }
    }
  }
  @media(max-width: 575px){
   .isoBoxWrapper{
      .isoBoxChildrenWrapper{
        padding: 20px;
      }
    }
  }
}
.userBorrowerDetails{
  .userBorrowContentWrap{
    .isoLayoutContentWrapper{
      padding-bottom: 0px;
      .commonWidgetBox {
        .isoWidgetBox {
          .isoSimpleTable {
            .ant-table-thead {
              tr{
                &:first-child {
                  th{
                    &:first-child{
                      padding-left: 30px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media(max-width:575px){
    .userBorrowContentWrap{
      .isoLayoutContentWrapper{
        .commonWidgetBox {
          .isoWidgetBox {
            .isoSimpleTable {
              .ant-table-thead {
                tr{
                  &:first-child {
                    th{
                      &:first-child{
                        padding-left: 20px;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.userBorrowContentWrap{
  .isoLayoutContentWrapper {
    .commonWidgetBox {
      .isoWidgetBox {
        .isoSimpleTable {
          .ant-table-thead {
            tr{
              &:first-child {
                th{
                  &:first-child{
                    padding-left: 14px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media(max-width:575px){
    .isoLayoutContentWrapper {
      .commonWidgetBox {
        .isoWidgetBox {
          .isoSimpleTable {
            .ant-table-thead {
              tr{
                &:first-child {
                  th{
                    &:first-child{
                      padding-left: 4px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
/* */

/* admin branded app */
.adminBrandedAppDetails{
  padding-bottom: 0px !important;
  .isoBoxWrapper{
   
    padding-bottom: 0px;
    .isoBoxChildrenWrapper{
      padding: 30px;
      margin: 0px;
      .isoUserProfileWidgetWrapper{
        display: flex;
        flex-direction: column;
        width: 50%;
        .isoUserProfileWidgetItem{
          align-items: center;
          p{
            color: ${palette("label", 0)};
            width: 50%;
            font-size: 16px;
          }
          h4{
            color: ${palette("text", 0)};
            width: 50%;
            text-align: left;
            font-size: 16px;
            span{
              .ant-btn{
                margin-left: 30px;
              }
            }
          }
        }
      }
    }
    .message-type-box
      {
        .ant-input-affix-wrapper
        {
          background-color:#F8FAFB;
          .input.ant-input
          {
            background-color:#F8FAFB;
          }
        }
      }
    .isoBoxFooterWrapper{
      
      
      padding:10px 20px;
      .brandedAppBtnWrapper{
        display: flex;
        flex-wrap: wrap;
        .brandedAppRejectBtn{
          margin-right: 30px;
        }
      }
    }
  }
  @media(max-width: 767px){
    padding: 20px !important;
    .isoBoxWrapper {
      padding: 0px;
      .isoBoxChildrenWrapper {
        .isoUserProfileWidgetWrapper{
          width: 100%;
          .isoUserProfileWidgetItem {
            p{
              width: 40%;
            }
            h4{
              width: 60%;
            }
          }
        }
      }
    }
  }
  @media(max-width: 575px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper{
        padding: 20px;
        .isoUserProfileWidgetWrapper{
          .isoUserProfileWidgetItem {
            padding: 10px 0;
            p, h4{
              font-size: 14px;
            }
          }
        }
      }
      .isoBoxFooterWrapper{
        padding: 20px;
      }
    }
  }
  @media(max-width: 480px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper{
        padding: 20px;
        .isoUserProfileWidgetWrapper{
          .isoUserProfileWidgetItem {
            flex-wrap: wrap;
            padding: 10px 0px;
            p, h4{
              width: 100%;
            }
            h4{
              span{
                .ant-btn{
                  margin-left: 0px;
                }
              }
            }
          }
        }
      }
      .isoBoxFooterWrapper {
        .brandedAppBtnWrapper {
          .brandedAppRejectBtn{
            margin-right: 0px;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
.adminBrandedAppDetailsStatus{
  .isoBoxWrapper{
    padding-bottom: 0px;
    .isoBoxChildrenWrapper{
      padding: 30px;
      margin: 0px;
    }
  }
  @media(max-width: 767px){
    padding: 20px !important;
    .isoBoxWrapper{
      padding: 0px;
    }
  }
  @media(max-width: 575px){
    .isoBoxWrapper{
      padding-bottom: 0px;
      .isoBoxChildrenWrapper{
        padding: 20px;
        .ant-form-item{
          .ant-col{
            width: 100%;
          }
        }
      }
      .isoBoxFooterWrapper{
        padding: 20px;
      }
    }
  }
}
.ant-modal-root{
  .brandAppRequestPopup{
    .ant-modal-content{
      .ant-modal-close{
        right: 30px;
        top: 35px;
        .ant-modal-close-x{
          width: 22px;
          height: 22px;
          line-height: 22px;
        }
      }
      .ant-modal-body{
        .isoBoxWrapper{
          padding-bottom: 0px;
          .isoBoxHeaderWrapper{
            padding: 30px;
            margin: 0px;
          }
          .isoBoxChildrenWrapper{
            margin: 0px;
            padding: 30px;
            .brandedAppPopupLabel{
              .ant-form-item-control{
                .ant-input{
                  &:hover{
                    border-color: ${palette("primary", 0)};
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media(max-width:767px){
    .brandAppRequestPopup {
      .ant-modal-content {
        .ant-modal-body {
          .isoBoxWrapper {
            padding: 0px;
          }
        }
      }
    }
  }
  @media(max-width:575px){
    .brandAppRequestPopup {
      .ant-modal-content {
        .ant-modal-close{
          right: 20px;
          top: 24px;
        }
        .ant-modal-body {
          .isoBoxWrapper {
            .isoBoxHeaderWrapper{
              padding: 20px;
            }
            .isoBoxChildrenWrapper{
              padding: 20px;
              .brandedAppPopupLabel{
                .ant-form-item-label, .ant-form-item-control{
                  width: 100%;
                }
              }
            }
            .isoBoxFooterWrapper{
              padding: 20px;
            }
          }
        }
      }
    }
  }
}
.brandedAppInfoContent{
  .isoBoxWrapper{
    border: 0px;
    padding: 0px;
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 30px;
      .brandAppContent{
        .ant-row{
          margin-bottom: 20px;
          .ant-form-item-control-input{
            .quill{
              .ql-snow{
                &.ql-toolbar{
                  background-color: ${palette("grayscale", 13)};
                  border-top-left-radius: 4px;
                  border-top-right-radius: 4px;
                  .ql-formats{
                    border: 1px solid ${palette("border", 5)};
                    padding: 3px 5px;
                    border-radius: 4px;
                    background-color: ${palette("text", 5)};
                    button{
                      padding: 3px;
                      float: none;
                      vertical-align: middle;
                    }
                  }
                }
                .ql-list{
                  svg{
                    .ql-stroke{
                      stroke: ${palette("label", 0)};
                    }
                    .ql-fill{
                      fill: ${palette("label", 0)};
                    }
                  }
                }
              }
              .ql-container{
                border-bottom-left-radius: 2px;
                border-bottom-right-radius: 2px;
                .ql-editor{
                  color: ${palette("label", 0)};
                  font-size: 15px;
                  &.ql-blank{
                    &:before{
                      font-style: normal;
                      color: ${palette("label", 0)};
                      font-size: 15px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media(max-width: 575px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper, .isoBoxFooterWrapper{
        padding: 20px;
      }
    }
  }
  @media(max-width: 480px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .brandAppContent {
          .ant-row {
            .ant-form-item-control-input {
              .quill {
                .ql-snow{
                  &.ql-toolbar {
                    .ql-formats{
                      margin: 0 10px 5px 0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
/* */

/* scubscription */
.subscriptionHeaderWrap{
  .ant-typography{
    margin: 0 0 20px 0 !important;
  }
}
.subscriptionPlansAddNew{
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 30px;
      .subscriptionPlansAddNewContent{
        >.ant-row{
          >.ant-col{
            margin-bottom: 20px;
            &.subscriptionPlansEditor{
              margin-bottom: 0px;
              .ant-form-item-control-input{
                .quill{
                  .ql-snow{
                    &.ql-toolbar{
                      background-color: ${palette("grayscale", 13)};
                      border-top-left-radius: 4px;
                      border-top-right-radius: 4px;
                      .ql-formats{
                        border: 1px solid ${palette("border", 5)};
                        padding: 3px 5px;
                        border-radius: 4px;
                        background-color: ${palette("text", 5)};
                        button{
                          padding: 3px;
                          float: none;
                          vertical-align: middle;
                        }
                      }
                    }
                    .ql-list{
                      svg{
                        .ql-stroke{
                          stroke: ${palette("label", 0)};
                        }
                        .ql-fill{
                          fill: ${palette("label", 0)};
                        }
                      }
                    }
                  }
                  .ql-container{
                    border-bottom-left-radius: 2px;
                    border-bottom-right-radius: 2px;
                    .ql-editor{
                      color: ${palette("label", 0)};
                      font-size: 15px;
                      &.ql-blank{
                        &:before{
                          font-style: normal;
                          color: ${palette("label", 0)};
                          font-size: 15px;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .subscriptionPlansEditor{
          margin-left: 3.7%;
        }
      }
    }
  }
  @media(max-width:991px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .subscriptionPlansAddNewContent {
          .subscriptionPlansEditor{
            margin-left: 0px;
          }
        }
      }
    }
  }
  @media(max-width:767px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .subscriptionPlansAddNewContent {
          .ant-row {
            .ant-col{
              .ant-form-item-label{
                text-align: left;
              }
            }
          }
        }
      }
    }
  }
  @media(max-width:575px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper, .isoBoxFooterWrapper{
        padding: 20px;
      }
    }
  }
  @media(max-width: 480px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .subscriptionPlansAddNewContent {
          >.ant-row {
            >.ant-col{
              &.subscriptionPlansEditor{
                .ant-form-item-control-input {
                  .quill {
                    .ql-snow{
                      &.ql-toolbar {
                        .ql-formats{
                          margin: 0 10px 5px 0;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
/* */

/* edit subscription */
.subscriptionPlanEdit{
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 30px;
      .editSubscriptionPlanContent{
        >.ant-row{
          margin-bottom: 0px !important;
        }
        .ant-row{
          margin-bottom: 20px;
          .ant-form-item-control-input{
            .quill{
              .ql-snow{
                &.ql-toolbar{
                  background-color: ${palette("grayscale", 13)};
                  border-top-left-radius: 4px;
                  border-top-right-radius: 4px;
                  .ql-formats{
                    border: 1px solid ${palette("border", 5)};
                    padding: 3px 5px;
                    border-radius: 4px;
                    background-color: ${palette("text", 5)};
                    button{
                      padding: 3px;
                      float: none;
                      vertical-align: middle;
                    }
                  }
                }
                .ql-list{
                  svg{
                    .ql-stroke{
                      stroke: ${palette("label", 0)};
                    }
                    .ql-fill{
                      fill: ${palette("label", 0)};
                    }
                  }
                }
              }
              .ql-container{
                border-bottom-left-radius: 2px;
                border-bottom-right-radius: 2px;
                .ql-editor{
                  color: ${palette("label", 0)};
                  font-size: 15px;
                  &.ql-blank{
                    &:before{
                      font-style: normal;
                      color: ${palette("label", 0)};
                      font-size: 15px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media(max-width: 575px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper, .isoBoxFooterWrapper{
        padding: 20px;
      }
    }
  }
  @media(max-width: 480px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .editSubscriptionPlanContent {
          .ant-row {
            .ant-form-item-control-input {
              .quill {
                .ql-snow{
                  &.ql-toolbar {
                    .ql-formats{
                      margin: 0 10px 5px 0;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
/* */

/* subscription view plan */
.subscriptionViewPlan{
  .isoBoxWrapper{
    padding: 0px;
    .isoBoxChildrenWrapper{
      margin: 0px;
      padding: 30px;
      .subscriptionViewPlanContent{
        .ant-form-item{
          .ant-form-item-label{
            width: 25%;
            text-align: left;
            label{
              font-size: 16px;
            }
          }
          .ant-form-item-control{
            width: 75%;
            .ant-form-item-control-input{
              min-height: 42px;
              .ant-form-item-control-input-content{
                color: ${palette("text", 0)};
                font-size: 16px;
                ul{
                  li{
                    padding: 8.5px 0px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  @media(max-width: 991px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper {
        .subscriptionViewPlanContent {
          .ant-form-item {
            .ant-form-item-label{
              width: 35%;
            }
            .ant-form-item-control{
              width: 65%;
            }
          }
        }
      }
    }
  }
  @media(max-width: 575px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper{
        padding: 20px;
        .subscriptionViewPlanContent {
          .ant-form-item {
            margin: 0 0 15px 0;
            .ant-form-item-label{
              padding: 0px;
            }
            .ant-form-item-control{
              .ant-form-item-control-input{
                min-height: auto;
              }
            }
          }
        }
      }
    }
  }
  @media(max-width: 480px){
    .isoBoxWrapper {
      .isoBoxChildrenWrapper{
        padding: 20px;
        .subscriptionViewPlanContent {
          .ant-form-item {
            .ant-form-item-label{
              label{
                font-size: 14px;
              }
            }
            .ant-form-item-control{
              .ant-form-item-control-input{
                .ant-form-item-control-input-content{
                  font-size: 14px;
                  ul{
                    li{
                      padding: 5px 0px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
/* */
/* guide-section start */
.section-header {
  margin-bottom:30px !important;
  h2.ant-typography {
    margin-bottom: 15px !important;
  }
  .btngrp {
    .ant-btn {
      margin-right: 15px;
    }
  }
  @media (max-width: 576px) {
    .category {
      text-align: left !important;
    }
  }
  @media (max-width: 480px) {
    .btngrp {
      a {
        .ant-btn {
          margin-top: 10px;
        }
      }
    }
  }
}
.guide-section {
  padding: 0px 30px 30px !important;
  iframe {
    width: 100%;
    margin: 15px 0;
  }
  img {
    max-width: 100%;
  }
  .isoBoxWrapper {
    padding-bottom:0;
  }
  .isoBoxChildrenWrapper {
    padding-top:10px;
    .ant-checkbox-group {
      width: 100%;
    }
  }
  @media(max-width: 767px) {
    .isoBoxWrapper {
      padding :0;
    }
  }
}
.addnew-guide {
  .isoBoxChildrenWrapper {
    padding:20px 20px 10px !important;
    .ant-form-item {
      margin-bottom: 20px;
    }
  }
  .cal-disclaimer {
    padding-bottom: 0;
  }
  @media(max-width: 767px) {
    .isoBoxWrapper {
      padding :0;
    }
    .isoBoxChildrenWrapper {
      margin-top: 0;
      .ant-form-item {
        margin-bottom: 10px;
        .ant-form-item-label {
          text-align: left;
        }
      }
    }
  }
}
.ttlcolumn {
  width: 80%;
}
.faqcolumn {
  width: 75%;
}
.rearrangecolumn {
  width:90%;
}
.modal {
  .ant-modal-close-x {
    height: 22px;
    width: 22px;
    line-height: 44px;
    svg {
      width: 15px;
    }
  }
  @media(max-width: 767px) {
    .isoBoxWrapper {
      padding :0;
    }
    .ant-modal-close {
      right: 14px !important;
      top: 14px !important;
    }
  }
  @media(max-width: 576px) {
    .ant-form-item-label {
      padding: 0 10px 0 0 !important;
    }
  }
}
button:focus {
  outline: none;
}
.glossary-section {
  .ant-collapse-content-box {
    display: flex;
    justify-content: space-between;
    .ql-editor {
      padding : 0 15px 0 0;
      overflow: initial;
    }
    .ant-content {
      white-space: nowrap;
    }
  }
  .ant-collapse-header {
    padding-right: 110px;
    .ant-collapse-extra {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .ant-collapse-item-active
  {
    .ant-collapse-header {
      &:before {
        transform:rotate(-180deg) translateY(50%) !important;
      }
    }
  }
  @media (max-width: 576px) {
    .ant-collapse-content-box {
      flex-wrap: wrap;
      .ant-content {
        width: 100%;
        white-space: initial !important;
        margin-top: 10px;
      }
    }
    .ant-collapse-header {
      padding: 15px 90px 15px 15px !important;
      &:before {
        right: 15px !important;
      }
      img {
        width: 30px;
      }
      .ant-collapse-extra {
        right: 20px;
      }
    }
  }
}
.sorting-section {
  .sorting-wrapper {
    margin: auto 0 0;
    span {
      margin-right: 20px;
      padding-bottom: 15px;
      font-weight: bold;
      font-size: 16px;
      margin-top: 10px;
    }
  }
  .addnew-btn {
    padding: 15px 0 20px;
  }
}
.export-disount {
  .ant-select-selector {
    height: 42px !important;
    .ant-select-selection-item {
      line-height: 39px !important;
    }
  }
  @media (max-width:576px) {
    .ant-select-selector {
      height: 36px !important;
      .ant-select-selection-item {
        line-height: 34px !important;
      }
    }
  }
}
.addnew-discount {
  .rd-m {
    margin-top: 0px;
    margin-bottom: 20px;
  }
  .ant-picker {
    border: 1px solid #CACACA;
    border-radius: 4px;
    height: 42px !important;
    padding: 6px 10px;
    width: 100%;
  }
  .expiryDateColumn {
    .ant-form-item-control-input-content {
      justify-content: space-between;
      display: flex;
      .ant-form-item {
        display: inline-block;
        width: calc(50% - 15px);
        margin-bottom: 0;
      }
    }
  }
  .dashboardButtonwrapper {
    button {
      margin-right: 15px;
    }
  }
  @media (max-width:1199px) {
    .expiryDateColumn {
      .ant-form-item-control-input-content {
        .ant-form-item {
          width: calc(50% - 10px);
        }
      }
    }
  }
  @media (max-width:991px) {
    .ant-form-item-label {
      text-align: left;
    }
    .rd-m {
      margin-top: 5px;
      margin-bottom: 10px;
    }
  }
  @media (max-width:767px) {
    .rd-m {
      margin-top: 10px;
      margin-bottom: 5px;
    }
  }
  @media (max-width:576px) {
    .rd-m {
      margin-bottom: 10px;
    }
  }
  @media (max-width:480px) {
    .expiryDateColumn {
      .ant-form-item-control-input-content {
        flex-wrap: wrap;
        .ant-form-item {
          width: 100%;
          &:last-child {
            margin-top: 15px;
          }
        }
      }
    }
    .dashboardButtonwrapper {
      button {
        margin-right: 0px;
        &:last-child {
          margin-top: 15px;
        }
      }
    }
  }
}

/* guide-section end */
/* */

`;
export const DashboardContainer = styled.div`
  -webkit-overflow-scrolling: touch;
  .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 16px;
    cursor: pointer;
    transition: color 0.3s;
  }

  .trigger:hover {
    color: ${palette("primary", 0)};
  }

  .ant-layout-sider-collapsed .anticon {
    font-size: 16px;
  }

  .ant-layout-sider-collapsed .nav-text {
    display: none;
  }

  .ant-layout {
    background: ${palette("secondary", 1)};

    &.isoContentMainLayout {
      overflow: auto;
      overflow-x: hidden;
      @media only screen and (min-width: 768px) and (max-width: 1220px) {
        width: calc(100% - 80px);
        flex-shrink: 0;
      }

      @media only screen and (max-width: 767px) {
        width: 100%;
        flex-shrink: 0;
      }
    }
  }

  .isoLayoutContent {
    width: 100%;
    padding: 35px;
    background-color: #ffffff;
    border: 1px solid ${palette("border", 0)};
    height: 100%;
  }

  .isomorphicLayout {
    width: calc(100% - 240px);
    flex-shrink: 0;
    overflow-x: hidden !important;

    @media only screen and (max-width: 767px) {
      width: 100%;
    }

    @media only screen and (min-width: 768px) and (max-width: 1220px) {
      width: calc(100% - 80px);
      width: 100%;
    }
  }

  .ant-layout-footer {
    font-size: 13px;
    @media (max-width: 767px) {
      padding: 10px 20px;
    }
  }

  .tab-section {
    justify-content: space-between;
    > div {
      display: inline-block;
      width: auto;
      margin-right: 10px;
    }
    .switch-button {
      margin: 12px 0;
      text-align: right;
    }
    @media only screen and (max-width: 767px) {
      .switch-button {
        display: inline-block;
        width: 100%;
      }
    }
  }
  .profile {
    .isoBoxChildrenWrapper,
    .passwordsWrapper {
      padding: 30px 20px 10px !important;
      .ant-form-item {
        margin-bottom: 0;
        .ant-form-item-label {
          padding-bottom: 0;
        }
      }
    }
    @media only screen and (max-width: 991px) {
      .isoBoxChildrenWrapper,
      .passwordsWrapper {
        padding: 20px 20px 10px !important;
      }
    }
    @media only screen and (max-width: 576px) {
      .ant-form-item-label {
        height: 34px;
      }
    }
  }
  .myac {
    & + .myac {
      padding-top: 0;
    }
    &.upload-photo {
      .isoBoxHeaderWrapper {
        margin-bottom: 0;
      }
      .ant-col {
        margin-bottom: 0;
      }
    }
  }
  .notes-section {
    .ant-table-body {
      overflow-y: auto !important;
      min-height: 168px;
      border-bottom: 1px solid #e6e7eb;
    }
  }

  ${
    "" /* button {
    border-radius: 0;
  } */
  };
`;
