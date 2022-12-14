import React from "react";
import "../css/home.css";
import Button from "@mui/material/Button";



function BlindPickStartButton() {
  return (
    <Button
      variant="outlined"
      sx={{
        width: "40%",
        position: "absolute",
        fontSize: "20px",
        bottom: "40%",
        left: "28%",
        color: "white",
        borderColor: "white",
        zIndex: "11",
      }}
    >
      Blind pick a book!
    </Button>
  );
}

function BlindPick() {
  return (
    <div id="blindPickContainer">
      <div id="blindCoverPhoto" />
      <div id="blindTitle">Can't decide over all that good reads?</div>
      <BlindPickStartButton/>
    </div>
  );
}

export default BlindPick;
