import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Favourites from "../pages/Favourites";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favourites"
        element={
          <ProtectedRoute>
            <Favourites />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}