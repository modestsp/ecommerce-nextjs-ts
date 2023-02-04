import { useGetUser } from '@/hooks/useGetUser';
import { UserWithSession } from '@/lib/session';
import { useShopStore } from '@/lib/store';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../styles/Shop.module.css';

const ShopHeader = () => {
  const { isLoading, data: user } = useGetUser();
  // const user = useShopStore((state) => state.user);
  // const setCurrentUser = useShopStore((state) => state.setCurrentUser);
  // if (!user) {
  //   setCurrentUser(userFromReq);
  // }
  // console.log('current', user);
  if (isLoading) return <div>Loading!</div>;

  const handleLogout = async () => {
    const logoutUrl = '/api/auth/logout';
    await fetch(logoutUrl, {
      method: 'POST',
    });
    Router.push('/shop');
  };
  // console.log('USER', user);
  // const { user } = useUser({});
  // console.log('USER', user);
  return (
    <header className={styles.header}>
      <Link href={'/'}>LOGO</Link>
      <p>SEARCH BAR</p>
      {user ? (
        <div className={styles.userData}>
          <p>{user.name}</p>
          <p>Cart</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link href={'/login'}>LOGIN</Link>
      )}
    </header>
  );
};

export default ShopHeader;
