import React from "react";
import { Link } from "react-router-dom";

import { UserProps } from "../../types";

const User = (props: UserProps) => {
  const dp = [
    "https://randomuser.me/api/portraits/lego/1.jpg",
    "https://randomuser.me/api/portraits/lego/2.jpg",
    "https://randomuser.me/api/portraits/lego/3.jpg",
    "https://randomuser.me/api/portraits/lego/4.jpg",
    "https://randomuser.me/api/portraits/lego/5.jpg",
    "https://randomuser.me/api/portraits/lego/6.jpg",
    "https://randomuser.me/api/portraits/lego/7.jpg",
    "https://randomuser.me/api/portraits/lego/8.jpg",
    "https://randomuser.me/api/portraits/lego/9.jpg",
  ];

  return (
    <div className="w-11/12 lg:w-1/2 flex flex-wrap rounded-tl-lg p-5 m-auto">
      <Link
        to={`/therapist/${props.id}`}
        className="w-full h-full flex flex-wrap bg-green-800 shadow-note text-white cursor-pointer rounded-tl-lg"
      >
        <figure className="w-1/3 rounded-tl-lg">
          <img
            src={dp[Math.floor(Math.random() * Math.floor(dp.length))]}
            alt={props.name}
            className="rounded-tl-lg"
            width="100%"
          />
        </figure>
        <div className="m-auto text-center">
          <h3 className="text-2xl font-semibold">{props.name}</h3>
          <p className="text-sm">{props.email}</p>
        </div>
      </Link>
    </div>
  );
};

export default User;
