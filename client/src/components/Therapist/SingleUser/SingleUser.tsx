import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { AuthContext } from "../../../context/authContext";
import APIservice from "../../../services/axios";
import NetworkGraph from "./NetworkGraph";
import BarGraph from "./BarGraph";
import Words from "./Words";
import {
  NodeType,
  EdgeType,
  WordAnalysisType,
  SentimentType,
} from "../../../types";

const SingleUser = () => {
  const [edges, setEdges] = useState<EdgeType[]>([]);
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [words, setWords] = useState<WordAnalysisType[]>([]);
  const [sentiments, setSentiments] = useState<SentimentType[]>([]);
  const authContext = useContext(AuthContext);
  const id = useParams();

  useEffect(() => {
    let token = localStorage.getItem("authToken");
    APIservice.post("/therapist/report", id, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        !res.data.analysis.success && toast.error("No analysis to show!");
        setEdges(res.data.analysis.network.edges);
        setNodes(res.data.analysis.network.nodes);
        setWords(res.data.analysis.wordAnalysis);
        setSentiments(res.data.analysis.sentiment);
        // console.log(res.data);
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

  return (
    <div className="lg:absolute top-0 right-0 w-full lg:w-1/2 lg:min-h-screen flex flex-wrap">
      <div className="w-full h-1/2vh border-solid">
        <ToastContainer />
        <h1 className="text-center text-base lg:text-2xl mt-10 lg:mt-0">
          Network Visualisation of Word Correlation
        </h1>
        <NetworkGraph edges={edges} nodes={nodes} />
      </div>
      <div className="w-1/2 h-1/2vh border-solid">
        <BarGraph data={sentiments} />
      </div>
      <div className="w-1/2 h-1/2vh border-solid">
        <Words words={words} />
      </div>
    </div>
  );
};

export default SingleUser;
