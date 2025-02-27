
import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box, CircularProgress, Card, CardContent } from "@mui/material";
import { fetchServiceApplications, updateVetApplicationStatus } from '../../services/queryFunctions';
import HealingIcon from '@mui/icons-material/Healing';

const VetAdminPanel = () => {
  const queryClient = useQueryClient();

  // Fetching applications for vet services
  const { data: service, isLoading, error } = useQuery({
    queryKey: ["service"],
    queryFn: fetchServiceApplications,
  });

  // Mutation for updating vet service status
  const mutateService = useMutation({
    mutationFn: updateVetApplicationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["service"]);
      alert("Status updated successfully");
    },
  });

  if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;
  if (error) return <Typography color="error">Error loading applications</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        <HealingIcon sx={{ fontSize: 40, mr: 1, color: '#4caf50' }} /> Vet Services Management
      </Typography>
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3, bgcolor: "#f9f9f9" }}>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>Full Name</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Service</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {service?.map((app) => (
                  <TableRow key={app?.$id}>
                    <TableCell>{app?.name}</TableCell>
                    <TableCell>{app?.email}</TableCell>
                    <TableCell>{app?.service}</TableCell>
                    <TableCell>
                      <Typography color={app?.status === "approved" ? "green" : "red"}>
                        {app.status?.toUpperCase()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => mutateService.mutate({ id: app?.$id, status: "approved" })}
                        sx={{ mr: 1, borderRadius: "20px" }}
                         disabled={app?.status==="approved"}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => mutateService.mutate({ id: app?.$id, status: "rejected" })}
                        sx={{ borderRadius: "20px" }}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default VetAdminPanel;





