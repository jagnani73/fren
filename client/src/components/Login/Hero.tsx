import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

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

  const submitValues = (values: any) => {
    console.log(values);
  };

  return (
    <div className="w-full h-screen flex flex-wrap">
      <div className="w-1/2 bg-green-600 h-full" />
      <div className="w-1/2 h-full ml-auto flex flex-wrap">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => submitValues(values)}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form className="m-auto w-1/3">
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
                  type="text"
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
                  className="bg-green-500 w-full text-xl rounded-lg py-3 text-white"
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
