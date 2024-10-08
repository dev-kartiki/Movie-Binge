import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NotFound = () => {
  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-dark text-light text-center"
      role="alert" // ARIA role to indicate that this is an alert message
    >
      <div className="p-4">
        <h1 className="display-1 fw-bold">404</h1> {/* Main heading for error code */}
        <h2 className="display-4">Page Not Found</h2> {/* Secondary heading for error description */}
        <p className="lead mt-3">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link 
          to="/" 
          className="btn btn-primary btn-lg mt-4" 
          aria-label="Back to Home" // ARIA label for screen readers
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
