import React from "react";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const isAuth = localStorage.getItem("authenticated") === "true";
  return isAuth ? children : <Navigate to="/login" replace />;
}
