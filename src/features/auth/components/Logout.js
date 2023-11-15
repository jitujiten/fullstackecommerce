import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedinUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedinUser);
  const alert = useAlert();

  useEffect(() => {
    dispatch(signOutAsync(alert));
  }, []);
  return <>{!user && <Navigate to="/" replace={true} />}</>;
};

export default Logout;
