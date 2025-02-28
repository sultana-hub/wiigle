import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useAuth } from '../../hooks/useAuth';
import { fetchReviews, addReview } from "../../services/queryFunctions";
import ErrorPage from '../ui/ErrorPage';
const Review = () => {
    const navigate=useNavigate()
    const { data: user } = useAuth();
    const queryClient = useQueryClient();
    const [review, setReview] = useState("");
      // Fetching reviews
  const { data: reviews = [], isLoading ,error} = useQuery("reviews", fetchReviews);

 // Submit a new review
 const mutation = useMutation(addReview, {
    onSuccess: () => queryClient.invalidateQueries("reviews"),
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!review.trim()) return;
  
    console.log("Submitting review:", { text: review, email: user?.email, userid: user?.$id });
  
    mutation.mutate({
      text: review,
      email: user?.email,
      userid: user?.$id,
      created_at: new Date().toISOString(),
    });
    setReview("");
  };



  return (
    <div>
        {/* <Box sx={{ maxWidth: 900, margin: "auto", textAlign: "center", mt: 4, p: 2, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Customer Review</Typography>
      
      {user && (
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Write a review" variant="outlined" value={review} onChange={(e) => setReview(e.target.value)} sx={{ mb: 2 }} />
          <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                    
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
      )}

      {isLoading ? <Typography>Loading...</Typography> : (
        <>
          <Typography sx={{ m: 2,p:2}}>Customer Feedbacks</Typography>
        <List sx={{ mt: 2 }}>
          {reviews.map((r, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={r?.text} secondary={`By: ${r?.email}`} />
            </ListItem>
          ))}
        </List>
        </>
      )}
    </Box> */}
     <Box sx={{ maxWidth: 900, margin: "auto", textAlign: "center", mt: 4, p: 2, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Customer Feedback
      </Typography>

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
          <Button type="submit" variant="contained"  sx={{
                        mt: 2,
                        borderRadius: "50px",
                        bgcolor: "#000033",
                        color: "white",
                        "&:hover": { bgcolor: "rgb(43, 36, 109)" },
                      }}>
            Submit
          </Button>
        </form>
      ) : (
        // <Button variant="contained" color="#000033" onClick={() => navigate("/login")}>
        //   Login to Write a Review
        // </Button>
        <Button  variant="contained"  sx={{
            mt: 2,
            borderRadius: "50px",
            bgcolor: "#000033",
            color: "white",
            "&:hover": { bgcolor: "rgb(43, 36, 109)" },
          }} onClick={() => navigate("/login")}>
Please Login to Write a Review
</Button>
      )}

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">Error loading reviews.</Typography>
      ) : (
        <List sx={{ mt: 2 }}>
          {reviews.map((r, index) => (
            <ListItem key={r.$id} divider>
              <ListItemText primary={`${index + 1}. ${r.text}`} secondary={`By: ${r.email}`} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
    </div>
  )
}

export default Review