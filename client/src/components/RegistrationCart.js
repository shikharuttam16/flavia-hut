import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

function RegistrationCart({ email, setEmail, password, setPassword, name, setName,handleRegistration}) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!name) tempErrors.firstName = "Full Name is required";
    if (!email) {
      tempErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "Enter a valid email";
    }
    if (!password) {
      tempErrors.password = "Password is required";
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    if (validate()) {
        handleRegistration(e);
    }
  };

  return (
    <Box className="w-full p-6 bg-white rounded-lg shadow-md border">
      {/* Input Fields */}
      <Box className="p-6 grid grid-cols-2 gap-4">
        <TextField
          fullWidth
          label="Full Name"
          variant="outlined"
          size="small"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          fullWidth
          label="Create Password"
          type="password"
          variant="outlined"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
        />
      </Box>

      {/* Submit Button */}
      <Box className="px-6 pb-6 flex justify-start">
        <Button
          variant="contained"
          className="bg-orange-500 hover:bg-[#FFB255] normal-case whitespace-nowrap"
          onClick={handleSubmit}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
}

export default RegistrationCart;