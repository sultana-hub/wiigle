
import { database,account  } from "../appwriteConf/appwriteConfig"; // Import Appwrite config
import { ID} from "appwrite";
import { Query } from 'appwrite'
import Swal from "sweetalert2";
//all pets
export const fetchAllPets = async () => {
  const response = await fetch(`https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_PET_COLLECTION_ID}/documents`, {
    method: "GET",
    headers: {
      "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
      "X-Appwrite-Key": process.env.REACT_APP_APPWRITE_API_KEY
    }
  })
  const respJson = await response.json()
  console.log("fetchData pets", respJson) // Logs attribute values
  return respJson?.documents
}


//all fetch products

export const fetchAllProducts = async () => {
  const response = await fetch(`https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_PRODUCTS_COLLECTION_ID}/documents`, {
    method: "GET",
    headers: {
      "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
      "X-Appwrite-Key": process.env.REACT_APP_APPWRITE_API_KEY
    }
  })
  const respJson = await response.json()
  console.log("products res", respJson)
  return respJson?.documents
}


//fetching all product by id

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
    // throw error;
  }
};




//fetching pet details based on category

export const petDetails = async () => {
  try {
    const apiUrl = `https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_PET_DETAILS_COLLECTION_ID}/documents`;
    console.log("pet detail api", apiUrl)
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
        "X-Appwrite-Key": process.env.REACT_APP_APPWRITE_API_KEY,
        "Content-Type": "application/json",
      },
    })
    const resJson = await response.json()
    console.log("pet details", resJson)
    return resJson?.documents
  } catch (error) {
    console.log("error in fetching pet details", error)
  }
}

// export const petDetails = async (category) => {
//   try {
//     console.log(" Fetching details for category:", category);

//     const response = await database.listDocuments(
//       process.env.REACT_APP_APPWRITE_DATABASE_ID,
//       process.env.process.env.REACT_APP_APPWRITE_PET_DETAILS_COLLECTION_ID,
//       [
//         Query.equal("category", category) //  Fetch only category
//       ]
//     );

//     console.log(" Fetched pet details:", response.documents);
//     return response?.documents; //  Return the fetched pets
//   } catch (error) {
//     console.error(" Error fetching details items:", error);
//     return [];
//   }
// };
//  ADOPTION .......................................................................................

export const postAdoption = async (data) => {
  try {
   
    const response = await fetch(`https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_ADOPTION_COLLECTION_ID}/documents`, {
      method: "Post",
      headers: {
        "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
        "X-Appwrite-Key": process.env.REACT_APP_APPWRITE_API_KEY,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        documentId: ID.unique(),
        data: {
          fullname: data.fullname || "", //Ensuring fullname is included
          email: data.email || "", // Ensuring user email is included
          phone:data.phone,
          petid: data.petid|| "", // Ensuring petType is included
          address:data.address,
          desc:data.desc,
          agree:data.agree,
          status:data.status,
          userid:data.userid
        },
        permissions: ["read(\"any\")"], // Public access required
      }),

    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit data");
    }
    console.log("application data",response.json())
    // return response.json(); // Returning success response
  } catch (error) {
    console.error("Appwrite Error:", error);  //  Logging full error
    alert(`Error: ${error.message}`);
  }
}

// fetch application data
// export const fetchApplications = async () => {
//   try {
//     const response = await fetch(`https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_ADOPTION_COLLECTION_ID}/documents`, {
//       method: "Get",
//       headers: {
//         "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
//         "X-Appwrite-Key": process.env.REACT_APP_APPWRITE_API_KEY,
//          "Authorization": `Bearer ${process.env.REACT_APP_APPWRITE_API_KEY}`,
//         "Content-Type": "application/json"
//       },

     
//     });
//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Failed to fetch data");
//     }
//     return Array.isArray(response.json()) ? response.json() : [];
   
//   } catch (error) {
//     console.error("Appwrite Error:", error);  //  Log full error
//     alert(`Error: ${error.message}`);
//   }
// };


export const fetchApplications = async () => {
  try {
    const apiUrl = `https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_ADOPTION_COLLECTION_ID}/documents`;
    console.log("application detail api", apiUrl)
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
        "X-Appwrite-Key": process.env.REACT_APP_APPWRITE_API_KEY,
        "Content-Type": "application/json",
      },
    })
    const resJson = await response.json()
    console.log("pet details", resJson)
    return resJson?.documents
  } catch (error) {
    console.log("error in fetching pet details", error)
  }
}



export const updateApplicationStatus = async ({ id, status }) => {
  const res = await fetch(
    `https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_ADOPTION_COLLECTION_ID}/documents/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
        "X-Appwrite-Key":  process.env.REACT_APP_APPWRITE_API_KEY,
      },
      body: JSON.stringify({
        data: {
          status: status, // Status should be inside 'data'
        }
      }),
    }
  );

  const data = await res.json();
  console.log("API Response:", data);

  if (!res.ok) {
    throw new Error(`Failed to update status: ${data.message || "Unknown error"}`);
  }

  return data;
};


//fet application by id
export const fetchApplicationsByEmail = async (email) => {
  try {
    const apiUrl = `https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_ADOPTION_COLLECTION_ID}/documents/${email}`;
    console.log("application detail api", apiUrl)
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
        "X-Appwrite-Key": process.env.REACT_APP_APPWRITE_API_KEY,
        "Content-Type": "application/json",
      },
    })
    const resJson = await response.json()
    console.log("pet details", resJson)
    return resJson?.documents
  } catch (error) {
    console.log("error in fetching pet details", error)
  }
}




// service application

export const postService = async (data) => {
  try {
   
    const response = await fetch(`https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_VET_COLLECTION_ID}/documents`, {
      method: "Post",
      headers: {
        "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
        "X-Appwrite-Key": process.env.REACT_APP_APPWRITE_API_KEY,
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        documentId: ID.unique(),
        data: {
          name: data.name || "", 
          email: data.email || "", 
          date:data.date,
          service:data.service.join(", "),
          userid:data.userid,
          status:data.status,
        },
        permissions: ["read(\"any\")"], 
      }),

    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit data");
    }
    console.log("application data",response.json())
    // return response.json(); // Return success response
  } catch (error) {
    console.error("Appwrite Error:", error);  //  Log full error
    alert(`Error: ${error.message}`);
  }
}

// vet application status admin

export const updateVetApplicationStatus = async ({ id, status }) => {
  const res = await fetch(
    `https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_VET_COLLECTION_ID}/documents/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
        "X-Appwrite-Key":  process.env.REACT_APP_APPWRITE_API_KEY,
      },
      body: JSON.stringify({
        data: {
          status: status, // Status should be inside 'data'
        }
      }),
    }
  );

  const data = await res.json();
  console.log("API Response:", data);

  if (!res.ok) {
    throw new Error(`Failed to update status: ${data.message || "Unknown error"}`);
  }

  return data;
};

// fetching service application 
export const fetchServiceApplications = async () => {
  try {
    const apiUrl = `https://cloud.appwrite.io/v1/databases/${process.env.REACT_APP_APPWRITE_DATABASE_ID}/collections/${process.env.REACT_APP_APPWRITE_VET_COLLECTION_ID}/documents`;
    console.log("application detail api", apiUrl)
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Appwrite-Project": process.env.REACT_APP_APPWRITE_PROJECT_ID,
        "X-Appwrite-Key": process.env.REACT_APP_APPWRITE_API_KEY,
        "Content-Type": "application/json",
      },
    })
    const resJson = await response.json()
    console.log("pet service details", resJson)
    return resJson?.documents
  } catch (error) {
    console.log("error in fetching pet service  details", error)
  }
}