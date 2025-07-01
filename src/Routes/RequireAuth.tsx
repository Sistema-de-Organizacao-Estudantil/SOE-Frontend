import { type ReactNode } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Contexts/AuthContext";

export function RequireAuth({ children }: { children: ReactNode }) {
    const navigate = useNavigate();
    const auth = useAuth();

    if (!auth.user) {
        navigate("/entrar");
    }

    return children;
}
