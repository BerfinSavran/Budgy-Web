export interface Category {
    id?: string;
    userId?: string;
    name?: string;
    inExType: number;
    totalAmount: number;
    lastResetMonth: number;
    lastResetYear: number;
}

export interface Goal {
    id?: string;
    userId: string;
    categoryId: string;
    amount: number;
    description?: string;
    startDate: DateOnly;
    endDate: DateOnly;
}

export interface IncomeExpense {
    id?: string;
    userId: string;
    categoryId: string;
    category?: Category;
    amount: number;
    inExType: number;
    description?: string;
    date: DateOnly;
}

export interface DateOnly {
    year: number;
    month: number;
    day: number;
    dayOfWeek?: number;
    dayOfYear?: number;
    dayNumber?: number;
}

export interface LoginRequestDto {
    email?: string;
    password?: string;
}

export interface IncomeExpenseCreate {
    userId: string;
    categoryId: string;
    amount: number;
    inExType: number;
    description?: string;
    date: Date | string;
}

export interface GoalCreate {
    userId: string;
    categoryId: string;
    amount: number;
    description?: string;
    startDate: Date | string;
    endDate: Date | string;
} 