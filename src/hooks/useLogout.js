import { useMutation ,useQueryClient } from "react-query";
import { account } from "../appwriteConf/appwriteConfig";
import { useNavigate } from "react-router-dom";

const logoutUser = async () => {
  return await account.deleteSession("current"); // Logs out the current session
};

// export const useLogout = () => {
//   return useMutation(logoutUser);
// };

export const useLogout = () => {
  const navigate=useNavigate()
    const queryClient = useQueryClient();
    return useMutation(logoutUser, {
      onSuccess: () => {
        navigate("/")
        queryClient.invalidateQueries(["user"]); // Refresh user data after logout
      },
    });
  };