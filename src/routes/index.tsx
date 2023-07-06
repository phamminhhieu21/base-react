import CommonLayout from 'layouts/CommonLayout/CommonLayout';
import AuthLayout from 'layouts/AuthLayout/AuthLayout';
import HomePage from 'pages/Home';
import NotFoundPage from 'pages/NotFoundPage';
import UploadPage from 'pages/UploadPage';
import ExportPage from 'pages/ExportPage';
import Login from 'pages/Auth';
import ProfileLayout from 'pages/Profile';
import LoginSuccessPage from 'pages/Auth/LoginSuccess';
import SignUpPage from 'pages/Auth/SignUp';
import RegisterStatus from 'pages/Auth/RegisterMailStatus';
import { ROUTE_NAMES } from 'routes/pathName';
import ForgotPassWord from 'pages/Auth/ForgotPassword';
import ResetPassword from 'pages/Auth/ResetPassword';
import Information from 'pages/Profile/components/nav/Information';
import Security from 'pages/Profile/components/nav/Security';
const routes: Types.IRoute[] = [
  {
    path: ROUTE_NAMES.HOME_PAGE,
    component: HomePage,
    layout: CommonLayout,
    isProtected: true,
  },
  {
    path: ROUTE_NAMES.LOGIN_PAGE,
    component: Login,
    layout: AuthLayout,
  },
  {
    path: ROUTE_NAMES.REGISTER_PAGE,
    component: SignUpPage,
    layout: AuthLayout,
  },
  {
    path: ROUTE_NAMES.UPLOAD_PAGE,
    component: UploadPage,
    layout: CommonLayout,
    isProtected: true,
  },
  {
    path: ROUTE_NAMES.EXPORT_PAGE,
    component: ExportPage,
    layout: CommonLayout,
    isProtected: true,
  },
  {
    path: ROUTE_NAMES.PROFILE_PAGE,
    component: ProfileLayout,
    children: [
      {
        path: ROUTE_NAMES.PERSONAL_INFO_PAGE,
        component: Information,
        // layout: ProfileLayout,
      },
      {
        path: ROUTE_NAMES.SECURITY_PAGE,
        component: Security,
        // layout: ProfileLayout,
      },
    ],
    layout: CommonLayout,
    isProtected: true,
  },
  {
    path: ROUTE_NAMES.LOGIN_SUCCESS_PAGE,
    component: LoginSuccessPage,
    layout: AuthLayout,
  },
  {
    path: ROUTE_NAMES.REGISTER_VERIFY_STATUS_PAGE,
    component: RegisterStatus,
    layout: AuthLayout,
  },
  {
    path: ROUTE_NAMES.FORGOT_PASSWORD_PAGE,
    component: ForgotPassWord,
    layout: AuthLayout,
  },
  {
    path: ROUTE_NAMES.RESET_PASSWORD_PAGE,
    component: ResetPassword,
    layout: AuthLayout,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

export default routes;
