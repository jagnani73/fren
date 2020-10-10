import React from "react";

const Note = (props: any) => {
  return (
    <div className="w-full bg-baseGray h-1/3vh rounded-lg flex flex-wrap m-auto shadow-note p-5 pt-8 overflow-hidden">
      {props.children}
    </div>
  );
};

export default Note;
