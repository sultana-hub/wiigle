

import React, { useState } from 'react'
import { fetchAllProducts, deleteProduct } from '../../services/queryFunctions'
import { useQuery, useMutation, useQueryClient } from 'react-query'
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Box, Typography, Button, Card, CardMedia, CardContent } from "@mui/material";
import Search from '../../components/Search';
import { useNavigate } from 'react-router-dom';
import Review from '../users/Review';
import { storage } from '../../appwriteConf/appwriteConfig';
import { useAuth } from "../../hooks/useAuth";

// Filter logic
const filterData = (query, data) => {
    if (!query) {
        return data;
    } else {
        return data?.filter((d) => d?.product_brand.toLowerCase().includes(query));
    }
};

const Products = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: user } = useAuth(); // Get user authentication data
    const isAdmin = user?.email === "yahya@gmail.com"; // Check if user is admin

    // Fetch all products
    const { data: products, isLoading, isError } = useQuery("products", fetchAllProducts);
    
    // Delete product mutation
    const deleteMutation = useMutation(deleteProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries("products");
            alert("Product deleted successfully!");
        }
    });

    // Data filter for searching
    const [searchQuery, setSearchQuery] = useState("");
    const dataFiltered = filterData(searchQuery, products);

    if (isLoading) {
        return (<p>...Loading</p>)
    }

    if (isError) {
        return (<p>...Oops something went wrong</p>)
    }

    return (
        <> 
        <Box sx={{ flexGrow: 1, mb: 5, px: 2 }}> 
            {/* Search Bar */}
            <Typography variant="h6" sx={{ mt: 3, mb: 5, textAlign: "center" }}>
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </Typography>
    
            {/* Products Grid */}
            <Grid container spacing={3} justifyContent="center">
                {dataFiltered?.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card 
                            sx={{
                                boxShadow: 3,
                                borderRadius: "10px",
                                transition: "0.3s",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="150"
                                image={item.imageId ? storage.getFileView(process.env.REACT_APP_APPWRITE_PRODUCTS_IMAGES_STORAGE_ID, item.imageId) : ""}
                                alt="product"
                                sx={{ borderRadius: "10px 10px 0 0" }}
                            />
                            <CardContent sx={{ textAlign: "left" }}>
                                <Typography variant="h6">{item.product_brand}</Typography>
                                {
                                    item.quantity===0 ? ( <Typography>Stock: Out Of Stock</Typography>):
                                    (
                                        <Typography>Stock: {item.quantity}</Typography>
                                    )
                                }
                              
    
                                <Button
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        borderRadius: "50px",
                                        bgcolor: "#000033",
                                        color: "white",
                                        "&:hover": { bgcolor: "rgb(43, 36, 109)" },
                                    }}
                                    onClick={() => navigate(`single/${item?.$id}`)}
                                    disabled={isAdmin}
                                >
                                    View Details
                                </Button>
    
                                {isAdmin && (
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ flex: 1, mr: 1 ,  borderRadius: "50px",}}
                                            onClick={() => navigate(`edit/${item?.$id}`)}
                                        >
                                            Edit
                                        </Button>
    
                                        <Button
                                            variant="contained"
                                            color="error"
                                            sx={{ flex: 1, ml: 1 ,  borderRadius: "50px",}}
                                            onClick={() => deleteMutation.mutate(item.$id)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
        
        {/* Review Section */}
        <Review />
        </>
    )
}

export default Products;

