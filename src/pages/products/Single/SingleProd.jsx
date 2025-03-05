

// import React,{useState} from "react";
// import { useParams } from "react-router-dom";
// import { fetchProductById } from "../../../services/queryFunctions";
// import { useQuery } from "react-query";
// import { useAuth } from "../../../hooks/useAuth";
// import StarRating from "../../../components/StarRating";
// import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
// import AddToCartButton from "../../../components/AddToCartButton";
// import { storage } from '../../../appwriteConf/appwriteConfig'

// const SingleProd = () => {
//   const { id } = useParams();

//   const[stock,setStock]=useState("")

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["single", id],
//     queryFn: () => fetchProductById(id),
//     enabled: !!id,
//   });

//   console.log("single", data);

//   // Get logged-in user
//   const { data: user } = useAuth();

//   if (isLoading) {
//     return <Typography sx={{ textAlign: "center", mt: 5 }}>...Loading</Typography>;
//   }
//   if (isError) {
//     return <Typography sx={{ textAlign: "center", mt: 5, color: "red" }}>Oops, something went wrong!</Typography>;
//   }

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         textAlign: "center",
//         mb: 10,
//         mt: { xs: 5, md: 10 }, // Adjusting margin for mobile
//         px: { xs: 2, md: 0 }, // Padding for small screens
//       }}
//     >
//       <Card
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" }, // Stack on mobile, row on desktop
//           width: { xs: "100%", sm: "80%", md: "45%" }, // Responsive width
//           height: "auto",
//           borderRadius: 2,
//           boxShadow: 3,
//           p: 2,
//         }}
//         key={data.id}
//       >
//         {/* Left-side Image */}
//         <CardMedia
//           component="img"
//           sx={{
//             width: { xs: "100%", md: 300 }, // Full width on mobile, fixed on desktop
//             height: { xs: 250, md: "auto" }, // Adjusting image height for mobile
//             objectFit: "cover",
//           }}
//           src={data?.imageId ? storage.getFileView(process.env.REACT_APP_APPWRITE_PRODUCTS_IMAGES_STORAGE_ID, data.imageId) : ""}
//           alt="food"
//         />

//         {/* Right-side Description */}
//         <CardContent
//           sx={{
//             width: { xs: "100%", md: "60%" }, // Full width on mobile
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             gap: 1, // Adding spacing between lines
//             textAlign: "left",
//           }}
//         >
//           <Typography variant="h6" fontWeight="bold" sx={{ color: "rgb(63, 57, 113)" }}>
//             {data?.product_brand}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {data?.prod_desc}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Price: <span>{data?.price}</span>
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Weight: <span>{data?.weight}</span>
//           </Typography>

//           {data?.quantity === 0 ? (
//             <Typography variant="body2" color="error">
//               Available: Out Of Stock
//             </Typography>
//           ) : (
//             <Typography variant="body2" color="text.secondary">
//               Available: <span>{data?.quantity} Packets</span>
//             </Typography>
//           )}

//           <StarRating name="custom-rating" value={data?.rating} size="large" readOnly />

//           {/* Add to Cart Button */}
//           <Box sx={{ mt: 2 }}>
            
          
//               <AddToCartButton
//               user_id={user?.$id}
//               product_id={id}
//               brand={data?.product_brand}
//               price={data?.price}
//               imageId={data?.imageId}
//               weight={data?.weight}
            
//             />
              
           
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default SingleProd;


import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../../services/queryFunctions";
import { useQuery } from "react-query";
import { useAuth } from "../../../hooks/useAuth";
import StarRating from "../../../components/StarRating";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";
import AddToCartButton from "../../../components/AddToCartButton";
import { storage } from '../../../appwriteConf/appwriteConfig';
import { useNavigate } from "react-router-dom";
const SingleProd = () => {
  const navigate=useNavigate()
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
        mt: { xs: 5, md: 10 },
        px: { xs: 2, md: 0 },
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: { xs: "100%", sm: "80%", md: "45%" },
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
            width: { xs: "100%", md: 300 },
            height: { xs: 250, md: "auto" },
            objectFit: "cover",
          }}
          src={data?.imageId ? storage.getFileView(process.env.REACT_APP_APPWRITE_PRODUCTS_IMAGES_STORAGE_ID, data.imageId) : ""}
          alt="food"
        />

        {/* Right-side Description */}
        <CardContent
          sx={{
            width: { xs: "100%", md: "60%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 1,
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

          {/* Add to Cart & Cancel Button */}
          <Box sx={{ mt: 2 }}>
            {data?.quantity === 0 ? (
              <Button
                variant="contained"
                color="error"
                sx={{ borderRadius: "20px", px: 3 }}
                onClick={()=>navigate("/product")}
              >
                Cancel
              </Button>
            ) : (
              <AddToCartButton
                user_id={user?.$id}
                product_id={id}
                brand={data?.product_brand}
                price={data?.price}
                imageId={data?.imageId}
                weight={data?.weight}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SingleProd;
