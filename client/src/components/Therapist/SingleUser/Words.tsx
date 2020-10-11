import React from "react";

import { WordAnalysisProps } from "../../../types";

const Words = (props: WordAnalysisProps) => {
  return (
    <div>
      {props.words.map((word) => (
        <div key={word.noteId}>
          <div className="mx-auto md:mr-4 px-5 py-2 bg-baseBlack rounded-lg text-white font-bold">
            {word.words.map((item) => (
              <div
                key={Math.random().toString()}
                className="mx-auto md:mr-4 px-5 py-2 bg-baseGray rounded-lg text-white font-bold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Words;
