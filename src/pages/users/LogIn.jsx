
import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Container,
  Button,
  Typography,
  CircularProgress,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLogin } from "../../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const { mutate, isLoading, isError } = useLogin();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   mutate({ email, password });
  //   navigate("/");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors
  
    mutate(
      { email, password },
      {
        onSuccess: () => {
             Swal.fire({
                   
                    text: "Login Successfull!",
                    icon: "success"
                  });
          navigate("/");
        },
        onError: (error) => {
          setErrors({ general: error.message || "Invalid Credentials" });
        },
      }
    );
  };


  return (
    <Container maxWidth="sm" sx={{ p: 5 }}>
      <Box
        sx={{
          mt: 5,
          pb: 5,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "white",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom color="rgb(63, 57, 113)">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            autoComplete="new-email"
          />
          
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 2,
              borderRadius: "50px",
              bgcolor: "#000033",
              color: "white",
              "&:hover": { bgcolor: "rgb(43, 36, 109)" },
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
        <br />
        <Box sx={{ textAlign: "center" }}>
          <Typography>
            New user? Please
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <span> Signup</span>
            </Link>
          </Typography>
        </Box>
        {isError && <Typography color="error">Invalid Credentials</Typography>}
      </Box>
    </Container>
  );
};

export default LogIn;
