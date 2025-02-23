
import { database } from "../appwriteConf/appwriteConfig"; // Import Appwrite config

//all pets
export const fetchAllPets=async()=>{
 const response=await fetch(`https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_PET_COLLECTION_ID}/documents`, {
    method: "GET",
    headers: {
        "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
        "X-Appwrite-Key": process.env.REACT_APP_APPWRITE_API_KEY
    }
})
const respJson=await response.json()
 console.log("fetchData pets",respJson) // Logs attribute values
return respJson?.documents
}


//all fetch products

export const fetchAllProducts = async () => {
  const response=await fetch(`https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_PRODUCTS_COLLECTION_ID}/documents`, {
    method: "GET",
    headers: {
      "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
      "X-Appwrite-Key": process.env.REACT_APP_APPWRITE_API_KEY
    }
  })
 const respJson=await response.json()
 console.log("products res",respJson)
 return respJson?.documents
}


//fetch all product by id

export const fetchProductById = async (proId) => {
  try {
    const apiUrl = `https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_PRODUCTS_COLLECTION_ID}/documents/${proId}`;

    console.log("Fetching from URL:", apiUrl); // Debugging

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
        "X-Appwrite-Key": process.env.REACT_APP_APPWRITE_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching product:", errorData);
      throw new Error(errorData.message || "Failed to fetch document");
    }

    const respJson = await response.json();
    console.log("Product by ID response:", respJson);
    return respJson;

  } catch (error) {
    console.error("Fetch Product Error:", error);
    throw error;
  }
};


//using sdk


