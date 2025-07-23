import React, { useState } from "react";
import { Modal, Box, Typography, Accordion, AccordionSummary, AccordionDetails, Button, Fade } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TermsAndConditionsModal = ({ open, handleClose }) => {
    const [accepted, setAccepted] = useState(false);
  
    const handleAccept = () => {
      setAccepted(true);
      alert("You have accepted the Terms & Conditions!");
      handleClose();
    };
  
    return (
      <Modal open={open} onClose={handleClose} closeAfterTransition keepMounted>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: 500 }, // Responsive width
              bgcolor: "white",
              boxShadow: 24,
              p: 3,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              maxHeight: "80vh", // Limits height to 80% of the viewport
              overflowY: "auto", // Enables scrolling if content is too long
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              Terms & Conditions
            </Typography>
  
            <Typography variant="body2" align="center" color="text.secondary" paragraph>
              Please read our terms carefully before using our pet shop services.
            </Typography>
  
            {/* Terms Sections */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">1. General Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Our pet shop offers a variety of pets, food, and accessories. By using our services, you agree to follow all terms outlined here.
                </Typography>
              </AccordionDetails>
            </Accordion>
  
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">2. Pet Adoption Policy</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Adopting a pet requires an approval process. We ensure pets go to safe homes with responsible owners.
                </Typography>
              </AccordionDetails>
            </Accordion>
  
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">3. Refund & Return Policy</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Pet food & accessories can be returned within 7 days of purchase. Live pets are non-refundable after adoption.
                </Typography>
              </AccordionDetails>
            </Accordion>
  
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">4. Privacy & Security</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  We respect your privacy and ensure that your personal data is securely stored.
                </Typography>
              </AccordionDetails>
            </Accordion>
  
            {/* Action Buttons (Fixed Positioning) */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 3,
                position: "sticky",
                bottom: 0,
                bgcolor: "white",
                py: 2,
              }}
            >
              <Button onClick={handleClose} color="error" variant="outlined">
                Close
              </Button>
              <Button onClick={handleAccept} color="#000033"variant="contained" disabled={accepted}>
                {accepted ? "Accepted" : "Accept"}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    );
  };
  
  export default TermsAndConditionsModal;
