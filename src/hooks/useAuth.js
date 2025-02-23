import { useQuery } from "react-query";
import { account } from "../appwriteConf/appwriteConfig";

const fetchUser = async () => {
  try {
    return await account.get(); // Fetch the logged-in user
  } catch (error) {
    return null; // Return null if not logged in
  }
};

export const useAuth = () => {
  return useQuery(["user"], fetchUser);
};