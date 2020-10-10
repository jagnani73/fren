import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-wrap w-full h-screen">
      <div className="flex flex-wrap w-1/2 h-full bg-green-900">
        <Link
          to="/signup"
          className="m-auto text-3xl border-solid border-2 border-white rounded-lg px-8 py-2 text-white"
        >
          Sign Up
        </Link>
      </div>
      <div className="flex flex-wrap w-1/2 h-full bg-white">
        <Link
          to="/login"
          className="m-auto text-3xl border-solid border-2 border-black rounded-lg px-8 py-2"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Hero;
