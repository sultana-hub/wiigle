

import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { fetchApplications, updateApplicationStatus } from '../../../../services/queryFunctions';

const PetAdoptionAdmin = () => {
  const queryClient = useQueryClient();

  // Fetching applications
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  // Mutation for updating adoption status
  const mutation = useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
      alert("Status updated successfully!");
    },
  });

  if (isLoading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  if (error)
    return <Typography color="error">Error loading applications</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3} color="primary">
        Pet Adoption Management
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {applications?.map((app) => (
          <Grid item xs={12} md={6} lg={4} key={app?.$id}>
            <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3, bgcolor: "#f9f9f9" }}>
              <PetsIcon sx={{ fontSize: 50, color: "#ff5722", mb: 2 }} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{app?.fullname}</Typography>
                <Typography variant="body2" color="text.secondary">📧 {app?.email}</Typography>
                <Typography variant="body1" mt={1} fontWeight="bold">🐾 Pet ID: {app?.petid}</Typography>
                <Select
                  value={app?.status}
                  onChange={(e) => mutation.mutate({ id: app?.$id, status: e.target.value })}
                  fullWidth
                  sx={{ mt: 2, fontWeight: "bold" }}
                  disabled={app?.status === "approved"} // Disable dropdown if approved
                >
                  <MenuItem value="pending" sx={{ color: "orange" }}>Pending</MenuItem>
                  <MenuItem value="approved" sx={{ color: "green" }}>Approved</MenuItem>
                  <MenuItem value="rejected" sx={{ color: "red" }}>Rejected</MenuItem>
                </Select>
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => mutation.mutate({ id: app?.$id, status: "approved" })}
                    sx={{ borderRadius: "30px" }}
                    disabled={app?.status === "approved"} // Disable approve button if approved
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => mutation.mutate({ id: app?.$id, status: "rejected" })}
                    sx={{ borderRadius: "30px" }}
                    disabled={app?.status === "approved"} // Disable reject button if approved
                  >
                    Reject
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PetAdoptionAdmin;


