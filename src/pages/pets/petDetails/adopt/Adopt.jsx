

import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import ErrorPage from "../../../ErrorPage";
import {
  Container,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { postAdoption } from "../../../../services/queryFunctions";
// import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import styles for phone input
import Swal from "sweetalert2";
const Adopt = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: user } = useAuth();
  const userId = user?.$id;
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    petid: "",
    desc: "",
    agree: false,
    status: "pending",
    userid: "",
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      email: user?.email || "",
      petid: id || "",
      status: "pending",
      userid: userId,
    }));
  }, [user?.email, id, userId]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const { mutate, isLoading } = useMutation(postAdoption, {
    onSuccess: () => {
       Swal.fire({
               
                text: "Request Submitted!",
                icon: "success"
              });
      navigate("/");
    },
    onError: (error) => {
      console.log("Mutation error", error);
    },
  });
 // Regular Expression for phone number validation
 const phoneRegex =  /^\+91[6789]\d{9}$/; 
  // Form validation
  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullname) newErrors.fullname = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!phoneRegex.test(formData.phone))
        newErrors.phone = "Enter a valid phone number with country code (e.g., +919456789023)";
    if (!formData.address) newErrors.address = "Address is required";
    if (formData.desc.length < 10)
      newErrors.desc = "Description should be at least 10 characters";
    if (!formData.agree) newErrors.agree = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    mutate(formData);
  };

  if (!user) {
    return <ErrorPage />;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: "30px", marginBottom: "30px" }}>
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
        <Typography variant="h4" align="center" gutterBottom>
          🐾 Pet Adoption Form 🏡
        </Typography>
        <Typography variant="body1" align="center" gutterBottom padding={1} marginBottom={2}>
          Choose your furry friend and complete the adoption process!
        </Typography>

        <form onSubmit={handleSubmit} id="adoptForm">
          {/* Full Name */}
          <TextField
            fullWidth
            label="Full Name"
            name="fullname"
            variant="outlined"
            margin="normal"
            value={formData.fullname}
            onChange={handleChange}
            error={!!errors.fullname}
            helperText={errors.fullname}
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            disabled
          />

          {/* Phone Number with Country Code */}
          <TextField
    fullWidth
    label="Phone Number"
    name="phone"
    type="text"
    variant="outlined"
    margin="normal"
    value={formData.phone}
    onChange={(e) => {
        let value = e.target.value;

        // Ensure only `+` and digits are allowed
        value = value.replace(/(?!^\+)[^0-9]/g, "");

        setFormData((prevData) => ({
            ...prevData,
            phone: value,
        }));
    }}
    error={!!errors?.phone}
    helperText={errors?.phone}
/>

          {/* Address */}
          <TextField
            fullWidth
            label="Address"
            name="address"
            multiline
            variant="outlined"
            margin="normal"
            rows={2}
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
          />

          {/* Pet ID */}
          <TextField fullWidth label="Pet ID" name="petid" variant="outlined" value={id} disabled />

          {/* Adoption Reason */}
          <TextField
            fullWidth
            label="Why do you want to adopt?"
            name="desc"
            multiline
            rows={3}
            variant="outlined"
            margin="normal"
            value={formData.desc}
            onChange={handleChange}
            error={!!errors.desc}
            helperText={errors.desc}
          />

          {/* Hidden Fields */}
          <TextField fullWidth type="hidden" name="status" value="pending" />
          <TextField fullWidth type="hidden" name="userid" value={userId} />

          {/* Agree to Terms */}
          <FormControlLabel
            control={
              <Checkbox
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                color="primary"
              />
            }
            label="I agree to the adoption terms and conditions."
          />
          {errors.agree && (
            <Typography color="error" variant="caption">
              {errors.agree}
            </Typography>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ borderRadius: "30px", backgroundColor: "#000033" }}
            disabled={isLoading}
          >
            Submit Adoption Form
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Adopt;

