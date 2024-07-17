// AppRouter.tsx

import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import RegisterForm from "./components/Registration/RegistrationForm";
import LoginForm from "./components/Login/Login";
import Home from "./components/Home/Home";

import UserInfo from "./components/UserInformation/UserInfo";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Layout from "./components/Layout/Layout";
import Employee from "./components/Home/Employee";
import ProtectedRoute from "./Services/ProtectedRoute";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          element={
            <ProtectedRoute onInvalid={() => <Navigate to="/signin" replace />}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/home"
            element={
              <ProtectedRoute
                onInvalid={() => <Navigate to="/signin" replace />}
              >
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <ProtectedRoute
                onInvalid={() => <Navigate to="/signin" replace />}
              >
                <Employee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute
                onInvalid={() => <Navigate to="/signin" replace />}
              >
                <UserInfo />
              </ProtectedRoute>
            }
          />
          {/* Add more routes as needed */}
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
