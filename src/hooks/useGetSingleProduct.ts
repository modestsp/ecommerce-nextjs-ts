import productService from '../services/server/product';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

export const useGetSingleProduct = () => {
  const router = useRouter();
  const { isLoading, data, isError, isSuccess } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      return await productService.getSingleProduct(router.query);
    },
    enabled: router.isReady,
  });
  return { isLoading, data, isError, isSuccess };
};
