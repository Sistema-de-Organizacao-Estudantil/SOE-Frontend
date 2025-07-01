import { type UserResponse as User } from "../Contracts/Responses/UserResponse.ts";
import { UserApi } from "../Api/UserApi.ts";
import { useState, useContext, useEffect, createContext, type ReactNode } from "react";

type UserContextType = {
    user: User | null;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        UserApi
            .me()
            .then(user => {
                setUser(user!);
            });
    }, []);

    return (
        <UserContext value={{ user }}>
            {children}
        </UserContext>
    );
}

export function userUser(): UserContextType {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within an AuthProvider");
    return context;
}
