import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppWrapper } from "./Views/AppWrapper/AppWrapper";

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(<AppWrapper />);
