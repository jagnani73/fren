import React from "react";
import { useParams } from "react-router-dom";

import NetworkGraph from "./NetworkGraph";
import BarGraph from "./BarGraph";

const SingleUser = () => {
  // const { id } = useParams();

  return (
    <div className="lg:absolute top-0 right-0 w-full lg:w-1/2 lg:min-h-screen flex flex-wrap">
      <div className="w-full h-1/2vh border-solid">
        <h1 className="text-center text-base lg:text-2xl mt-10 lg:mt-0">
          Network Visualisation of Word Correlation
        </h1>
        <NetworkGraph />
      </div>
      <div className="w-1/2 h-1/2vh border-solid">
        <BarGraph />
      </div>
    </div>
  );
};

export default SingleUser;
