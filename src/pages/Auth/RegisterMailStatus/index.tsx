import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from 'antd';
const RegisterStatus = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === 'successful') {
      Modal.success({
        title: 'Success',
        content: 'Your account has been actived successfully',
        onOk: () => {
          navigate('/login');
        },
        width: 500,
        centered: true,
      });
    }
    if (status === 'failed') {
      Modal.error({
        title: 'Error',
        content: 'Your account has been actived failed, please try again',
        onOk: () => {
          navigate('/register');
        },
        width: 500,
        centered: true,
      });
    }
  }, [status]);
  return <div className="h-screen w-screen bg-slate-100"></div>;
};

export default RegisterStatus;
