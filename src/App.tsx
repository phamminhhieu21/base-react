import { Fragment } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from 'routes/ProtectedRoute'
import routes from 'routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, index) => {
          const Protected = route.isProtected ? ProtectedRoute : Fragment
          const Layout = route.layout ?? Fragment
          const Component = route.component

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
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
