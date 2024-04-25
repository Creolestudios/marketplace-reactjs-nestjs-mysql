import React from "react";
import { Link ,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { PeraGraph } from "../../CommonStyle";
import { NotificationMsgWrapper, Message, Special } from "./style";
import notificationActions from "@iso/redux/notification/actions";

const Notification = ({ onClose }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  // const { unReadNotification } = useSelector((state) => state.Notification);
  const { data } = useSelector((state) => state.Notification);
  const handleReadNotification = (id) => {
    dispatch(
      notificationActions.readNotification({
        notification_id: [id],
        is_read: 1,
        read_all: false,
      })
    );
    onClose();
  };
  return (
    <>
      <NotificationMsgWrapper>
        {/* {unReadNotification.map((data) => ( */}
        {data.slice(0, 5).map((data) => (
          <Message>
            <PeraGraph
              
              className={data.read_flag === 0 ? "msg-pera" : ""}
            >
              {data.routes
                ? [
                    data.notification_text.split('"')[0],

                    <Link
                    onClick={() => handleReadNotification(data.id)}
                    to={         
                      {
                        pathname:`/client/${
                          data.routes.user_type === 1
                            ? "task-details/employer/"
                            : "task-details-specialists/specialist/"
                        }${data.routes.id}`,
                        state: {prevPath: location.pathname}
                      }
                    }
                    >
                      <Special>{data.notification_text.split('"')[1]}</Special>
                    </Link>,
                    data.notification_text.split('"')[2],
                  ]
                : data.notification_text}
              {/* Specialist Jon Doe has marked the task
              <Special>I need a Handyman for an hour</Special>
              as complete. */}
            </PeraGraph>
          </Message>
        ))}
        {/* <Message>
          <PeraGraph className="msg-pera">
            Employer Mike Match has marked the task
            <Special>I need a Handyman for an hour</Special>
            as not complete.
          </PeraGraph>
        </Message>
        <Message>
          <PeraGraph className="msg-pera">
            Employer Jon Doe has awarded the task
            <Special>I need a Handyman for an hour</Special>
            to other specialist.
          </PeraGraph>
        </Message>
        <Message>
          <PeraGraph className="msg-pera">
            The task
            <Special>I need a Handyman for an hour</Special>
            has passed the due date and it is moved to archieved task.
          </PeraGraph>
        </Message>
        <Message>
          <PeraGraph className="msg-pera">
            The task
            <Special>I need a Handyman for an hour</Special>
            has been cancelled.
          </PeraGraph>
        </Message>
        <Message>
          <PeraGraph className="msg-pera">
            The admin has marked the task
            <Special>I need a Handyman for an hour</Special>
            as resolved in favour of the task reporter. The funds has been split
            by the admin.<b>10 Kr</b>will be credited to your account.
          </PeraGraph>
        </Message> */}
      </NotificationMsgWrapper>
    </>
  );
};

export default Notification;
