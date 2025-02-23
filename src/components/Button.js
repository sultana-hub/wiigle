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
>
View More
</Button>