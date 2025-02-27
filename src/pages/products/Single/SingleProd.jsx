

import React from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../services/queryFunctions";
import { useQuery } from "react-query";
import { useAuth } from "../../../hooks/useAuth";
import StarRating from "../../../components/StarRating";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import AddToCartButton from "../../../components/AddToCartButton";

const SingleProd = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["single", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  console.log("single", data);

  // Get logged-in user
  const { data: user } = useAuth();

  if (isLoading) {
    return <Typography sx={{ textAlign: "center", mt: 5 }}>...Loading</Typography>;
  }
  if (isError) {
    return <Typography sx={{ textAlign: "center", mt: 5, color: "red" }}>Oops, something went wrong!</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        mb: 10,
        mt: { xs: 5, md: 10 }, // Adjusting margin for mobile
        px: { xs: 2, md: 0 }, // Padding for small screens
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on desktop
          width: { xs: "100%", sm: "80%", md: "45%" }, // Responsive width
          height: "auto",
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
        }}
        key={data.id}
      >
        {/* Left-side Image */}
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", md: 300 }, // Full width on mobile, fixed on desktop
            height: { xs: 250, md: "auto" }, // Adjusting image height for mobile
            objectFit: "cover",
          }}
          src={`../../${data?.image}`}
          alt="food"
        />

        {/* Right-side Description */}
        <CardContent
          sx={{
            width: { xs: "100%", md: "60%" }, // Full width on mobile
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1, // Adding spacing between lines
            textAlign: "left",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ color: "rgb(63, 57, 113)" }}>
            {data?.product_brand}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.prod_desc}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: <span>{data?.price}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Weight: <span>{data?.weight}</span>
          </Typography>

          {data?.quantity === 0 ? (
            <Typography variant="body2" color="error">
              Available: Out Of Stock
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Available: <span>{data?.quantity} Packets</span>
            </Typography>
          )}

          <StarRating name="custom-rating" value={data?.rating} size="large" readOnly />

          {/* Add to Cart Button */}
          <Box sx={{ mt: 2 }}>
            <AddToCartButton
              user_id={user?.$id}
              product_id={id}
              brand={data?.product_brand}
              price={data?.price}
              image={data?.image}
              weight={data?.weight}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleProd;
