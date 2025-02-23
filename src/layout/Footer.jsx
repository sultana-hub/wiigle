import React, { useState } from 'react'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import{ Typography,Box,Container} from '@mui/material';
const Footer = () => {
  let [value, setValue] = useState("")
  return (
    <>
    <Box
component="footer"
      sx={{
        position: "sticky",
        bottom: 0,
        width: "100%",
        mt: "auto",
        bgcolor: "#cce0ff",
        color: "white",
        py: 2,
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="body2" color='black'>© 2025 Webskitter Academy. All rights reserved.</Typography>
      </Container>
{/* 
      <BottomNavigation
          position="static"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);

        }}
        className='bg-success'
        sx={{
          position: 'static',
          backgroundColor: "#cce0ff",
          bottom: 0, width: '100%',
          height: "100px"

        }}
      >
        <Typography component="div" sx={{ mt: "20px" }}>

          Copyright ©2025 Webskitter Academy
        </Typography>
         <BottomNavigationAction label="Recents"  icon={<RestoreIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> 
      </BottomNavigation> */}
      
      
</Box>
    </>
  )

}

export default Footer