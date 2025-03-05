


import PetsIcon from '@mui/icons-material/Pets';
import HealingIcon from '@mui/icons-material/Healing';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Grid, Box, Paper } from "@mui/material";
import PetAdoptionAdmin from '../pets/petDetails/adopt/PetAdoptionAdmin'
import VetAdminPanel from "../vetServices/VetAdminPanel";
import OrderAdminPanel from "./OrderAdminPanel";

const AdminDashboard = () => {
  const [activePanel, setActivePanel] = useState(null);

  const sections = [
    { title: "Pet Adoption", component: <PetAdoptionAdmin />,icon:<PetsIcon/> },
    { title: "Vet Services", component: <VetAdminPanel />,icon:<HealingIcon/> },
    { title: "Orders", component: <OrderAdminPanel /> ,icon:<ShoppingCartIcon/>},
  ];

  return (
    <Box p={3} sx={{paddingBottom:"150px",paddingTop:"150px"}}>
      <Typography variant="h4" textAlign="center" mb={3}>
        Admin Dashboard
      </Typography>
      
      {/* Cards Section */}
      <Grid container spacing={3} justifyContent="center">
        {sections.map((section, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ boxShadow: 3, textAlign: "center", p: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  {section.icon}{section.title}
                </Typography>
               

                       <Button
                                variant="contained"
                                sx={{
                                  background: "linear-gradient(135deg, rgb(104, 106, 110) 0%, rgb(63, 57, 113) 100%)",
                                  color: "white",
                                  fontWeight: "bold",
                                  textTransform: "none",
                                  borderRadius: "30px",
                                  mx: 2,
                                  mb: 2,
                                  padding: "10px 20px",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    background: "linear-gradient(135deg, #e66465 0%, #9198e5 100%)",
                                  },
                                }}
                                onClick={() => setActivePanel(index)}
                              >
                               Manage
                              </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Active Panel Section */}
      {activePanel !== null && (
        <Paper sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
          <Button onClick={() => setActivePanel(null)} variant="outlined" sx={{ mb: 2 }}>
            Back to Dashboard
          </Button>
          {sections[activePanel].component}
        </Paper>
      )}
    </Box>
  );
};

export default AdminDashboard;

