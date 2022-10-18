import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderNav from "./components/HeaderNav"
import './App.css';
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import PeopleDetails from "./pages/Details/PeopleDetails";
import PlanetsDetails from "./pages/Details/PlanetsDetails";
import FilmsDetails from "./pages/Details/FilmsDetails";
import SpeciesDetails from "./pages/Details/SpeciesDetails";
import VehiclesDetails from "./pages/Details/VehiclesDetails";
import StarshipsDetails from "./pages/Details/StarshipsDetails";

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
                key='people-details-route'
                path='/details/people/:id'
                element={<PeopleDetails />}
              />
              <Route
                key='planets-details-route'
                path='/details/planets/:id'
                element={<PlanetsDetails />}
              />
              <Route
                key='films-details-route'
                path='/details/films/:id'
                element={<FilmsDetails />}
              />
              <Route
                key='species-details-route'
                path='/details/species/:id'
                element={<SpeciesDetails />}
              />
              <Route
                key='vehicles-details-route'
                path='/details/vehicles/:id'
                element={<VehiclesDetails />}
              />
              <Route
                key='starships-details-route'
                path='/details/starships/:id'
                element={<StarshipsDetails />}
              />
            </Routes>
          </Box>
        </div>
      </Router>
    </div>
  );
}

export default App;
