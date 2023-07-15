import React from "react";
import UseAuthcontext from "../Hooks/UseAuthcontext";
import Loading from "../Pages/Loading";
import { Navigate, useLocation } from "react-router-dom";

const VerifyUser = ({ children }) => {
  const location = useLocation();
  const { user, loading } = UseAuthcontext();
  if (loading) {
    return <Loading></Loading>;
  } else if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default VerifyUser;
