import React from "react";

function ErrorComponent({ error }) {
  return (
    <div>
      <span style={{ color: "#FF0000", fontSize: "17px" }}>{error}</span>
    </div>
  );
}

export default ErrorComponent;
