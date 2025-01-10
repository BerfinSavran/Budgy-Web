import axiosInstance from "./AxiosInstance";
import { Goal, GoalCreate } from "../types";

const baseUrl = "/api/Goal";

class GoalService {
    public async getAll() {
        const response = await axiosInstance.get(baseUrl);
        return response.data;
    }

    public async getById(id: string) {
        const response = await axiosInstance.get(`${baseUrl}/id/${id}`);
        return response.data;
    }

    public async getAmountByDateRange(userId: string, startDate: string): Promise<number> {
        const response = await axiosInstance.get(`${baseUrl}/dateRange/${userId},${startDate}`);
        return response.data;
    }

    public async addOrUpdateGoal(goal: GoalCreate) {
        const response = await axiosInstance.post(baseUrl, goal);
        return response.data;
    }

    public async deleteGoal(id: string) {
        const response = await axiosInstance.delete(baseUrl, { params: { id } });
        return response.data;
    }
}

export default new GoalService();