import React, { Component } from "react";
import { Layout } from "antd";
import { Form, Input, Button } from "antd";
import axios from "axios";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      alertList: [],
      userList: [],
    };
    if (sessionStorage.getItem("access")) {
      this.props.history.push("/dash");
    }
  }

  validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  storeToken = (response) => {
    sessionStorage.setItem("access", response.data.access);
    sessionStorage.setItem("refresh", response.data.refresh);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + response.data.access;
    this.props.history.push("/dash");
  };

  refreshAlertList = () => {
    axios
      .get("/api/foodsecurity/")
      .then((res) => this.setState({ alertList: res.data }))
      .catch((err) => console.log(err));
  };

  onFinish = (values) => {
    axios.post("/api/login/", values).then((res) => this.storeToken(res));
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  render() {
    return (
      <div className="App">
        <Layout.Content
          style={{
            background: "var(--git-primary-background-color)",
          }}
        >
          <div className="login-panel">
            <div className="header-panel">
              <span>Welcome To WFP Food Security and Monitoring System</span>
            </div>
            <Form
              className="login-form"
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 14,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              validateMessages={this.validateMessages}
              autoComplete="on"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 6,
                  span: 14,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Layout.Content>
      </div>
    );
  }
}

export default LoginComponent;
