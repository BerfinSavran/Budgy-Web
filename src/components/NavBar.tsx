import { AccountCircle } from "@material-ui/icons";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function NavBar(){
    const [analysisMenuAnchor, setAnalysisMenuAnchor] = useState<null | HTMLElement>(null);
    const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleNavigation = (path:string) => {
        navigate(path);
        handleClose();
    }

    const handleAnalysisMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnalysisMenuAnchor(event.currentTarget);
        setAccountMenuAnchor(null);
    }

    const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAccountMenuAnchor(event.currentTarget);
        setAnalysisMenuAnchor(null);
    }

    const handleLogout = () => {
        AuthService.logout();
        navigate("/");
        handleClose();
    };

    const handleClose = () => {
        setAnalysisMenuAnchor(null);
        setAccountMenuAnchor(null);
    }

    return(
        <AppBar position="fixed">
            <Toolbar sx={{ minHeight: 0, px: 2, backgroundColor:"#97349e"}}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Button color="inherit" onClick={() => handleNavigation('/home')}>Budgy</Button>
                </Typography>
                <Stack direction={"row"} spacing={2} flexGrow={1}>
                    <Box>
                        <Button color="inherit" onClick={handleAnalysisMenuOpen}>Analizler
                            <ArrowDropDownIcon/>
                        </Button>
                        
                        <Menu
                            anchorEl={analysisMenuAnchor} 
                            open={Boolean(analysisMenuAnchor)}
                            onClose={handleClose}>
                            <MenuItem onClick={()=>{handleNavigation('/incomes')}}>Gelirler</MenuItem>
                            <MenuItem onClick={()=>{handleNavigation('/outcomes')}}>Giderler</MenuItem>
                        </Menu>
                    </Box>
                    <Box>
                        <Button color="inherit" onClick={()=>{handleNavigation('/categories')}}>Kategoriler</Button>
                    </Box>
                </Stack>
                <Box>
                    <IconButton size="large" edge="end" color="inherit" onClick={handleAccountMenuOpen}>
                        <AccountCircle/>
                    </IconButton>
                    <Menu anchorEl={accountMenuAnchor} open={Boolean(accountMenuAnchor)} onClose={handleClose}>
                        <MenuItem onClick={()=>{handleNavigation('/profile')}}>Profilim</MenuItem>
                        <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}