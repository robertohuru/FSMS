import React, { useEffect } from "react";
import { Layout, Row, Col, Button, notification, Table, Collapse } from "antd";
import { ImportOutlined, FileAddOutlined } from "@ant-design/icons";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUser,
  addUser,
  fetchCountry,
  addCountry,
  fetchRegion,
  addRegion,
} from "../actions";
import HeaderComponent from "./HeaderComponent";

const ConfigComponent = function () {
  const addCountry = () => {
    axios
      .post("/api/country/")
      .then(function (res) {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const addRegion = () => {
    axios
      .post("/api/region/")
      .then(function (res) {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const addUser = () => {
    axios
      .post("/api/user/")
      .then(function (res) {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const openNotification = (placement) => {
    notification.info({
      message: `Success Notification`,
      description: "Successfully Submitted!",
      placement,
    });
  };

  const initializeData = () => {
    axios
      .get("/services")
      .then(function (res) {
        openNotification("topLeft");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const userList = useSelector((state) => state.user);
  const regionList = useSelector((state) => state.region);
  const countryList = useSelector((state) => state.country);

  const dispatch = useDispatch();

  const country_table_columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "ISO Code",
      dataIndex: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  const user_table_columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "surname",
    },
    {
      title: "Email Address",
      dataIndex: "email",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
  ];

  const region_table_columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "ISO Code",
      dataIndex: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Population",
      dataIndex: "population",
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows[0]
      );
      axios
        .get("/api/region?country_id=" + selectedRows[0].id)
        .then(function (res) {
          dispatch(fetchRegion(res.data));
        })
        .catch((err) => console.log(err));
    },
  };

  useEffect(() => {
    axios
      .get("/api/country/")
      .then(function (res) {
        dispatch(fetchCountry(res.data));
      })
      .catch((err) => console.log(err));

    axios
      .get("/api/user/")
      .then(function (res) {
        dispatch(fetchUser(res.data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
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
            <Collapse defaultActiveKey={["1"]}>
              <Collapse.Panel header="Admin Levels" key="1">
                <div>
                  <Row>
                    <Col
                      span={8}
                      style={{
                        padding: 5,
                        background: "#eee",
                      }}
                    >
                      <div>
                        <h3>List of Countries</h3>
                        <Table
                          rowSelection={{
                            type: "radio",
                            ...rowSelection,
                          }}
                          columns={country_table_columns}
                          dataSource={countryList}
                        />
                        <Button
                          style={{
                            maxWidth: "150px !important",
                            width: 150,
                            textAlign: "left",
                          }}
                          type="primary"
                          onClick={addCountry}
                          icon={<FileAddOutlined />}
                        >
                          Add Country
                        </Button>
                      </div>
                    </Col>
                    <Col
                      style={{
                        padding: 5,
                        background: "#eee",
                      }}
                      span={16}
                    >
                      <div>
                        <h3>List of Regions</h3>
                        <Table
                          columns={region_table_columns}
                          dataSource={regionList}
                        />

                        <Button
                          style={{
                            maxWidth: "150px !important",
                            width: 150,
                            textAlign: "left",
                          }}
                          type="primary"
                          onClick={addRegion}
                          icon={<FileAddOutlined />}
                        >
                          Add region
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Collapse.Panel>
              <Collapse.Panel header="Users" key="2">
                <h3>List of Users</h3>
                <Table columns={user_table_columns} dataSource={userList} />

                <Button
                  style={{
                    maxWidth: "150px !important",
                    width: 150,
                    textAlign: "left",
                  }}
                  type="primary"
                  onClick={addUser}
                  icon={<FileAddOutlined />}
                >
                  Add User
                </Button>
              </Collapse.Panel>
              <Collapse.Panel header="Initialize Data" key="3">
                <div>
                  <Row>
                    <Col
                      span={24}
                      style={{
                        padding: 10,
                      }}
                    >
                      <Button
                        style={{
                          maxWidth: "150px !important",
                          width: 150,
                          textAlign: "left",
                        }}
                        type="default"
                        onClick={initializeData}
                        icon={<ImportOutlined />}
                      >
                        Initiliaze Data
                      </Button>
                    </Col>
                  </Row>
                </div>
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default ConfigComponent;
