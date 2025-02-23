import { useMutation, useQueryClient } from "react-query";
import { addToCart } from "../../services/cartQueryFunction";
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation(addToCart, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]); // Refresh cart after adding item
    },
  });
};