import React, { useState, useEffect } from "react";
import {
  Container, TextField, Button, Typography, Box, Alert, MenuItem, Select,
  FormControl, InputLabel, Chip, OutlinedInput
} from "@mui/material";
import { useMutation } from "react-query";
// import { ID } from "appwrite";
// import { database } from "../../appwriteConf/appwriteConfig";
import { useAuth } from "../../hooks/useAuth";
import { postService } from "../../services/queryFunctions";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import Swal from "sweetalert2";
const availableServices = [
  "General Checkup",
  "Vaccination",
  "Grooming & Hygiene",
  "Emergency Care"
];

const TakeAppointment = () => {
  const navigate = useNavigate()
  const { data: user } = useAuth()
  const userId = user?.$id;


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    service: [],// Multi-select services
    userid: "",
    status: ""
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {

    setFormData((prevData) => ({
      ...prevData,
      email: user?.email || "",
      userid: userId,
      status: "Pending"
    }));
  }, [user?.email, userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "service" ? (Array.isArray(value) ? value : [value]) : value,
      email: prevData.email,  //  Preserve userEmail
      userid: prevData.userid,
       status: "Pending"
    }));
  };
  const { mutate } = useMutation(postService, {
    onSuccess: (data) => {

      Swal.fire({
        icon: "success",
        title: "Appointment Done Successfully",
        text: "we will send you details on your registered email",

      });

      // alert("Reques submitted")
      navigate("/vet")
      console.log("mutation success", data)
    },
    onError: (error) => {
      console.log("mutation error", error)
    }
  })


  const validateForm = () => {
    let newErrors = {};
    if (formData.name?.trim().length < 3) newErrors.name = "Name must be at least 3 characters.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format.";
    if (!formData.date) newErrors.date = "Please select a date.";
    else if (new Date(formData.date) < new Date()) newErrors.date = "Date must be in the future.";
    // if (formData.service?.length === 0) newErrors.services = "Select at least one service.";
    if (formData.service?.length === 0) {
      newErrors.service = "Select at least one service.";
    } else if (formData.service?.join(", ").length > 50) {
      newErrors.service = "Selected services exceed 50 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting Form Data:", formData);
    if (!validateForm()) return;
    mutate(formData)
  };
  if (!user) {
    return (
      <ErrorPage />
    )
  }



  return (
    <Container maxWidth="sm" sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
        Book an Appointment
      </Typography>

      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>

       

        <TextField
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="Full Name"

          fullWidth
          margin="normal"
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          name="email"
          value={user?.email}
          onChange={handleChange}
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          required
        //  error={!!errors.email}
        //   helperText={errors.email}
        />
        <TextField
          name="date"
          value={formData.date}
          onChange={handleChange}
          // label="Appointment Date"
          type="date"
          fullWidth
          margin="normal"
          required
          sx={{ '& input': { minWidth: 200 } }}
          error={!!errors.date}
          helperText={errors.date}
        />

        {/* Multi-select Service Dropdown */}
        {/* <FormControl fullWidth margin="normal" error={!!errors.services}>
          <InputLabel>Select Services</InputLabel>
          <Select
            multiple
            name="service"
            value={formData.service}
            onChange={handleChange}
            input={<OutlinedInput label="Select Services" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {availableServices.map((service) => (
              <MenuItem key={service} value={service}>
                {service}
              </MenuItem>
            ))}
          </Select>
          {errors.services && <Typography color="error">{errors.services}</Typography>}
        </FormControl> */}

        <FormControl fullWidth margin="normal" error={!!errors.service}>
          <InputLabel>Select Services</InputLabel>
          <Select
            multiple
            name="service"
            value={formData.service}
            onChange={(event) => {
              const value = event.target.value;
              setFormData((prevData) => ({
                ...prevData,
                service: typeof value === "string" ? value.split(",") : value, // This Ensures array format
              }));
            }}
            input={<OutlinedInput label="Select Services" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((service) => (
                  <Chip
                    key={service}
                    label={service}
                    onDelete={() => {
                      setFormData((prevData) => ({
                        ...prevData,
                        service: prevData.service?.filter((s) => s !== service), // Remove selected item
                      }));
                    }}
                  />
                ))}
              </Box>
            )}
          >
            {availableServices.map((service) => (
              <MenuItem
                key={service}
                value={service}
                onClick={() => {
                  setFormData((prevData) => {
                    const isSelected = prevData.service?.includes(service);
                    return {
                      ...prevData,
                      services: isSelected
                        ? prevData.service?.filter((s) => s !== service) // Deselect if already selected
                        : [...prevData.service, service], // Select if not selected
                    };
                  });
                }}
              >
                {service}
              </MenuItem>
            ))}
          </Select>
          {errors.services && <Typography color="error">{errors.services}</Typography>}
        </FormControl>
        <TextField
          type="hidden"
          name="userid"
          value={userId}
        />
        <TextField
          type="hidden"
          name="status"
          value="pending"
        />

        <Button type="submit" variant="contained" fullWidth sx={{ borderRadius: "30px", backgroundColor: "#000033" }} >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default TakeAppointment;
