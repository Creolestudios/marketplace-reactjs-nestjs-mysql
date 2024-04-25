import styled from "styled-components";
import { size } from "../../size";

export const Card = styled.div`
  display: flex;
  background: #fff;
  border-radius: 14px;
  -webkit-border-radius: 14px;
  padding: 20px;
  margin: 0 0 20px;
  box-shadow: 0px 0px 8px rgba(42, 171, 225, 0.1);
  &:last-child {
    margin: 0;
  }
  @media ${size["lg"]} {
    padding: 20px 15px;
    margin: 0 0 20px;
  }
  @media ${size["xs"]} {
    padding: 10px;
  }
  .card-discription {
    display: flex;
    @media ${size["sm"]} {
      flex-direction: column;
    }
    img {
      float: left;
      width: 100px;
      height: 100px;
      border-radius: 15px;
      -webkit-border-radius: 15px;
      object-fit: cover;
      @media ${size["lg"]} {
        width: 80px;
        height: 80px;
      }
    }
    video {
      float: left;
      width: 100px;
      height: 100px;
      border-radius: 15px;
      -webkit-border-radius: 15px;
      object-fit: cover;
      @media ${size["lg"]} {
        width: 80px;
        height: 80px;
      }
    }
    .card-dec-inner {
      width: 100%;
      margin: 0 0 0 20px;
      @media ${size["sm"]} {
        margin: 0;
      }
      .card-title {
        display: flex;
        justify-content: space-between;
        a {
          cursor: pointer;
          margin: 0 0 12px;
          display: table;
          align-items: center;
          flex-wrap: wrap;
          padding-right: 15px;
          .title {
            margin: 0;
          }
        }
        .price {
          margin: 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }
        &.desktop {
          @media ${size["sm"]} {
            display: none;
          }
        }
      }
      .service {
        display: flex;
        margin: 0 0 10px;
        flex-wrap: wrap;
        @media ${size["lg"]} {
          margin: 0 0 10px;
        }
        @media ${size["xs"]} {
          margin: 0 0 5px;
        }
        .ser-name {
          font-size: 18px;
          font-weight: 400;
          margin: 0 10px 0 0;
          display: flex;
          align-items: center;
          @media ${size["xxl"]} {
            line-height: 25px;
            font-size: 16px;
          }
          @media ${size["lg"]} {
            line-height: 22px;
          }
          @media ${size["xs"]} {
            line-height: 25px;
            font-size: 14px;
            width: 100%;
            text-align: left;
            &:not(:last-child) {
              margin-bottom: 5px;
            }
          }
          i {
            margin: 0 10px 0 0;
            &:before {
              color: #cdcdcd;
            }
          }
        }
      }
      .category-wraper {
        display: flex;

        justify-content: space-between;
        margin: 0;
        ${"" /* flex-wrap: wrap; */}
        align-items: flex-end;
        @media ${size["lg"]} {
          flex-wrap: wrap;
        }
        .category {
          display: flex;
          list-style-type: none;
          padding: 0;
          margin: 0 10px 0 0;
          flex-wrap: wrap;
          li {
            font-size: 16px;
            font-weight: 400;
            position: relative;
            overflow: hidden;
            line-height: 24px;
            @media ${size["xxl"]} {
              font-size: 14px;
            }
            @media ${size["xs"]} {
              font-size: 13px;
            }
            &:after {
              content: "";
              border-right: 1px solid #b8b9b9;
              margin: -3px 5px;
              height: 14px;
              display: inline-block;
            }
            &:last-child {
              &:after {
                display: none;
              }
            }
          }
        }
        .bid {
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 400;
          @media ${size["xxl"]} {
            font-size: 16px;
          }
          @media ${size["lg "]} {
            width: auto;
            justify-content: flex-end;
          }
          @media ${size["md"]} {
            width: 100%;
            font-size: 14px;
            justify-content: flex-start;
          }
          .bid-count {
            margin: 0 0 0 5px;
            white-space: nowrap;
          }
        }
      }
      .invite-btn {
        text-transform: none;
      }
    }
    .mob-title {
      margin: 0 0 10px;
      display: flex;
      @media ${size["sm"]} {
        margin: 0 0 20px;
      }
      .card-title {
        &.mob {
          display: none;
          @media ${size["sm"]} {
            display: inline-block;
            width: 100%;
          }
          .title {
            cursor: pointer;
            margin: 0 0 10px;
            @media ${size["xs"]} {
              font-size: 16px;
              line-height: 18px;
            }
          }
          .price {
            margin: 0;
            @media ${size["xs"]} {
              font-size: 16px;
            }
          }
        }
      }
      img {
        @media ${size["sm"]} {
          margin: 0 15px 0 0;
        }
      }
    }
  }
  .situation-wraper {
    display: flex;
    justify-content: space-between;
    margin: 10px 0 0;
    align-items: center;
    .situation {
      @media ${size["xxl"]} {
        padding: 11.5px 20px;
      }
      @media ${size["md"]} {
        padding: 10px 20px;
      }
    }
    @media ${size["xs"]} {
      margin: 10px 0 0;
    }
  }
  .result {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 10px 0 0;
    .btn-container {
      display: flex;
      align-items: center;
      .btn {
        & + .btn {
          margin: 0 0 0 20px;
          @media ${size["lg"]} {
            margin: 0 0 0 12px;
          }
        }
      }
    }
    .re-name {
      margin: 0 10px 5px 0;
    }
  }
  .pera {
    margin: 15px 0 20px;
  }
  .rate {
    display: flex;
    align-items: center;
    white-space: nowrap;
    margin-left: 5px;
    margin-right: 10px;
    font-weight: 400;
    @media ${size["sm"]} {
      display: block;
      width: 100%;
      margin-left: 0;
      margin-top: 10px;
    }
    i {
      margin-right: 5px;
    }
    span {
      color: #423f3f;
      line-height: 15px;
      margin: 3px 0 0;
    }
  }
`;

export const Price = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #423f3f;
  text-align: left;
  margin: 0 0 20px;
  @media ${size["xxl"]} {
    margin: 0 0 10px;
    font-size: 18px;
  }
  @media ${size["lg"]} {
    font-size: 17px;
  }
  @media ${size["md"]} {
    font-size: 16px;
  }
  @media ${size["sm"]} {
    margin: 0 0 0 3px;
  }
`;

export const CostWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  line-height: normal;
`;

export const Currency = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #423f3f;
  text-align: left;
  margin: 0 0 0px 5px;
  @media ${size["xxl"]} {
    font-size: 18px;
  }
  @media ${size["lg"]} {
    font-size: 17px;
  }
  @media ${size["md"]} {
    font-size: 16px;
  }
  @media ${size["sm"]} {
    margin: 0 0 0 3px;
  }
`;

export const CardInnerWrapper = styled.div`
  width: 100%;
  .usernumber {
    justify-content: flex-start;
    @media ${size["xs"]} {
      margin-top: 15px;
    }
  }
  .cardRedirect{
    cursor: pointer;
  }
`;

export const CheckboxWrapper = styled.div`
  margin: 0 20px 0 0;
  @media ${size["xs"]} {
    margin: 0 7px 0 0;
  }
`;
