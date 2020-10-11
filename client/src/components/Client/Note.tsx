import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

import { NoteProps } from "../../types";

const Note = (props: NoteProps) => {
  return (
    <div className="w-full bg-baseGray h-1/2vh lg:h-1/3vh rounded-lg flex flex-wrap m-auto shadow-note px-5 py-8 overflow-hidden">
      {props.children}
      <div className="flex w-full">
        <HiOutlineTrash
          className="ml-auto text-2xl cursor-pointer hover:text-red-700"
          onClick={props.deleteHandler}
        />
      </div>
    </div>
  );
};

export default Note;
