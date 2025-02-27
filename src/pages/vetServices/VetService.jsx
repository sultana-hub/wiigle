import React from "react";
import { Box, Grid, Container, Typography, Card, CardContent, Button } from "@mui/material";
import HealingIcon from "@mui/icons-material/Healing";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import PetsIcon from "@mui/icons-material/Pets";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
const services = [
  {
    title: "General Checkup",
    description: "Routine health examinations to keep your pet healthy.",
    icon: <HealingIcon fontSize="large" color="primary" />,
    link: "/general-checkup",
  },
  {
    title: "Vaccination",
    description: "Protect your pet from diseases with our expert vaccination services.",
    icon: <VaccinesIcon fontSize="large" color="secondary" />,
    link: "/vaccine",
  },
  {
    title: "Grooming & Hygiene",
    description: "Professional grooming services for a happy and clean pet.",
    icon: <PetsIcon fontSize="large" color="success" />,
    link: "/grooming",
  },
  {
    title: "Emergency Care",
    description: "24/7 emergency care for pets in critical conditions.",
    icon: <MedicalServicesIcon fontSize="large" color="error" />,
    link: "/emergency",
  },
];

const VetServices = () => {
  const navigate = useNavigate();
  //  const{user}=useAuth()
  return (
    <Container sx={{ py: 5 }}>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" align="center" mb={3}>
        Veterinary Services
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" mb={5}>
        We provide top-quality veterinary services to ensure your pet’s well-being.
      </Typography>

      {/* Service Cards */}
      <Grid container spacing={3} justifyContent="center">
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: "center", p: 3, borderRadius: 2, boxShadow: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>{service.icon}</Box>
              <Typography variant="h6" fontWeight="bold">{service.title}</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>{service.description.slice(0,60)}...</Typography>
              <Button
                variant="contained"
                onClick={() => navigate(service.link)}
                sx={{
                  background: "linear-gradient(135deg, rgb(104, 106, 110) 0%, rgb(63, 57, 113) 100%)",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "30px",
                  padding: "10px 20px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #e66465 0%, #9198e5 100%)",
                  },
                }}
              >
                View More
              </Button>
            </Card>
          </Grid>
        ))}
        <Button  variant="contained" onClick={()=>navigate("/vet-service")}
        sx={{marginTop:"30px",color:"white",fontWeight:"bold",bgcolor:"rgb(63, 57, 113)" ,   borderRadius: "30px",}}>
          Take Appoinment</Button>
      </Grid>
    
    </Container>
  );
};

export default VetServices;
