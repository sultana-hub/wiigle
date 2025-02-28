
import { useState, useMemo } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Typography,
  Alert,
  TextField,
  Box,
  IconButton,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { account } from "../../appwriteConf/appwriteConfig";
import { ID } from "appwrite";
import SuccessToast from "../../components/SuccessToast";
import Swal from "sweetalert2";
const SignUp = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for error messages
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validator function
  const validator = () => {
    if (!formData.name) return "Name is required.";
    if (!formData.email) return "Email is required.";
    if (!formData.email.match(/^([a-z0-9.-]+)@([a-z]{5,12}).([a-z.]{2,20})$/)) return "Email must be valid";
    if (formData.password.length < 8) return "Password must be at least 8 characters.";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match.";
    return ""; // No errors
  };

  // Checking if the form is valid using useMemo (for performance optimization)
  const isFormValid = useMemo(() => validator() === "", [formData]);

  // React Query Mutation for registration
  const mutation = useMutation(async () => {
    const response = await account.create(ID.unique(), formData.email, formData.password, formData.name);
    console.log("User registered:", response);
    return response;
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validator();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(""); // Clear previous errors

    mutation.mutate(undefined, {
      onSuccess: () => {
       
        // <SuccessToast/>
        Swal.fire({
          title: "Good job!",
          text: "Registration done!",
          icon: "success"
        });
        navigate("/login");
      },
      onError: (err) => {
        setError(err.message);
      },
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Typography variant="h5" align="center" gutterBottom color="rgb(63, 57, 113)">
          Registration
        </Typography>
        <form onSubmit={handleSubmit} id="regisForm">
          <TextField
            fullWidth
            label="Name"
            name="name"
            variant="outlined"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="new-email"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, borderRadius: "50px", bgcolor: "#000033", color: "white", "&:hover": { bgcolor: "rgb(43, 36, 109)" } }}
          >
            Register
          </Button>
        </form>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography>
            Existing user? <Button onClick={() => navigate("/login")}>Login</Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
