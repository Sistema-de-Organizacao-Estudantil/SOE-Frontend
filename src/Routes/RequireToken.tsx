import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";

export function RequireToken({ children }: { children: ReactNode }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/entrar");
        }
    }, []);

    return children;
}
