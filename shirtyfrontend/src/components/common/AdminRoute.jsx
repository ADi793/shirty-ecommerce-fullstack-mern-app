import React from "react";
import { Redirect, Route } from "react-router";
import auth from "../../services/authService";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.getCurrentUser() && auth.getCurrentUser().isAdmin)
          return Component ? <Component {...props} /> : render(props);

        return (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
