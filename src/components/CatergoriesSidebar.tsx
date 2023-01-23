import { prisma } from '@/utils/db.server';
import { ProductCategory } from '@prisma/client';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Shop.module.css';

const CategoriesSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Link href={'/shop/men'}>Men</Link>
      <Link href={'/shop/women'}>Women</Link>
      <Link href={'/shop/hats'}>Hats</Link>
      <Link href={'/shop/jewelry'}>Jewelry</Link>
    </aside>
  );
};

export default CategoriesSidebar;
