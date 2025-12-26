import React from "react";
import { Atom } from "react-loading-indicators";

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Atom color="#232ea2" size="medium" text="" textColor="" />
    </div>
  );
};

export default Loading;