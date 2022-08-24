import React from "react";
import "antd/dist/antd.css";
import "./logn.css";
import { Form, Input, Button,Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { userLogin } from "../../api/server/functions/verifyLogin";
import {reactLocalStorage} from 'reactjs-localstorage';
import { Navigate,useNavigate  } from "react-router-dom";

const { Title } = Typography;

export default function Login() {

    let navigate = useNavigate();

  const onFinish = (values) => {
    let ans = userLogin(values);
    reactLocalStorage.setObject('user',ans);
    navigate('/admin')
  };

  return (
    <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        marginTop:"200px"
    }}>
        <Title style={{
            color:"white"
        }}>Smart Meter Log in!</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="meterid"
          rules={[
            {
              required: true,
              message: "Please input your Meter id!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Meter ID"
          />
        </Form.Item>
        <Form.Item
          name="userid"
          rules={[
            {
              required: true,
              message: "Please input your userID!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="User ID"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>          
        </Form.Item>
      </Form>
    </div>
  );
}
