import React, { useState } from "react";
import { createBrowserHistory } from "history";

import { BackdropProps } from "../../types";

const Backdrop = (props: BackdropProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const exit = () => {
    setIsOpen(false);
    if (props.goBack) {
      let history = createBrowserHistory();
      history.goBack();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="flex flex-wrap fixed bg-baseBlack bg-opacity-75 w-full h-screen z-20"
          onClick={exit}
        />
      )}
    </>
  );
};

export default Backdrop;
