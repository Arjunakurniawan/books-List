import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import { Provider } from "@radix-ui/react-tooltip";
import { BrowserRouter } from "react-router-dom";
import App from "./app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
