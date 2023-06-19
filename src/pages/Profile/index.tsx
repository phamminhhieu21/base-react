import type { FormInstance } from 'antd';
import {
  Button,
  Form,
  Input,
  Space,
  DatePicker,
  Select,
  Upload,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/reducers/auth.reducer';
import {
  getProfileUserAction,
  selectProfileUser,
} from 'store/reducers/user.reducer';
import { useParams } from 'react-router-dom';

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const ProfilePage = () => {
  const [form] = Form.useForm();
  const dispatch: any = useDispatch();
  const { idUser } = useParams();
  const ProfileUser = useSelector(selectProfileUser());
  const [avatarFile, setAvatarFile] = useState(null);
  const { Option } = Select;
  const User = useSelector(selectUser());
  console.log(User);
  const initialValues = {
    name: ProfileUser?.data?.name,
    email: ProfileUser?.data?.email,
    date_of_birth: ProfileUser?.data?.date_of_birth,
    phone_number: ProfileUser?.data?.phone_number,
    gender: ProfileUser?.data?.gender,
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const beforeUpload = (file: any) => {
    // Kiểm tra kiểu file và kích thước ở đây (nếu cần)
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Only image files are allowed!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    // Lưu file vào state avatarFile
    setAvatarFile(file);
    // Trả về false để ngăn chặn việc tự động tải lên file
    return false;
  };

  const onRemove = () => {
    // Xóa file khỏi state avatarFile khi người dùng xóa avatar
    setAvatarFile(null);
  };
  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  useEffect(() => {
    if (idUser) {
      dispatch(getProfileUserAction(idUser));
    }
  }, [idUser]);
  return (
    <Form
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      initialValues={initialValues}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="date_of_birth"
        label="Date of Birth"
        rules={[
          {
            required: true,
            message: 'Please input your Date of Birth!',
            // whitespace: true,
          },
        ]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        name="phone_number"
        label="Phone Number"
        rules={[
          {
            // required: true,
            message: 'Input your phone is number!',
            pattern: new RegExp(/^[0-9\b]+$/),
            min: 10,
            max: 11,
          },
        ]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[{ required: true, message: 'Please select gender!' }]}
      >
        <Select placeholder="select your gender">
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        // extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload
          name="avt"
          accept="image/*"
          listType="picture"
          beforeUpload={beforeUpload}
          onRemove={onRemove}
          fileList={avatarFile ? [avatarFile] : []}
        >
          <Button icon={<UploadOutlined />}>Change Avatar</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Space>
          <SubmitButton form={form} />
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ProfilePage;
