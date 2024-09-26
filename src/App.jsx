import { useState } from "react";

import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="main-container">
      <div className="thx-wrapper flex">
        <Sidebar />
        <div className="thx-window">
          <div className="sub-title flex">
            <h1 id="eqTitle" className="eq-title">
              Default
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
