import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppWrapper } from "./Views/AppWrapper";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  </React.StrictMode>
);
