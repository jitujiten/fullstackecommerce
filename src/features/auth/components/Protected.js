import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoading, selectLoggedinUser } from "../authSlice";
import { BallTriangle } from "react-loader-spinner";

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedinUser);
  const loading = useSelector(selectLoading);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#600AFF"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/"></Navigate>;
  }

  return children;
};

export default Protected;
