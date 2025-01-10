import axiosInstance from "./AxiosInstance";

interface User {
    id?: string;
    fullName?: string;
    email: string;
    password?: string;
    gender?: 0 | 1;
    telNo?: string;
}

const baseUrl = "/api/User";

class UserService {
    // POST /api/User
    public async createOrUpdateUser(user: User) {
        const response = await axiosInstance.post(baseUrl, user);
        return response.data;
    }

    // GET /api/User
    public async getAllUsers() {
        const response = await axiosInstance.get(baseUrl);
        return response.data;
    }

    // DELETE /api/User
    public async deleteUser(id: string) {
        const response = await axiosInstance.delete(`${baseUrl}`, {
            params: { id }
        });
        return response.data;
    }

    // GET /api/User/id/{id}
    public async getUserById(id: string) {
        const response = await axiosInstance.get(`${baseUrl}/id/${id}`);
        return response.data;
    }

    // GET /api/User/email/{email}
    public async getUserByEmail(email: string) {
        const response = await axiosInstance.get(`${baseUrl}/email/${email}`);
        return response.data;
    }
}

export default new UserService();