import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SideBarNavigation from "./components/commons/Sidebar";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SideBarNavigation />
  </StrictMode>
);
