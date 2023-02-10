import styles from '../../styles/Shop.module.css';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import CategoriesSidebar from '@/components/CatergoriesSidebar';
import ShopHeader from '@/components/ShopHeader';
import { UserWithSession } from '@/lib/session';
import { useGetProducts } from '@/hooks/useGetProducts';
import imageLoader from '@/utils/imageLoader';
import Image from 'next/image';
import { Rating } from '@mui/material';
import { Router, useRouter } from 'next/router';

type Props = {
  products: string;
  user: UserWithSession;
};

export type ShopPageWithLayout = NextPage<Props> & {
  getLayout: (page: ReactElement, props: Props) => ReactNode;
};

const Shop: ShopPageWithLayout = () => {
  const { isLoading: loadingProducts, data: products } = useGetProducts();
  const router = useRouter();
  const currentRoute = router.asPath;
  if (loadingProducts) {
    return <div>Loading!</div>;
  }
  console.log(products);
  return (
    <div className={styles.productsGalleryContainer}>
      {products!.map((product: any) => {
        return (
          <article className={styles.productCard} key={product.id}>
            <div className={styles.productHeader}>
              <Rating
                name="read-only"
                value={product.stars}
                readOnly
                size="small"
                className={styles.productRating}
              />
              <p>{product.name}</p>
            </div>
            <Image
              onClick={() =>
                router.push(
                  `${currentRoute}/${product.category.name}/${product.id}`
                )
              }
              className={styles.productImage}
              src={product.url}
              alt={product.name}
              width={200}
              height={200}
              loader={imageLoader}
              unoptimized // ver esto  has a "loader" property that does not implement width.
              // Please implement it or use the "unoptimized" property instead.
            />
            <div className={styles.productFooter}>
              <p>{product.price}$</p>
              <button className={styles.addToCartButton}>Add to Cart</button>
            </div>
          </article>
        );
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
        {page}
      </section>
      <footer className={styles.footer}>Footer</footer>
    </main>
  );
};

export default Shop;
