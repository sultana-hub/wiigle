import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";

import HealingIcon from "@mui/icons-material/Healing";
import { useNavigate } from "react-router-dom";
const GeneralCheckUp = () => {
    const navigate = useNavigate();

  return (
    <Container sx={{ py: 5 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back to Vet Services
      </Button>

      <Box textAlign="center">
        <HealingIcon fontSize="large" color="primary" />
        <Typography variant="h4" fontWeight="bold" mt={2}>
          General Checkup
        </Typography>
        <Typography variant="body1" color="text.secondary" mt={1}>
          A comprehensive checkup to keep your pet healthy.
        </Typography>
      </Box>

      <Box mt={3}>
        <Typography variant="h6">Included in the Checkup:</Typography>
        <ul>
          <li>Physical examination</li>
          <li>Weight & temperature check</li>
          <li>Dental and skin inspection</li>
          <li>Basic blood test (if required)</li>
          <li>Consultation on pet diet and health</li>
        </ul>
      </Box>
    </Container>
  );
};

export default GeneralCheckUp;
