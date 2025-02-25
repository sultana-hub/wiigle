import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import {petDetails} from '../../../services/queryFunctions'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Box,  Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
const PetDetails = () => {
    // const{category}=useParams()
  //  console.log("category",category)

  const navigate=useNavigate()
//get pet details
const{data,isLoading,isError}=useQuery("pet-details",petDetails)
console.log("pet details",data)
//user auths
// const{data:user}=useAuth()
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: 'white',

    }),
}));


if (isLoading) {
    return (<p>...Loading</p>)
}

if (isError) {
    return (<p>...Opps something went wrong</p>)
}

// if(!user){
//     return(
//     <p>Please Login First</p>
    
// )
//}


    return (
        <>     

<Box sx={{ textAlign: "center", color: "rgb(63, 57, 113)", p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        This adorable pet is looking for a new home. Adopt now and give it the love it deserves!
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {data?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ maxWidth: 300, mx: "auto", boxShadow: 3, borderRadius: 2 }}>
              <CardMedia component="img" height="250" image={item.url} alt="Pet" sx={{ objectFit: "cover" }} />
              <CardContent sx={{ textAlign: "left", p: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  Name: {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Favorite Food: {item.food}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nature: {item.habits}
                </Typography>
              </CardContent>

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
                onClick={() => navigate(`adopt/${item?.id}`)}
              >
                Adopt Me
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>

        </>
    )
}

export default PetDetails