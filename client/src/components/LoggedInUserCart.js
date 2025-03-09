import React from "react";
import { Card, Typography, Button, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SummaryApi from "../common";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

function LoggedInUserCard({ user }) {
  const dispatch = useDispatch()
  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Logout failed: ${response.statusText}`);
      }

      const data = await response.json();
      // console.log("Logout successful", data);

      // Perform additional actions like clearing tokens and redirecting
      localStorage.removeItem("authToken"); // Adjust based on your auth mechanism
      sessionStorage.clear();
      // window.location.reload();
      localStorage.removeItem('cart');
      window.location.href = "/"; // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          // flexDirection:"column",
        //   alignItems: "center",
        //   justifyContent: "space-between",
          flexDirection: "column",
          padding: "12px",
          width: "100%",
          borderRadius: "8px",
          borderColor: "#90CAF9", // Light blue border as seen in the image
          boxShadow: "0 0 0 2px rgba(33, 150, 243, 0.5)", // Outer blue glow effect
          textAlign:'left'
        }}
      >
        {/* Left Section: Step Number + Text */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width:'100%'
          }}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            color="text.secondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Box
            sx={{
              width: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#E3F2FD", // Light blue background
              borderRadius: "50%",
              fontSize: 12,
              fontWeight: "bold",
              color: "#1E88E5", // Blue text
              mr: 1,
            }}
          >
            1
          </Box>
            Login{" "}
            <CheckCircleIcon sx={{ color: "#1E88E5", ml: 0.5, fontSize: 18 }} />
          </Typography>

          {/* Right: Change Button */}
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "#1E88E5", // Blue text
              borderColor: "#1E88E5", // Blue border
              fontWeight: "bold",
              fontSize: 14,
              padding: "4px 12px",
            }}
            onClick={()=>{
              handleLogout()
              dispatch(setUserDetails(null));
            }}
          >
            Logout
          </Button>
        </Box>

        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", textAlign: "left", ml: 2 }}
        >
          {user?.user?.name}
        </Typography>
      </Card>
      {/* Center: User Name */}
    </>
  );
}

export default LoggedInUserCard;
