import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

import AOS from "aos";
import "aos/dist/aos.css";

import "./index.css";
import App from "./App";

AOS.init({
  duration: 900,
  once: true,
  offset: 80,
  easing: "ease-out-cubic",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);