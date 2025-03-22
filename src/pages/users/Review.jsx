// import React, { useState} from 'react';
// import Box from '@mui/material/Box';
// import { Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
// import { useNavigate } from "react-router-dom";
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import { useAuth } from '../../hooks/useAuth';
// import { fetchReviews, addReview } from "../../services/queryFunctions";
// const Review = () => {
//   const navigate = useNavigate()
//   const { data: user } = useAuth();
//   const queryClient = useQueryClient();
//   const [review, setReview] = useState("");
//   // Fetching reviews
//   const { data: reviews = [], isLoading, error } = useQuery("reviews", fetchReviews);

//   // Submit a new review
//   const mutation = useMutation(addReview, {
//     onSuccess: () => queryClient.invalidateQueries("reviews"),
//   });


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!review.trim()) return;

//     console.log("Submitting review:", { text: review, email: user?.email, userid: user?.$id , name:user?.name,});

//     mutation.mutate({
//       text: review,
//       email: user?.email,
//       userid: user?.$id,
//       name:user?.name,
//       created_at: new Date().toISOString(),
//     });
//     setReview("");
//   };



//   return (
//     <div>
//       <Box sx={{ maxWidth: 900, margin: "auto", textAlign: "center", mt: 4, p: 2, borderRadius: 2, boxShadow: 3 }}>
//         <Typography variant="h5" sx={{ mb: 2 }}>
//           Customer Feedback
//         </Typography>

//         {user ? (
//           <form onSubmit={handleSubmit}>
//             <TextField
//               fullWidth
//               label="Write a review"
//               variant="outlined"
//               value={review}
//               onChange={(e) => setReview(e.target.value)}
//               sx={{ mb: 2 }}
//             />
//             <Button type="submit" variant="contained" sx={{
//               mt: 2,
//               borderRadius: "50px",
//               bgcolor: "#000033",
//               color: "white",
//               "&:hover": { bgcolor: "rgb(43, 36, 109)" },
//             }}>
//               Submit
//             </Button>
//           </form>
//         ) : (
//           <Button variant="contained" sx={{
//             mt: 2,
//             borderRadius: "50px",
//             bgcolor: "#000033",
//             color: "white",
//             "&:hover": { bgcolor: "rgb(43, 36, 109)" },
//           }} onClick={() => navigate("/login")}>
//             Please Login to Write a Review
//           </Button>
//         )}

//         {isLoading ? (
//           <Typography>Loading...</Typography>
//         ) : error ? (
//           <Typography color="error">Error loading reviews.</Typography>
//         ) : (
//           <List sx={{ mt: 2 }}>
//             {reviews.map((r, index) => (
//               <ListItem key={r.$id} divider>
//                 <ListItemText primary={`${index + 1}. ${r.text}`} secondary={`By: ${r.name}`} />
//               </ListItem>
//             ))}
//           </List>


          
//         )}
//       </Box>
//     </div>
//   )
// }

// export default Review

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useAuth } from "../../hooks/useAuth";
import { fetchReviews, addReview } from "../../services/queryFunctions";

const Review = () => {
  const navigate = useNavigate();
  const { data: user } = useAuth();
  const queryClient = useQueryClient();
  const [review, setReview] = useState("");

  // Fetching reviews
  const { data: reviews = [], isLoading, error } = useQuery("reviews", fetchReviews);

  // Submit a new review
  const mutation = useMutation(addReview, {
    onSuccess: () => queryClient.invalidateQueries("reviews"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) return;

    mutation.mutate({
      text: review,
      email: user?.email,
      userid: user?.$id,
      name: user?.name,
      created_at: new Date().toISOString(),
    });
    setReview("");
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: "auto", textAlign: "center", mt: 4, p: 2, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Customer Feedback
      </Typography>

      {/* Review Submission Form */}
      {user ? (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Write a review"
            variant="outlined"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              borderRadius: "50px",
              bgcolor: "#000033",
              color: "white",
              "&:hover": { bgcolor: "rgb(43, 36, 109)" },
            }}
          >
            Submit
          </Button>
        </form>
      ) : (
        <Button
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: "50px",
            bgcolor: "#000033",
            color: "white",
            "&:hover": { bgcolor: "rgb(43, 36, 109)" },
          }}
          onClick={() => navigate("/login")}
        >
          Please Login to Write a Review
        </Button>
      )}

      {/* Swiper Review Section */}
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">Error loading reviews.</Typography>
      ) : reviews.length > 0 ? (
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          style={{ width: "100%", marginTop: "20px", padding: "10px",paddingBottom:"2px" }}
        >
          {reviews.map((r) => (
            <SwiperSlide key={r.$id}>
              <Card sx={{ boxShadow: 3, borderRadius: 3, p: 2, bgcolor: "#f5f5f5" }}>
                <CardContent  sx={{ textAlign: "left" }}>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {r.name}
                  </Typography>
                  <Typography variant="body1" mt={1} color="text.secondary">
                    "{r.text}"
                  </Typography>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Typography sx={{ mt: 2, fontStyle: "italic" }}>No reviews yet. Be the first to write one!</Typography>
      )}
    </Box>
  );
};

export default Review;
