import { useMutation, useQuery, useQueryClient } from "react-query";
import { addToCart, getCartItems, removeFromCart } from "../../services/cartQueryFunction";

export const useCart = (user_id) => {
  const queryClient = useQueryClient();

  //  Fetch cart items
//   const { data: cartItems, isLoading } = useQuery({
//     queryKey: ["cart", user_id],
//     queryFn: () => getCartItems(user_id),
//     enabled: !!user_id,
//   });

  //  Add to cart
  const addMutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
    queryClient.invalidateQueries(["cart", user_id]); // Refresh cart data
    },
  });

  //  Remove from cart
//   const removeMutation = useMutation({
//     mutationFn: removeFromCart,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["cart", user_id]); // Refresh cart data
//     },
//   });

//   return { cartItems, isLoading, addMutation, removeMutation };
return { addMutation };
};
