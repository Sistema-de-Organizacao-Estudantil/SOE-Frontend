import { type LoginRequest } from "../Contracts/Requests/Auth/LoginRequest.ts";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export class AuthApi {
    private static endpoint = `${baseUrl}/api/auth`;

    static async login(request: LoginRequest): Promise<void> {
        const response = await fetch(`${AuthApi.endpoint}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        if (response.ok) {
            this.setToken(await response.text());
        } else {
            return Promise.reject(await response.json());
        }
    }

    private static setToken(token: string) {
        localStorage.setItem("token", token);
    }
};
