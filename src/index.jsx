import "./styles/main.scss";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
