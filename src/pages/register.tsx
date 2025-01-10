import { Container, Stack, TextField, Typography } from "@mui/material";
import { LoginCard } from "../components/LoginCard";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { useState } from "react";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleRegisterClick = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            await UserService.createOrUpdateUser({
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
            });
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    }

    return (
        <Container maxWidth="xl">
            <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
                <LoginCard title={"Budgy"} buttonName={"KAYIT OL"} link={false} onClick={handleRegisterClick}>
                    <Stack direction={"row"} spacing={2} alignItems="center" sx={{ marginBottom: "20px" }}>
                        <Typography variant="h6" sx={{ width: "161px" }}>Ad Soyad:</Typography>
                        <TextField 
                            fullWidth 
                            value={formData.fullName} 
                            onChange={handleInputChange('fullName')}
                        ></TextField>
                    </Stack>
                    <Stack direction={"row"} spacing={2} alignItems="center" sx={{ marginBottom: "20px" }}>
                        <Typography variant="h6" sx={{ width: "161px" }}>E-mail:</Typography>
                        <TextField 
                            fullWidth 
                            value={formData.email} 
                            onChange={handleInputChange('email')}
                        ></TextField>
                    </Stack>
                    <Stack direction={"row"} spacing={2} alignItems="center" sx={{ marginBottom: "20px" }}>
                        <Typography variant="h6" sx={{ width: "161px" }}>Şifre:</Typography>
                        <TextField 
                            type="password" 
                            fullWidth 
                            value={formData.password} 
                            onChange={handleInputChange('password')}
                        ></TextField>
                    </Stack>
                    <Stack direction={"row"} spacing={2} alignItems="center">
                        <Typography variant="h6" sx={{ width: "161px" }}>Tekrar Şifre:</Typography>
                        <TextField 
                            type="password" 
                            fullWidth 
                            value={formData.confirmPassword} 
                            onChange={handleInputChange('confirmPassword')}
                        ></TextField>
                    </Stack>
                </LoginCard>
            </Container>
        </Container>
    );
}




