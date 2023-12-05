import React from "react";
import { Layout, Row, Col } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import TodoList from "./components/TodoList";
import "./index.css";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header
        style={{ background: "#2c3e50", padding: "0 16px", color: "white" }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <h1 style={{ color: "white", margin: 0 }}>
              <SmileOutlined style={{ marginRight: "8px" }} />
              Todo App
            </h1>
          </Col>
        </Row>
      </Header>
      <Content>
        <Row justify="center">
          <Col xs={24} sm={22} md={20} lg={18} xl={16}>
            <div className="app-container">
              <TodoList />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
