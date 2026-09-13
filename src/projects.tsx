import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/fonts.css";
import "./styles/global.css";
import "./styles/components.css";
import ProjectsPage from "./pages/ProjectsPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProjectsPage />
  </StrictMode>
);
