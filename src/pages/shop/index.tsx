import styles from '../../styles/Shop.module.css';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import CategoriesSidebar from '@/components/CatergoriesSidebar';
import ShopHeader from '@/components/ShopHeader';
import { UserWithSession } from '@/lib/session';
import { useGetProducts } from '@/hooks/useGetProducts';

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
    return <div>Loading!</div>;
  }

  return (
    <div className={styles.productsContainer}>
      <div className={styles.productCard}>
        {products!.map((product: any) => {
          return <p key={product.id}>{product.name}</p>;
        })}
      </div>
    </div>
  );
};

Shop.getLayout = function getLayout(page: ReactElement) {
  return (
    <main className={styles.main}>
      <ShopHeader />
      <section className={styles.mainContent}>
        <CategoriesSidebar />
        {page}
      </section>
    </main>
  );
};

export default Shop;
