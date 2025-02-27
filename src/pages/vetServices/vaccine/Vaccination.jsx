import React from "react";
import { Container, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { useNavigate } from "react-router-dom";

const Vaccination= () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 5 }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" align="center" mb={3}>
        Pet Vaccination Services
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" mb={5}>
        Ensure your pet's health with our expert vaccination services.
      </Typography>

      {/* Vaccination Info */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <VaccinesIcon fontSize="large" color="secondary" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Why Vaccinate Your Pet?
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Vaccines help protect pets from life-threatening diseases like rabies, parvovirus, and distemper.
                Keeping your pet vaccinated ensures a long and healthy life.
              </Typography>

              <Typography variant="h6" fontWeight="bold" mt={2}>
                Our Vaccination Services:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ✅ Rabies Vaccine  
                ✅ Distemper & Parvo Vaccine  
                ✅ Leptospirosis Vaccine  
                ✅ Annual Booster Shots  
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

export default Vaccination;
