import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../components/AuthContext/AuthContext";

// Validation schema
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Fetch existing users from JSON Server
      const response = await axios.get("http://localhost:5000/users");
      const users = response.data;

      // Check if the user exists
      const user = users.find(
        (user) =>
          user.username === values.username &&
          user.password === values.password,
      );

      if (user) {
        // Handle existing user login logic
        Swal.fire({
          title: 'Login Successful',
          text: 'User exists. Logging in...',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false,
        });
        auth.login(user);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        // Prompt to create a new account
        Swal.fire({
          title: 'User not found',
          text: 'User does not exist. Please create an account.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Create Account',
          confirmButtonColor: 'red',
          cancelButtonText: 'Cancel',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/create-account");
          }
        });
      }

      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      Swal.fire({
        title: 'Error',
        text: 'Failed to process request. Please try again.',
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
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Login Form</h2>
              <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="username">Username:</label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="password">Password:</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        className="form-control text-dark"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary mt-4 w-100"
                      disabled={isSubmitting}
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

export default Login;
