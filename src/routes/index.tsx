import { Fragment } from 'react';
import CommonLayout from 'layouts/CommonLayout/CommonLayout';
import AuthLayout from 'layouts/AuthLayout/AuthLayout';
import HomePage from 'pages/Home';
import NotFoundPage from 'pages/NotFoundPage';
import UploadPage from 'pages/UploadPage';
import ExportPage from 'pages/ExportPage';
import Login from 'pages/Auth';
import ProfilePage from 'pages/Profile';
import LoginSuccessPage from 'pages/LoginSuccess';
import { ROUTE_NAMES } from 'constants/path';

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
    path: ROUTE_NAMES.UPLOAD_PAGE,
    component: UploadPage,
    layout: CommonLayout,
  },
  {
    path: ROUTE_NAMES.EXPORT_PAGE,
    component: ExportPage,
    layout: CommonLayout,
  },
  {
    path: ROUTE_NAMES.PROFILE_PAGE,
    component: ProfilePage,
    layout: CommonLayout,
  },
  {
    path: ROUTE_NAMES.LOGIN_SUCCESS_PAGE,
    component: LoginSuccessPage,
    layout: AuthLayout,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];

export default routes;
