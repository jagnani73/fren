import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { VscNewFile } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";

import { AuthContext } from "../../context/authContext";
import APIservice from "../../services/axios";
import { NoteType } from "../../types";
import Note from "./Note";

const Hero = () => {
  const authContext = useContext(AuthContext);
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    let token = localStorage.getItem("authToken");
    APIservice.get("/client/notes", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setNotes(res.data.notes);
        toast.success("Your Notes!");
      })
      .catch((err) => {
        console.log(err.response);
        switch (err.response.status) {
          case 403:
            authContext.logoutHandler();
            break;
          case 404:
            toast.info("You have no notes!");
            break;
          case 500:
            toast.error("Internal server error");
            break;
          default:
            toast.error("Oops! Something went wrong");
        }
      });
    // eslint-disable-next-line
  }, [APIservice, authContext]);

  const deleteNoteHandler = (id: string) => {
    APIservice.delete(`/client/notes?noteId=${id}`)
      .then((_res) => {
        toast.info("Note deleted!");
      })
      .catch((err) => {
        switch (err.response.status) {
          case 401:
            toast.error(err.response.data.error);
            break;
          case 403:
            authContext.logoutHandler();
            break;
          case 404:
            toast.error(err.response.data.error);
            break;
          case 500:
            toast.error("Internal server error");
            break;
          default:
            toast.error("Oops! Something went wrong");
        }
      });
  };

  const greeting: string[] = [
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

  return (
    <div className=" bg-baseBlack text-white text-center">
      <div className="flex flex-wrap w-full h-auto px-6 pt-10">
        <Link
          to="/client/new-note"
          className="mr-auto text-5xl ml-5 hover:text-gray-700"
        >
          <VscNewFile />
        </Link>
        <FiLogOut
          className="text-5xl mr-5 hover:text-red-700 cursor-pointer"
          onClick={authContext.logoutHandler}
        />
      </div>
      <div className="flex flex-wrap min-h-screen w-full">
        <ToastContainer />
        {notes.length > 0 ? (
          notes.map((note) => (
            <div
              key={note._id}
              className="w-11/12 lg:w-1/4 p-6 m-auto flex flex-wrap text-center"
            >
              <Note
                date={+note.date}
                deleteHandler={() => {
                  deleteNoteHandler(note._id);
                }}
              >
                <div className="flex flex-wrap m-auto h-full">
                  <h3 className="text-xl font-bold mb-auto w-full">
                    {note.title && note.title.length > 50
                      ? `${note.title?.substring(0, 50)}...`
                      : note.title}
                  </h3>
                  <p className="w-full px-2">
                    {window.innerWidth > 556
                      ? note.content.length > 500
                        ? `${note.content.substring(0, 500)}...`
                        : note.content
                      : `${note.content.substring(0, 250)}...`}
                  </p>
                </div>
              </Note>
            </div>
          ))
        ) : (
          <div className="m-auto text-lg lg:text-3xl">
            {greeting[Math.floor(Math.random() * Math.floor(greeting.length))]}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
