import { useMutation } from "react-query";
import { account } from "../appwriteConf/appwriteConfig"; // Import Appwrite account instance

const registerUser = async ({ userId, email, password, name }) => {
  return await account.create(userId, email, password, name);
};

export const useRegisterUser = () => {
  return useMutation(registerUser);
};