import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Divider,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SummaryApi from "../common";
import { FcGoogle } from "react-icons/fc";
import CustomTextField from "./CustomTextField";
import LoginCart from "./LoginCart";
import PasswordCart from "./PasswordCart";
import Context from "../context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import RegistrationCart from "./RegistrationCart";
import { useNavigate } from "react-router-dom";

const LoginSignupCart = ({setAddressAvailable}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword ] = useState("");
  const [name, setName] = useState("");
  const [emailfound, setEmailFound] = useState(false);
  const [requiredRegistration,setRequiredRegistration] = useState(false)
  const [userMeta, setUserMeta] = useState({})
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { fetchUserDetails, fetchUserAddToCart,fetchCartData } = useContext(Context);
  const [expanded, setExpanded] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email:email,
        password:password
      }),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      // toast.success(dataApi.message);
      // console.log("---------------UUUUUUUUserrr data",dataApi);
      
      // navigate("/admin-panel/all-products");
      await fetchUserDetails();
      await fetchUserAddToCart();
      await fetchCartData()
      window.location.reload();
      setAddressAvailable(true)
      
    }

    if (dataApi.error) {
      
    }
  };


  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleContinue = async () => {
    // console.log("Email:", email);
    try {
      const response = await fetch(`${SummaryApi.checkEmail.url}`, {
        method: `${SummaryApi.checkEmail.method}`,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for handling cookies (JWT token)
        body: JSON.stringify({ email }), // Replace with actual password input
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // console.log("Data on e");
        setUserMeta({
          name:data.name,
          email:email
        })
        setEmailFound(true)
        // toast.success(`Welcome ${data.name}`);

        // console.log("Login successful:", data);
        // Store token in localStorage or state if needed
        // localStorage.setItem("token", data.data);
        // alert("Login Successful!");
      } else {
        // console.error("Login failed:", data.message);
        setRequiredRegistration(true)
        // toast.error("Email not found!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.signUP.url, {
      method: SummaryApi.signUP.method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,email,password
      }),
    });
    const result = await response.json();
    if (result.success) {
      toast.success("Registration completed! Please Login to continue");
      setRequiredRegistration(false)
    } else {
      toast.error(result.message);
    }
  }
  

  const handleGoogleLogin = () => {
    // console.log("Continue with Google");
  };

  return (
    <div className="w-full  md:px-0  mx-auto">
      <Accordion
        expanded={expanded}
        onChange={(_, isExpanded) => setExpanded(isExpanded)}
        className="shadow-lg rounded-lg w-full"
        sx={{ width: "100%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-[#3271ff]" />}
          sx={{
            bgcolor: expanded ? "#3271ff" : "transparent",
            color: expanded ? "white" : "#76808f",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            minHeight: "40px",
            "& .MuiAccordionSummary-content": { marginY: "0px" },
            "&.Mui-expanded": { minHeight: "40px", marginY: "0px" },
          }}
        >
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            <span
              className={`${
                expanded
                  ? "text-[#3271ff] bg-white"
                  : "text-[#3271ff] bg-[#f4f7f7]"
              } border py-1 px-1.5 rounded-[4px] mr-2`}
            >
              1
            </span>
            Login or Sign Up
          </Typography>
        </AccordionSummary>
      { 
      !emailfound ?
      !requiredRegistration ?
      <LoginCart handleContinue={handleContinue} email={email} setEmail={setEmail} handleEmailChange={handleEmailChange}  /> :
      <RegistrationCart
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      name={name}
      setName={setName}
      handleRegistration={handleRegistration}
      />
      :userMeta?.name && <PasswordCart  password={password} userMeta={userMeta} setPassword={setPassword} handleLogin={handleLogin} handlePasswordChange={handlePasswordChange} />
      }
      </Accordion>
    </div>
  );
};

export default LoginSignupCart;
