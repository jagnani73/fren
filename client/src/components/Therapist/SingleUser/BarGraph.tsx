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
  function timeConverter(UNIX_timestamp: number) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = `${date} ${month}`;
    return time;
  }
  const data = props.data.map((e) => {
    return {
      noteId: e.noteId,
      time: timeConverter(e.time as number),
      score: e.score,
    };
  });

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
          <XAxis dataKey="time" axisLine={false} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Brush dataKey="score" height={30} stroke="#21533C" />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="score" fill="#276749" />
        </BarChart>
      </div>
    </div>
  );
};

export default Example;
