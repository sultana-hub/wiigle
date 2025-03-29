
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Container, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AuthButton from "../components/AuthButton";
import { fetchCartItems } from "../services/cartQueryFunction";
import { useQuery } from "react-query";

const Header = () => {
  const { data: user } = useAuth();
  const location = useLocation();
  const adimEmail = "yahya@gmail.com"
  
  const { data: cartItems = []} = useQuery(
    ["cartItems", user?.$id],
    async () => {
      const items = await fetchCartItems(user?.$id);
    
      return items;
    },
    { enabled: !!user?.$id, refetchOnWindowFocus: true }
  );
  // Calculate the total quantity of all items
const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navLinks = [
    { label: "Products", path: "/product" },
    user?.email !== adimEmail && { label: "Vet Service", path: "/vet" },
    !user?.$id && { label: "Register", path: "/signup" },
    user?.email !== adimEmail && { label: "Profile", path: "/profile" },
    user?.email === adimEmail && { label: "Dashboard", path: "/admin" },
    user?.email === adimEmail && { label: "Upload Pet", path: "/pet_upload_details" },
    user?.email === adimEmail && { label: "Upload Products", path: "/products_upload" }
  ].filter(Boolean);

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(45deg,#000033 30%,#00004d 90%)",
        color: "white",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                  {navLinks.map((item, index) => (
                    <ListItem
                      button
                      key={index}
                      component={Link}
                      to={item.path}
                      onClick={toggleDrawer(false)}
                      selected={location.pathname === item.path}
                      sx={{
                        "&.Mui-selected": { backgroundColor: "rgba(30, 60, 114, 0.2)" },
                      }}
                    >
                      <ListItemText primary={item.label} />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <img src="../../assets/favicon.ico" alt="logo" height={60} width={70} style={{ marginRight: 10 }} />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  textDecoration: "none", color: "white",
                  mx: 2,
                  border: location.pathname === "/" ? "2px solid blue" : "none"
                }}
              >
                WiggleWag
              </Typography>
            </Box>
          )}

          {!isMobile &&
            navLinks.map((item, index) => (
              <Button
                key={index}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{
                  mx: 2,
                  border: location.pathname === item.path ? "2px solid blue" : "none",
                }}
              >
                {item.label}
              </Button>
            ))}

          <AuthButton />
          {user?.email !== "yahya@gmail.com" && (
            <IconButton component={Link} to="/cart" color="inherit" sx={{ ml: 2 }}>
              <Badge badgeContent={totalQuantity} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;


