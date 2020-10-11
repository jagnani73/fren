import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createBrowserHistory } from "history";
import { VscDiscard } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../context/authContext";

import { NewNoteType } from "../../../types";
import APIservice from "../../../services/axios";
import Backdrop from "../../Misc/Backdrop";

const NewNote = () => {
  const authContext = useContext(AuthContext);
  const greeting: string[] = [
    "How you doin?",
    "What’s kickin’, little chicken?",
    "Howdy, partner! What's up?",
    "hoy, matey! What's happening?",
    "Ghostbusters, whatya want?",
    "What's cookin', good lookin'?",
  ];

  const content: string[] = [
    "How was your day?",
    "Did anything exciting today?",
    "I was missing you!",
    "Hello fren!",
    "Hello from the other side",
    "I hope you've had your coffee already",
    "I was just thinking about you",
    "As promised, I'm right here",
    "It's great to hear from you",
    "I hope you're having a wonderful day",
  ];

  const initialValues = {
    title: "",
    content: "",
  };

  const validationSchema = Yup.object().shape({
    content: Yup.string().required(),
  });

  const exit = () => {
    createBrowserHistory().goBack();
  };

  const submitValues = (values: NewNoteType) => {
    let token = localStorage.getItem("authToken");
    APIservice.post("/client/notes", values, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((_res) => {
        toast.info("Note added!");
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            toast.error(err.response.data.error);
            break;
          case 403:
            authContext.logoutHandler();
            break;
          case 500:
            toast.error("Internal server error");
            break;
          default:
            toast.error("Oops! Something went wrong");
        }
      });
    exit();
  };

  return (
    <>
      <Backdrop goBack={true} />
      <div className="fixed flex flex-wrap top-10 left-0 right-0 bottom-10 z-30 w-3/4 m-auto h-auto bg-baseBlack text-white rounded-lg shadow-note py-20">
        <div className="flex w-11/12 mx-auto">
          <h1 className="mr-auto text-3xl">
            Hello <strong>Fren</strong>!
          </h1>
          <ToastContainer />
          <div className="ml-auto cursor-pointer text-4xl" onClick={exit}>
            <VscDiscard />
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => submitValues(values)}
          validationSchema={validationSchema}
        >
          <Form className="m-auto w-11/12 bg-baseBlack h-auto">
            <div className="flex flex-wrap lg:mb-4">
              <Field
                type="text"
                name="title"
                placeholder={
                  greeting[
                    Math.floor(Math.random() * Math.floor(greeting.length))
                  ]
                }
                className={
                  "w-full mb-2 lg:mb-4 rounded-lg text-black focus:outline-none py-3 px-4 text-sm md:text-base lg:text-lg border-solid border-2 border-black"
                }
              />
            </div>

            <div className="flex flex-wrap w-full">
              <Field
                component="textarea"
                placeholder={
                  content[
                    Math.floor(Math.random() * Math.floor(content.length))
                  ]
                }
                rows="15"
                name="content"
                className={
                  "w-full mb-4 rounded-lg text-black focus:outline-none py-3 px-4 text-sm md:text-base lg:text-lg border-solid border-2 border-black"
                }
              />
            </div>

            <div className="w-full md:w-1/2 lg:w-1/4 ml-auto">
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
