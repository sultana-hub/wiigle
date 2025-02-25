 import React, { useState } from 'react';
import { Container,  Typography, Link, Box, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#1a1a1a", color: "white", py: 3, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          
          {/* Contact Info */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>Contact Us</Typography>
            <Typography>Email: support@wigglewag.com</Typography>
            <Typography>Phone: + (91) 7584567890</Typography>
            <Typography>Address: 22 Ghosh Lane, Kolkata, WB</Typography>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom>Follow Us</Typography>
            <Box>
              <IconButton component="a" href="https://facebook.com" target="_blank" sx={{ color: "white" }}>
                <Facebook />
              </IconButton>
              <IconButton component="a" href="https://twitter.com" target="_blank" sx={{ color: "white" }}>
                <Twitter />
              </IconButton>
              <IconButton component="a" href="https://instagram.com" target="_blank" sx={{ color: "white" }}>
                <Instagram />
              </IconButton>
              <IconButton component="a" href="https://linkedin.com" target="_blank" sx={{ color: "white" }}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Copyright Section */}
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            {/* <Link href="/contact" color="inherit" underline="none" display="block">Contact</Link> */}
            <Link href="/about" color="inherit" underline="none" display="block">About Us</Link>
            <Link href="/" color="inherit" underline="none" display="block">Privacy & Terms</Link>
            
          
          </Grid>
        </Grid>

        {/* Bottom Copyright */}
        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            © {new Date().getFullYear()}wigglewag. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
