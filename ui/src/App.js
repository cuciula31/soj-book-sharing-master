import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Welcome from "./pages/Welcome";
import MyAccount from "./pages/MyAccount";
import MyBooks from "./pages/MyBooks";
import AddNewBook from "./pages/AddNewBook";
import jwt from "jwt-decode";
import Cookies from "js-cookie";
import MyRentals from "./pages/MyRentals";
import Explorer from "./pages/Explorer";
import MyBook from "./pages/MyBook";
import RentalSuccess from "./pages/RentalSuccess";
import Wishlist from "./pages/Wishlist";

// import Contact from './pages/contact';

function App() {
  const [roles, setRoles] = useState([]);
  const user = Cookies.get("user");

  useEffect(() => {
    setRoles(getRolesFromJWT());
  }, [user]);

  function getRolesFromJWT() {
    if (user) {
      const decodedJwt = jwt(user);
      return decodedJwt.authorities;
    }
    return [];
  }

  return (
    <Routes>
      <Route exact path="/" element={user ? <Home /> : <Welcome />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />

      <Route exact path="/home" element={<Home />} />
      <Route
        exact
        path="/myaccount"
        element={user ? <MyAccount /> : <Welcome />}
      />
      <Route exact path="/mybooks" element={user ? <MyBooks /> : <Welcome />} />

      <Route
        exact
        path="/addbook"
        element={user ? <AddNewBook /> : <Welcome />}
      />
      <Route
        exact
        path="/rentals"
        element={user ? <MyRentals /> : <Welcome />}
      />

      <Route
        exact
        path="/explore"
        element={user ? <Explorer /> : <Welcome />}
      />

      <Route
        exact
        path="/wishlist"
        element={user ? <Wishlist /> : <Welcome />}
      />

      <Route exact path="/mybook" element={user ? <MyBook /> : <Welcome />} />

      <Route
        exact
        path="/success"
        element={user ? <RentalSuccess /> : <Welcome />}
      />

      <Route exact path="/welcome" element={<Welcome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
