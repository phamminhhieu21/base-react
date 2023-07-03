import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { resetPasswordAction } from 'store/reducers/auth.reducer'
import {Form, Input, Button, Modal} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LockOutlined } from '@ant-design/icons'
import { isTokenAuthExpired } from 'utils/checkExpireToken'
const ResetPassword = () => {
  const dispatch : any = useDispatch()
  const isLoading = useSelector((state : any) => state.auth.isLoading)
  const { token } = useParams<{ token: string }>()
  const onFinish = (values: {password : string , confirmPassword : string }) => {
    dispatch(resetPasswordAction({ token , newPassword : values.password}))
  }
  useEffect(() => {
    if (isTokenAuthExpired(token)) {
      Modal.error({
        title: 'Token Expired',
        content: 'Token is expired. Please try again.',
        okText: 'OK',
        onOk: () => {
          window.location.href = '/login'
        },
      })
    }
  }, [token])

  return (
    <div
      className='flex flex-col h-screen w-1/4 text-center'
    >
      <p className='font-bold text-lg py-8'>Reset Password</p>
      <Form
        name="reset-password-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm new Password"/>
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!'),
                );
              },
            }),
          ]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Type new Password"/>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className='btn-submit'
          >
            Submit to reset password
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ResetPassword
