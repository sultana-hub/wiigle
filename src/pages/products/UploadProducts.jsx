

import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { uploadProductsData } from "../../services/queryFunctions";

const UploadProducts = () => {
  const queryClient = useQueryClient();

  const [products, setProducts] = useState({
    product_id: "",
    product_brand: "",
    price: "",
    pet_id: "",
    rating: 5,
    prod_desc: "",
    quantity: 0,
    weight: "",
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    let tempErrors = {};

    if (!products.product_id.trim()) tempErrors.product_id = "Product ID is required";
    if (!products.product_brand.trim()) tempErrors.product_brand = "Product brand is required";
    if (!products.prod_desc.trim()) tempErrors.prod_desc = "Description is required";
    if (!products.price.trim()) tempErrors.price = "Price is required";
    if (!products.pet_id.trim()) tempErrors.pet_id = "Pet ID is required";
    if (products.quantity <= 0) tempErrors.quantity = "Quantity must be greater than 0";
    if (!products.weight.trim()) tempErrors.weight = "Weight is required";
    if (!image) tempErrors.image = "Image is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const uploadProductMutation = useMutation(
    () => uploadProductsData(image, { ...products, quantity: parseInt(products.quantity, 10) || 0 }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(process.env.REACT_APP_APPWRITE_PET_COLLECTION_ID);
        setProducts({
          product_id: "",
          product_brand: "",
          price: "",
          pet_id: "",
          rating: 5,
          prod_desc: "",
          quantity: 0,
          weight: "",
        });
        setImage(null);
        setErrors({});
        setSuccessMessage("Product uploaded successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProducts((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      uploadProductMutation.mutate();
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "#f5f5f5" }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Upload Product
      </Typography>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Product ID"
          name="product_id"
          value={products.product_id}
          onChange={handleChange}
          required
          fullWidth
          error={!!errors.product_id}
          helperText={errors.product_id}
        />
        <TextField
          label="Product Brand"
          name="product_brand"
          value={products.product_brand}
          onChange={handleChange}
          required
          fullWidth
          error={!!errors.product_brand}
          helperText={errors.product_brand}
        />
        <TextField
          label="Description"
          name="prod_desc"
          multiline
          rows={3}
          value={products.prod_desc}
          onChange={handleChange}
          required
          fullWidth
          error={!!errors.prod_desc}
          helperText={errors.prod_desc}
        />
        <TextField
          label="Price"
          name="price"
          value={products.price}
          onChange={handleChange}
          required
          fullWidth
          error={!!errors.price}
          helperText={errors.price}
        />
        <TextField
          label="Pet ID"
          name="pet_id"
          value={products.pet_id}
          onChange={handleChange}
          required
          fullWidth
          error={!!errors.pet_id}
          helperText={errors.pet_id}
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={products.quantity}
          onChange={handleChange}
          required
          fullWidth
          error={!!errors.quantity}
          helperText={errors.quantity}
        />
        <TextField
          label="Weight"
          name="weight"
          value={products.weight}
          onChange={handleChange}
          required
          fullWidth
          error={!!errors.weight}
          helperText={errors.weight}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: "30px", background: "rgb(63, 57, 113)" }}
          disabled={uploadProductMutation.isLoading}
          fullWidth
        >
          {uploadProductMutation.isLoading ? <CircularProgress size={24} /> : "Upload Product"}
        </Button>
      </Box>
      {uploadProductMutation.error && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          Error: {uploadProductMutation.error.message}
        </Typography>
      )}
    </Container>
  );
};

export default UploadProducts;
