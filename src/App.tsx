import React from 'react';
import { Box, CssBaseline, Paper, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import HeaderNav from "./components/HeaderNav"
import './App.css';

// import { createTheme } from "@mui/material/styles";

function App() {
  return (
    <div className="App">
      <Router>
        <HeaderNav />
        <div>
          <CssBaseline />
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            flexDirection="column"
          >
            <Routes>
              {appRoutes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </Box>
        </div>
      </Router>
    </div>
  );
}

export default App;
