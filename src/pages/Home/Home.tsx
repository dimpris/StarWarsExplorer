import React, { FC, ReactElement, useEffect } from 'react';
import {
  Box,
  Link,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { routes } from "../../routes";
import { NavLink, useNavigate } from "react-router-dom";
import AuthService from '../../services/AuthService';

import styles from './Home.module.css';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  let navigate = useNavigate();
  
  useEffect(() => {
    if (AuthService.IsLoggedIn() === false) {
      navigate('/login');
    }
  }, []);

  return (
    <div className={styles.Home} data-testid="Home">
      <h2>Home Component</h2>
      {routes.map((page) => (
        <Link
          key={page.key}
          component={NavLink}
          to={page.path}
          color="black"
          underline="none"
          variant="button"
        >
          <MenuItem>
            <Typography textAlign="center">{page.title}</Typography>
          </MenuItem>
        </Link>
      ))}
    </div>
  );
}
export default Home;
