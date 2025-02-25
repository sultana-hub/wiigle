import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { CircularProgress, Card, CardContent, Typography, Button, Box, IconButton, Container, Alert ,Chip} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLogout } from '../hooks/useLogout'
import HomeIcon from '@mui/icons-material/Home';
import { account, database } from "../../src/appwriteConf/appwriteConfig";
import Grid from '@mui/material/Grid2'
import { Query } from 'appwrite';
const Profile = () => {
  const navigate = useNavigate()

  const { data: user, isLoading } = useAuth()
  console.log("user data", user)

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!user) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }
    const fetchApplications = async () => {
      try {
        const response = await database.listDocuments(
          "67b49208003532bc769b", // Database ID
          "67bab8c8003785e9a9cd", // Collection ID
          [Query.equal("userid", user.$id)] // Query filtering by logged-in user ID
        );

        setApplications(response.documents);
        console.log("profile res", response.documents)
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const { mutate: logout } = useLogout()
  const handleLogout = () => {
    logout();
  };

  // if (appLoading) return <CircularProgress />;
  // if (isError) return <Typography>Error loading applications.</Typography>;
  { loading && <CircularProgress sx={{ display: "block", mx: "auto" }} /> }

  return (
    <div>

<Box display="flex" justifyContent="center" mt={5} px={2}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 3,
          boxShadow: 3,
          borderRadius: 3,
          textAlign: "center",
          mb: 5,
          border: "2px solid #1976d2",
          bgcolor: "#f9f9f9",
        }}
      >
        {/* User Details */}
        <CardContent>
          <Typography variant="h5" fontWeight="bold" mb={1}>
            {user?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            📧 {user?.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            📞 {user?.phone}
          </Typography>
         {
          (applications?.length===0)&&(
            <Alert>No Pet Adoption</Alert>
          )
         }
         
         {
          (applications?.length!==0)&&(
            <Typography variant="h6" mt={3} fontWeight="bold" color="#1976d2">
            Pet Adoption Applications
          </Typography>
          )
         }
          
          {/* Applications List */}
          <Grid container spacing={2} mt={2} justifyContent="center">
            {applications?.map((app) => (
              <Grid item xs={12} key={app.petid}>
                <Card sx={{ p: 2, boxShadow: 1, borderRadius: 2, textAlign: "left", bgcolor: "#fff" }}>
                  <Typography variant="body1" fontWeight="bold">
                    🐾 Pet ID: {app.petid || "Unknown"}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <Typography variant="body2" fontWeight="bold">
                      Status:
                    </Typography>
                    <Chip
                      label={app.status || "Pending"}
                      color={app.status === "Approved" ? "success" : "error"}
                      sx={{ fontWeight: "bold" }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    📅 Submitted: {new Date(app.$createdAt).toLocaleDateString()}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        
         
          {/* Pet Adoption Application Status */}
         

          
        </CardContent>

        {/* Action Buttons */}
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" onClick={() => navigate("/")}>
            <HomeIcon />
          </Button>
          <IconButton color="error" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>




    </div >
  )
}

export default Profile