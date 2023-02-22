import productService from '../services/server/product';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

export const useGetProductsFromCategory = (category: any) => {
  const router = useRouter();
  const { isLoading, data, isError, isSuccess } = useQuery({
    queryKey: ['productsFromCategory'],
    queryFn: async () => {
      const page = `/api/products/${router.query.category}`;
      return await productService.getProductsFromCategory(category);
    },
    enabled: router.isReady,
    onSuccess: () => {
      const page = `/api/products/${router.query.category}`;
      // console.log('DATA', data);
      // queryClient.invalidateQueries(['projectsFromCategory']);
    },
  });
  return { isLoading, data, isError, isSuccess };
};
