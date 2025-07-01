import { UserProvider } from "./Contexts/UserContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import { RequireToken } from "./Routes/RequireToken.tsx";

import Home from "./Routes/Home/Home.tsx";
import Login from "./Routes/Auth/Login/Login.tsx";
import Register from "./Routes/Auth/Register/Register.tsx";

import "primereact/resources/themes/lara-light-teal/theme.css";

const protectedRoutes = [
    { path: "/", element: <Home /> }
];

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <UserProvider>
            <Routes>
                {protectedRoutes.map(({ path, element }) =>
                    <Route path={path} element={<RequireToken>{element}</RequireToken>} />
                )}
                <Route path="/entrar" element={<Login />} />
                <Route path="/registrar" element={<Register />} />
            </Routes>
        </UserProvider>
    </BrowserRouter>,
)
