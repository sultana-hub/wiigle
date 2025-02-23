import React, { useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Container, Button, Typography, CircularProgress } from "@mui/material";
import { useLogin } from "../hooks/useLogin";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
 const navigate=useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const { mutate, isLoading, isError, error, data } = useLogin();
  

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({ email, password })
        navigate("/")

    };



    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ mt: 10, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
                    <Typography variant="h5" align="center" gutterBottom>
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
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                        // InputProps={{
                        //     endAdornment: (
                        //       <InputAdornment position="end">
                        //         <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        //           {showPassword ? <VisibilityOff /> : <Visibility />}
                        //         </IconButton>
                        //       </InputAdornment>
                        //     ),
                        //   }}
                        />


                        <Button type="submit" variant="contained" fullWidth disabled={isLoading}
                            sx={{ mt: 2, borderRadius: "50px", bgcolor: "#4ca86c", color: "white", "&:hover": { bgcolor: "darkgreen" } }}>
                            {isLoading ? <CircularProgress size={24} /> : "Login"}
                        </Button>
                    </form>
                    <br/>
                        <Box sx={{textAlign:"center"}}><Typography>New user go to<Link to="/signup" style={{textDecoration:"none"}}><span> Signup</span></Link></Typography></Box>
                    {isError && <Typography color="error">InValid Credential</Typography>}
                  
                    {/* {data && <Typography color="success.main">Logged in! User ID: {data?.userId}</Typography>} */}
                </Box>
            </Container>
        </>
    )
}

export default LogIn