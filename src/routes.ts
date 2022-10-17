import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";


import {FC} from "react";

interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: FC<{}>
}

export const routes: Array<Route> = [
    {
        key: 'home-route',
        title: 'Home',
        path: '/',
        enabled: true,
        component: Home
    },
    {
        key: 'login-route',
        title: 'Login',
        path: '/login',
        enabled: true,
        component: Login
    },
    {
        key: 'details-route',
        title: 'Details',
        path: '/details',
        enabled: true,
        component: Details
    }
]