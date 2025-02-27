// import React, { useState } from "react";
// import {
//   Container,
//   Typography,
//   Box,
//   CircularProgress,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useQuery, useMutation } from "react-query";
// import { database } from "../../appwriteConf/appwriteConfig";
// import { Query } from "appwrite";

// const OrderAdminPanel = () => {
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [newStatus, setNewStatus] = useState("");

//   // Fetch Orders
//   const { data: orders, isLoading, error, refetch } = useQuery({
//     queryKey: ["adminOrders"],
//     queryFn: async () => {
//       const response = await database.listDocuments(
//         "67b49208003532bc769b", // Database ID
//         "67bab8c8003785e9a9cd" // Orders Collection ID
//       );
//       return response.documents;
//     },
//   });

//   // Update Order Mutation
//   const updateOrderMutation = useMutation({
//     mutationFn: async ({ order_id, status }) => {
//       return await database.updateDocument(
//        process.env.REACT_APP_APPWRITE_DATABASE_ID, // Database ID
//        process.env.REACT_APP_APPWRITE_ORDERS_COLLECTION_ID, // Orders Collection ID
//         order_id,
//         { status }
//       );
//     },
//     onSuccess: () => {
//       refetch(); // Refresh orders list
//       setSelectedOrder(null); // Close modal
//     },
//   });

//   if (isLoading) return <CircularProgress sx={{ display: "block", mx: "auto", my: 5 }} />;
//   if (error) return <Typography color="error">Failed to load orders.</Typography>;

//   // Data Grid Columns
//   const columns = [
//     { field: "brand", headerName: "Product", flex: 1 },
//     { field: "quantity", headerName: "Qty", width: 100 },
//     { field: "price", headerName: "Total Price", width: 150 },
//     { field: "status", headerName: "Status", width: 150 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 150,
//       renderCell: (params) => (
//         <Button
//           variant="contained"
//           color="primary"
//           size="small"
//           onClick={() => {
//             setSelectedOrder(params.row);
//             setNewStatus(params.row.status);
//           }}
//         >
//           Edit
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <Container maxWidth="lg">
//       <Typography variant="h4" fontWeight="bold" mt={4} mb={3}>
//         📦 Admin Orders Dashboard
//       </Typography>

//       <Box sx={{ height: 400, width: "100%" }}>
//         <DataGrid rows={orders} columns={columns} pageSize={5} getRowId={(row) => row.$id} />
//       </Box>

//       {/* Edit Order Status Modal */}
//       <Dialog open={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
//         <DialogTitle>Update Order Status</DialogTitle>
//         <DialogContent>
//           <Select fullWidth value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
//             <MenuItem value="Pending">Pending</MenuItem>
//             <MenuItem value="Processing">Processing</MenuItem>
//             <MenuItem value="Shipped">Shipped</MenuItem>
//             <MenuItem value="Delivered">Delivered</MenuItem>
//             <MenuItem value="Cancelled">Cancelled</MenuItem>
//           </Select>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setSelectedOrder(null)} color="error">
//             Cancel
//           </Button>
//           <Button
//             onClick={() => updateOrderMutation.mutate({ orderId: selectedOrder.$id, status: newStatus })}
//             variant="contained"
//             color="primary"
//           >
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default OrderAdminPanel;



import React, { useEffect, useState } from 'react';
import { database } from '../../appwriteConf/appwriteConfig';
import { 
  Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Chip,Select, MenuItem 
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const OrderAdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersResponse = await database.listDocuments(  process.env.REACT_APP_APPWRITE_DATABASE_ID,  process.env.REACT_APP_APPWRITE_ORDERS_COLLECTION_ID);

        const formattedOrders = ordersResponse.documents.map(order => ({
          id: order.$id,
          brand: order.brand || "N/A",
          quantity: order.quantity || 0,
          price: order.price || "N/A",
          status: order.status || "Pending",
        }));

        setOrders(formattedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

// Function to update order status in Appwrite
const handleStatusChange = async (order_id, newStatus) => {
  try {
    await database.updateDocument(process.env.REACT_APP_APPWRITE_DATABASE_ID,  process.env.REACT_APP_APPWRITE_ORDERS_COLLECTION_ID, order_id, {
      status: newStatus
    });

    // Update state to reflect new status immediately
    setOrders(prevOrders =>
      prevOrders.map(order => 
        order?.id === order_id ? { ...order, status: newStatus } : order
      )
    );

  } catch (error) {
    console.error("Error updating order status:", error);
  }
};




  if (loading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 5 }} />;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
       <ShoppingCartIcon/> Order Management
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "" }}>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Order ID</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Brand</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ color: "black", fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order?.id}>
                <TableCell>{order?.id}</TableCell>
                <TableCell>{order?.brand}</TableCell>
                <TableCell>{order?.quantity}</TableCell>
                <TableCell>${order?.price}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    sx={{ width: "130px", fontWeight: "bold" }}
                    disabled={order?.status === "Delivered"} // Disable dropdown if approved
                  >
                    <MenuItem value="Pending" sx={{ color: "orange" }}>Pending</MenuItem>
                    <MenuItem value="Delivered" sx={{ color: "green" }}>Delivered</MenuItem>
                    <MenuItem value="Cancelled" sx={{ color: "red" }}>Cancelled</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderAdminPanel;
