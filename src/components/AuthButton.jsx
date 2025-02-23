
import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../hooks/useAuth";
import { Button, CircularProgress, Box } from "@mui/material";
import { useLogout } from "../hooks/useLogout";

import { Link } from "react-router-dom";

const AuthButton = () => {

    const { data: user, isLoading } = useAuth();
    const { mutate: login, isLoading: isLoggingIn } = useLogin();
    const { mutate: logout, isLoading: isLoggingOut } = useLogout();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle login submission
    const handleLogin = (e) => {
        e.preventDefault();
        login({ email, password });
    };

    // Handle logout
    const handleLogout = () => {
        logout();
    };
    // Show loading while checking auth status
    if (isLoading) return <CircularProgress size={24} />;

    return (
        <>
            {!user ? (
                // Show Login Form when user is not logged in
                <Button color="inherit" ><Link to="login" style={{textDecoration:"none",color:"inherit" }}>LogIn</Link></Button>

            )

                :


                (
                    // Show Logout Button when user is logged in
                 
                  
                    <Button  color="error" onClick={handleLogout} disabled={isLoggingOut}>
                       <strong> {isLoggingOut ? <CircularProgress size={24} /> : "Logout"}</strong>
                    </Button>
                    
                )
            }
        </>
    );
};
export default AuthButton;