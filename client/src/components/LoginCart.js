import React, { useState } from "react";
import {
  TextField,
  Button,
  AccordionDetails,
  Typography,
} from "@mui/material";

function LoginCart({ handleContinue, email, setEmail, handleEmailChange }) {
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = () => {
    if (validateEmail(email)) {
      handleContinue();
    } else {
      setEmailError("Please enter a valid email address");
    }
  };

  return (
    <div className="w-[40%]">
      <AccordionDetails>
        <TextField
          required
          type="email"
          fullWidth
          label="Enter Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(""); // Clear error while typing
          }}
          onBlur={handleBlur}
          error={!!emailError}
          helperText={emailError}
          size="small"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <Button
          fullWidth
          variant="contained"
          className="mt-4 bg-orange-500 hover:bg-[#FFB255] normal-case"
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </AccordionDetails>
    </div>
  );
}

export default LoginCart;
