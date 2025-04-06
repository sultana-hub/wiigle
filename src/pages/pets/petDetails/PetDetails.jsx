import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { petDetails, updatePetStatus, deletePet } from '../../../services/queryFunctions'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { Box, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { petDetailsStorage } from '../../../appwriteConf/appwriteConfig'
import { useAuth } from "../../../hooks/useAuth";
import { useMutation, useQueryClient } from "react-query";
import { MenuItem, Select } from "@mui/material";

const PetDetails = () => {


  const queryClient = useQueryClient();
  const { mutate: changeStatus } = useMutation(updatePetStatus, {
    onSuccess: () => {
      alert("Pet Status changed successfully!");
      queryClient.invalidateQueries(["pets"]);
    },
  });

  const handleStatusChange = (petId, newStatus) => {
    changeStatus({ petId, newStatus });
  };

  // const{category}=useParams()
  //  console.log("category",category)

  const navigate = useNavigate()
  //get pet details
  const { data, isLoading, isError } = useQuery("pet-details", petDetails)
  console.log("pet details", data)
  //user auths
  // const{data:user}=useAuth()


  const { mutate: removePet } = useMutation(deletePet, {
    onSuccess: () => {
      alert("Pet deleted successfully!");
      queryClient.invalidateQueries(["pets"]);
    },
  });

  const handleDelete = (petid) => {
    console.log("Deleting Pet ID:", petid);
    if (!petid) {
      console.error("Error: Pet ID is undefined.");
      return;
    }
    removePet(petid);
  };

  const { data: user } = useAuth(); // Get user authentication data
  const isAdmin = user?.email === "yahya@gmail.com"; // Check if user is admin




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
    <Grid  sx={{ textAlign: "center",mt:"20px" }}>
    <Typography variant="h6" color="rgb(63, 57, 113)" sx={{ mb: 3 }}>
                Lovely pets are  available for adotion
               </Typography>
    </Grid>

     
      <Box sx={{ flexGrow: 1, mb: 5, px: 2}}>
       


        {/* Products Grid */}
        <Grid container spacing={3} justifyContent="center">
          {data?.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ alignItems: "center" }}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: "10px",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  width="150"
                  image={
                    item.imageId
                      ? petDetailsStorage.getFileView(
                        process.env.REACT_APP_APPWRITE_PET_BUCKET_STOROAGE_ID,
                        item.imageId
                      )
                      : ""
                  }
                  alt="product"
                  sx={{ borderRadius: "10px 10px 0 0" }}
                />
                <CardContent sx={{ textAlign: "left" }}> {/* Updated to left align */}
                  <Typography variant="h6" fontWeight="bold">
                    Name: {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Favorite Food: {item.food}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Nature: {item.habits}
                  </Typography>
                  {/* Status Update for Admin */}
                  {isAdmin ? (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Status:
                      </Typography>
                      <Select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        sx={{ width: "100%", mt: 1 }}
                        disabled={item.status === "Adopted"}
                      >
                        <MenuItem value="Available">Available</MenuItem>
                        <MenuItem value="Adopted">Adopted</MenuItem>
                      </Select>
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Status: {item.status}
                    </Typography>
                  )}




                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
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
                      onClick={() => navigate(`adopt/${item?.$id}`)}
                      disabled={item.status === "Adopted" ||isAdmin}
                    >
                      Adopt Me
                    </Button>
                    {isAdmin && (
                      <Button
                        variant="contained"
                        sx={{
                          background: "linear-gradient(135deg, rgb(170, 27, 27) 0%, rgb(163, 34, 34) 100%)",
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
                        onClick={() => handleDelete(item.$id)}
                      >
                        Delete
                      </Button>
                    )}
                  </Box>

                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>




  )
}

export default PetDetails