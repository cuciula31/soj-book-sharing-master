import  React, { useState } from "react";
import { AppBar } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import jwt from "jwt-decode";
import Cookies from "js-cookie";
import { useLocalState } from "../util/UseLocalState";
import Wishlist from "../pages/Wishlist";

const buttonSx = {
  color: "white",
  fontFamily: "impact",
  fontSize: "25px",
};

function Navbar() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const currentUser = jwt(Cookies.get("user"));
  const userId = currentUser.id;

  const [books, setBooks] = useLocalState("", "books");

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function saveBooksToCookies() {
    fetch("http://localhost:8080/api/users/" + userId + "/books", {
      headers: {
        "Content-type": "application/json",
        'Access-Control-Allow-Credentials': 'true',
      },
      method: "get",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
       setBooks(data, "books");
      });

  }

  return (
    <AppBar
      sx={{
        zIndex: "20",
        position: "fixed",
        width: "100%",
        height: "5%",
        backgroundColor: "black",
      }}
    >
      <IconButton
        size="large"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle
          sx={{
            position: "absolute",
            fontSize: "45px",
            top: "5%",
            right: "5%",
          }}
        />
      </IconButton>
      <div
        style={{
          position: "absolute",
          color: "white",
          top: "7%",
          left: "2%",
          fontSize: "30px",
          fontFamily: "impact",
        }}
      >
        StoryTeller
      </div>
      <div
        id="buttonContainer"
        style={{ position: "absolute", left: "42%", bottom: "-8%" }}
      >
        <Button href="/" sx={buttonSx}>
          Home
        </Button>
        <Button href="/explore" sx={buttonSx}>
          Explore
        </Button>
        <Button href="rentals" sx={buttonSx}>
          Rentals
        </Button>
      </div>

      <Menu
        id="menu-appbar"
        getContentAnchorEl={null}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          top: "4%",
          left: "-3%",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{
          handleClose();
         saveBooksToCookies();
        }} component={Link} to="/myaccount">
          My account
        </MenuItem>
        <MenuItem onClick={()=>{
          handleClose();
          saveBooksToCookies();
        }} component={Link} to="/mybooks">
          My books
        </MenuItem>
        <MenuItem onClick={handleClose} component = {Link} to = "/wishlist">Wishlist</MenuItem>
        <MenuItem onClick={handleClose}>Log out</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar;
