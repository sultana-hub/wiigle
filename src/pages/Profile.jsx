import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Avatar, Card, CardContent, Typography, Button, Box, IconButton } from "@mui/material";
const Profile = () => {
  const{data:user,isLoading}=useAuth()
  console.log("user data",user)
  return (
    <div>
       <Box display="flex" justifyContent="center" mt={5}>
      <Card sx={{ width: 350, p: 3, boxShadow: 3, borderRadius: 3, textAlign: "center" ,marginBottom:"50px" ,border: "2px solid #1976d2"}}>
        {/* Profile Image */}
        {/* <Avatar
          src={user.avatar || "https://via.placeholder.com/150"}
          sx={{ width: 80, height: 80, margin: "auto", mb: 2 }}
        /> */}

        {/* User Details */}
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
           Name: {user?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Email: {user?.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           Contact: {user?.phone}
          </Typography>
        </CardContent>

        {/* Action Buttons */}
        {/* <Box mt={2} display="flex" justifyContent="space-between"> */}
          {/* <Button variant="contained" color="primary" startIcon={<EditIcon />} onClick={onEdit}>
            Edit Profile
          </Button> */}
          {/* <IconButton color="error" onClick={onLogout}>
            <LogoutIcon />
          </IconButton> */}
        {/* </Box> */}
      </Card>
    </Box>
    </div>
  )
}

export default Profile