import React from "react";
import {
  BarChart,
  Bar,
  Brush,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

import { SentimentProps } from "../../../types";

// const scoreText: string[] = [
//   "Strongly Negative",
//   "Negative",
//   "Weakly Negative",
//   "Nuetral",
//   "Weakly Positive",
//   "Positive",
//   "Strongly Positive",
// ];

// const feelingHandler = (score: number) => {
//   return scoreText[score + 3];
// };

const w: number = window.innerWidth;

const Example = (props: SentimentProps) => {
  const data = props.data;

  return (
    <div className="flex w-full h-full">
      <div className="m-auto text-black">
        <BarChart
          width={w < 991 ? (w * 9) / 10 : (w * 9) / 40}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" axisLine={false} />
          <YAxis label="At" />
          <Tooltip />
          <Legend />
          <Brush dataKey="name" height={30} stroke="#21533C" />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="score" fill="#276749" />
        </BarChart>
      </div>
    </div>
  );
};

export default Example;
