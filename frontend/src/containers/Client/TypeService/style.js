import styled from "styled-components";
import { size } from "../../../size";

export const DropDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #cdcdcd;
  margin: 0;
  padding: 20px 0;
  flex-wrap: wrap;
  &:first-child {
    padding-top: 0;
  }
  .hollow-blue {
    background-color: #fff !important;
    color: #fcae1d !important;
  }
  .drop-title {
    font-size: 18px;
    color: #758287;
    margin-right: 0;
    margin-bottom: 0;
    font-weight: normal;
    @media ${size["xxl"]} {
      font-size: 16px;
    }
    @media ${size["sm"]} {
      font-size: 15px;
    }
    @media ${size["xs"]} {
      margin-bottom: 10px;
      width: 100%;
    }
  }
  .price {
    font-size: 18px;
    color: #758287;
    margin: 0;
    font-weight: bold;
    @media ${size["xxl"]} {
      font-size: 16px;
    }
    @media ${size["sm"]} {
      font-size: 14px;
    }
  }
`;

export const ServiceTabWrapper = styled.div`
  .ant-tabs {
    flex-direction: row;
    @media ${size["md"]} {
      flex-direction: column;
    }
    .ant-tabs-nav {
      max-width: 265px;
      width: 100%;
      @media ${size["lg"]} {
        max-width: 260px;
      }
      @media ${size["md"]} {
        max-width: 100%;
      }
      @media ${size["xs"]} {
        margin-bottom: 75px;
      }
      &:before {
        display: none;
      }
      .ant-tabs-nav-wrap{
        overflow: auto;
        .ant-tabs-nav-list {
          flex-direction: column;
          @media ${size["md"]} {
            flex-direction: row;
          }
        .ant-tabs-tab {
            padding: 13px 10px;
            margin: 0;
            
            @media ${size["xl"]} {
              margin: 0;
            }
            @media ${size["md"]} {
              margin: 0;
              padding: 13px 10px;
              height: 44px;
            }
            
            .ant-tabs-tab-btn{
                color: #758287;
                font-size: 18px;
                font-weight: 700;
                line-height: 20px;
                @media ${size["xxl"]} {
                    font-size: 16px;
                  }
                  @media ${size["sm"]} {
                    font-size: 14px;
                  }
            }
          &.ant-tabs-tab-active {
            background: #fff3dd !important;
            border-radius: 14px;
            -webkit-border-radius: 14px;
            padding: 13px 10px;
            @media ${size["md"]} {
              height: 44px;
            }
            .ant-tabs-tab-btn {
              color: #fcae1d !important;
              padding : 10px;
            }
          }
        }
        .ant-tabs-ink-bar {
          display: none;
        }
      }
    }
  }
    .ant-tabs-content-holder{
      margin-left: 45px;
      @media ${size["xxl"]} {
        margin-left: 30px;
      }
      @media ${size["md"]} {
        margin-left: 0;
      }
      @media ${size["xs"]} {
        margin-top: 50px;
      }
        .ant-tabs-content{
          width: 100%;
          .ant-tabs-tabpane{
            /* margin-bottom: 20px !important; */
            .ant-collapse{
              border: none;
              background: none;
              border-bottom: 0;
                border-radius: 14px;
                -webkit-border-radius: 14px;
                .ant-collapse-item{
                  border: 1px solid #cdcdcd;
                    border-radius: 14px;
                    -webkit-border-radius: 14px;
                    overflow: hidden;
                    margin-bottom: 20px !important;
                    .ant-collapse-header{
                      text-align: left;
                      padding: 15px 25px 15px 16px;
                      background: #fff;
                      font-size: 18px;
                      line-height: 20px;
                      color: #423F3F;
                      font-weight: 700;
                    border-radius: 14px;
                    -webkit-border-radius: 14px;
                    overflow: hidden;
                    @media ${size["xxl"]} {
                      font-size: 16px;
                      line-height: 18px;
                      padding: 15px 25px 15px 16px;
                    }
                    @media ${size["sm"]} {
                      font-size: 14px;
                      padding: 15px 25px 15px 10px;
                      line-height: 16px;
                    }
                    .ant-collapse-arrow{
                      top: 50%;
                      transform: translateY(-50%);
                      padding: 0;
                      &:before{
                        content: '\\e914';
                        font-family: 'icomoon' !important;
                        display: block;
                        transform: rotate(270deg);
                        transition: .2s all;
                        font-size: 10px;
                        color: #758287;

                      }
                      svg{
                        display: none;
                      }
                    }
                    
              }
              .ant-collapse-content{
                text-align: left;
                .ant-collapse-content-box{
                  padding: 20px;
                  @media ${size["sm"]} {
                    padding: 20px 10px;
                    }
                }
              }
              &.ant-collapse-item-active{
                .ant-collapse-arrow{
                  top: 50%;
                  transform: translateY(-50%);
                  padding: 0;
                  &:before{
                    content: '\\e914';
                    font-family: 'icomoon' !important;
                    display: block;
                    transform: rotate(90deg);

                  }
              }
              
          }
         
          
        }
        
        }
        &:last-child{
          margin-bottom: 0 !important;
        }
      }
    }
  }
  .btn {
    margin-top: 20px;
  }
`;
