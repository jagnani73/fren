import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Hero = () => {
  const initialValues = {
    name: "",
    age: "",
    email: "",
    gender: "",
    code: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().trim().required("No Name Provided."),
    email: Yup.string()
      .trim()
      .required("No Email provided.")
      .email("Should be a valid email."),
    age: Yup.number().required("No age provided").typeError("Must be a number"),
    gender: Yup.string()
      .required("No Gender provided")
      .trim()
      .min(1, "Please give gender character")
      .max(1, "Please give a single character")
      .matches(/M | F | D | NB/, "gender must be M, F, D or NB"),
    code: Yup.string().trim().required("No Code Provided"),
    password: Yup.string()
      .required("No password provided")
      .min(8, "minimum 8 characters")
      .matches(
        /[a-z]/ && /[A-Z]/ && /[0-9]/ && /[!@#$%^*]/,
        "1 Uppercase, 1 Lowercase, 1 Number & 1 Symbol."
      ),
  });

  const submitValues = (values: any) => {
    console.log(values);
  };

  return (
    <div className="w-1/2 h-screen bg-green-600 flex flex-wrap">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitValues(values)}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className="m-auto w-2/5 flex flex-wrap">
            <div className="flex flex-wrap w-full">
              <label htmlFor="name" className="mb-3 text-base">
                Name
              </label>
              <Field
                type="text"
                name="name"
                placeholder="Jim Halpert"
                className={
                  touched.name && errors.name
                    ? "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 bg-red-300 border-solid border-2 border-red-700 text-lg"
                    : "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 text-lg"
                }
              />
              {errors.name && touched.name && (
                <div className="text-red-700 font-bold uppercase text-sm">
                  {errors.name}
                </div>
              )}
            </div>

            <div className="flex flex-wrap w-full">
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
                    : "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 text-lg"
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
                    : "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 text-lg"
                }
              />
              {errors.password && touched.password && (
                <div className="text-red-700 font-bold uppercase text-sm">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="w-5/12 flex flex-wrap mr-auto">
              <label htmlFor="age" className="mb-3 text-base">
                Age
              </label>
              <Field
                type="text"
                name="age"
                placeholder={32}
                className={
                  touched.age && errors.age
                    ? "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 bg-red-300 border-solid border-2 border-red-700 text-lg"
                    : "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 text-lg"
                }
              />
              {errors.age && touched.age && (
                <div className="text-red-700 font-bold uppercase text-sm">
                  {errors.age}
                </div>
              )}
            </div>

            <div className="flex flex-wrap w-5/12 ml-auto">
              <label htmlFor="gender" className="mb-3 text-base">
                Gender
              </label>
              <Field
                type="text"
                name="gender"
                placeholder="M"
                className={
                  touched.gender && errors.gender
                    ? "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 bg-red-300 border-solid border-2 border-red-700 text-lg"
                    : "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 text-lg"
                }
              />
              {errors.gender && touched.gender && (
                <div className="text-red-700 font-bold uppercase text-sm">
                  {errors.gender}
                </div>
              )}
            </div>

            <div className="flex flex-wrap w-full">
              <label htmlFor="code" className="mb-3 text-base">
                Therapist Code
              </label>
              <Field
                type="text"
                name="code"
                placeholder="9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
                className={
                  touched.code && errors.code
                    ? "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 bg-red-300 border-solid border-2 border-red-700 text-lg"
                    : "w-full mb-4 rounded-lg focus:outline-none py-3 px-4 text-lg"
                }
              />
              {errors.gender && touched.gender && (
                <div className="text-red-700 font-bold uppercase text-sm">
                  {errors.gender}
                </div>
              )}
            </div>

            <div className="w-full mt-4">
              <button
                type="submit"
                disabled={
                  errors.name ||
                  errors.email ||
                  errors.age ||
                  errors.password ||
                  errors.gender ||
                  errors.code
                    ? true
                    : false
                }
                className="bg-green-700 w-full text-xl rounded-lg py-3 text-white border-solid border-2 border-white"
              >
                Sign Up !
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Hero;
