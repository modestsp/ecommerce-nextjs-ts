import { useGetUser } from '@/hooks/useGetUser';
import { UserWithSession } from '@/lib/session';
import { useShopStore } from '@/lib/store';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import styles from '../styles/Shop.module.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useGetProducts } from '@/hooks/useGetProducts';

const ShopHeader = () => {
  const [search, setSearch] = useState('');
  const { isLoading, data: user } = useGetUser();
  const setProducts = useShopStore((state) => state.setProducts);
  const router = useRouter();
  if (isLoading) return <div>Loading!</div>;

  const handleSearch = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      '/api/products/search?' +
        new URLSearchParams({
          search: search.toLowerCase(),
        })
    );
    const products = await response.json();
    setProducts(products);
    router.push(`/shop/search?${search}`);
  };

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
      <form action="" onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder=" Search for products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>
          {' '}
          <SearchIcon />
        </button>
      </form>
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
