import clsx from "clsx";
import React from "react";

type Props = {
  type: string;
  children: React.ReactNode;
};

const TrpButton = ({ type, children }: Props) => {
  return (
    <button
      className={clsx({
        "white-bg-btn": type === "white",
        "blue-bg-btn": type === "blue",
      })}
    >
      {children}
    </button>
  );
};

export default TrpButton;
