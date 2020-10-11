import React from "react";

import { NoteProps } from "../../types";

const Note = (props: NoteProps) => {
  return (
    <div className="w-full bg-baseGray h-1/3vh rounded-lg flex flex-wrap m-auto shadow-note px-5 py-8 overflow-hidden">
      {props.children}
      <div className="flex w-full">
        <span className="ml-auto" onClick={props.deleteHandler}>
          X
        </span>
      </div>
    </div>
  );
};

export default Note;
