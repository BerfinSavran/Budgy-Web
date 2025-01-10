import { Card, Stack, SxProps, Typography } from "@mui/material"

export const CustomCard = ({
    month,
    title,
    amount,
    sx = {},
    isMonthShow,
    direction = "column",
}: {
    month?: string,
    title: string,
    amount: string,
    sx?: SxProps,
    isMonthShow: boolean,
    direction?: "column" | "row",
}) => {
    return(
        <Card sx={{
            height:"150px",
            width: "250px",
            alignContent:"center",
            borderRadius: 5,
            ...sx
        }} elevation={5}>
            <Stack direction={direction} alignItems={"center"} justifyContent="space-around">
                {isMonthShow && (<Typography variant="h5" fontWeight="700">{month}</Typography>)}
                <Typography variant="h6" fontWeight="bold"sx={{padding:"15px"}}>{title}</Typography>
                <Typography variant="body1">{amount}</Typography>
            </Stack>
        </Card>
    )
}