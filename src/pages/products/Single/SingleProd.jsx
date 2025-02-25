import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../../../services/queryFunctions'
import { fetchProdById } from '../../../services/queryFunctions'
import { useQuery } from 'react-query'
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { useAuth } from "../../../hooks/useAuth";
import StarRating from '../../../components/StarRating'
import { useAddToCart } from "../../../hooks/cartHooks/useAddToCart";
import { Card, CardContent, CardMedia, Container, Typography, Box, } from "@mui/material";
import AddToCartButton from '../../../components/AddToCartButton'
import { account } from "../../../appwriteConf/appwriteConfig"; // Ensure this is correctly set up
import { useEffect, useState } from "react";

const SingleProd = () => {


    // const [userdata, setUser] = useState(null);

    // useEffect(() => {
    //   const getUser = async () => {
    //     try {
    //       const response = await account.get();
    //       console.log("Fetched User:", response);
    //       setUser(response);
    //     } catch (error) {
    //       console.error("Error fetching user:", error);
    //     }
    //   };
    
    //   getUser();
    // }, []);



    const { id } = useParams()
    const { data, isLoading, isError } = useQuery({
        queryKey: ["single", id], // React Query caching
        queryFn: () => fetchProductById(id),
        enabled: !!id, // Only fetch if documentId exists
    });
    console.log("single", data)
    //add to cart button
    const { data: user } = useAuth(); // Get logged-in user
    // const { mutate, isLoading: isCartLoading } = useAddToCart();

    // const handleAddToCart = () => {
    //     if (!user) {
    //         alert("Please log in to add items to cart.");
    //         return;
    //     }
    //     else{
    //         mutate({ userId: user.$id, productId:id,image:data?.image, quantity: 1 })
    //         alert("added to cart.");
    //     }

    //   ;//find out single product id  and put here 
    // };




    if (isLoading) {
        return (<p>...Loading</p>)
    }
    if (isError) {
        return (<p>opps something went wrong</p>)
    }

  if(!user){
        return(
        <p>Please Login First</p>
        
    )
    }


    return (
        <Box sx={{ justifyContent: "center", textAlign: "center", justifyItems: "center", marginBottom: "100px", marginTop: "90px" }}>



            <Card sx={{ display: "flex", width: "60%", height: "400px", borderRadius: 2, boxShadow: 3, mt: 5, ml: 2, mr: 2 }} key={data.id}>
                {/* Left-side Image */}
                <CardMedia
                    component="img"
                    sx={{ width: 300, objectFit: "cover" }}
                    src={`../../${data?.image}`}
                    alt="food"
                />

                {/* Right-side Description */}
               
                <CardContent sx={{
                    width: "60%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1, // Adds spacing between lines
                }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: "rgb(63, 57, 113)" }}>
                        {data?.product_brand}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {data?.prod_desc}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price : <span>{data?.price}</span>
                    </Typography>
                
                    {
                        data?.quantity===0 ?<Typography variant="body2" color="text.secondary">
                        Available :Out Of Stock
                    </Typography>
                    :
                    <Typography variant="body2" color="text.secondary">
                        Available : <span>{data?.quantity} Packets </span>
                    </Typography>
                    }
                    <Typography variant="body2" color="text.secondary">
                    {/* This adorable pet is looking for a new home. Adopt now and give it the love it deserves! */}

                        <StarRating
                            name="custom-rating"
                            value={data?.rating}
                            size="large"
                            sx={{ color: "gold" }}
                            readOnly
                        />
                    </Typography>
                   
                    <Typography variant="body2" color="text.secondary">
                        < AddToCartButton user_id={user.$id} product_id={id} brand={data?.product_brand} price={data?.price} image={data?.image}/> 
                    </Typography>
                </CardContent>
                
            </Card>


        </Box>
    )
}

export default SingleProd