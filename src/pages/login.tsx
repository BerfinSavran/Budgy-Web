import { Container, Stack, TextField, Typography } from "@mui/material";
import { LoginCard } from "../components/LoginCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthService from "../services/AuthService";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate =  useNavigate();


    const handleLoginClick = async () => {
        const user = AuthService.login(email, password).then((data) => {
            
        });


        navigate('/home');
    }
    return (
        <Container maxWidth="xl">
            <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <LoginCard title={"Budgy"} buttonName={"GİRİŞ YAP"} link={true} onClick={handleLoginClick}>
                    <Stack direction={"row"} spacing={2} alignItems="center" sx={{ marginBottom: "20px" }}>
                        <Typography variant="h6" sx={{ width: "100px" }}>E-mail:</Typography>
                        <TextField 
                            fullWidth 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Stack>
                    <Stack direction={"row"} spacing={2} alignItems="center">
                        <Typography variant="h6" sx={{ width: "100px" }}>Şifre:</Typography>
                        <TextField 
                            type="password" 
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Stack>
                </LoginCard>
            </Container>
        </Container>
    );
}




