import { database } from "../appwriteConf/appwriteConfig";
import {Query } from 'appwrite'

  
export const addToCart = async ({ user_id, product_id,image,brand,price,quantity }) => {
  
  try {
    console.log("Adding to cart with data:", { user_id: user_id, product_id: product_id,image:image ,quantity });
    const response = await database.createDocument(
      process.env.REACT_APP_APPWRITE_DATABASE_ID,
      process.env.REACT_APP_APPWRITE_CART_COLLECTION_ID,
      "unique()",
      {
        user_id: user_id, 
        product_id: product_id,
        image:image, 
        brand:brand,
        price:price,
        quantity: quantity
      }
    );
    console.log("Added to cart:", response);
    return response;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};







  // Fetch user cart
  
  
  export const fetchCartItems = async (user_id) => {
    try {
      console.log(" Fetching cart items for user:", user_id);
  
      const response = await database.listDocuments(
        process.env.REACT_APP_APPWRITE_DATABASE_ID,
        process.env.REACT_APP_APPWRITE_CART_COLLECTION_ID,
        [
          Query.equal("user_id", user_id) //  Fetch only the logged-in user's cart
        ]
      );
  
      console.log(" Fetched Cart Items:", response.documents);
      return response.documents; //  Return the fetched cart items
    } catch (error) {
      console.error(" Error fetching cart items:", error);
      return [];
    }
  };
  
  
  // Remove item from cart
  export const removeFromCart = async (cartItemId) => {
    return await database.deleteDocument(process.env.REACT_APP_APPWRITE_DATABASE_ID,process.env.REACT_APP_APPWRITE_CART_COLLECTION_ID, cartItemId);
  };

  // Update quantity in Appwrite database
export const updateCartItem = async ({ id, quantity }) => {
  await database.updateDocument(process.env.REACT_APP_APPWRITE_DATABASE_ID, process.env.REACT_APP_APPWRITE_CART_COLLECTION_ID, id, {
    quantity,
  });
};

