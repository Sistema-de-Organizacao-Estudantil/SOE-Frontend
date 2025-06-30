import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./Contexts/AuthContext.tsx";

import Home from "./Routes/Home/Home.tsx";
import Auth from "./Routes/Auth/Auth.tsx";

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </AuthProvider>
    </BrowserRouter>,
)
