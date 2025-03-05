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

function LoginCart({handleContinue, email, setEmail, handleEmailChange, setEmailFound}) {
  return (
    <div className="w-[40%]">
      <AccordionDetails>
        <TextField
          fullWidth
          label="Enter Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          size="small" // Reduces the height
        />
        {/* <Divider className="my-4 w-full">Or</Divider>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<FcGoogle />}
        onClick={handleGoogleLogin}
        className="border-gray-300 normal-case"
      >
        Continue with Google
      </Button> */}
        <Button
          fullWidth
          variant="contained"
          className="mt-4 bg-orange-500 hover:bg-[#FFB255] normal-case"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </AccordionDetails>
    </div>
  );
}

export default LoginCart;
