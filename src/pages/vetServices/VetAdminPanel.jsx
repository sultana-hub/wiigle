

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import { fetchServiceApplications, updateVetApplicationStatus } from "../../services/queryFunctions";
import HealingIcon from "@mui/icons-material/Healing";

const VetAdminPanel = () => {
  const queryClient = useQueryClient();
  const { data: service, isLoading, error } = useQuery({
    queryKey: ["service"],
    queryFn: fetchServiceApplications,
  });

  const mutateService = useMutation({
    mutationFn: updateVetApplicationStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["service"]);
      alert("Status updated successfully");
    },
  });

  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = () => {
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedService = service?.slice().sort((a, b) => {
    if (order === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  if (isLoading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;
  if (error) return <Typography color="error">Error loading applications</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        <HealingIcon sx={{ fontSize: 40, mr: 1, color: "#4caf50" }} /> Vet Services Management
      </Typography>
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 3, bgcolor: "#f9f9f9" }}>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel active direction={order} onClick={handleSort}>
                      <b>Full Name</b>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Service</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedService?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((app) => (
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
                        disabled={app?.status === "approved"}
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={service?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </Card>
    </Container>
  );
};

export default VetAdminPanel;




