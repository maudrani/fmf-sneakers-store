import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component, ...options }) => {
  const isAuth = localStorage.getItem("isAuth");
  let locked = !isAuth;

  return !locked ? (
    <Route {...options} component={component} data-scroll-section/>
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
