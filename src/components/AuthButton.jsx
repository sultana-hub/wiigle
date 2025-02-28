

import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../hooks/useAuth";
import { Button, CircularProgress, Box } from "@mui/material";
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const AuthButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, isLoading } = useAuth();
  const { mutate: login, isLoading: isLoggingIn } = useLogin();
  const { mutate: logout, isLoading: isLoggingOut } = useLogout();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogout = () => {
    logout();
    window.sessionStorage.removeItem("token");
    navigate("/");
  };

  if (isLoading) return <CircularProgress size={24} />;

  return (
    <>
      {!user ? (
        <Button color="inherit">
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "inherit",
              border: location.pathname === "/login" ? "2px solid blue" : "none",
            }}
          >
            LogIn
          </Link>
        </Button>
      ) : (
        <Button
          color="inherit"
          onClick={handleLogout}
          disabled={isLoggingOut}
          sx={{
            border: location.pathname === "/profile" ? "2px solid blue" : "none",
          }}
        >
          <strong>{isLoggingOut ? <CircularProgress size={24} /> : "Logout"}</strong>
        </Button>
      )}
    </>
  );
};

export default AuthButton;