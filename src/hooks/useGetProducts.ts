import productService from '../services/server/product';
import { useQuery } from 'react-query';
import { useShopStore } from '@/lib/store';

export const useGetProducts = () => {
  const { isLoading, data, isError, isSuccess } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });
  return { isLoading, data, isError, isSuccess };
};
