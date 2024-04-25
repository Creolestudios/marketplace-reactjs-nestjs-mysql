import React, { useEffect, useState } from "react";
import { Form, Checkbox, Alert } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import IntlMessages from "@iso/components/utility/intlMessages";
import {
  ButtonLink,
  PeraGraph,
  TaskTitle,
  Text,
  TextBg,
} from "../../CommonStyle";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  ProfileWrapper,
  ProfileLeft,
  ProfileRight,
  ProfileImg,
  WorkProfile,
  Box,
} from "./style";
import ProfileImage from "@iso/assets/images/avatar.png";
import taskActions from "@iso/redux/task/actions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { socket } from "../../socket";
import moment from "moment";
import { removeUTC } from "../../library/helpers/utility";
import filterAction from "@iso/redux/userTypeAndFilter/actions";

const {  clearAllPages  } = filterAction;

const { reportProfile ,clearMessages } = taskActions;

const Profile = ({ profile, type, room_id, allCategoriesData }) => {
  const location = useLocation();
  const { pathname } = location;
  let { reportProfileSuccess } = useSelector((state) => state.Task);
  const [onlineFlag, setOnlineFlag] = useState(false);
  let userStatus = useSelector(
  (state) => state?.Auth?.userStatus
  );
  //let userStatus=1
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleReport = () => {
    dispatch(
      reportProfile({
        user_id: parseInt(id),
      })
    );
  };
  let interval = {};
  useEffect(() => {
    try {
      // trying to use new API - https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      // just a fallback for older browsers
      window.scrollTo(0, 0);
    }
    interval = setInterval((e) => {
      socket.emit("listUser");
      socket.on("online", (user_id) => {
        let ids = Object.values(user_id);
        // if (ids.includes(profile.user_id)) {
        //   setOnlineFlag(true);
        // } else {
        //   setOnlineFlag(false);
        // }
      });
    }, 3000);
  }, []);
  useEffect(() => {
    dispatch(
      clearAllPages()
    );
    return () => {
      clearInterval(interval);
      dispatch(clearMessages())
    };
  }, []);
  return (
    <>
      <ProfileWrapper>
        <ProfileLeft>
          <ProfileImg>
            <img src={profile.profile_photo || ProfileImage} alt="img" />
          </ProfileImg>
          <TaskTitle className="user-title">{profile.full_name}</TaskTitle>

          <Checkbox
            className="user-checkbox"
            checked={profile.authorized_by_nemid === 1}
            disabled
          >
            <IntlMessages id="authByNem" />
          </Checkbox>
          <div className="task-btn">
            {type !== "myProfile" && (
              <div
                className="task-icon"
                onClick={() =>
                  room_id && history.push(`/client/inbox/${room_id}`)
                }
              >
                <i className="icon-specialist"></i>
              </div>
            )}
            {type !== "myProfile" && (
              <Form.Item
                style={{ margin: "0 20px 0 0" }}
                label=" "
                tooltip={{
                  title: <IntlMessages id="ant.profile.toolTip" />,
                  icon: <InfoCircleOutlined />,
                }}
              ></Form.Item>
            )}
            {type === "myProfile" ? (
              <Link to={userStatus === 1 && "/client/profile-setting"}>
                <ButtonLink className="btn info-btn-border" >
                  <IntlMessages id="Edit-Profile" />
                </ButtonLink>
              </Link>
            ) : (
              <Link>
                <ButtonLink
                  className="btn info-btn-border"
                  onClick={handleReport}
                  disabled={userStatus===3}
                >
                  <IntlMessages id="report-profile" />
                </ButtonLink>
              </Link>
            )}
            {type !== "myProfile" && (
              <Form.Item
                style={{ margin: "0" }}
                label=" "
                tooltip={{
                  title: <IntlMessages id="ant.reportProfile.toolTip" />,
                  icon: <InfoCircleOutlined />,
                }}
              ></Form.Item>
            )}
          </div>
          {reportProfileSuccess && (
            <Alert
              style={{
                borderRadius: "40px",
                marginBottom: "20px",
                marginTop: "20px",
              }}
              message={reportProfileSuccess}
              type="success"
              showIcon
            />
          )}
        </ProfileLeft>
        <ProfileRight>
          <WorkProfile>
            <div className="box-wrapper-left">
              <Box className="box">
                <Text className="yellow">
                  <IntlMessages id="Work-As" />
                </Text>
                <Text>
                  {profile.work_as === 1 ? (
                   <IntlMessages id="SignUp.Freelancer" />
                  ) : (
                    
                    <IntlMessages id="SignUp.Bussiness" />
                  )}
                </Text>
              </Box>
              {type === "myProfile" && (
                <Box className="box">
                  <Text className="yellow">
                    <IntlMessages id="Zip-Code" />
                  </Text>
                  <Text>
                    {profile.zipcode || (
                      <IntlMessages id="antd.form.label.NotProvided" />
                    )}
                  </Text>
                </Box>
              )}
              <Box className="box">
                <Text className="yellow">
                  <IntlMessages id="City" />
                </Text>
                <Text>
                  {profile.city || (
                    <IntlMessages id="antd.form.label.NotProvided" />
                  )}
                </Text>
              </Box>
              {pathname.includes("my-profile") ? (
                ""
              ) : (
                <Box className="box">
                  <Text className="yellow">
                    <IntlMessages id="from.label.lastActive" />
                  </Text>
                  <Text>
                    {onlineFlag
                      ? "Online"
                      : moment(removeUTC(profile.last_seen)).fromNow() ||
                        "Not Recorded"}
                  </Text>
                </Box>
              )}
            </div>
            <div className="box-wrapper-right">
              {allCategoriesData.length > 1 && (
                <Box className="box">
                  <Text className="yellow">
                    {" "}
                    <IntlMessages id="ant.text.help" />
                  </Text>
                  <div className="service-wrapper">
                    {allCategoriesData.map((d, i) => (
                      <TextBg key={i} className="service">
                        <IntlMessages id={`${d.parentCategoryData.name}`} />
                      </TextBg>
                    ))}
                  </div>
                </Box>
              )}
            </div>
          </WorkProfile>
          <PeraGraph className="user-pera">{profile.description}</PeraGraph>
        </ProfileRight>
      </ProfileWrapper>
    </>
  );
};

export default Profile;
