import { useState } from "react";

import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="main-container">
      <div className="thx-wrapper flex">
        <Sidebar />
        
      </div>
    </div>
  );
}

export default App;
