import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./reducers/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// import "./index.css";

import "./assets/css/main.css";
import "./assets/css/tooltip.css";
import "./assets/css/profile.css";

import.meta.glob("./assets/fonts/*", { eager: true });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
