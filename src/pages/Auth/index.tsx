import React, { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined } from '@ant-design/icons';
import { LoginWrapper } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle } from 'store/reducers/auth.reducer';

// import { AppDispatch } from 'store'
function Login() {
  const dispatch: any = useDispatch();
  const handleLoginWithGoogle = () => {
    // dispatch(loginWithGoogle());
    window.open(`${process.env.REACT_APP_URL_API}/api/v1/auth/google`, '_self');
  };

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // Xử lý logic đăng nhập tại đây
  };

  return (
    <LoginWrapper>
      <Form name="login-form" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            icon={<GoogleOutlined />}
            onClick={handleLoginWithGoogle}
            block
          >
            Đăng nhập bằng Google
          </Button>
        </Form.Item>
      </Form>
    </LoginWrapper>
  );
}

export default Login;
