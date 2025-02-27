import { useMutation } from "react-query";
import {updateProductStock} from '../../services/cartQueryFunction'
export const useUpdateStock = () => {
  return useMutation(({ productId, quantityOrdered }) =>
    updateProductStock(productId, quantityOrdered)
  );
};