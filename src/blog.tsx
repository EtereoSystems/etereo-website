import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/fonts.css";
import "./styles/global.css";
import "./styles/components.css";
import BlogPage from "./pages/BlogPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BlogPage />
  </StrictMode>
);
