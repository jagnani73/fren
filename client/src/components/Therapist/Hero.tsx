import React, { useState, useEffect, useContext, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { FiLogOut } from "react-icons/fi";

import { UserType } from "../../types";
import { AuthContext } from "../../context/authContext";
import APIservice from "../../services/axios";
import User from "./User";

const Hero = () => {
  const authContext = useContext(AuthContext);
  const [users, setUsers] = useState<UserType[]>();
  const [therapistCode, setTherapistCode] = useState<string | undefined>(
    undefined
  );
  const therapistCodeElemRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let token = localStorage.getItem("authToken");
    setTherapistCode(localStorage.getItem("therapistCode")!);
    APIservice.get("/therapist/clients", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUsers(res.data.clients);
        res.data.clients.length > 0
          ? toast.success("Your Clients!")
          : toast.info("You have no clients");
      })
      .catch((err) => {
        switch (err.response.status) {
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
    // eslint-disable-next-line
  }, [APIservice, authContext]);

  const copyHandler = () => {
    document.execCommand("copy", true, therapistCodeElemRef.current?.innerText);
  };

  return (
    <div className="w-full lg:w-1/2 lg:absolute top-0 left-0 bg-green-900 h-full flex flex-wrap">
      <div className="flex flex-wrap w-full h-full m-auto">
        <ToastContainer />
        <div className="flex flex-wrap w-full text-white">
          {therapistCode && (
            <h3
              className="text-center text-white mr-auto text-3xl cursor-pointer"
              ref={therapistCodeElemRef}
              onClick={copyHandler}
            >
              {therapistCode}
            </h3>
          )}
          <FiLogOut
            className="text-4xl ml-auto cursor-pointer hover:text-red-600"
            onClick={authContext.logoutHandler}
          />
        </div>
        {users &&
          users.length > 0 &&
          users.map((user) => (
            <User
              key={user._id}
              name={user.name}
              email={user.email}
              id={user._id}
            />
          ))}
      </div>
    </div>
  );
};

export default Hero;
