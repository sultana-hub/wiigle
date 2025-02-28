import React, { useState } from 'react'
import CarouselSlide from '../components/carousel/CarouselSlide';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Typography, Button} from '@mui/material';
import { useAuth } from "../hooks/useAuth";
import { useQuery } from 'react-query';
import GetAllPets from '../pages/pets/GetAllPets';

const Home = () => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: 'white',

    }),
  }));
const handleSubmit=()=>{

}

  return (
    <>
     
        <CarouselSlide />
      <Grid sx={{ textAlign: "center", color: "rgb(63, 57, 113)" }}>
        <h1>Welcome To Wiggle Wag Pet Service & Shop</h1>
      </Grid>
      <GetAllPets />

     
    </>
  )
}

export default Home