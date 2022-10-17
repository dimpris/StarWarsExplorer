import React, { FC, useEffect } from 'react';
import AuthService from '../../services/AuthService';
import { useNavigate } from "react-router-dom";
import { Box, TextField, Card, Button } from '@mui/material';
import styles from './Login.module.css';

interface LoginProps {}

const Login: FC<LoginProps> = () => {

  const handleLogin = () => {
    alert(1);
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (AuthService.IsLoggedIn() === true) {
      navigate('/home');
    }
  }, []);

  return (
    <div className={styles.Login} data-testid="Login">
      <Card variant="outlined" sx={{ padding: 2 }}>
        <Box className={styles.FormWrap} component="form" noValidate autoComplete='off'>
          <div>
            <TextField
              required
              id="username-inp"
              label="Username"
            />
          </div>
          <div>
            <TextField
              required
              type="password"
              id="password-inp"
              label="Password"
            />
          </div>
          <div>
            <Button variant="contained" onClick={handleLogin}>Sign In</Button>
          </div>
        </Box>
      </Card>
    </div>
  );
}

export default Login;
