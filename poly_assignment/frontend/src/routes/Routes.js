import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
// import AdminLogin from '../components/Authentication/AdminLogin';
// import AdminDashboard from '../components/Dashboards/AdminDashboard';
import { AuthProvider } from '../contexts/AuthContext';
import { AppProvider } from '../contexts/AppContext';
import PrivateRoute from './PrivateRoute';
import Cart from '../components/Cart/Cart';
import Thankyou from '../components/Thankyou/Thankyou';
import Login from '../components/Authentication/Login';
import Register from '../components/Authentication/Register';
const AdminDashboard = lazy(() =>
  import('../components/Dashboards/AdminDashboard')
);
const AdminLogin = lazy(() =>
  import('../components/Authentication/AdminLogin')
);
const AppRoutes = ({ toast }) => {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <AppProvider>
              <Routes>
                <Route
                  path='/admin-dashboard'
                  exact
                  element={
                    <PrivateRoute>
                      <AdminDashboard toast={toast} />{' '}
                    </PrivateRoute>
                  }
                />

                <Route path='/admin' exact element={<AdminLogin />} />
                <Route path='/login' exact element={<Login />} />
                <Route path='/register' exact element={<Register />} />
                <Route path='/' exact element={<Home />} />
                <Route path='/cart' exact element={<Cart />} />
                <Route path='/thank-you' exact element={<Thankyou />} />
              </Routes>
            </AppProvider>
          </AuthProvider>
        </Suspense>
      </Router>
    </>
  );
};

export default AppRoutes;
