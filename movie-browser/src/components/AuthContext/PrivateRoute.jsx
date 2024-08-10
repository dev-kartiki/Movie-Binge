import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  // Checks authentication and authorisation and makes pages accessible accordingly
  if (JSON.parse(isAuthenticated)) {
    return <Element {...rest} />;
  } else {
    return (
      <>
        <div role="alert" aria-live="assertive" className="unauthorised">
          You are not authorized to view this page. Redirecting to login.
        </div>
        <Navigate to="/login" />
      </>
    );
  }
};

export default PrivateRoute;
