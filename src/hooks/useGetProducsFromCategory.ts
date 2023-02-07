import productService from '../services/server/product';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

export const useGetProductsFromCategory = (category: any) => {
  const router = useRouter();
  const { isLoading, data, isError, isSuccess } = useQuery({
    queryKey: ['productsFromCategory'],
    queryFn: async () => {
      const page = `/api/products/${router.query.category}`;
      console.log('page', page);
      console.log('QUERY IN HOOK', router.query);
      return await productService.getProductsFromCategory(category);
    },
    enabled: router.isReady,
    onSuccess: () => {
      const page = `/api/products/${router.query.category}`;
      console.log('SUCCESS PAGE', page);
      console.log('QUERY SUCCESS', router.query);
      console.log('PRODUCTS FROM CATEGORY FETCHED');
      // console.log('DATA', data);
      // queryClient.invalidateQueries(['projectsFromCategory']);
    },
  });
  return { isLoading, data, isError, isSuccess };
};
