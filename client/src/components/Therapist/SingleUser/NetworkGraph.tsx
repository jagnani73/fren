import React from "react";
import { Network, Node, Edge } from "react-vis-network";

const NetworkGraph = () => {
  const nodes = [
    { id: 1, value: 2, label: "Algie" },
    { id: 2, value: 31, label: "Alston" },
    { id: 3, value: 12, label: "Barney" },
    { id: 4, value: 16, label: "Coley" },
    { id: 5, value: 17, label: "Grant" },
    { id: 6, value: 15, label: "Langdon" },
    { id: 7, value: 6, label: "Lee" },
    { id: 8, value: 5, label: "Merlin" },
    { id: 9, value: 30, label: "Mick" },
    { id: 10, value: 18, label: "Tod" },
  ];

  const edges = [
    { from: 2, to: 8, value: 3 },
    { from: 2, to: 9, value: 5 },
    { from: 2, to: 10, value: 1 },
    { from: 4, to: 6, value: 2 },
    { from: 5, to: 7, value: 2 },
    { from: 4, to: 5, value: 1 },
    { from: 9, to: 10, value: 2 },
    { from: 2, to: 3, value: 5 },
    { from: 3, to: 9, value: 4 },
    { from: 5, to: 3, value: 1 },
    { from: 2, to: 7, value: 4 },
  ];

  var options = {
    nodes: {
      shape: "dot",
      scaling: {
        min: 1,
        max: 5,
      },
    },
  };
  return (
    <Network options={options}>
      {nodes.map((node) => (
        <Node id={node.id} label={node.label} />
      ))}
      {edges.map((node) => (
        <Edge from={node.from} to={node.to} value={node.value} />
      ))}
    </Network>
  );
};

export default NetworkGraph;
