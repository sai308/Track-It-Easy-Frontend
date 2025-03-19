import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { LoginPageLayout } from "./layouts/LoginPageLayout.tsx";
import { RegisterPageLayout } from "./layouts/RegisterPageLayout.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPageLayout />} />
                <Route path="/register" element={<RegisterPageLayout />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
