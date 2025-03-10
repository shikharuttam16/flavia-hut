import React, { useState } from "react";
import {
  TextField,
  Button,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

function PasswordCart({userMeta, password,setPassword,handleLogin, handlePasswordChange }) {
  return (
    <div className="w-[40%]">
    <AccordionDetails>
      {/* <h2 className="text-xl font-semibold mb-1">Welcome {userMeta.name}</h2> */}
      <TextField
        fullWidth
        label="Enter Password"
        variant="outlined"
        margin="normal"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        size="small" // Reduces the height
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin(e); // Replace this with your submit function
          }
        }}
      />
      <Button
        fullWidth
        variant="contained"
        className="mt-4 bg-orange-500 hover:bg-[#FFB255] normal-case"
        onClick={handleLogin}
      >
        Login
      </Button>
    </AccordionDetails>
  </div>
  );
}

export default PasswordCart;
