import React, { FC, useEffect, useState } from 'react';
import AuthService from '../../services/AuthService';
import { useNavigate } from "react-router-dom";
import { Box, TextField, Card, Button } from '@mui/material';
import styles from './Login.module.css';

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (AuthService.IsLoggedIn() === true) {
      navigate('/');
    }
  }, []);

  const handleLogin = () => {
    setErrorMessage('');
    const loginSucceed = AuthService.Login(username, password);

    if (loginSucceed) {
      navigate('/');
    } else {
      setErrorMessage('Username or Password invalid');
    }
  };

  const handleUsernameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const formUsername = ev.target.value;

    if (username !== formUsername) {
      setUsername(formUsername);
    }
  };

  const handlePasswordChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const formPassword = ev.target.value;

    if (password !== formPassword) {
      setPassword(formPassword);
    }
  };

  return (
    <div className={styles.Login} data-testid="Login">
      <Card variant="outlined" sx={{ padding: 2 }}>
        <Box className={styles.FormWrap} component="form" noValidate autoComplete='off'>
          <div>
            <TextField
              required
              id="username-inp"
              label="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <TextField
              required
              type="password"
              id="password-inp"
              label="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className={styles.ErrorMessage}>{ errorMessage }</div>
          <div>
            <Button variant="contained" onClick={handleLogin}>Sign In</Button>
          </div>
        </Box>
      </Card>
    </div>
  );
}

export default Login;
