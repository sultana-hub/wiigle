
import React from "react";
import { Button, CircularProgress, List, Typography } from "@mui/material";
import { fetchCartItems } from '../../services/cartQueryFunction'
import { useQuery } from "react-query";
import { storage } from "../../appwriteConf/appwriteConfig";
import { removeFromCart } from '../../services/cartQueryFunction'
import { useMutation, useQueryClient } from "react-query";
import { Card, CardMedia, CardContent, Box, Container } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { database } from "../../appwriteConf/appwriteConfig";
import { useAuth } from "../../hooks/useAuth";
import { updateCartItem } from '../../services/cartQueryFunction'
import Swal from "sweetalert2";
// import { ToastContainer, toast } from 'material-react-toastify';
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../services/cartQueryFunction";
import {useUpdateStock} from '../../hooks/cartHooks/useUpdateStock'
import ErrorPage from "../ErrorPage";

// import Alert from '@mui/material/Alert';
const Cart = () => {
  const navigate=useNavigate()
    // const { data: user } = useAuth()
  const updateStockMutation = useUpdateStock();
  const queryClient = useQueryClient()
  const { data: user } = useAuth()
  const user_id = user?.$id
 

  const { data: cartItems=[], isLoading} = useQuery(
    ["cart", user_id],
    () => fetchCartItems(user_id),
    {
      enabled: !!user_id, // Ensuring query only runs if userId is available
    },
  
  );

console.log("cart item",cartItems)
  // Updating quantity when increment/decrement buttons are clicked

  // Mutation to update item quantity
  const mutation = useMutation(updateCartItem, {
    onSuccess: () => {
     
      queryClient.invalidateQueries(["cart",user_id]); // Refetching cart data after update
      queryClient.refetchQueries(["cartItems", user?.$id]); // ✅ Forces refetch
    },
  });


  

  // Increase quantity
  const handleIncrease = (itemId, quantity) => {
    mutation.mutate({ id: itemId, quantity: quantity + 1 });
  };

  // Decrease quantity (Min: 1)
  const handleDecrease = (itemId, quantity) => {
    if (quantity > 0) {
      mutation.mutate({ id: itemId, quantity: quantity - 1 });
    }
  };
  //check out
  console.log("cart items", cartItems)

  const totalPrice = cartItems?.reduce(
    (total, item) => total + (parseFloat(item?.price) || 0) * (parseInt(item?.quantity) || 1),
    0
  );

  //remove from cart
  const { mutate } = useMutation(removeFromCart, {
    onSuccess: () => {
  console.log("success in cart")
    },
    onError: () => console.log("error in delete")
  })
  //deleting the cart item
  const onDelete = (itemId) => {
    mutate(itemId,{
      onSuccess: () => {
        
       Swal.fire({
         title: "😔!",
         text: "Item deleted!"
       });

       setTimeout(()=>{
         navigate("/cart")
        window.location.reload()
       })

     },
    })

  }

  //clearing the cart after checkout 
  const clearCart = async () => {
    try {
      for (const item of cartItems) {
        await database.deleteDocument(process.env.REACT_APP_APPWRITE_DATABASE_ID,
           process.env.REACT_APP_APPWRITE_CART_COLLECTION_ID, item.$id)
      }
      console.log("cart cleared")
    } catch (error) {
      console.log("error in clearing cart", error)
    }
  }

  const handleCheckout = async (cartItems, userId) => {
   const val= window.confirm("Proceeding to Checkout...");
   if(val){

   
      Swal.fire({
          title: "😊",
          text: "Proceeding to payment !"
        });
      
      clearCart()
      window.open("https://dashboard.stripe.com/test/payment-links/create?verify_email=true")
  
      Swal.fire({
        text: "Payment succesful!",
        icon: "success"
      });

    try {
      for (const item of cartItems) {
        await createOrder({
          user_id: userId,
          product_id: item.product_id,
          brand: item.brand, // Assuming product name is stored in brand
          quantity: item.quantity,
          weight: item.weight,
          price: parseFloat(item.price) * item.quantity,
        });
    
     //  Reducing Stock in Product Collection
     await updateStockMutation.mutateAsync({
      productId: item.product_id,
      quantityOrdered: item.quantity,
    });
    console.log(` Stock updated for ${item.brand}`);
  
  }
      // alert(" Order placed successfully!");
      Swal.fire({
        title: "😊",
        text: "Order placed successfully !"
      });
    } catch (error) {
      alert(" Failed to place order. Please try again.");
    }
    navigate("/delivery")

  }
  else{
    navigate("/cart")
  }
  }
  console.log("cart items", cartItems)
  if (isLoading) return <CircularProgress />;

  if (!user) {
    return (
      setTimeout(()=>{
        <ErrorPage />
      },3000)
     
    )
  }




  return (
    <Container>

      {
        cartItems?.length === 0 ? (
          <Box sx={{ justifyContent: "center", justifyItems: "center", padding: "10px",paddingBottom:"195px" ,paddingTop:"195px"}}>
            <Typography variant="h6">Your Cart is empty 😔!</Typography>
          </Box>
        ) :
          <Box>
            <Box sx={{ justifyContent: "center", justifyItems: "center", padding: "10px" }}>
              <Typography variant="h6">Your Cart</Typography>
            </Box>
            <List>
              {cartItems?.map((item) => (

                <Card sx={{ display: "flex", alignItems: "center", p: 2, mb: 2, boxShadow: 3 }}>
                  {/* Product Image */}
                  <CardMedia
                    component="img"
                    image={item?.imageId ? storage.getFileView(process.env.REACT_APP_APPWRITE_PRODUCTS_IMAGES_STORAGE_ID, item?.imageId) : ""}
                    alt="product"
                    sx={{ width: 80, height: 80, borderRadius: 2 }}
                  />

                  {/* Product Details */}
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{item?.brand}</Typography>
                    <Typography variant="body1" color="text.secondary">
                      Price: ${item?.price}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Weight: ${item?.weight}
                    </Typography>
                  </CardContent>

                  {/* Remove Button */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button variant="contained" color="" size="small" onClick={() => handleDecrease(item?.$id, item?.quantity)}>-</Button>
                    <Typography variant="body2">Qty: {item?.quantity}</Typography>
                    <Button variant="contained" color="" size="small" onClick={() => handleIncrease(item?.$id, item?.quantity)}>+</Button>
                    <Button
                      sx={{
                        background: "linear-gradient(135deg,rgb(190, 73, 73) 0%,rgb(138, 11, 11) 100%)", // Gradient
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: "30px", // Rounded edges
                        padding: "10px 20px",
                        boxShadow: "0px 4px 10px rgba(168, 191, 202, 0.4)", // Soft shadow
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "linear-gradient(135deg, #e66465 0%,rgb(143, 56, 10) 100%)", // New gradient on hover
                          boxShadow: "0px 6px 15px rgba(178, 199, 199, 0.5)", // Stronger shadow
                        },
                      }}
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDelete(item?.$id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Card>
              ))}
            </List>
            {/* //check out button */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, p: 2, borderTop: "1px solid #ddd" ,paddingBottom:"200px"}}>
              <Typography variant="h6">Total: ${totalPrice?.toFixed(2)}</Typography>
              <Button
                variant="contained"
                // startIcon={<ShoppingCart />} // Icon on the left side
                sx={{
                  background: "linear-gradient(135deg,rgb(104, 106, 110) 0%,rgb(63, 57, 113) 100%)", // Gradient
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: "30px", // Rounded edges
                  padding: "10px 20px",
                  boxShadow: "0px 4px 10px rgba(255, 126, 95, 0.4)", // Soft shadow
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(135deg, #e66465 0%, #9198e5 100%)", // New gradient on hover
                    boxShadow: "0px 6px 15px rgba(230, 100, 101, 0.5)", // Stronger shadow
                  },
                }}
                onClick={() => handleCheckout(cartItems, user?.$id)}
              >
                Checkout
              </Button>
            </Box>
          </Box>
      }
    </Container>
  );
};

export default Cart;


