import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createBrowserHistory } from "history";

import Backdrop from "../../Misc/Backdrop";

const NewNote = () => {
  const greeting: string[] = [
    "Culpa do non ea id id.",
    "Consectetur in in non sit laborum sint excepteur nulla exercitation.",
    "Non Lorem occaecat eu non ex anim qui Lorem.",
    "Esse non sint sit voluptate fugiat cupidatat aliqua nisi nisi non excepteur.",
  ];

  const initialValues = {
    title: "",
    content: "",
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string().required(),
  });

  const submitValues = (values: any) => {
    console.log(values);
  };

  const exit = () => {
    createBrowserHistory().goBack();
  };

  return (
    <>
      <Backdrop goBack={true} />
      <div className="fixed flex flex-wrap top-10 left-0 right-0 bottom-10 z-30 w-3/4 m-auto h-auto text-white rounded-lg shadow-note py-20">
        <div className="flex w-11/12 mx-auto">
          <h1 className="mr-auto text-3xl">Hi</h1>
          <div className="ml-auto cursor-pointer" onClick={exit}>
            cancel
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => submitValues(values)}
          validationSchema={validationSchema}
        >
          <Form className="m-auto w-11/12 bg-baseBlack h-auto">
            <div className="flex flex-wrap mb-4">
              <Field
                type="text"
                name="title"
                placeholder="Occaecat pariatur duis labore elit veniam eu sint dolore laborum aute enim amet."
                className={
                  "w-full mb-4 rounded-lg text-black focus:outline-none py-3 px-4 text-lg border-solid border-2 border-black"
                }
              />
            </div>

            <div className="flex flex-wrap w-full">
              <Field
                component="textarea"
                rows="15"
                name="content"
                placeholder={
                  greeting[
                    Math.floor(Math.random() * Math.floor(greeting.length))
                  ]
                }
                className={
                  "w-full mb-4 rounded-lg text-black focus:outline-none py-3 px-4 text-lg border-solid border-2 border-black"
                }
              />
            </div>

            <div className="w-1/4 ml-auto">
              <button
                type="submit"
                className="bg-green-500 w-full text-xl rounded-lg py-3 text-white focus:outline-none"
              >
                Save
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default NewNote;
