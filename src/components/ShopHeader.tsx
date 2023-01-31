import { sessionOptions } from '@/lib/session';
import useUser from '@/lib/useUser';
import { withIronSessionSsr } from 'iron-session/next';
import Link from 'next/link';
import Router from 'next/router';
import styles from '../styles/Shop.module.css';

const ShopHeader = ({ user }: { user: any }) => {
  const handleLogout = async () => {
    const logoutUrl = '/api/auth/logout';
    await fetch(logoutUrl, {
      method: 'POST',
    });
    Router.push('/shop');
  };
  console.log('USER', user);
  // const { user } = useUser({});
  console.log('USER', user);
  return (
    <header className={styles.header}>
      <Link href={'/'}>LOGO</Link>
      <p>SEARCH BAR</p>
      {user ? (
        <div>
          <p>{user.name}</p> <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Link href={'/login'}>LOGIN</Link>
      )}
    </header>
  );
};

export default ShopHeader;
