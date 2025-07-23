import React from "react";
import { Box, Container, Typography, Card, CardContent, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PetsIcon from "@mui/icons-material/Pets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VerifiedIcon from "@mui/icons-material/Verified";

const AboutUs = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?pets')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000033",
          textAlign: "center",
          mt:"15px"
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
          About Us
        </Typography>
      </Box>

      <Container sx={{ py: 1 }}>
        {/* Our Mission */}
        <Typography variant="h4" fontWeight="bold" align="center" mb={2}>
          Our Mission
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary" mb={2}>
          At our pet shop, we believe that every pet deserves a loving home. We are dedicated to providing high-quality pet products and helping families find their perfect companion.
        </Typography>

        {/* Meet Our Team */}
        <Typography variant="h4" fontWeight="bold" align="center" mb={3}>
           Our Core Members
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            { name: "Parveen Sultana", role: "Founder", img: "assets/me.jpeg" },
            { name: "Yahya Mohammad", role: "Veterinarian", img: "assets/yahya.jpeg" },
            { name: "Haiqa Parveen", role: "Pet Trainer", img: "assets/haiqa1.jpeg" },
          ].map((person, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", py: 3, borderRadius: 2, boxShadow: 3 }}>
                <Avatar src={person.img} sx={{ width: 100, height: 110, mx: "auto", mb: 2 }} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {person.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {person.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Why Choose Us? */}
        <Typography variant="h4" fontWeight="bold" align="center" mt={5} mb={3}>
          Why Choose Us?
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            { icon: <PetsIcon fontSize="large" />, title: "Expert Care", desc: "Our team consists of trained professionals who love pets." },
            { icon: <FavoriteIcon fontSize="large" />, title: "Loving Environment", desc: "We ensure a safe and nurturing space for all pets." },
            { icon: <VerifiedIcon fontSize="large" />, title: "Trusted Quality", desc: "We provide only high-quality, vet-approved products." },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ textAlign: "center", p: 3, borderRadius: 2, boxShadow: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>{item.icon}</Box>
                <Typography variant="h6" fontWeight="bold">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
