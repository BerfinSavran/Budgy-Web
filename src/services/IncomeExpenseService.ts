import axiosInstance from "./AxiosInstance";
import { IncomeExpense, IncomeExpenseCreate } from "../types";

const baseUrl = "/api/IncomeExpense";

class IncomeExpenseService {
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

    public async addOrUpdateIncomeExpense(incomeExpense: IncomeExpenseCreate) {
        const response = await axiosInstance.post(baseUrl, incomeExpense);
        return response.data;
    }

    public async deleteIncomeExpense(id: string) {
        const response = await axiosInstance.delete(baseUrl, { params: { id } });
        return response.data;
    }

    public async getMonthlyTotals(userId: string) {
        const response = await axiosInstance.get(`${baseUrl}/MonthlyTotals/${userId}`);
        return response.data;
    }

    public async updateMonthly(month: number, year: number, inExType: number) {
        const response = await axiosInstance.post(`${baseUrl}/MonthlyUpdate`, null, {
            params: { month, year, inExType }
        });
        return response.data;
    }
}

export default new IncomeExpenseService();