import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { FaBook, FaBookOpen, FaUserAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import Logo from "resources/svg/Logo";
import { ROUTE_URL } from "routes";
import { useAuthentication } from "store/useAuthentication";
const { Header, Sider, Content } = Layout;

function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user } = useAuthentication();
  return (
    <Layout hasSider id="components-layout-demo-custom-trigger">
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <Link
          className="logo"
          to={ROUTE_URL.HOME}
          style={{ marginLeft: collapsed ? 26 : 16 }}
        >
          <Logo />
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <FaBook />,
              label: <NavLink to={ROUTE_URL.ADMIN_BOOKS}>All books</NavLink>,
            },
            {
              key: "2",
              icon: <FaBookOpen />,
              label: (
                <NavLink
                  to={user.isLogin ? "/admin/book/-1" : ROUTE_URL.ADMIN_BOOKS}
                >
                  New books
                </NavLink>
              ),
            },
            // {
            //   key: "3",
            //   icon: <FaUserAlt />,
            //   label: "User",
            // },
          ]}
        />
      </Sider>
      {/* <Sider trigger={null} collapsible collapsed={collapsed}>
      </Sider> */}
      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
