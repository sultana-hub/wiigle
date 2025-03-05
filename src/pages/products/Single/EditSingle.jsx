import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchProductById, updateProduct } from '../../../services/queryFunctions';
import { TextField, Button, Container, Typography, CircularProgress, Box } from '@mui/material';

const EditSingle = () => {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Fetch product details
    const { data: product, isLoading, isError } = useQuery(["product", id], () => fetchProductById(id));
console.log("single product for update",product)
    // Local state for form fields
    const [formData, setFormData] = useState({
        price: "",
        quantity:"",
    });

    // Set form data when product is fetched
    useEffect(() => {
        if (product) {
            setFormData({
                price: product?.price?.toString().trim() || "", 
                quantity: product?.quantity?.toString() || "",  // Ensure quantity is a string for the input field
            });
    
            console.log("Setting formData:", {
                price: product?.price?.toString().trim(),
                quantity: product?.quantity?.toString(),
            });
        }
    }, [product]);
    

    // Mutation for updating product
    const updateMutation = useMutation(updateProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries("products"); // Refresh product list
            alert("Product updated successfully!");
            navigate("/product"); // Redirect to product page
        },
        onError: (error) => {
            alert(`Failed to update product: ${error.message}`);
        }
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "quantity" ? parseInt(value) : value,  // Convert quantity to number
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        console.log("Submitting update:", { 
            id, 
            price: formData.price, 
            quantity: parseInt(formData.quantity)  // Ensure it's a number
        });
    
        updateMutation.mutate({ 
            id, 
            price: formData.price, 
            quantity: parseInt(formData.quantity)  // Convert quantity to a number
        });
    };
    if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;
    if (isError) return <Typography color="error">Error fetching product details</Typography>;

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" textAlign="center" mb={3}>Edit Product</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    value={formData?.price}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Stock Quantity"
                    name="quantity"
                    type="number"
                    value={formData?.quantity}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                    <Button variant="contained" sx={{ borderRadius: "50px", bgcolor: "rgb(43, 36, 109)" }} onClick={() => navigate("/product")}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" sx={{ borderRadius: "50px" }} type="submit" disabled={updateMutation.isLoading}>
                        {updateMutation.isLoading ? "Updating..." : "Update"}
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default EditSingle;
