import React from "react";

import { WordAnalysisProps } from "../../../types";

const Words = (props: WordAnalysisProps) => {
  return (
    <div className="h-full my-auto">
      <div className="pt-3 lg:pt-16 h-full">
        <div className="h-full overflow-y-scroll">
          {props.words.map((word) => (
            <div key={word.noteId}>
              <div className="flex flex-wrap mx-auto my-3 px-5 py-2 bg-baseBlack rounded-lg text-white font-bold">
                {word.words.map((item) => (
                  <div
                    key={Math.random().toString()}
                    className="mx-auto my-2 px-5 py-2 bg-baseGray rounded-lg text-white font-bold"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Words;
