import React, { useState } from 'react'
import { fetchAllProducts } from '../../services/queryFunctions'
import { useQuery } from 'react-query'
import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
// import { Typography, Button } from '@mui/material';
// import { useAuth } from "../../hooks/useAuth";
import { Box,  Typography, Button, Card, CardMedia, CardContent ,List ,TextField} from "@mui/material";
import Search from '../../components/Search';
import { useAddToCart } from "../../hooks/cartHooks/useAddToCart";
import { useNavigate } from 'react-router-dom';
import Review from '../users/Review';
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
    //get all products
    const { data: products, isLoading: productsLoading, isError, error: productsErr } = useQuery("products", fetchAllProducts)
    console.log("all prod data", products)
    //get user auth
    // const { data: user } = useAuth()

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

const handleSubmit=()=>{

}


    if (productsLoading) {
        return (<p>...Loading</p>)
    }

    if (isError) {
        return (<p>...Opps something went wrong</p>)
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
                  image={item.image}
                  alt="product"
                  sx={{ borderRadius: "10px 10px 0 0" }}
                />
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6">{item.product_brand}</Typography>
                  <Typography variant="h6">Stock:{item.quantity}</Typography>
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
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
 {/* Review Section */}

 <Review/>
      

      </>
    )
}

export default Products