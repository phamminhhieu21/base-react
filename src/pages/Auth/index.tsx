/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Checkbox } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { LoginWrapper } from './styled';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, selectAuthUser } from 'store/reducers/auth.reducer';
import {  useNavigate } from 'react-router-dom';

// import { AppDispatch } from 'store'
function Login() {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const User = useSelector(selectAuthUser());
  const [initialValues, setInitialValues] = useState({
    remember: true,
    email: User?.data?.email,
  });

  const isLoading = useSelector((state: any) => state.auth.isLoading);
  const handleLoginWithGoogle = () => {
    window.open(`${process.env.REACT_APP_URL_API}/api/v1/auth/google`, '_self');
  };

  const onFinish = (values: { email: string; password: string }) => {
    dispatch(
      logIn(undefined, undefined, 'normal', values.email, values.password),
    );
  };

  return (
    <LoginWrapper>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className="mb-2">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/forgot-password" target="_blank">
            Forgot password
          </a>
        </Form.Item>
        <div className="flex justify-between items-center flex-col w-full p-3">
          <div className="">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button w-40"
              icon={<LoginOutlined />}
              loading={isLoading}
            >
              Log in
            </Button>
          </div>
          <div>
            <Button
              type="default"
              className="login-form-button m-3 shadow rounded"
              icon={<GoogleOutlined />}
              onClick={handleLoginWithGoogle}
            >
              Log in with google
            </Button>
          </div>

          <div className="mb-2">
            <div className="text-[15px]">
              If you don't have an account, please{' '}
              <p
                className="text-[15px] text-blue-500 cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </p>
            </div>
          </div>
        </div>
      </Form>
    </LoginWrapper>
  );
}

export default Login;
