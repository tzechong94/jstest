import React from "react";

const MainScreen = ({ name }) => {
  return (
    <div className="thx-window">
      <div className="sub-title flex">
        <h1 id="eqTitle" className="eq-title">
          {name}
        </h1>
      </div>
    </div>
  );
};

export default MainScreen;
