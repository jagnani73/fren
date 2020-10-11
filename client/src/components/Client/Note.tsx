import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

import { NoteProps } from "../../types";

const Note = (props: NoteProps) => {
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
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = date + " " + month + " " + " " + hour + ":" + min;
    return time;
  }

  return (
    <div className="w-full bg-baseGray h-1/2vh lg:h-1/3vh rounded-lg flex flex-wrap m-auto shadow-note px-5 py-8 overflow-hidden">
      {props.children}
      <div className="flex w-full">
        <div className="mr-auto text-gray-400">{timeConverter(props.date)}</div>
        <HiOutlineTrash
          className="ml-auto text-2xl cursor-pointer hover:text-red-700"
          onClick={props.deleteHandler}
        />
      </div>
    </div>
  );
};

export default Note;
