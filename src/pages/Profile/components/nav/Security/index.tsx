/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { BaseCard } from 'components/common/BaseCard/BaseCard';
import { BaseRow } from 'components/common/BaseRow/BaseRow';
import { BaseCol } from 'components/common/BaseCol/BaseCol';
import { BaseButtonsForm } from 'components/common/forms/BaseButtonsForm/BaseButtonsForm';
import { InputPassword } from 'components/common/inputs/InputPassword/InputPassword.styles';
import { useTranslation } from 'react-i18next';
import { passwordPattern } from 'constants/patterns';
import { Row } from 'antd';
import { BaseForm } from 'components/common/forms/BaseForm/BaseForm';
import { BaseButton } from 'components/common/BaseButton/BaseButton';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { changePasswordAction } from 'store/reducers/auth.reducer';
import { useParams } from 'react-router-dom';
const Security: React.FC = () => {
  const { idUser } = useParams<{ idUser: string }>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state : any) => state.auth.isLoading);
  const handleOnFinish = (values: any) => {
    dispatch(
      changePasswordAction({
        id: idUser,
        oldPassword: values.password,
        newPassword: values.newPassword,
      }),
    );
  };
  return (
    <BaseCard>
      <BaseRow gutter={{ md: 15, xl: 30 }}>
        <BaseCol xs={24} xl={12}>
          {/* Start Form to change password */}
          <BaseForm
            name="form-change-password"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleOnFinish}
          >
            <BaseCol xs={24} xl={24}>
              <BaseButtonsForm.Item>
                <BaseButtonsForm.Title>
                  {t('profile.nav.securitySettings.title')}
                </BaseButtonsForm.Title>
              </BaseButtonsForm.Item>
            </BaseCol>
            <BaseCol xs={24} md={12} xl={24}>
              <BaseButtonsForm.Item
                name="password"
                label={t('profile.nav.securitySettings.currentPassword')}
                rules={[
                  {
                    required: true,
                    message: t('profile.nav.securitySettings.requiredPassword'),
                  },
                ]}
              >
                <InputPassword />
              </BaseButtonsForm.Item>
            </BaseCol>
            <BaseCol xs={24} md={12} xl={24}>
              <BaseButtonsForm.Item
                name="newPassword"
                label={t('profile.nav.securitySettings.newPassword')}
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: t('profile.nav.securitySettings.requiredPassword'),
                  },
                  {
                    pattern: passwordPattern,
                    message: t('profile.nav.securitySettings.notValidPassword'),
                  },
                  ({ getFieldValue }: any) => ({
                    validator(_: any, value: string) {
                      if (!value || getFieldValue('password') !== value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          t('profile.nav.securitySettings.samePassword'),
                        ),
                      );
                    },
                  }),
                ]}
              >
                <InputPassword />
              </BaseButtonsForm.Item>
            </BaseCol>
            <BaseCol xs={24} md={12} xl={24}>
              <BaseButtonsForm.Item
                name="confirmPassword"
                label={t('profile.nav.securitySettings.confirmPassword')}
                dependencies={['newPassword']}
                rules={[
                  {
                    required: true,
                    message: t('profile.nav.securitySettings.requiredPassword'),
                  },
                  ({ getFieldValue }: any) => ({
                    validator(_: any, value: string) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          t('profile.nav.securitySettings.dontMatchPassword'),
                        ),
                      );
                    },
                  }),
                ]}
              >
                <InputPassword />
              </BaseButtonsForm.Item>
              <BaseRow gutter={[10, 10]} wrap={false}>
                <BaseCol xs={24} xl={14}>
                  <BaseButtonsForm.Item noStyle>
                    <BaseButton block type="primary" htmlType="submit" loading={isLoading}>
                      {t('profile.nav.securitySettings.changePassword')}
                    </BaseButton>
                  </BaseButtonsForm.Item>
                </BaseCol>
                <BaseCol xs={24} xl={10}>
                  <BaseButtonsForm.Item noStyle>
                    <BaseButton block type="default" htmlType="reset">
                      Reset
                    </BaseButton>
                  </BaseButtonsForm.Item>
                </BaseCol>
              </BaseRow>
            </BaseCol>
          </BaseForm>
          {/* End Form to change password */}
        </BaseCol>
        <BaseCol xs={24} xl={12}>
          {/* TODO: two factor authentication component */}
          <Row>{/* TODO: */}</Row>
        </BaseCol>
      </BaseRow>
    </BaseCard>
  );
};

export default Security;
