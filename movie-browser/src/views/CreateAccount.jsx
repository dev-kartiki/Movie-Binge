import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Validation schema
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
  const navigate = useNavigate();

  const handleSubmit = async (
    values,
    { setSubmitting, setErrors, setStatus },
  ) => {
    try {
      // POST request to store new user information
      await axios.post("http://localhost:5000/users", values);
      setStatus({ success: "Account created successfully." });
      setSubmitting(false);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setSubmitting(false);
      setStatus({ error: "Failed to create account. Please try again." });
      console.error(err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 ">
      <div className="row w-100">
        <div className="col-md-8 col-lg-6 col-xl-4 mx-auto">
          <div className="card text-dark  shadow-lg">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Create Account</h2>
              <Formik
                initialValues={{ username: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, status }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="username">Username:</label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className="form-control  text-dark "
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="email">Email:</label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="form-control  text-dark "
                      />
                      <ErrorMessage
                        name="email"
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
                        className="form-control  text-dark "
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
                    {status && status.success && (
                      <div className="alert alert-info mt-3" role="alert">
                        {status.success}
                      </div>
                    )}
                    {status && status.error && (
                      <div className="alert alert-danger mt-3" role="alert">
                        {status.error}
                      </div>
                    )}
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
