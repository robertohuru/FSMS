import React, { useEffect } from "react";
import { Layout, Table } from "antd";
import { Button, Row, Col } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { fetchAlerts } from "../actions";
import HeaderComponent from "./HeaderComponent";

const DashboardComponent = function () {
  if (!sessionStorage.getItem("access")) {
    window.location.href = "/";
  }

  const table_columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Country",
      dataIndex: "country_name",
    },
    {
      title: "Critical",
      dataIndex: "critical",
      render: function (text) {
        return text ? "Yes" : "No";
      },
    },
    {
      title: "Date",
      dataIndex: "date_created",
    },
  ];

  const alertList = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  const runAnalysis = () => {
    axios
      .post("/api/user/")
      .then(function (res) {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("/api/alerts/")
      .then(function (res) {
        dispatch(fetchAlerts(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <Layout>
        <HeaderComponent />
        <Layout.Content
          style={{
            background: "var(--git-primary-background-color)",
          }}
        >
          <Row>
            <Col
              span={24}
              style={{
                padding: 10,
              }}
            >
              <h3>List of Alerts</h3>
              <Table columns={table_columns} dataSource={alertList} />

              <Button
                style={{
                  maxWidth: "150px !important",
                  width: 150,
                  textAlign: "left",
                }}
                type="primary"
                onClick={runAnalysis}
                icon={<FileAddOutlined />}
              >
                Run new analysis
              </Button>
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </div>
  );
};

export default DashboardComponent;
