import React from "react";
import { Network, Node, Edge } from "react-vis-network";

import { NetworkGraphProps } from "../../../types";

const NetworkGraph = (props: NetworkGraphProps) => {
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
    <div className="h-full">
      <Network options={options}>
        {props.nodes.map((node) => (
          <Node key={node.id} id={node.id} label={node.label} />
        ))}
        {props.edges.map((edge) => (
          <Edge
            key={edge.id}
            id={edge.id}
            from={edge.from}
            to={edge.to}
            value={edge.value}
          />
        ))}
      </Network>
    </div>
  );
};

export default NetworkGraph;
