import React from "react";
import ReactDOM from "react-dom/client";
import { GeneralContextProvider } from "./context/GeneralContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GeneralContextProvider>
      <App />
    </GeneralContextProvider>
  </React.StrictMode>
);
