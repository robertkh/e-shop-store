// todo
import React, { useRef } from "react";
import ReactTooltip from "react-tooltip";

// todo
export default function MyToolTip(params) {
  // ? ---
  const { id, place, effect, type, time } = params;
  const timerId = useRef(null);

  // ? ---
  return (
    <ReactTooltip
      id={id}
      place={place || "top"}
      effect={effect || "solid"}
      delayShow={500}
      type={type || "warning"}
      getContent={(dataTip) => dataTip}
      afterShow={() =>
        (timerId.current = setTimeout(() => ReactTooltip.hide(), time || 2000))
      }
      afterHide={() => {
        clearTimeout(timerId.current);
      }}
    />
  );
}
