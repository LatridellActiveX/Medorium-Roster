import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient";
import Contexts from "./layout/contexts/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Contexts>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Contexts>
);
