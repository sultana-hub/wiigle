


import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { fetchApplications, updateApplicationStatus } from "../../../../services/queryFunctions";

const PetAdoptionAdmin = () => {
  const queryClient = useQueryClient()

  // Fetch applications
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
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3} color="Black">
      <PetsIcon sx={{ color: "#ff5722" }} /> Pet Adoption Management
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell><PetsIcon sx={{ fontSize: 30, color: "#ff5722" }} /></TableCell> */}
              <TableCell><strong>Full Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Pet ID</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications?.map((app) => (
              <TableRow key={app?.$id}>
                {/* <TableCell><PetsIcon sx={{ color: "#ff5722" }} /></TableCell> */}
                <TableCell>{app?.fullname}</TableCell>
                <TableCell>{app?.email}</TableCell>
                <TableCell>{app?.petid}</TableCell>
                <TableCell>
                  <Select
                    value={app?.status}
                    onChange={(e) => mutation.mutate({ id: app?.$id, status: e.target.value })}
                    fullWidth
                    disabled={app?.status === "approved"} // Disable dropdown if approved
                  >
                    <MenuItem value="pending" sx={{ color: "orange" }}>Pending</MenuItem>
                    <MenuItem value="approved" sx={{ color: "green" }}>Approved</MenuItem>
                    <MenuItem value="rejected" sx={{ color: "red" }}>Rejected</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => mutation.mutate({ id: app?.$id, status: "approved" })}
                    sx={{ mr: 1 }}
                    disabled={app?.status === "approved"} // Disable approve button if already approved
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => mutation.mutate({ id: app?.$id, status: "rejected" })}
                    disabled={app?.status === "approved"} // Disable reject button if already approved
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PetAdoptionAdmin;



