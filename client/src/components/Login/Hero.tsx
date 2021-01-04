import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";

import { PostLogin } from "../../types";
import APIservice from "../../services/axios";

const Hero = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .required("No Email provided.")
      .email("Should be a valid email."),
    password: Yup.string().required("No password provided"),
  });

  const submitValues = (values: PostLogin) => {
    APIservice.post("/auth/login", values)
      .then((res) => {
        localStorage.setItem("authToken", res.data.authToken);
        localStorage.setItem("category", res.data.category);
        localStorage.setItem("therapistCode", res.data.therapistCode);
        toast.success("Hooray! Logged in!");
        alert("Hooray! Logged in!");
        window.location.reload();
      })
      .catch((err) => {
        switch (err.response.status) {
          case 400:
            toast.error(err.response.data.error);
            break;
          case 401:
            toast.error(err.response.data.error);
            break;
          case 500:
            toast.error("Internal Server Error");
            break;
          default:
            toast.error("Oops! Something went wrong!");
            break;
        }
      });
  };

  return (
    <div className="w-full h-screen flex flex-wrap">
      <ToastContainer />
      <div className="hidden lg:block w-1/2 bg-blue-900 h-full" />
      <div className="w-full lg:w-1/2 h-full ml-auto flex flex-wrap">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => submitValues(values)}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className="m-auto w-11/12 lg:w-2/5">
              <div className="flex flex-wrap mb-4">
                <label htmlFor="email" className="mb-3 text-base">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="halpertjim@dundermifflin.org"
                  className={
                    touched.email && errors.email
                      ? "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 bg-red-300 border-solid border-2 border-red-700 text-lg"
                      : "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 text-lg border-solid border-2 border-black"
                  }
                />
                {errors.email && touched.email && (
                  <div className="text-red-700 font-bold uppercase text-sm">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap w-full">
                <label htmlFor="password" className="mb-3 text-base">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="ThisShouldBe@Hidden"
                  className={
                    touched.password && errors.password
                      ? "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 bg-red-300 border-solid border-2 border-red-700 text-lg"
                      : "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 text-lg border-solid border-2 border-black"
                  }
                />
                {errors.password && touched.password && (
                  <div className="text-red-700 font-bold uppercase text-sm">
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  disabled={errors.email || errors.password ? true : false}
                  className="bg-green-500 w-full text-xl rounded-lg py-3 text-white mt-10"
                >
                  Login !
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Hero;
