import { type UserResponse } from "../Contracts/Responses/UserResponse.ts";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export class UserApi {
    private static endpoint = `${baseUrl}/api/users`;

    static async me(): Promise<UserResponse | null> {
        const token = this.getToken();

        if (token == null) {
            return null;
        }

        const response = await fetch(`${UserApi.endpoint}/me`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            return await response.json();
        } else {
            return null;
        }
    }

    private static getToken(): string | null {
        return localStorage.getItem("token");
    }
}
