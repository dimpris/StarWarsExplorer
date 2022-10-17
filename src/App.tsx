import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderNav from "./components/HeaderNav"
import './App.css';
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";

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
              <Route
                key='home-route'
                path='/'
                element={<Home />}
              />
              <Route
                key='home-resource-route'
                path='/home/:type'
                element={<Home />}
              />
              <Route
                key='login-route'
                path='/login'
                element={<Login />}
              />
              <Route
                key='details-route'
                path='/details/:type/:id'
                element={<Details />}
              />
            </Routes>
          </Box>
        </div>
      </Router>
    </div>
  );
}

export default App;
