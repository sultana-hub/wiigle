import { useMutation } from "react-query";
import { account } from "../appwriteConf/appwriteConfig"; // Import Appwrite account instance
import { ID } from "appwrite";
const registerUser = async ({ userId, email, password, name,phone }) => {
  return await account.create(userId, email, password, name,phone);
};





export const useRegisterUser = () => {
  return useMutation(registerUser);
};