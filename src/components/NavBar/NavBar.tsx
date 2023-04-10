import {
  HomeTwoTone,
  CheckSquareTwoTone,
  FacebookFilled,
  LockOutlined,
  LockFilled,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { AuthenticationContext } from "../../auth/authentication.context";

const MENU_ITEMS = [
  { icon: () => <HomeTwoTone />, link: "/", name: "Home", requiresAuth: false },
  {
    icon: () => <CheckSquareTwoTone />,
    link: "/chat",
    name: "ChatRoom",
    requiresAuth: true,
  },
  {
    icon: () => <FacebookFilled />,
    link: "/profile",
    name: "Profile",
    requiresAuth: true,
  },
  {
    icon: () => <LockFilled />,
    link: "/login",
    name: "Login",
    requiresAuth: false,
  },
  {
    icon: () => <LockOutlined />,
    link: "/logOut",
    name: "Sign out",
    requiresAuth: true,
  },
];

const NavBar = () => {
  const [current, setCurrent] = useState("");

  const { isAuthenticated } = useContext(AuthenticationContext);

  const onClick = (e: any) => {
    setCurrent(e.key);
  };

  const getPageKey = (url: string) => {
    const lastBit = url.split("/").slice(-1)[0];
    return lastBit;
  };

  useEffect(() => {
    const url = window.location.href;
    if (url) {
      setCurrent(getPageKey(url));
    }
    return () => {};
  }, []);

  return (
    <div>
      <Menu
        onClick={onClick}
        selectedKeys={current === "" ? [] : [current]}
        mode="horizontal"
      >
        {MENU_ITEMS.filter(
          ({ requiresAuth, name }) =>
            isAuthenticated === requiresAuth || name === "Home"
        ).map((item) => (
          <Menu.Item key={item.name} icon={item.icon()}>
            <Link to={item.link}>{item.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <Outlet />
    </div>
  );
};
export default NavBar;
