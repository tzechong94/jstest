import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "./assets/css/main.css";
import "./assets/css/tooltip.css";
import "./assets/css/profile.css";

import.meta.glob("./assets/fonts/*", { eager: true });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
