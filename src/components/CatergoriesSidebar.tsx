import { useShopStore } from '@/lib/store';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Shop.module.css';

const textDeco = {
  textDecoration: 'underline',
  textDecorationColor: 'goldenrod',
  textUnderlineOffset: '8px',
};

const CategoriesSidebar = () => {
  const selectedCat = useShopStore((state) => state.selectedCat);
  const setSelectedCat = useShopStore((state) => state.setSelectedCat);

  return (
    <aside className={styles.sidebar}>
      <Link
        onClick={() => setSelectedCat('Men')}
        className={styles.category}
        href={'/shop/men'}
        style={selectedCat === 'Men' ? textDeco : {}}
      >
        Men
      </Link>
      <Link
        onClick={() => setSelectedCat('Women')}
        className={styles.category}
        href={'/shop/women'}
        style={selectedCat === 'Women' ? textDeco : {}}
      >
        Women
      </Link>
      <Link
        onClick={() => setSelectedCat('Hats')}
        className={styles.category}
        href={'/shop/hats'}
        style={selectedCat === 'Hats' ? textDeco : {}}
      >
        Hats
      </Link>
      <Link
        onClick={() => setSelectedCat('Jewelry')}
        className={styles.category}
        href={'/shop/jewelry'}
        style={selectedCat === 'Jewelry' ? textDeco : {}}
      >
        Jewelry
      </Link>
    </aside>
  );
};

export default CategoriesSidebar;
