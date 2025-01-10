import { Button, Card, Stack, SxProps, Typography } from "@mui/material"
import { ReactNode } from "react"
import { Link } from "react-router-dom"

export const LoginCard = ({ title, children, sx = {}, buttonName, link, onClick}: { title: string, children: ReactNode, sx?: SxProps, buttonName: string, link:boolean, onClick:()=>void}) => {
    return (
        <Card sx={{
            padding: "20px",
            minwidth: "400px",
            borderRadius: 4,
            ...sx
        }} elevation={4}>
            <Stack direction={"column"} alignItems={"center"}>
                <Typography variant="h4" sx={{
                    padding: "50px"
                }}>{title}</Typography>
                {children}
                <Button sx={{
                    backgroundColor: "blue",
                    color: "white",
                    width: "160px",
                    marginTop: "35px"
                }}
                onClick={onClick}>{buttonName}</Button>
                {link && (<Typography variant="body2" sx={{ marginTop: "5px" }}>Kaydınız yok mu?{""}
                    <Link to={"/register"} style={{ textDecoration: 'none', color: 'blue' }} > Hemen kayıt olun.</Link>
                </Typography>)}
            </Stack>
        </Card>
    )
}