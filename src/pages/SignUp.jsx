import { useState } from "react";
import { useRegisterUser } from "../hooks/useRegitration";
import { ID } from "appwrite";
import { useNavigate } from "react-router-dom";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Container, Button, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const SignUp = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isLoading, isError, error, isSuccess } = useRegisterUser();

  const handleRegister = (e) => {
    e.preventDefault();
    mutate({
      userId: ID.unique(), // Generates a unique user ID
      email,
      password,
      name,
    });
    // Swal.fire({
    //   title: "Good job!",
    //   text: "Registered Successfully!",
    //   icon: "success"
    // });
    document.getElementById("regisForm").reset()
    setTimeout(()=>{
      navigate("/login")
    },1000)
   
  };

  return (
    <div>
      
    
      <Container maxWidth="sm">
        <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
        {isError && <p>Error: {error.message}</p>}
        {isSuccess && <p>Registration successful!</p>}
          <Typography variant="h5" align="center" gutterBottom>
            Registration
          </Typography>
          <form onSubmit={handleRegister} id="regisForm">

            <TextField
               type="text"
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!error?.name}
              helperText={error?.name}
            />



            <TextField
               type="email"
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error?.email}
              helperText={error?.email}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error?.password}
              helperText={error?.password}
             
            />
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2,borderRadius: "50px",bgcolor: "rgb(77, 73, 116)", color: "white", "&:hover": { bgcolor: "rgb(43, 36, 109)" }}}>
              Register
            </Button>
          </form>
<br/>
<Box sx={{textAlign:"center"}}><Typography>Existing user go to<Link to="/login" style={{textDecoration:"none"}}><span> Login</span></Link></Typography></Box>


        </Box>
      </Container>


    </div>
  );
};

export default SignUp;
