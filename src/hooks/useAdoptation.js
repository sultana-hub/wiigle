import { useMutation } from "react-query";
import { database } from "../appwriteConf/appwriteConfig";
import { ID } from "appwrite";
const petdoption = async (formdata) => {
  return await database.createDocument(
    process.env.REACT_APP_APPWRITE_DATABASE_ID,
    process.env.REACT_APP_APPWRITE_ADOPTION_COLLECTION_ID,
  ID.unique(),
 formdata
  );
};

export const usePetAdoption = () => {
  return useMutation(petdoption);
};