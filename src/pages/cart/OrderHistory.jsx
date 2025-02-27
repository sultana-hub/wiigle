import React from "react";
import { useQuery } from "react-query";
import { Container, Typography, Table, TableBody, TableCell, Card,TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { getUserOrders } from "../../services/cartQueryFunction";

const OrderHistory = () => {
  const { data: user } = useAuth();
  const userId = user?.$id;

  const { data: orders, isLoading, isError, error } = useQuery(["userOrders", userId], () => getUserOrders(userId), {
    enabled: !!userId, // Ensures query runs only when userId exists
  });

  if (isLoading) return <Container sx={{ textAlign: "center", mt: 5 }}><CircularProgress /></Container>;
  if (isError) return <Container sx={{ mt: 5 }}><Alert severity="error">{error.message}</Alert></Container>;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
         Orders History
      </Typography>
      <Card sx={{ mt: 4, p: 2, bgcolor: "#f5f5f5" }}>
      {orders?.length === 0 ? (
        <Alert severity="info">No orders found.</Alert>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
              
                <TableCell><strong>Item Name</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order.$id}>
                
                  <TableCell>{order.brand}</TableCell>
                  {/* <TableCell><src img={order.image} alt="product" height="40px" width="40px"/></TableCell> */}
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>{order.created_at}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      </Card>
    </Container>
  );
};

export default OrderHistory;
