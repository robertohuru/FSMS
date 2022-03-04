import React, { Component } from "react";
import { Layout, Space, Typography, Dropdown, Menu } from "antd";
import { Button } from "antd";
import {
  LogoutOutlined,
  SettingOutlined,
  HomeOutlined,
} from "@ant-design/icons";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }
  logOut = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item icon={<HomeOutlined />} key="dashboard">
          <a href="/dash">Dashboard</a>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <a href="/settings">Configurations</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <Button
            style={{
              maxWidth: "150px !important",
              width: 150,
              textAlign: "left",
            }}
            type="default"
            onClick={this.logOut}
            icon={<LogoutOutlined />}
          >
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout.Header
        style={{
          background: "var(--git-primary-background-color)",
          boxShadow: "0 2px 4px #dc3545",
          marginBottom: 8,
          height: 46,
          display: "flex",
          alignItems: "center",
          width: "100%",
          userSelect: "none",
        }}
      >
        <Typography.Title
          level={5}
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: 24,
            marginRight: 6,
            marginBottom: 0,
          }}
        >
          Dotron
        </Typography.Title>

        <Space
          style={{
            position: "absolute",
            right: 5,
          }}
          direction="horizontal"
          align="end"
        >
          <Space wrap>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button>Menu</Button>
            </Dropdown>
          </Space>
        </Space>
      </Layout.Header>
    );
  }
}

export default HeaderComponent;
