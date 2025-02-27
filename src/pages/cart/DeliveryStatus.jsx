import React from "react";
import { Container, Typography, Box, Button, Stepper, Step, StepLabel, Card, CardContent } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";

const steps = ["Order Placed", "Processing", "Out for Delivery", "Delivered"];

const DeliveryStatus = () => {

    
    const navigate = useNavigate();
    const currentStep = 1;

    return (
        <Container maxWidth="md" sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "white" }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                Order Status
            </Typography>

            <Box sx={{ textAlign: "center", my: 2 }}>
                <Typography variant="h6" color="success.main">
                    ✅ Payment Successful!
                </Typography>
                <Typography variant="body1">Your order is on its way.</Typography>
            </Box>

            <Stepper activeStep={currentStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

{/* Contact Information */}
<Card sx={{ mt: 4, p: 2, bgcolor: "#f5f5f5" }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Need Help? Contact Us!
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <LocalPhoneIcon color="primary" />
            <Typography variant="body1">Call: +91 7595915233</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <EmailIcon color="primary" />
            <Typography variant="body1">Email: support@wigglewag.com</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <ChatIcon color="primary" />
            <Typography variant="body1">Live Chat: Available 24/7</Typography>
          </Box>
        </CardContent>
      </Card>




            <Box textAlign="center" mt={3}>
      

                <Button
                    variant="contained"
               
                    sx={{
                        background: "linear-gradient(135deg,rgb(104, 106, 110) 0%,rgb(63, 57, 113) 100%)", // Gradient
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: "30px", // Rounded edges
                        padding: "10px 20px",
                        boxShadow: "0px 4px 10px rgba(255, 126, 95, 0.4)", // Soft shadow
                        transition: "all 0.3s ease",
                        "&:hover": {
                            background: "linear-gradient(135deg, #e66465 0%, #9198e5 100%)", // New gradient on hover
                            boxShadow: "0px 6px 15px rgba(230, 100, 101, 0.5)", // Stronger shadow
                        },
                    }}
                    onClick={() => navigate("/product")}
                >
                    Continue Shopping
                </Button>

            </Box>
        </Container>
    );
};

export default DeliveryStatus;
