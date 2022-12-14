import React, { useState, useEffect } from "react";
import '../css/register.css';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ThirtyFpsOutlined } from "@mui/icons-material";

const StyledTextField = styled(TextField)`
  background: transparent;
  & label.Mui-focused {
    color: white;
  }
  & label {
    color: white;
  }
  & .MuiInput-underline:after {
    border-bottom-color: white;
  }
  & .MuiOutlinedInput-input{
    color:white;
  }
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: white;
    }
    &:hover fieldset {
      border-color: white;
    }
    &.Mui-focused fieldset {
      border-color: white;
      text-color: white;

    }
  }
`;


  const registerButtonSx = {
    boxShadow: 3,
    backgroundColor: "green",
    left: "15%", 
    bottom: "10%",
     width: "70%",
     position:"absolute",
    "&:hover": {
        backgroundColor: "green",
      boxShadow: 8,
    },
  };

function Register(){

  //const user = useUser();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRepassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  var error = useState("");

  function checkIfUserOrEmailAlreadyExists(){
    
  }
  
  function checkFields(){

  }

  function sendLoginRequest() {
  
   
      const reqBody = {
        name: name,
        surname: surname,
        username: username,
        password: password,
        email: email,
      };
  
      fetch("api/auth/register", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "post",
        withCredentials: "true",
        body: JSON.stringify(reqBody),
      })
        .then((response) => {
          if (response.status === 200) return response.text();
          
        })
        .then((data) => {
          if (data) {
           // user.setJwt(data);
            navigate("/login");
          }
        }).catch((error)=>{
          console.log(error);
        })
    
    
  }
    
    return(
        <div id="registerContainer">
        <div id = "registerPhoto">
            <div id="registerPhotoContainer"></div>
            <div id="registerText">“you can't get away from yourself by moving from one place to another.”</div>
        <div id="authorText">― Ernest Hemingway, The Sun Also Rises</div>
        </div>
        <div id="fieldsContainer">
    
            <StyledTextField 
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name" 
             label="Name"
              variant="outlined"
               required
               helperText = {error}
               sx={{
                left: "15%", 
                top: "20%", 
                width: "70%",
                position:"absolute"
                }} />
            <StyledTextField 
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            id="surname"  
            label="Surname" 
            variant="outlined" 
            required  
            sx={{
                left: "15%",
                top: "30%",
                width: "70%",
                position:"absolute"}} />
            <StyledTextField 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"  
            label="Email" 
            variant="outlined" 
            required  
            sx={{
              left: "15%",
              top: "40%",
              width: "70%",
              position:"absolute"}} />
            <StyledTextField 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="user"  
            label="Username" 
            variant="outlined"
            required  
            sx={{
              left: "15%",
               top: "50%",
              width: "70%",
              position:"absolute"}} />
            <StyledTextField 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password" 
            label="Password" 
            variant="outlined" 
            type={"password"} 
            required 
            hidden 
            sx={{
              left: "15%", 
              top: "60%", 
              width: "70%",
              position:"absolute"}}/>
            <StyledTextField 
            value={rePassword}
            onChange={(e) => setRepassword(e.target.value)}
            id="passwordAgain" 
            label="Confirm password" 
            variant="outlined" 
            type={"password"} 
            required 
            hidden 
            sx={{
              left: "15%", 
              top: "70%", 
              width: "70%",
              position:"absolute"}}/>
            <div id="terms">By registering you agree terms and conditions</div>
            <Button  
            onClick={() => sendLoginRequest()}
            variant="contained" 
            sx={registerButtonSx}>Register</Button>
            

            <div id="registerWelcome">GET STARTED</div>
            
        </div>
    </div>
);
}

export default Register;