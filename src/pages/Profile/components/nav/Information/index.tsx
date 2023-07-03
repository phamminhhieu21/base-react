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
  Spin,
} from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadProfileUserAction,
  selectProfileUser,
  updateProfileUserAction,
} from 'store/reducers/user.reducer';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { BaseCard } from 'components/common/BaseCard/BaseCard';
import { BaseCol } from 'components/common/BaseCol/BaseCol';
import { BaseRow } from 'components/common/BaseRow/BaseRow';
const SubmitButton = ({
  form,
  isLoading,
}: {
  form: FormInstance;
  isLoading?: boolean;
}) => {
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
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      loading={isLoading}
    >
      Submit
    </Button>
  );
};

const Information = () => {
  const avatarRef = useRef<any>(null);
  const { idUser } = useParams();
  const dispatch: any = useDispatch();
  const [form] = Form.useForm();
  const { Option } = Select;

  const ProfileUser = useSelector(selectProfileUser());
  const [avatarFile, setAvatarFile] = useState<any>(null);
  useEffect(() => {
    if (ProfileUser?.data) {
      form.setFieldsValue({
        name: ProfileUser?.data?.name,
        email: ProfileUser?.data?.email,
        date_of_birth: dayjs(ProfileUser?.data?.date_of_birth),
        phone_number: ProfileUser?.data?.phone_number,
        gender: ProfileUser?.data?.gender,
      });
    }
  }, [ProfileUser]);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const beforeUpload = (file: any) => {
    console.log('beforeUpload', file);
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('Only image files are allowed!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
    }
    // Lưu file vào state avatarFile
    console.log('file', file);
    setAvatarFile(file);
    avatarRef.current = file;
    // Trả về false để ngăn chặn việc tự động tải lên file
    return false;
  };

  const onRemove = () => {
    // Xóa file khỏi state avatarFile khi người dùng xóa avatar
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
      dispatch(loadProfileUserAction(idUser));
    }
  }, [idUser]);

  const handleUpdateProfile = ({ prefix, ...params }: any) => {
    console.log('form', form.getFieldsValue());
    console.log('avt', avatarFile);
    const values = params;
    const data = {
      id: Number(idUser),
      avatar: avatarRef.current,
      ...values,
    };
    console.log('dataUpdate', data);
    dispatch(updateProfileUserAction(data));
  };

  const handleImageChange = (info: any) => {
    //
  };

  return (
    <Spin spinning={ProfileUser?.isLoading}>
      <BaseCard>
        <BaseRow gutter={{ xs: 10, md: 15, xl: 30 }}>
          <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            // initialValues={initialValues}
            onFinish={handleUpdateProfile}
          >
            <BaseCol xs={24} md={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
            </BaseCol>
            <BaseCol xs={24} md={12}><Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                  type: 'email',
                },
              ]}
            >
              <Input />
            </Form.Item></BaseCol>
            <BaseCol xs={24} md={12}>
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
              <DatePicker format={'YYYY-MM-DD'} />
            </Form.Item>
            </BaseCol>

            <BaseCol xs={24} md={12}>
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
            </BaseCol>
            <BaseCol xs={24} md={12}>
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
            </BaseCol>
            <BaseCol xs={24} md={12}>
            <Form.Item
              name="avatar"
              label="Avatar"
              // valuePropName="fileList"
              // getValueFromEvent={normFile}
            >
              <Upload
                name="upload"
                accept="image/*"
                beforeUpload={beforeUpload}
                onRemove={onRemove}
                showUploadList={false}
                // onChange={handleImageChange}
                // listType="picture"
                // fileList={avatarFile ? [avatarFile] : []}
              >
                {avatarFile ? (
                  <img
                    src={URL.createObjectURL(avatarFile)}
                    alt="Uploaded Image"
                    style={{ maxWidth: '30%', maxHeight: '50%' }}
                  />
                ) : (
                  <div>
                    <div className="upload-icon">
                      <UploadOutlined />
                    </div>
                    <div className="upload-text">Click to Upload</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
            </BaseCol>
            <Form.Item>
              <Space>
                <SubmitButton form={form} isLoading={ProfileUser?.isLoading} />
                <Button htmlType="reset">Reset</Button>
              </Space>
            </Form.Item>
          </Form>
        </BaseRow>
      </BaseCard>
    </Spin>
  );
};

export default Information;
