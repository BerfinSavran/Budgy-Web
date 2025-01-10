import { Box, Card, Container, Fab, LinearProgress, Stack, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { CustomCard } from "../components/CustomCard";
import { useState, useEffect } from "react";
import NewRecordDialog from "../components/newRecordDialog";
import BarChart from "../components/bar-chart";
import IncomeExpenseService from "../services/IncomeExpenseService";
import GoalService from "../services/GoalService";
import { format } from "date-fns";

export default function HomePage() {
    const [progress, setProgress] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formValues, setFormValues] = useState<Record<string, any>>({});
    const [monthlyData, setMonthlyData] = useState<Array<{ gelir: number, gider: number }>>([]);
    const [currentMonthTotals, setCurrentMonthTotals] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });
    const [budgetInfo, setBudgetInfo] = useState({
        plannedBudget: 0,
        remainingBudget: 0
    });

    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => {
        setDialogOpen(false);
        setFormValues({});
    };

    const handleSubmit = async (formValues: Record<string, any>) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            if (formValues.type === "Hedef") {
                // Validate date range exists
                if (!formValues.dateRange || !formValues.dateRange[0] || !formValues.dateRange[1]) {
                    throw new Error('Please select both start and end dates');
                }

                const goalData = {
                    userId,
                    categoryId: formValues.category,
                    amount: Number(formValues.amount),
                    description: formValues.description,
                    startDate: format(new Date(formValues.dateRange[0]), 'yyyy-MM-dd'),
                    endDate: format(new Date(formValues.dateRange[1]), 'yyyy-MM-dd')
                };
                await GoalService.addOrUpdateGoal(goalData);
            } else {
                console.log("DEE")
                // Validate date exists
                if (!formValues.date) {
                    throw new Error('Please select a date');
                }

                const incomeExpenseData = {
                    userId,
                    categoryId: formValues.category,
                    amount: Number(formValues.amount),
                    inExType: formValues.type === "Gelir" ? 0 : 1,
                    description: formValues.description,
                    date: format(new Date(formValues.date), 'yyyy-MM-dd')
                };
                await IncomeExpenseService.addOrUpdateIncomeExpense(incomeExpenseData);
            }

            // Refresh data
            fetchCurrentMonthData();
            fetchMonthlyData();
            fetchBudgetData();

            setFormValues({});
            setDialogOpen(false);
        } catch (error) {
            console.error('Error submitting record:', error);
            // Optionally show error to user via a toast or alert
        }
    };

    const labelList = [
        "Ocak",
        "Şubat",
        "Mart",
        "Nisan",
        "Mayıs",
        "Haziran",
        "Temmuz",
        "Ağustos",
        "Eylül",
        "Ekim",
        "Kasım",
        "Aralık",
      ];
    
    const fetchCurrentMonthData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            const monthlyTotals = await IncomeExpenseService.getMonthlyTotals(userId);
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
            const currentYear = currentDate.getFullYear();

            const currentMonthData = monthlyTotals.find(
                (data: any) => data.month === currentMonth && data.year === currentYear
            ) || { totalIncome: 0, totalExpense: 0 };

            setCurrentMonthTotals({
                totalIncome: currentMonthData.totalIncome,
                totalExpense: currentMonthData.totalExpense,
                balance: currentMonthData.totalIncome - currentMonthData.totalExpense
            });
        } catch (error) {
            console.error('Error fetching monthly totals:', error);
        }
    };

    const fetchMonthlyData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            const incomeData = await IncomeExpenseService.getAllByInExType(0, userId); // gelir
            const expenseData = await IncomeExpenseService.getAllByInExType(1, userId); // gider

            // Initialize array with 12 months, all values set to 0
            const monthlyStats = labelList.map(() => ({
                gelir: 0,
                gider: 0
            }));

            // Process income data
            incomeData.forEach((monthData: any) => {
                const monthIndex = monthData.month - 1; // Convert 1-based month to 0-based index
                const totalAmount = monthData.items.reduce((sum: number, item: any) => sum + item.amount, 0);
                if (monthIndex >= 0 && monthIndex < 12) {
                    monthlyStats[monthIndex].gelir = totalAmount;
                }
            });

            // Process expense data
            expenseData.forEach((monthData: any) => {
                const monthIndex = monthData.month - 1; // Convert 1-based month to 0-based index
                const totalAmount = monthData.items.reduce((sum: number, item: any) => sum + item.amount, 0);
                if (monthIndex >= 0 && monthIndex < 12) {
                    monthlyStats[monthIndex].gider = totalAmount;
                }
            });

            setMonthlyData(monthlyStats);
        } catch (error) {
            console.error('Error fetching monthly data:', error);
        }
    };

    const fetchBudgetData = async () => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0];
            
            const plannedBudget = await GoalService.getAmountByDateRange(userId, formattedDate);
            const remainingBudget = plannedBudget - currentMonthTotals.totalExpense;

            // Calculate progress percentage
            const usedBudget = plannedBudget - currentMonthTotals.totalExpense;
            const percentage = plannedBudget > 0
                ? (1 - (usedBudget / plannedBudget)) * 100
                : 0.0;

            setProgress(Math.round(percentage)); // Round to nearest integer
            setBudgetInfo({
                plannedBudget,
                remainingBudget
            });
        } catch (error) {
            console.error('Error fetching budget data:', error);
        }
    };

    useEffect(() => {
        fetchCurrentMonthData();
    }, []);

    useEffect(() => {
        fetchMonthlyData();
    }, []);

    useEffect(() => {
        fetchBudgetData();
    }, [currentMonthTotals.totalExpense]);

    return (
        <Container maxWidth="xl" sx={{ mt: 15 }}>
            <Stack direction={"row"} spacing={3}>
                <Stack direction={"column"} spacing={3}>
                <CustomCard 
                    sx={{ width: "518px" }} 
                    title={"Mevcut Bakiye"} 
                    amount={currentMonthTotals.balance.toString()} 
                    isMonthShow={false} 
                />
                <Stack direction={"row"} spacing={2}>
                    <CustomCard 
                        title={"Gelir"} 
                        amount={currentMonthTotals.totalIncome.toString()} 
                        isMonthShow={false} 
                    />
                    <CustomCard 
                        title={"Gider"} 
                        amount={currentMonthTotals.totalExpense.toString()} 
                        isMonthShow={false} 
                    />
                </Stack>
                <Stack direction={"row"} spacing={2}>
                    <CustomCard 
                        title={"Planlanan Bütçe"} 
                        amount={budgetInfo.plannedBudget.toString()} 
                        isMonthShow={false} 
                    />
                    <CustomCard 
                        title={"Kalan Bütçe"} 
                        amount={budgetInfo.remainingBudget.toString()} 
                        isMonthShow={false} 
                    />
                </Stack>
                <Box sx={{ width: '100%', mb: 2, mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        İlerleme Durumu: %{progress}
                    </Typography>
                    <LinearProgress sx={{
                        borderRadius: 5, height: 15, width: "518px", backgroundColor: "#e0e0e0",
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: "#97349e",
                        },
                    }} variant="determinate" value={progress} />
                </Box>
                </Stack>
                <Card elevation={5} sx={{width: "90%", borderRadius:5}}>
                    <BarChart 
                        sx={{mt:7, mb:7, ml:3, mr:3}} 
                        datas={monthlyData} 
                        labelList={labelList} 
                        titleLabel={"Yıl Gider Tablosu"} 
                    />
                </Card>
            </Stack>
            <Fab
                aria-label="add"
                disableRipple
                sx={{
                    backgroundColor: "#97349e",
                    color: "#ffffff",
                    bottom: 16,
                    right: 16,
                    position: "fixed",
                    borderRadius: 3,
                    "&:active , &:focus-visible": { backgroundColor: "#97349e" },
                    "&:hover": { backgroundColor: "#ffffff", color: "#97349e" },
                }}
                onClick={handleDialogOpen}
            >
                <AddIcon />
            </Fab>
            <NewRecordDialog
                open={dialogOpen}
                onClose={handleDialogClose}
                onSubmit={handleSubmit}
                formValues={formValues}
                setFormValues={setFormValues} 
            />
        </Container>
    );
}
