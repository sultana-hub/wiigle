import { useMutation, useQuery, useQueryClient } from "react-query";
import { createOrder } from "../../services/cartQueryFunction";

export const useOrder = (user_id) => {
  const queryClient = useQueryClient();
  //  Add to order
  const addMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
    queryClient.invalidateQueries(["cart", user_id]); // Refresh order data
    },
  });

return { addMutation };
};