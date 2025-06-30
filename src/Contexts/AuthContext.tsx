import { useState, useContext, useEffect, createContext, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { type UserResponse as User } from "../Contracts/Responses/UserResponse.ts";
import { UserApi } from "../Api/UserApi.ts";

type AuthContextType = {
    user: User;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>({ id: null, name: null, email: null });
    const navigate = useNavigate();

    useEffect(() => {
        UserApi.me().then(user => {
            setUser(user!);
        }).catch(() => {
            navigate("/auth");
        });
    }, []);

    return (
        <AuthContext value={{ user }}>
            {children}
        </AuthContext>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
