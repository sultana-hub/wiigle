
import React from "react";
import { useLogout } from "../pages/logout/useLogout";
import { useAuth } from "../routing/useAuth";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { data: user, isLoading } = useAuth();
  const { mutate, isLoading: isLoggingOut } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  // Hide button if user is not logged in or still loading
  if (isLoading || !user) return null;

  return (
    <Button variant="contained" color="error" onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? <CircularProgress size={24} /> : "Logout"}
    </Button>
  );
};

export default LogoutButton;