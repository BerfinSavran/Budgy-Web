import React, { useEffect, useState } from "react";
import { Box, Card, Container, Stack } from "@mui/material";
import { CustomCard } from "../components/CustomCard";
import { CustomTable } from "../components/CustomTable";
import { PieChart } from "../components/pie-chart";
import CategoryService from "../services/CategoryService";

interface CategoryData {
    category: string;
    amount: string;
}

interface CategoryResponse {
    userId: string;
    name: string;
    inExType: number;
    totalAmount: number;
    lastResetMonth: number;
    lastResetYear: number;
    id: string;
}

const CategoriesPage: React.FC = () => {
    const [incomesData, setIncomesData] = useState<CategoryData[]>([]);
    const [outcomesData, setOutcomesData] = useState<CategoryData[]>([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            const userId = localStorage.getItem('userId') || '';
            
            // Fetch incomes (inExType = 0)
            const incomeResponse = await CategoryService.getAllByInExType(0, userId);
            const incomeCategories = incomeResponse.map((item: CategoryResponse) => ({
                category: item.name,
                amount: item.totalAmount.toLocaleString()
            }));
            setIncomesData(incomeCategories);
            setTotalIncome(incomeResponse.reduce((sum: number, item: CategoryResponse) => sum + item.totalAmount, 0));

            // Fetch expenses (inExType = 1)
            const expenseResponse = await CategoryService.getAllByInExType(1, userId);
            const expenseCategories = expenseResponse.map((item: CategoryResponse) => ({
                category: item.name,
                amount: item.totalAmount.toLocaleString()
            }));
            setOutcomesData(expenseCategories);
            setTotalExpense(expenseResponse.reduce((sum: number, item: CategoryResponse) => sum + item.totalAmount, 0));
        };

        fetchCategories();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ mt: 11 }}>
            <Stack direction={"row"} justifyContent={"space-around"}>
                <Stack direction={"column"} spacing={5}>
                    <CustomCard
                        title={"Toplam Gelir"}
                        amount={totalIncome.toLocaleString()}
                        isMonthShow={false}
                        sx={{ width: 500, height: 100 }}
                        direction="row"
                    />
                    <PieChart data={incomesData} title="Gelir Dağılımı" />
                    <Card elevation={5} sx={{ borderRadius: 5, height:"400px", width: "490px" }}>
                        <Box sx={{
                            width: 490,
                            maxHeight: 480,
                            overflowY: "auto",
                            border: "1px solid #ddd",
                            borderRadius: 2,
                        }}>
                            <CustomTable data={incomesData} />
                        </Box>
                    </Card>
                </Stack>
                <Stack direction={"column"} spacing={5}>
                    <CustomCard
                        title={"Toplam Gider"}
                        amount={totalExpense.toLocaleString()}
                        isMonthShow={false}
                        sx={{ width: 500, height: 100 }}
                        direction="row"
                    />
                    <PieChart data={outcomesData} title="Gider Dağılımı" />
                    <Card elevation={5} sx={{ borderRadius: 5, height:"400px", width: "490px" }}>
                        <Box sx={{
                            width: 490,
                            maxHeight: 480,
                            overflowY: "auto",
                            border: "1px solid #ddd",
                            borderRadius: 2,
                        }}>
                            <CustomTable data={outcomesData} />
                        </Box>
                    </Card>
                </Stack>
            </Stack>
        </Container>
    );
};

export default CategoriesPage;
