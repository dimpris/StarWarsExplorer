import React, { FC } from 'react';
import { 
    Box, 
    AppBar, 
    Button,
    Toolbar, 
    Typography
} from '@mui/material';
import AuthService from '../services/AuthService';
import { useNavigate } from "react-router-dom";

interface HeaderNavProps {}

const HeaderNav: FC<HeaderNavProps> = () => {
    const navigate = useNavigate();

    const toggleSignInOut = () => {
        const signedIn = AuthService.IsLoggedIn();

        if (signedIn) {
            AuthService.Logout();
        }

        navigate('/login');
    }

    const signedIn = AuthService.IsLoggedIn();

    return (
        <Box sx={{ flexGrow: 1, height: '11vh' }}>
          <AppBar position="static"sx={{ height: '11vh' }}>
            <Toolbar>
              
              <Typography align='left' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Star Wars Explorer
              </Typography>
              { signedIn ? <Button color="inherit" onClick={toggleSignInOut}>Sign out</Button> : '' }
              
            </Toolbar>
          </AppBar>
        </Box>
    );
}

export default HeaderNav;