import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from 'routes/ProtectedRoute';
import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import viVN from 'antd/lib/locale/vi_VN';
import enUS from 'antd/lib/locale/en_US';
import routes from 'routes';
// import { useLanguage } from './hooks/useLanguage';

function App() {
  const { i18n } = useTranslation();
  return (
    <HelmetProvider>
      <ConfigProvider locale={i18n.language == 'en' ? enUS : viVN}>
        <BrowserRouter>
          <Routes>
            {routes.map((route, index) => {
              const Protected = route.isProtected ? ProtectedRoute : Fragment;
              const Layout = route.layout ?? Fragment;
              const Component = route.component;

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Protected>
                      <Layout>
                        <Component />
                      </Layout>
                    </Protected>
                  }
                >
                  {route.children?.map((child, index) => {
                    const Protected = child.isProtected ? ProtectedRoute : Fragment;
                    const Layout = child.layout ?? Fragment;
                    const Component = child.component;
                    return (
                      <Route
                        key={index}
                        path={child.path}
                        element={
                          <Protected>
                            <Layout>
                              <Component />
                            </Layout>
                          </Protected>
                        }
                      />
                    )
                  })}
                </Route>
              );
            })}
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
