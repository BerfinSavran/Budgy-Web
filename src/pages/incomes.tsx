import { Box, Card, Container, Stack } from "@mui/material";
import { CustomCard } from "../components/CustomCard";
import { CustomTable } from "../components/CustomTable";
import LineChart from "../components/line-chart";
import { useEffect, useState } from "react";
import IncomeExpenseService from "../services/IncomeExpenseService";

interface IncomeItem {
    day: number;
    amount: number;
    name: string;
}

interface MonthData {
    month: number;
    items: IncomeItem[];
}

export default function IncomesPage() {
    const [days, setDays] = useState<string[]>([]);
    const [incomes, setIncomes] = useState<number[]>([]);
    const [tableData, setTableData] = useState<{ category: string, amount: string }[]>([]);
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        const fetchIncomes = async () => {
            const userId = localStorage.getItem('userId') || '';
            const response = await IncomeExpenseService.getAllByInExType(0, userId);
            
            // Filter for current month
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentMonthData = response.find((m: MonthData) => m.month === currentMonth)?.items || [];

            // Prepare data for line chart
            const daysInMonth = new Date(currentDate.getFullYear(), currentMonth, 0).getDate();
            const dailyIncomes = new Array(daysInMonth).fill(0);
            const dateLabels = Array.from({length: daysInMonth}, (_, i) => `${i + 1} ${currentDate.toLocaleString('default', { month: 'short' })}`);

            // Aggregate daily incomes
            currentMonthData.forEach((item: IncomeItem) => {
                dailyIncomes[item.day - 1] += item.amount;
            });

            // Prepare table data
            const tableItems = currentMonthData.map((item: IncomeItem) => ({
                category: item.name,
                amount: item.amount.toLocaleString()
            }));

            // Calculate total
            const monthlyTotal = currentMonthData.reduce((sum: number, item: IncomeItem) => sum + item.amount, 0);

            setDays(dateLabels);
            setIncomes(dailyIncomes);
            setTableData(tableItems);
            setTotalIncome(monthlyTotal);
        };

        fetchIncomes();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ mt: 10 }}>
            <Stack direction={"column"} spacing={3} alignItems={"center"} >
                <CustomCard 
                    title={"Toplam Gelir"} 
                    amount={totalIncome.toLocaleString()} 
                    isMonthShow={true} 
                    month={new Date().toLocaleString('default', { month: 'long' })} 
                    sx={{ width: 500 }}
                />
                <Stack direction={"row"} spacing={3}>
                    <Card elevation={4} sx={{ borderRadius: 5, width: "785px" }}>
                        <LineChart sx={{ mt: 7, mb: 7, ml: 3, mr: 3 }} days={days} expenses={incomes}></LineChart>
                    </Card>
                    <Card elevation={5} sx={{ borderRadius: 5}}>
                        <Box
                            sx={{
                                width: 490,
                                maxHeight: 480, // Maksimum yükseklik
                                overflowY: "auto", // Dikey kaydırma
                                border: "1px solid #ddd", // Çerçeve (isteğe bağlı)
                                borderRadius: 2,
                            }}
                        >
                            <CustomTable data={tableData} />
                        </Box>
                    </Card>
                </Stack>
            </Stack>
        </Container>
    )
}