import React from 'react';
import { Box, CssBaseline, Paper, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";

// import { createTheme } from "@mui/material/styles";

function App() {
  return (
    <div className="App">
      <div>
        <CssBaseline />
        <Box
          height="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Router>
            <Routes>
              {appRoutes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </Router>
        </Box>
      </div>
    </div>
  );
}

export default App;
