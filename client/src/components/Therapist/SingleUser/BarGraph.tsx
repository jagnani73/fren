import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

const data = [
  {
    name: "Page A",
    score: 3,
  },
  {
    name: "Page B",
    score: -3,
  },
  {
    name: "Page C",
    score: -2,
  },
  {
    name: "Page D",
    score: 2,
  },
  {
    name: "Page E",
    score: -1,
  },
  {
    name: "Page F",
    score: 0,
  },
  {
    name: "Page G",
    score: 3,
  },
];

const scoreText: string[] = [
  "Strongly Negative",
  "Negative",
  "Weakly Negative",
  "Nuetral",
  "Weakly Positive",
  "Positive",
  "Strongly Positive",
];

const feelingHandler = (score: number) => {
  return scoreText[score + 3];
};

const w: number = window.innerWidth;

export default class Example extends PureComponent {
  render() {
    return (
      <div className="flex w-full h-full">
        <div className="m-auto">
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" axisLine={false} />
            <YAxis label="At" />
            <Tooltip />
            <Legend />
            <Brush dataKey="name" height={30} stroke="#8884d8" />
            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="score" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    );
  }
}
