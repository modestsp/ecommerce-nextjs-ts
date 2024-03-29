import styles from '../../styles/Shop.module.css';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import CategoriesSidebar from '@/components/CatergoriesSidebar';
import ShopHeader from '@/components/ShopHeader';
import { UserWithSession } from '@/lib/session';
import { useGetProducts } from '@/hooks/useGetProducts';
import { Rating } from '@mui/material';
import { Router, useRouter } from 'next/router';
import DropMenu from '@/components/DropMenu';
import ImageCard from '@/components/ImageCard';
import Footer from '@/components/Footer';

type Props = {
  products: string;
  user: UserWithSession;
};

export type ShopPageWithLayout = NextPage<Props> & {
  getLayout: (page: ReactElement, props: Props) => ReactNode;
};

const Shop: ShopPageWithLayout = () => {
  const { isLoading: loadingProducts, data: products } = useGetProducts();

  if (loadingProducts) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.productsGalleryContainer}>
      {products?.map((product: any, i) => {
        return <ImageCard i={i} key={product.id} product={product} />;
      })}
    </div>
  );
};

Shop.getLayout = function getLayout(page: ReactElement) {
  return (
    <main className={styles.main}>
      <ShopHeader />
      <section className={styles.mainContent}>
        <CategoriesSidebar />
        <DropMenu />
        {page}
      </section>
      <Footer />
    </main>
  );
};

export default Shop;
