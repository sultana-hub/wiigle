import React from "react";
import { Button } from "@mui/material";
import { useCart } from "../hooks/cartHooks/useCart";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from 'material-react-toastify';
const AddToCartButton = ({ user_id, product_id, brand, price, image,weight }) => {

  const  navigate=useNavigate()

  const { addMutation } = useCart(user_id);
 
  console.log("add mutation", addMutation)

  const handleAddToCart = async () => {
    // console.log("User ID:", user_id);
    // console.log("Product ID:", product_id);

    if (!user_id || !product_id) {
      // console.error("Error: Missing userId or productId", { user_id, product_id });
      // alert("Error: User ID or Product ID is missing.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login First!",
        footer: '<a href="/login">Please Login</a>'
      });
      return;
    }

    try {
      await addMutation.mutateAsync({ user_id: user_id, product_id: product_id, image: image, brand: brand, price: price,weight:weight, quantity: 1 });
      Swal.fire({
        icon: "success",
        title: "Good Job",
        text: "Item added to cart!",
       
      });
      // toast.success('Item added to cart 😊')
      navigate("/cart")
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  return (
    <>


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
        onClick={handleAddToCart}
        disabled={addMutation.isLoading}
      >

        {addMutation.isLoading ? "Adding..." : "Add to Cart"}
      </Button>




    </>
  );
};


export default AddToCartButton;
