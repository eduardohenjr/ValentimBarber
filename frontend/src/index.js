import React from "react";
import ReactDOM from "react-dom";
import ValentimLayout from "./pages/Home";
import "./index.css"; // Se você tiver um arquivo de estilos global

ReactDOM.render(
  <React.StrictMode>
    <ValentimLayout />
  </React.StrictMode>,
  document.getElementById("root")
);