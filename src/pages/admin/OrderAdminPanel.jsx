

import React, { useEffect, useState } from "react";
import { database } from "../../appwriteConf/appwriteConfig";
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
  Select,
  MenuItem,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const OrderAdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersResponse = await database.listDocuments(
          process.env.REACT_APP_APPWRITE_DATABASE_ID,
          process.env.REACT_APP_APPWRITE_ORDERS_COLLECTION_ID
        );

        setOrders(
          ordersResponse.documents.map((order) => ({
            id: order.$id,
            brand: order.brand || "N/A",
            quantity: order.quantity || 0,
            price: order.price || "N/A",
            status: order.status || "Pending",
          }))
        );
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Sorting function for brand name
  const handleSort = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setOrders((prevOrders) =>
      [...prevOrders].sort((a, b) =>
        sortOrder === "asc"
          ? a.brand.localeCompare(b.brand)
          : b.brand.localeCompare(a.brand)
      )
    );
  };

  // Pagination handlers
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        <ShoppingCartIcon /> Order Management
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Order ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active
                  direction={sortOrder}
                  onClick={handleSort}
                >
                  Brand
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Price</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.brand}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>${order.price}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onChange={(e) =>
                        setOrders((prevOrders) =>
                          prevOrders.map((o) =>
                            o.id === order.id
                              ? { ...o, status: e.target.value }
                              : o
                          )
                        )
                      }
                      sx={{ width: "130px", fontWeight: "bold" }}
                      disabled={order.status === "Delivered"}
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

      {/* Pagination */}
      <TablePagination
        component="div"
        count={orders.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Box>
  );
};

export default OrderAdminPanel;

