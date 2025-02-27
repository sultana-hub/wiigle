import React from "react";
import { Container, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";

const Grooming = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 5 }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" align="center" mb={3}>
        Pet Grooming & Hygiene
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" mb={5}>
        Keep your pet looking and feeling their best with our expert grooming services.
      </Typography>

      {/* Grooming & Hygiene Info */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <PetsIcon fontSize="large" color="success" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Why Grooming is Essential?
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Regular grooming helps prevent infections, keeps your pet’s coat healthy, and ensures proper hygiene.
              </Typography>

              <Typography variant="h6" fontWeight="bold" mt={2}>
                Our Grooming Services:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ✅ Bath & Shampoo  
                ✅ Hair Trimming & Styling  
                ✅ Nail Clipping & Paw Care  
                ✅ Ear Cleaning & Deodorizing  
              </Typography>

              {/* Back Button */}
              <Button
                variant="contained"
                onClick={() => navigate("/vet")}
                sx={{
                  mt: 3,
                  background: "linear-gradient(135deg, rgb(104, 106, 110) 0%, rgb(63, 57, 113) 100%)",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "30px",
                  padding: "10px 20px",
                  "&:hover": {
                    background: "linear-gradient(135deg, #e66465 0%, #9198e5 100%)",
                  },
                }}
              >
                Back to Vet Services
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Grooming;
