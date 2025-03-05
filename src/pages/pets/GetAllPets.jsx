import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Button } from '@mui/material';
import { storage } from '../../appwriteConf/appwriteConfig'
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Container, Box, Typography } from "@mui/material";

import { DATABASE_ID, COLLECTION_PET_ID, APPWRITE_END_POINT } from "../../appwriteConf/appwriteConstants";
const GetAllPets = () => {
  const navigate = useNavigate()
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


  if (isLoading) {
    return (<p>...Loading</p>)
  }


  return (
    <>
      {/* customised code  */}
      <Box sx={{ px: 2, mt: 3, mr: 3 }}>
        {data?.map((item) => (
          <Card
            key={item.id}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // Column on small screens, Row on medium+
              width: "100%",
              borderRadius: 2,
              boxShadow: 3,
              mt: 3,
              p: 2,
            }}
          >
            {/* Left-side Image */}
            <CardMedia
              component="img"
              sx={{
                width: { xs: "100%", md: 300 }, // Full width on small screens
                height: 300,
                objectFit: "cover",
                borderRadius: "10px",
              }}
              image={item.imageId ? storage.getFileView(process.env.REACT_APP_APPWRITE_PET_IMAGE_STORAGE_ID, item.imageId) : ""}
              alt={item.category}
            />

            {/* Right-side Description */}
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: { xs: "center", md: "left" },
                px: { xs: 1, md: 3 }, // Adjusting padding based on screen size
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ color: "rgb(63, 57, 113)" }}>
                Cute {item.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.desc}
              </Typography>
            </CardContent>

            {/* Button Section */}
            <CardContent
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                alignItems: "center",
                textAlign: "center",
                p: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg,rgb(104, 106, 110) 0%,rgb(63, 57, 113) 100%)",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "30px",
                  padding: "10px 20px",
                  boxShadow: "0px 4px 10px rgba(255, 126, 95, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #e66465 0%, #9198e5 100%)",
                    boxShadow: "0px 6px 15px rgba(230, 100, 101, 0.5)",
                  },
                }}
                onClick={() => navigate("/pet_details")}
              >
                View More
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

    </>
  )
}

export default GetAllPets
