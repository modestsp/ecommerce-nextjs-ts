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
import CartModal from './CartModal';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import imageLoader from '@/utils/imageLoader';
const ShopHeader = () => {
  const [search, setSearch] = useState('');
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const { isLoading, data: user } = useGetUser();
  const setProducts = useShopStore((state) => state.setProducts);
  const cart = useShopStore((state) => state.cart);
  const router = useRouter();
  if (isLoading) return <div className={styles.header}>Loading!</div>;

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
        <h2 style={{ fontFamily: 'var(--tertiary-font)', color: 'white' }}>
          __seb
        </h2>
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
          <ShoppingCartIcon
            onClick={() => setToggleCart(!toggleCart)}
            style={{ color: 'white' }}
          />
          <LogoutIcon onClick={handleLogout} style={{ color: 'white' }} />
          <button className={styles.cartLength}>{cart.length}</button>
        </div>
      ) : (
        <Link href={'/login'}>LOGIN</Link>
      )}
      <AnimatePresence mode="wait">
        {toggleCart && (
          <CartModal
            key="modal"
            toggleCart={toggleCart}
            setToggleCart={setToggleCart}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default ShopHeader;
