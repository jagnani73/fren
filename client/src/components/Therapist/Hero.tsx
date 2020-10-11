import React from "react";

import User from "./User";

const Hero = () => {
  const users = [
    {
      _id: Math.random(),
      name: "This is a namme",
      email: "1yasshevofgmis.v0m",
    },
    {
      _id: Math.random(),
      name: "This is a namme",
      email: "2yasshevofgmis.v0m",
    },
    {
      _id: Math.random(),
      name: "This is a namme",
      email: "3yasshevofgmis.v0m",
    },
    {
      _id: Math.random(),
      name: "This is a namme",
      email: "4yasshevofgmis.v0m",
    },
    {
      _id: Math.random(),
      name: "This is a namme",
      email: "5yasshevofgmis.v0m",
    },
    {
      _id: Math.random(),
      name: "This is a namme",
      email: "6yasshevofgmis.v0m",
    },
    {
      _id: Math.random(),
      name: "This is a namme",
      email: "7yasshevofgmis.v0m",
    },
  ];

  return (
    <div className="w-full lg:w-1/2 lg:absolute top-0 left-0 bg-green-900 h-full flex flex-wrap">
      <div className="flex flex-wrap h-full m-auto">
        {users.map((user) => (
          <User
            key={user._id}
            name={user.name}
            email={user.email}
            id={user._id.toString()}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
