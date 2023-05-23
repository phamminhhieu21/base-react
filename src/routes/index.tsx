import { Fragment } from 'react'
import CommonLayout from 'layouts/CommonLayout/CommonLayout'
import AuthLayout from 'layouts/AuthLayout/AuthLayout'
import HomePage from 'pages/Home'
import NotFoundPage from 'pages/NotFoundPage'
import Login from 'pages/Auth'
export const ROUTE_NAMES = {
  HOME_PAGE: '/',
  LOGIN_PAGE: '/login'
}

const routes: Types.IRoute[] = [
  {
    path: ROUTE_NAMES.HOME_PAGE,
    component: HomePage,
    layout: CommonLayout,
    isProtected: true
  },
  {
    path: ROUTE_NAMES.LOGIN_PAGE,
    component: Login,
    layout: AuthLayout
  },

  {
    path: '*',
    component: NotFoundPage
  }
]

export default routes
