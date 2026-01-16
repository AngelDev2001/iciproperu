import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from '../components/layout';
import { PrivateRoute } from './PrivateRoute';
import * as A from '../pages';

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<A.LoginIntegration />} />
      <Route path="/register" element={<A.RegisterIntegration />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route
          path="home"
          element={
            <AdminLayout>
              <A.HomeIntegration />
            </AdminLayout>
          }
        />
        <Route
          path="users"
          element={
            <AdminLayout>
              <A.UsersIntegration />
            </AdminLayout>
          }
        />
        <Route
          path="users/:userId"
          element={
            <AdminLayout>
              <A.UserIntegration />
            </AdminLayout>
          }
        />
      </Route>
    </Routes>
  );
}
