import React from "react";
import spinner from "../../img/spinner.gif";

export default function Spinner() {
  return (
    <div className="spinner-container">
      <img src={spinner} alt="Loading..." />
    </div>
  );
}
