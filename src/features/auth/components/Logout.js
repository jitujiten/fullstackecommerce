import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedinUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedinUser);
  useEffect(() => {
    dispatch(signOutAsync(user.id));
  }, []);
  return <>{!user && <Navigate to="/" replace={true} />}</>;
};

export default Logout;
