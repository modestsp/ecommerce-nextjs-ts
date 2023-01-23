import Link from 'next/link';
import styles from '../styles/Shop.module.css';
const ShopHeader = () => {
  return (
    <header className={styles.header}>
      <Link href={'/'}>LOGO</Link>
      <p>SEARCH BAR</p>
      <p>USERNAME OR LOGIN</p>
    </header>
  );
};

export default ShopHeader;
