import axiosInstance from "./AxiosInstance";
import { LoginRequestDto } from "../types"; // Updated import

const baseUrl = "/api/Auth";

class AuthService {
    public async login(email: string, password: string) {
        try {
            const response = await axiosInstance.post(baseUrl, { email, password });
            const { token, user } = response.data;

            if (token && user?.id) {
                localStorage.setItem("authToken", token);
                localStorage.setItem("userId", user.id);
            } else {
                throw new Error("Login failed: Token or user ID is missing in the response.");
            }
            return user;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    }
    public logout() {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
    }
}

export default new AuthService();
