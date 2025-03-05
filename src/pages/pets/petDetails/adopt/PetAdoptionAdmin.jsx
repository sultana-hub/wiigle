

import React, { useState } from "react";
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
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { fetchApplications, updateApplicationStatus } from "../../../../services/queryFunctions";

const PetAdoptionAdmin = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");

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

  // Sorting function for fullName
  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Apply sorting
  const sortedApplications = applications
    ? [...applications].sort((a, b) =>
        sortOrder === "asc"
          ? a.fullname.localeCompare(b.fullname)
          : b.fullname.localeCompare(a.fullname)
      )
    : [];

  // Pagination handlers
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
              <TableCell>
                <TableSortLabel
                  active
                  direction={sortOrder}
                  onClick={handleSort}
                >
                  <strong>Full Name</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Pet ID</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedApplications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((app) => (
                <TableRow key={app?.$id}>
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
                      disabled={app?.status === "approved"}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => mutation.mutate({ id: app?.$id, status: "rejected" })}
                      disabled={app?.status === "approved"}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={sortedApplications.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default PetAdoptionAdmin;


