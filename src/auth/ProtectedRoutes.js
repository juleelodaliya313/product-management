import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggin } from "../auth";
import Layout from "../Components/Layout";

const ProtectedRoutes = () => {
  const loggedIn = isLoggin();
  return loggedIn ? <Layout /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
