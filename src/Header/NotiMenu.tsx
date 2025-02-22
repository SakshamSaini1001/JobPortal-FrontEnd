import { Indicator, Menu, Notification, rem, Stack } from "@mantine/core";
import { IconBell, IconCheck, IconUserCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getNotification, readNotification } from "../Services/NotiService";

const NotiMenu = () => {
  const profile = useSelector((state: any) => state.profile);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [opened, setOpened] = useState(false);
  const [notification, setNotification] = useState<any>([]);

  useEffect(() => {
    getNotification(user.id)
      .then((res: any) => setNotification(res))
      .catch((err: any) => console.log("hi", err));
  }, [user]);

  const unread = (index: number) => {
    let notis = [...notification];
    notis = notis.filter((noti: any, i: number) => i != index);
    setNotification(notis);
    readNotification(notification[index].id)
      .then((res: any) => {
        console.log(res);
        console.log(notification[index].id);
      })
      .catch((err: any) => console.log(err));
  };

  return (
    <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
      <Menu.Target>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator
            disabled={notification.length <= 0}
            color="brightSun.4"
            size={8}
            offset={6}
            processing
          >
            <IconBell stroke={1.25} />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        {/* <Link to="/profile">
          <Menu.Item> */}
        <div className="flex flex-col gap-1">
          {notification.map((noti: any, index: number) => (
            <Notification
              onClick={() => {
                navigate(noti.route);
                unread(index);
                setOpened(false);
              }}
              key={index}
              className="hover:bg-mine-shaft-900 cursor-pointer"
              icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
              color="teal"
              onClose={() => unread(index)}
              title={noti.action}
            >
              {noti.message}
            </Notification>
          ))}
          {notification.length == 0 && (
            <div className="text-center text-mine-shaft-300">
              No New Notifications
            </div>
          )}
        </div>
        {/* </Menu.Item>
        </Link> */}
      </Menu.Dropdown>
    </Menu>
  );
};
export default NotiMenu;
