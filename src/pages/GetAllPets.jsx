import React,{useEffect, useState} from 'react'
import { useQuery } from 'react-query'
import {Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Container, Typography } from "@mui/material";

import { DATABASE_ID, COLLECTION_PET_ID, APPWRITE_END_POINT } from "../appwriteConf/appwriteConstants";
const GetAllPets = () => {
   const navigate=useNavigate()
 //Fetch All Pets
 const fetchPet = async () => {
  const response = await fetch(`${APPWRITE_END_POINT}/databases/${DATABASE_ID}/collections/${COLLECTION_PET_ID}/documents`, {
      method: "GET",
      headers: {
          "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
          "Access-Control-Allow-Origin": "*",
          "X-Appwrite-Key": process.env.REACT_APP_APPWRITE_API_KEY
      }
  });

  const jsonRes = await response.json()
  console.log("jsonRes", jsonRes)
  return jsonRes?.documents;
};

const { data, isLoading, isSuccess, isError } = useQuery("pets", fetchPet)
console.log("result", data)


if(isLoading){
  return(<p>...Loading</p>)
}




  return (
    <>

      {
        data?.map((item)=>(
          <Card sx={{ display: "flex", width: "98%", borderRadius: 2, boxShadow: 3 ,mt:5 ,ml:2,mr:2}} key={item.id}>
          {/* Left-side Image */}
          <CardMedia
            component="img"
            sx={{ width: 300, objectFit: "cover" }}
            image={item.image}
            alt="Pet"
          />
          
          {/* Right-side Description */}
          <CardContent  sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1, // Adds spacing between lines
        }}>
            <Typography variant="h6" fontWeight="bold" sx={{color:"rgb(63, 57, 113)"}}>
              Cute {item.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {/*  */}
              {item.desc}
            </Typography>
          </CardContent>
          <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography variant="h6" fontWeight="bold">
            <Button
      variant="contained"
      // startIcon={<ShoppingCart />} // Icon on the left side
      sx={{
        background: "linear-gradient(135deg,rgb(104, 106, 110) 0%,rgb(63, 57, 113) 100%)", // Gradient
        color: "white",
        fontWeight: "bold",
        textTransform: "none",
        borderRadius: "30px", // Rounded edges
        padding: "10px 20px",
        boxShadow: "0px 4px 10px rgba(255, 126, 95, 0.4)", // Soft shadow
        transition: "all 0.3s ease",
        "&:hover": {
          background: "linear-gradient(135deg, #e66465 0%, #9198e5 100%)", // New gradient on hover
          boxShadow: "0px 6px 15px rgba(230, 100, 101, 0.5)", // Stronger shadow
        },
      }}
      onClick={()=>navigate("/pet_details")}
    >

      View More
    </Button>
            </Typography>
            
          </CardContent>
        </Card>
        ))
      }
      </>
  )
}

export default GetAllPets
