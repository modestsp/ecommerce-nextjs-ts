import userService from '../services/server/user';
import { useQuery } from 'react-query';
import { useShopStore } from '@/lib/store';

export const useGetUser = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['currentUser'],
    queryFn: userService.getUser,
  });
  const currentUser = useShopStore((state) => state.setCurrentUser);
  currentUser(data);
  return { isLoading, data };
};
