import React from 'react'
import { Button, Form, Input } from 'antd';
import { forgotPasswordAction } from 'store/reducers/auth.reducer';
import { useDispatch, useSelector } from 'react-redux';

const ForgotPassWord = () => {
  const isLoading = useSelector((state : any) => state.auth.isLoading);
  const dispatch : any = useDispatch();
  const onFinish = (values : { email: string }) => {
    dispatch(forgotPasswordAction(values));
  };
  return (
    <div className='w-1/4 flex justify-center flex-col text-center'>
      <p className='font-bold text-lg py-8'>Forgot Password</p>
      <Form
        name="forgot-password"
        className="forgot-password-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            placeholder="Type your Email"
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-submit"
          loading={isLoading}
        >
          Submit Email to reset password
        </Button>
        </Form>
    </div>
  )
}

export default ForgotPassWord
