import React from 'react';
import CarouselSlide from '../components/carousel/CarouselSlide';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import GetAllPets from '../pages/pets/GetAllPets';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Card, CardContent, Typography } from "@mui/material";
import { fetchReviews } from '../services/queryFunctions';
import { useQuery } from 'react-query';

const Home = () => {
  const { data: reviews = [], isLoading, error } = useQuery("reviews", fetchReviews);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <CarouselSlide />
      <Grid sx={{ textAlign: "center", color: "rgb(63, 57, 113)" }}>
        <h1>Welcome To Wiggle Wag Pet Service & Shop</h1>
      </Grid>
      <GetAllPets />

      {/* Swiper Reviews Section */}
      <Grid sx={{ mt: 5, mb: 5, textAlign: "center" }}>
        <Typography variant="h4" color="rgb(63, 57, 113)" sx={{ mb: 3 }}>
          What Our Customers Say
        </Typography>

        {/* Loading and Error Handling */}
        {isLoading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error loading reviews.</Typography>}

        {/* Swiper Slider */}
        {reviews.length > 0 ? (
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
            style={{ width: "80%", margin: "auto" }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.$id}>
                <Card sx={{ boxShadow: 3, borderRadius: 3, p: 2, bgcolor: "#f5f5f5" }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {review.name}
                    </Typography>
                    <Typography variant="body1" mt={1} color="text.secondary">
                      "{review.text}"
                    </Typography>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Typography sx={{ mt: 2, fontStyle: "italic" }}>
            No reviews yet. Be the first to write one!
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default Home;
