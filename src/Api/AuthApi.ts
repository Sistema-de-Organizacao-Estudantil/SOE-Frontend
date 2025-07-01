import { type RegisterRequest } from "../Contracts/Requests/Auth/RegisterRequest.ts";
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
            localStorage.setItem("token", await response.text());
        } else {
            return Promise.reject(await response.json());
        }
    }

    static async logout() {
        localStorage.clear();
    }

    static async register(request: RegisterRequest): Promise<void> {
        const response = await fetch(`${AuthApi.endpoint}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            return Promise.reject(await response.json());
        }
    }
};
