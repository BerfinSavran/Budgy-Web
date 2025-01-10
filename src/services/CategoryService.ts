import axiosInstance from "./AxiosInstance";
import { Category } from "../types";

const baseUrl = "/api/Category";

class CategoryService {
    public async getAll() {
        const response = await axiosInstance.get(baseUrl);
        return response.data;
    }

    public async getById(id: string) {
        const response = await axiosInstance.get(`${baseUrl}/id/${id}`);
        return response.data;
    }

    public async getAllByInExType(inExType: number, userId: string) {
        const response = await axiosInstance.get(`${baseUrl}/type/${inExType}/${userId}`);
        return response.data;
    }

    public async addOrUpdateCategory(category: Category) {
        const response = await axiosInstance.post(baseUrl, category);
        return response.data;
    }

    public async deleteCategory(id: string) {
        const response = await axiosInstance.delete(baseUrl, { params: { id } });
        return response.data;
    }
}

export default new CategoryService();