import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { User } from "../../types";

const Hero = () => {
  const [user, setUser] = useState<User>("client");

  const initialValues = {
    name: "",
    age: "",
    email: "",
    gender: "M",
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
    gender: Yup.string().required("No Gender provided"),
    code: Yup.string().trim().required("No Code Provided"),
    password: Yup.string()
      .required("No password provided")
      .min(8, "minimum 8 characters")
      .matches(
        /[a-z]/ && /[A-Z]/ && /[0-9]/ && /[!@#$%^*]/,
        "1 Uppercase | 1 Lowercase | 1 Number | 1 Symbol."
      ),
  });

  //TODO: values type

  const submitValues = (values: any) => {
    const data = { ...values, category: user };
    console.log(data);
  };

  return (
    <div className="w-1/2 h-screen bg-green-900 flex flex-wrap">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => submitValues(values)}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form className="m-auto w-2/5 flex flex-wrap">
            <h4 className="text-white text-2xl mb-5">
              Not a <span className="font-semibold">{user}</span>? Click{" "}
              <span
                className="cursor-pointer underline"
                onClick={() =>
                  setUser(user === "client" ? "therapist" : "client")
                }
              >
                here
              </span>
              !
            </h4>
            <div className="flex flex-wrap w-full">
              <label htmlFor="name" className="mb-3 text-base text-white">
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
                <div className="text-red-600 font-bold uppercase text-sm">
                  {errors.name}
                </div>
              )}
            </div>

            <div className="flex flex-wrap w-full">
              <label htmlFor="email" className="mb-3 text-base text-white">
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
                <div className="text-red-600 font-bold uppercase text-sm">
                  {errors.email}
                </div>
              )}
            </div>

            <div className="flex flex-wrap w-full">
              <label htmlFor="password" className="mb-3 text-base text-white">
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
                <div className="text-red-600 font-bold uppercase text-sm">
                  {errors.password}
                </div>
              )}
            </div>

            <div className="w-5/12 flex flex-wrap mr-auto">
              <label htmlFor="age" className="mb-3 text-base text-white">
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
                <div className="text-red-600 font-bold uppercase text-sm">
                  {errors.age}
                </div>
              )}
            </div>

            <div className="flex flex-wrap w-5/12 ml-auto">
              <label htmlFor="gender" className="mb-3 text-base text-white">
                Gender
              </label>
              <Field
                as="select"
                name="gender"
                className="w-full mb-4 rounded-lg focus:outline-none py-3 px-4 text-lg"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="NB">Non-binary</option>
                <option value="D">Prefer not to say</option>
              </Field>
              {errors.gender && touched.gender && (
                <div className="text-red-600 font-bold uppercase text-sm">
                  {errors.gender}
                </div>
              )}
            </div>

            <div className="flex flex-wrap w-full">
              <label htmlFor="code" className="mb-3 text-base text-white">
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
              {errors.code && touched.code && (
                <div className="text-red-600 font-bold uppercase text-sm">
                  {errors.code}
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
