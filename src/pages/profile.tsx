import { Avatar, Button, Card, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";

export default function ProfilePage() {
    const [isEditing, setIsediting] = useState(false);
    const [userInfo, setUserInfo] = useState<{
        name: string;
        email: string;
        phone: string;
        id?: string;
    }>({ name: "", email: "", phone: "" });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) return;
                
                const userData = await UserService.getUserById(userId);
                setUserInfo({
                    name: userData.fullName || "",
                    email: userData.email || "",
                    phone: userData.telNo || "",
                    id: userData.id
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleEditClick = () => setIsediting(true);
    const handleSaveClick = async () => {
        try {
            await UserService.createOrUpdateUser({
                id: userInfo.id,
                fullName: userInfo.name,
                email: userInfo.email,
                telNo: userInfo.phone
            });
            setIsediting(false);
        } catch (error) {
            console.error("Error updating user data:", error);
            // You might want to add error handling/notification here
        }
    };

    const handleChange = (field: keyof typeof userInfo) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 15 }}>
            <Container maxWidth="lg">
                <Stack direction={"column"}>
                    <Stack direction={"row"} spacing={10} alignItems="center">
                        <Avatar
                            alt="Profile Picture"
                            src="/profile-picture.jpg"
                            sx={{ width: 200, height: 200 }}
                        />
                        <Typography sx={{ fontSize: 30 }}>{userInfo.name}</Typography>
                    </Stack>
                    <Card sx={{ minHeight: 280, padding: 2, alignContent: "flex-start", mt: 5 }} elevation={2}>
                        <Grid container spacing={2}>
                            {isEditing ? (
                                <>
                                    {/* Ad Soyad */}
                                    <Grid item xs={12} sm={6}>
                                        <Typography fontWeight="bold">Ad Soyad:</Typography>
                                        <TextField
                                            fullWidth
                                            value={userInfo.name}
                                            onChange={handleChange('name')}
                                        />
                                    </Grid>
                                    {/* E-mail */}
                                    <Grid item xs={12} sm={6}>
                                        <Typography fontWeight="bold">E-mail:</Typography>
                                        <TextField
                                            fullWidth
                                            value={userInfo.email}
                                            onChange={handleChange('email')}
                                        />
                                    </Grid>
                                    {/* Telefon Numarası */}
                                    <Grid item xs={12} sm={6}>
                                        <Typography fontWeight="bold">Tel No:</Typography>
                                        <TextField
                                            fullWidth
                                            value={userInfo.phone}
                                            onChange={handleChange('phone')}
                                        />
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    {/* Ad Soyad */}
                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            <strong>Ad Soyad: </strong>{userInfo.name}
                                        </Typography>
                                    </Grid>
                                    {/* E-mail */}
                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            <strong>E-mail: </strong>{userInfo.email}
                                        </Typography>
                                    </Grid>
                                    {/* Telefon Numarası */}
                                    <Grid item xs={12}>
                                        <Typography variant="body1">
                                            <strong>Telefon Numarası: </strong>{userInfo.phone}
                                        </Typography>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                        {/* Butonlar */}
                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            {isEditing ? (
                                <Button onClick={handleSaveClick} variant="contained" sx={{ backgroundColor: "#97349e" }}>
                                    Kaydet
                                </Button>
                            ) : (
                                <Button onClick={handleEditClick} variant="contained" sx={{ backgroundColor: "#97349e" }}>
                                    Bilgileri Düzenle
                                </Button>
                            )}
                        </Stack>
                    </Card>
                </Stack>
            </Container>
        </Container>
    );
}
