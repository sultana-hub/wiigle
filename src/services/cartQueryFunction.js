import { database } from "../appwriteConf/appwriteConfig";
import {Query,ID } from 'appwrite'

  //Adding to the Cart
export const addToCart = async ({ user_id, product_id,image,brand,price,quantity,weight }) => {
  
  try {
    console.log("Adding to cart with data:", { user_id: user_id, product_id: product_id,image:image ,quantity,weight });
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
        quantity: quantity,
        weight:weight
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
          Query.equal("user_id", user_id) // it Fetch only the logged-in user's cart
        ]
      );
  
      console.log(" Fetched Cart Items:", response.documents);
      return response.documents; //  it Returns the fetched cart items
    } catch (error) {
      console.error(" Error fetching cart items:", error);
      return [];
    }
  };
  
  
  // Removing item from cart
  export const removeFromCart = async (cartItemId) => {
    return await database.deleteDocument(process.env.REACT_APP_APPWRITE_DATABASE_ID,process.env.REACT_APP_APPWRITE_CART_COLLECTION_ID, cartItemId);
  };

  // Updating quantity in Appwrite database
export const updateCartItem = async ({ id, quantity }) => {
  await database.updateDocument(process.env.REACT_APP_APPWRITE_DATABASE_ID, process.env.REACT_APP_APPWRITE_CART_COLLECTION_ID, id, {
    quantity,
  });
};

// create order




export const createOrder = async (orderData) => {
  try {
    const response = await database.createDocument(
      process.env.REACT_APP_APPWRITE_DATABASE_ID, 
      process.env.REACT_APP_APPWRITE_ORDERS_COLLECTION_ID, //  Orders Collection ID
      ID.unique(), // Unique Order ID
      {
        user_id: orderData.user_id,
        order_id: ID.unique(),
        product_id: orderData.product_id,
        brand: orderData.brand,
        quantity: orderData.quantity,
        weight: orderData.weight || "",
        status: "Pending", // Default Status
        price:String(orderData.price) ,
        created_at: new Date().toISOString()
      }
    );
    console.log("Order Saved:", response);
    return response;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};




// getting current stock of products
const getProductStock = async (productId) => {
  try {
    const response = await database.getDocument(
      process.env.REACT_APP_APPWRITE_DATABASE_ID, 
      process.env.REACT_APP_APPWRITE_PRODUCTS_COLLECTION_ID, 
      productId
    );
    return response.quantity; // Assuming 'stock' is the attribute storing product quantity
  } catch (error) {
    console.error("Error fetching product stock:", error);
    return null;
  }
};

 export const updateProductStock = async (productId, quantityOrdered) => {
  // Step 1: Getting current stock
  const currentStock = await getProductStock(productId);
  
  // Step 2: Calculating new stock
  const newStock = currentStock - quantityOrdered;

  // Step 3: Updating stock in the database
  return await database.updateDocument(
    process.env.REACT_APP_APPWRITE_DATABASE_ID,
    process.env.REACT_APP_APPWRITE_PRODUCTS_COLLECTION_ID,
    productId,
    { quantity: newStock }
  );
};



export const getUserOrders = async (userId) => {
  if (!userId) throw new Error("User ID is required");

  try {
    const response = await database.listDocuments(
      process.env.REACT_APP_APPWRITE_DATABASE_ID,
      process.env.REACT_APP_APPWRITE_ORDERS_COLLECTION_ID,
      [Query.equal("user_id", userId)] // query format
    );

    return response.documents;
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    throw error;
  }
};