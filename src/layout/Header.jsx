import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box, TextField, CircularProgress } from '@mui/material/';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AuthButton from "../components/AuthButton";
// import { logout } from '../Redux/Slice/userSlice';
// import { useDispatch } from 'react-redux';
// import Message from '../Components/Message'
import { useAuth } from '../hooks/useAuth';

const Header = () => {
const{data:user,isLoading}=useAuth()
console.log("header user data",user)
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#000033", flexGrow: 1 }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>

              <img src="../../assets/favicon.ico
              " alt="logo" height={50} width={60} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.1rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                < Link to="/" style={{ textDecoration: "none", color: "white" }}> WiggleWag</Link>
              </Typography>
              <Typography
                variant="h6"
                noWrap


                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',

                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <Button color="inherit" ><Link to="/signup" style={{ textDecoration: "none", color: "inherit" }}>Register</Link></Button>


              </Typography>

              <Typography
                variant="h6"
                noWrap


                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',

                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <AuthButton />

              </Typography>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  // fontWeight: 700,
                  // letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >

                <Button color="inherit" > <Link to="/product" style={{ textDecoration: "none", color: "white" }} >Products</Link> </Button>
              </Typography>
              {/* admin only can see this */}
              {
                user?.email==="yahya@gmail.com" &&(
                  <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    // fontWeight: 700,
                    // letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
  
                  <Button color="inherit" > <Link to="/admin" style={{ textDecoration: "none", color: "white" }} >Dashboard</Link> </Button>
                </Typography>
                )
              }
             

              <Typography sx={{ marginLeft: "auto" }}>
                {/* <Typography
            variant="h6"
            noWrap
            sx={{
              // mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              // fontWeight: 700,
              // letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          > */}
                <Button color="inherit" sx={{ marginLeft: "2px" }}><Link to="/vet" className='btn' style={{ textDecoration: "none", color: "white" }} >Vet Service</Link> </Button>

                <Button color="inherit" sx={{ marginLeft: "2px" }}> <Link to="/profile" className='btn' style={{ textDecoration: "none", color: "white" }} >Profile</Link> </Button>
                {/* </Typography> */}
                <Button color="inherit" ><Link to="/cart" style={{ textDecoration: "none", color: "white" }}><ShoppingCartIcon /></Link></Button>
              </Typography>

            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  )
}

export default Header