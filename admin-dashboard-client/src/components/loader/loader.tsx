import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="modal">
      <div className="lds-circle">
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
