import { useShopStore } from '@/lib/store';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Shop.module.css';

const textDeco = {
  textDecoration: 'underline',
  textDecorationColor: 'goldenrod',
  textUnderlineOffset: '10px',
};

export const fromBottomToTop = {
  hidden: {
    opacity: 0,
    y: 20,
    // transition: {
    //   duration: 1,
    //   type: 'ease',
    // },
  },
  visible: {
    y: 0,
    opacity: 1,
    // transition: {
    //   duration: 0.4,
    //   type: 'ease',
    // },
  },
  exit: {
    y: 20,
    opacity: 0,
    // transition: {
    //   duration: 0.4,
    //   type: 'ease',
    // },
  },
};

const CategoriesSidebar = () => {
  const selectedCat = useShopStore((state) => state.selectedCat);
  const setSelectedCat = useShopStore((state) => state.setSelectedCat);

  return (
    <motion.aside
      className={styles.sidebar}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fromBottomToTop}
    >
      <h3
        style={{
          alignSelf: 'flex-start',
          textDecoration: 'underline',
          textDecorationColor: 'grey',
          textUnderlineOffset: '8px',
        }}
      >
        Categories
      </h3>
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
    </motion.aside>
  );
};

export default CategoriesSidebar;
