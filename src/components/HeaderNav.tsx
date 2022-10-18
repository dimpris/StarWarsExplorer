import { FC } from 'react';
import { 
    Box, 
    AppBar, 
    Button,
    Toolbar, 
    Typography,
    IconButton
} from '@mui/material';
import AuthService from '../services/AuthService';
import { useNavigate, useLocation, useNavigationType, NavigationType } from "react-router-dom";
import * as MatIcon from '@mui/icons-material';

interface HeaderNavProps {}

const HeaderNav: FC<HeaderNavProps> = () => {
    const navigate = useNavigate();
    const navigationType = useNavigationType();
    const location = useLocation();

    const goHome = () => {
      navigate('/');
    };

    const goBack = () => {
      navigate(-1);
    };
    const toggleSignInOut = () => {
        const signedIn = AuthService.IsLoggedIn();

        if (signedIn) {
            AuthService.Logout();
        }

        navigate('/login');
    }

    const signedIn = AuthService.IsLoggedIn();
    const canGetBack = navigationType === NavigationType.Push || window.history.length > 2;

    return (
        <Box sx={{ flexGrow: 1, maxHeight: '11vh' }}>
          <AppBar position="static"sx={{ maxHeight: '11vh' }}>
            <Toolbar>
              { canGetBack
              ? <IconButton onClick={goBack}><MatIcon.ArrowBack className='headerBtn' /></IconButton>
              : '' }
              { location.pathname !== '/'
              ? <IconButton onClick={goHome} style={{marginLeft:15}}><MatIcon.Home className='headerBtn' /></IconButton>
              : '' }
              <Typography align='center' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Star Wars Explorer
              </Typography>
              { signedIn ? <Button color="inherit" onClick={toggleSignInOut}>Sign out</Button> : '' }
              
            </Toolbar>
          </AppBar>
        </Box>
    );
}

export default HeaderNav;