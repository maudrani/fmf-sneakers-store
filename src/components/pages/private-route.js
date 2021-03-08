import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component, ...options }) => {
  const isAuthorized = localStorage.getItem("isAuthorized");
  const locked = !isAuthorized;

  return !locked ? (
    <Route {...options} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
