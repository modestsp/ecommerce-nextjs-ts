import { useGetUser } from '@/hooks/useGetUser';
import { UserWithSession } from '@/lib/session';
import { useShopStore } from '@/lib/store';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../styles/Shop.module.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

const ShopHeader = () => {
  const { isLoading, data: user } = useGetUser();
  if (isLoading) return <div>Loading!</div>;

  const handleLogout = async () => {
    const logoutUrl = '/api/auth/logout';
    await fetch(logoutUrl, {
      method: 'POST',
    });
    Router.push('/shop');
  };

  return (
    <header className={styles.header}>
      <Link href={'/'} className={styles.headerLogo}>
        LOGO
      </Link>
      <div className={styles.searchBar} style={{ color: 'white' }}>
        <SearchIcon />
      </div>
      {user ? (
        <div className={styles.userData}>
          <p>{user.name}</p>
          <ShoppingCartIcon style={{ color: 'white' }} />
          <LogoutIcon onClick={handleLogout} style={{ color: 'white' }} />
        </div>
      ) : (
        <Link href={'/login'}>LOGIN</Link>
      )}
    </header>
  );
};

export default ShopHeader;
