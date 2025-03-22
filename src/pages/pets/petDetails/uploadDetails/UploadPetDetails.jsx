import React, { useState } from "react";
// import { database, storage } from "../../appwriteConf/appwriteConfig";
import { useMutation, useQueryClient } from "react-query";
// import { ID } from "appwrite";
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert } from "@mui/material";
import { uploadPetDetailsData } from '../../../../../src/services/queryFunctions'

const UploadPetDetails = () => {

    const queryClient = useQueryClient();
    const [petData, setPetData] = useState({
        petid: "",
        category: "",
        name: "",
        weight:"",
        food:"",
        habits:""
       
    });
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const validateForm = () => {
        let tempErrors = {};
        if (!petData.petid.trim()) tempErrors.petid = "Pet ID is required";
        if (!petData.category.trim()) tempErrors.category = "Category is required";
        if (!petData.name.trim()) tempErrors.name = "Name is required";
        if (!image) tempErrors.image = "Image is required";
        if (!petData.food) tempErrors.food = "Food is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
      };
    
  const petDetailsMutation = useMutation(()=>uploadPetDetailsData(image,petData)
    ,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(process.env.REACT_APP_APPWRITE_PET_COLLECTION_ID);
        setPetData({ petid: "", category: "", name: "" , weight:"", food:"",  habits:"",});
        setImage(null);
        setErrors({});
        setSuccessMessage("Pet Details uploaded successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      },
    }
  );

  const handleChange = (e) => {
    setPetData({ ...petData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        petDetailsMutation.mutate();
    }
  };




    return (
        <div> <Container maxWidth="sm" sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#f5f5f5" }}>
              <Typography variant="h5" gutterBottom align="center">
                Upload Pet
              </Typography>
              {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
              <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField 
                  label="Pet ID" 
                  name="petid"
                  value={petData.petid} 
                  onChange={handleChange} 
                  required 
                  fullWidth 
                  error={!!errors.petid}
                  helperText={errors.petid}
                />
                <TextField 
                  label="Category" 
                  name="category"
                  value={petData.category} 
                  onChange={handleChange} 
                  required 
                  fullWidth 
                  error={!!errors.category}
                  helperText={errors.category}
                />
                <TextField 
                  label="Name" 
                  name="name"
                  value={petData.name} 
                  onChange={handleChange} 
                  required 
                  fullWidth 
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField 
                  label="Weight" 
                  name="weight"
                  value={petData.weight} 
                  onChange={handleChange} 
                  required 
                  fullWidth 
                  error={!!errors.weight}
                  helperText={errors.weight}
                />
                 <TextField 
                  label="Food" 
                  name="food"
                  value={petData.food} 
                  onChange={handleChange} 
                  required 
                  fullWidth 
                  error={!!errors.food}
                  helperText={errors.food}
                />
                <TextField 
                  label="Habits" 
                  name="habits"
                  value={petData.habits} 
                  onChange={handleChange} 
                  required 
                  fullWidth 
                  error={!!errors.habits}
                  helperText={errors.habits}
                />
                <TextField 
                  type="file" 
                  onChange={(e) => setImage(e.target.files[0])} 
                  required 
                  fullWidth 
                  error={!!errors.image}
                  helperText={errors.image}
                />
                <Button type="submit" variant="contained"sx={{borderRadius:"30px", background: "rgb(63, 57, 113)"}}  disabled={petDetailsMutation.isLoading} fullWidth>
                  {petDetailsMutation.isLoading ? <CircularProgress size={24} /> : "Upload Pet"}
                </Button>
              </Box>
              {petDetailsMutation.error && (
                <Typography color="error" align="center" sx={{ mt: 2 }}>
                  Error: {petDetailsMutation.error.message}
                </Typography>
              )}
            </Container></div>
    )
}

export default UploadPetDetails