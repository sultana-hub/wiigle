import React, { useState } from "react";
import { database, storage } from "../../appwriteConf/appwriteConfig";
import { useMutation, useQueryClient } from "react-query";
import { ID } from "appwrite";
import { Container, TextField, Button, Typography, Box, CircularProgress, Alert } from "@mui/material";

const UploadPets = () => {
  const queryClient = useQueryClient();
  const [petData, setPetData] = useState({ petid: "", category: "", desc: "" });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    let tempErrors = {};
    if (!petData.petid.trim()) tempErrors.petid = "Pet ID is required";
    if (!petData.category.trim()) tempErrors.category = "Category is required";
    if (!petData.desc.trim()) tempErrors.desc = "Description is required";
    if (!image) tempErrors.image = "Image is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const uploadPetMutation = useMutation(
    async () => {
      if (!image) throw new Error("Please select an image");

      const file = await storage.createFile(
        process.env.REACT_APP_APPWRITE_PET_IMAGE_STORAGE_ID,
        ID.unique(),
        image
      );
      const imageId = file.$id;

      await database.createDocument(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_APPWRITE_PET_COLLECTION_ID,
        ID.unique(),
        { ...petData, imageId }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(process.env.REACT_APP_APPWRITE_PET_COLLECTION_ID);
        setPetData({ petid: "", category: "", desc: "" });
        setImage(null);
        setErrors({});
        setSuccessMessage("Pet uploaded successfully!");
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
      uploadPetMutation.mutate();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#f5f5f5" }}>
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
          label="Description" 
          name="desc"
          multiline 
          rows={3} 
          value={petData.desc} 
          onChange={handleChange} 
          required 
          fullWidth 
          error={!!errors.desc}
          helperText={errors.desc}
        />
        <TextField 
          type="file" 
          onChange={(e) => setImage(e.target.files[0])} 
          required 
          fullWidth 
          error={!!errors.image}
          helperText={errors.image}
        />
        <Button type="submit" variant="contained"sx={{borderRadius:"30px", background: "rgb(63, 57, 113)"}}  disabled={uploadPetMutation.isLoading} fullWidth>
          {uploadPetMutation.isLoading ? <CircularProgress size={24} /> : "Upload Pet"}
        </Button>
      </Box>
      {uploadPetMutation.error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          Error: {uploadPetMutation.error.message}
        </Typography>
      )}
    </Container>
  );
};

export default UploadPets;