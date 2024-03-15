import React from "react";
import { Route } from "react-router-dom";

const PrivateRoutes = ({ children, ...rest }) => {
  return (
    <div>
      <Route {...rest}>{children}</Route>
    </div>
  );
};

export default PrivateRoutes;
