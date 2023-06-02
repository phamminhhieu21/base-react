import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from 'routes/ProtectedRoute';
import { ConfigProvider } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { useLanguage } from './hooks/useLanguage';
import viVN from 'antd/lib/locale/vi_VN';
import enUS from 'antd/lib/locale/en_US';
import { usePWA } from 'hooks/usePWA';
import routes from 'routes';

function App() {
  const { language } = useLanguage();
  usePWA();
  return (
    <HelmetProvider>
      <ConfigProvider locale={language === 'en' ? enUS : viVN}>
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
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
