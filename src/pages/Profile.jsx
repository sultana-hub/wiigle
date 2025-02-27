




import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Container,
  Grid,
  Chip,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { database } from "../../src/appwriteConf/appwriteConfig";
import { Query } from "appwrite";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import DeliveryStatus from "./cart/DeliveryStatus";
import OrderHistory from "./cart/OrderHistory";
import ErrorPage from "./ErrorPage";
import {getUserOrders} from '../services/cartQueryFunction'
import { useQuery } from "react-query";
const Profile = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useAuth();
  const { mutate: logout } = useLogout();
  //adoption application
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 


  useEffect(() => {
    if (!user) {
      setError("User not authenticated.");
      setLoading(false);
      return;
    }
    //fetching adoption application from database for filtering
    const fetchApplications = async () => {
      try {
        const response = await database.listDocuments(
          process.env.REACT_APP_APPWRITE_DATABASE_ID, // Database ID
          process.env.REACT_APP_APPWRITE_ADOPTION_COLLECTION_ID, // Collection ID
          [Query.equal("userid", user.$id)] // Filter by user ID
        );
        setApplications(response.documents);
      } catch (err) {
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };
   
    fetchApplications();
  
  }, [user]);


//fetching orders for the user

 // Fetching user orders using React Query
 const { data: orders, isLoading:orderLoading } = useQuery({
  queryKey: ["userOrders"],
  queryFn: ()=>getUserOrders(user?.$id), // Fetching user orders from Appwrite
});



  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", my: 5 }} />;
  if (error) return <Typography color="error"><ErrorPage /></Typography>;

  return (
    <Container maxWidth="md">
      {/* Profile Card */}
      <Box display="flex" justifyContent="center" mt={5}>
        <Card
          sx={{
            width: "100%",
            p: 3,
            boxShadow: 4,
            borderRadius: 3,
            textAlign: "center",
            bgcolor: "#f9f9f9",
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              🙂 {String(user?.name).charAt(0).toUpperCase() + String(user?.name).slice(1).toLowerCase()}
            </Typography>
            <Typography variant="body2" color="primary" mt={1}>
              📧 {user?.email}
            </Typography>

            {/* Pet Adoption Status */}
            <Typography variant="h6" mt={3} fontWeight="bold" color="secondary">
              Pet Adoption Applications
            </Typography>
            {applications?.length === 0 ? (
              <Typography variant="body2" color="error" mt={1}>
                ❌ No pet adoption applications found.
              </Typography>
            ) : (
              <Grid container spacing={2} mt={2} justifyContent="center">
                {applications?.map((app) => (
                  <Grid item xs={12} key={app.petid}>
                    <Card
                      sx={{
                        p: 2,
                        boxShadow: 2,
                        borderRadius: 2,
                        bgcolor: "#fff",
                      }}
                    >
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
            )}
          </CardContent>

          {/* Action Buttons */}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={() => navigate("/")}>
              <HomeIcon />
            </Button>
            <IconButton color="error" onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Card>
      </Box>

      {/* Order Status & History */}
      <Box mt={5}>
        {
          orders?.length === 0 ? (
            <Typography variant="body2" color="error" mt={1}>
              ❌ No Orders Details found.
            </Typography>
          ) :(
            <>
            <DeliveryStatus />
            <OrderHistory />
            </>

          ) 

        }
        {/* <DeliveryStatus />
        <OrderHistory /> */}
      </Box>
    </Container>
  );
};

export default Profile;
