import React from "react";
import { useSelector } from "react-redux";
import { selectLoggedinUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { selectUserInfo } from "../../user/userSlice";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedinUser);
  const userInfo=useSelector(selectUserInfo)
  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }

  if (user && userInfo.role !== "admin") {
    return <Navigate to="/login"></Navigate>;
  }

  return children;
};

export default ProtectedAdmin;
