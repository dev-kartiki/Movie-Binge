import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

// Validation schema for the form fields
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const CreateAccount = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // POST request to create a new user
      await axios.post("http://localhost:5000/users", values);
      Swal.fire({
        title: 'Success',
        text: 'Account created successfully.',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
      });
      setSubmitting(false);
      setTimeout(() => {
        navigate("/login"); // Redirect to login page
      }, 3000);
    } catch (err) {
      setSubmitting(false);
      Swal.fire({
        title: 'Error',
        text: 'Failed to create account. Please try again.',
        icon: 'error',
        timer: 3000,
        showConfirmButton: false,
      });
      console.error(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row w-100">
        <div className="col-md-8 col-lg-6 col-xl-4 mx-auto">
          <div className="card text-dark shadow-lg">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Create Account</h2>
              <Formik
                initialValues={{ username: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {/* Username field */}
                    <div className="form-group">
                      <label htmlFor="username">Username:</label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className="form-control text-dark"
                        aria-required="true"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    {/* Email field */}
                    <div className="form-group mt-3">
                      <label htmlFor="email">Email:</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="form-control text-dark"
                        aria-required="true"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    {/* Password field */}
                    <div className="form-group mt-3">
                      <label htmlFor="password">Password:</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="form-control text-dark"
                        aria-required="true"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    {/* Submit button */}
                    <button
                      type="submit"
                      className="btn btn-primary mt-4 w-100"
                      disabled={isSubmitting}
                      aria-live="polite" // Announce changes to screen readers
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
