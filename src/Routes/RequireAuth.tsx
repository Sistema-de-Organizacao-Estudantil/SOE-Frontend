import { type ReactNode } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router";

export function RequireAuth({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const auth = useAuth();

    if (!auth.user) {
        navigate("/entrar");
    }

    return children;
}
