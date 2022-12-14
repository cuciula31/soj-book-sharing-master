import Cookies from "js-cookie";
import React from 'react';
import { Navigate } from 'react-router-dom';
import {useLocalState} from '../util/UseLocalState';

const PrivateRoute = ({children}) => {
const [user,setUser] = Cookies.get("user");
return user ? children : <Navigate to="/welcome"/>
};

export default PrivateRoute;