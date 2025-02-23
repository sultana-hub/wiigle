import React, { useState } from 'react'
import { fetchAllProducts } from '../../services/queryFunctions'
import { useQuery } from 'react-query'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Typography, Button } from '@mui/material';
import { useAuth } from "../../hooks/useAuth";
import Search from '../../components/Search';
import { useAddToCart } from "../../hooks/cartHooks/useAddToCart";
import { useNavigate } from 'react-router-dom';
//filter logic
const filterData = (query, data) => {
    if (!query) {
        return data;
    } else {
        return data?.filter((d) => d?.product_brand.toLowerCase().includes(query));
    }
};

const Products = () => {
    const navigate = useNavigate()
    const { data: products, isLoading: productsLoading, error: productsErr } = useQuery("products", fetchAllProducts)
    console.log("all prod data", products)


    //data filter for searching
    const [searchQuery, setSearchQuery] = useState("");
    const dataFiltered = filterData(searchQuery, products);


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: 'white',

        }),
    }));


    return (
        <div>
            <Box sx={{ flexGrow: 1, marginBottom: "100px" }}>
                <Grid container spacing={2} sx={{ textAlign: "center", justifyContent: "center", justifyItems: "center" }}>


                    <Grid sx={{ textAlign: "center" }}>
                        {/* <h1>search product here   </h1> */}

                        <Typography variant='h6' sx={{ marginTop: "25px", marginBottom: "50px" }}> <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} /></Typography>
                        {/* <p> Please enter your product name for searching </p> */}
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

                            {
                                dataFiltered?.map((item, index) => (
                                    <Grid size={3} marginLeft={0} key={index}>
                                        <Item style={{ boxShadow: "none" }} elevation={0}><img src={item.image} width="200" height="150" alt="my cap" /></Item>
                                        <p>{item.food}</p>

                                        {/* <Button type="button" variant="contained" onClick={handleAddToCart}
                                            sx={{ mt: 2, borderRadius: "50px", bgcolor: "#4ca86c", color: "white", "&:hover": { bgcolor: "darkgreen" } }}>
                                            {isCartLoading ? "Adding..." : "Add to Cart"}
                                        </Button> */}
                                        <Button
                                            variant="contained"
                                            // startIcon={<ShoppingCart />} // Icon on the left side
                                            sx={{
                                                background: "linear-gradient(135deg,rgb(104, 106, 110) 0%,rgb(63, 57, 113) 100%)", // Gradient
                                                color: "white",
                                                fontWeight: "bold",
                                                textTransform: "none",
                                                borderRadius: "30px", // Rounded edges
                                                padding: "10px 20px",
                                                boxShadow: "0px 4px 10px rgba(255, 126, 95, 0.4)", // Soft shadow
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    background: "linear-gradient(135deg, #e66465 0%, #9198e5 100%)", // New gradient on hover
                                                    boxShadow: "0px 6px 15px rgba(230, 100, 101, 0.5)", // Stronger shadow
                                                },
                                            }}
                                            onClick={() => navigate(`single/${item.$id}`)}
                                        >

                                            View Details
                                        </Button>


                                        <br />
                                        <br />

                                    </Grid>
                                ))
                            }


                        </Grid>
                    </Grid>

                </Grid>
            </Box>
        </div>
    )
}

export default Products