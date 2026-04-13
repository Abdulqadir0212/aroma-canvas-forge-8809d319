import { createRoot } from "react-dom/client";
import { initSessionHeader } from "./lib/supabaseHeaders";
import App from "./App.tsx";
import "./index.css";

// Set session header for guest cart RLS policies before rendering
initSessionHeader();

createRoot(document.getElementById("root")!).render(<App />);
