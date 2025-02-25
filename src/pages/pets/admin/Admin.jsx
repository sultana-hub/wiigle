import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import Grid from '@mui/material/Grid2'
import { Container, Table,Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import {fetchApplications} from '../../../services/queryFunctions'
import {updateApplicationStatus} from '../../../services/queryFunctions'

const Admin = () => {
  const queryClient = useQueryClient();

  // Fetch applications
  const { data: applications, isLoading, error } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });
console.log("data app",applications)
  // Mutation for updating status
  const mutation = useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: () => {
        queryClient.invalidateQueries(["applications"])
        alert("updated successfully")
    }
  });

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading applications</Typography>;

  return (
    <Container>
        <Box sx={{justifyContent:"center",textAlign:"center" ,marginTop:"20px"}}>
      <Typography variant="h4" color="rgb(63, 57, 113)" gutterBottom>Admin Panel - Approve/Reject Applications</Typography>
      <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}><b>Full Name</b></TableCell>
              <TableCell ><b>Email</b></TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}><b>Pet Type</b></TableCell>
              <TableCell ><b>Status</b></TableCell>
              <TableCell ><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {/* <Grid container spacing={2}> */}
            {applications?.map((app) => (
              <TableRow key={app?.$id}>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{app?.fullname}</TableCell>
                <TableCell >{app?.email}</TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>{app?.petid}</TableCell>
                <TableCell >
                <Typography color={app?.status === "approved" ? "green" : "red"}>
                      {app.status?.toUpperCase()}
                    </Typography>
                {/* <TableCell>{app?.status}</TableCell> */}
                </TableCell>
                  {/* {app?.status === "pending" && ( */}
                  <TableCell>
                    <>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => mutation.mutate({ id: app?.$id, status: "approved" })}
                        sx={{ mr: 1,mb:1,borderRadius: "30px" }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => mutation.mutate({ id: app?.$id, status: "rejected" })}
                        sx={{ mb:1 ,borderRadius: "30px"}}
                      >
                        Reject
                      </Button>
                    </>
                  {/* )} */}
                  {/* {app?.status !== "pending" && (
                    <Typography color={app?.status === "approved" ? "green" : "red"}>
                      {app.status?.toUpperCase()}
                    </Typography>
                  )} */}
                </TableCell>
              </TableRow>
            ))}
            {/* </Grid> */}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </Container>
  );
};

export default Admin;
