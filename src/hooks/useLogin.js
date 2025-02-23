import { useMutation,useQueryClient } from "react-query";
import { account } from "../appwriteConf/appwriteConfig";

const loginUser = async ({ email, password }) => {
  const session = await account.createEmailPasswordSession(email, password);
  return session;
};

// export const useLogin = () => {
//   return useMutation(loginUser);
// };
export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation(loginUser, {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]); // Refresh user data after login
      },
    });
  };