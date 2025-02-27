import React from "react";
import { Container, Typography, Card, CardContent, Button, Grid } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { useNavigate } from "react-router-dom";

const Emergency = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 5 }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" align="center" mb={3}>
        24/7 Emergency Pet Care
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" mb={5}>
        We provide urgent medical assistance for pets in critical conditions.
      </Typography>

      {/* Emergency Care Info */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <MedicalServicesIcon fontSize="large" color="error" sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Immediate Help for Your Pet
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                If your pet is in distress, our experienced veterinary team is available 24/7 to provide life-saving treatments.
              </Typography>

              <Typography variant="h6" fontWeight="bold" mt={2}>
                Emergency Services:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                🚑 Critical Injury Treatment  
                🩺 Poisoning & Toxin Exposure Care  
                💉 Intensive Care & Surgery  
                ❤️ CPR & Life-Saving Interventions  
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

export default Emergency;
