import styles from '../../../styles/Shop.module.css';
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
import { useShopStore } from '@/lib/store';
import Footer from '@/components/Footer';

const Search = () => {
  const router = useRouter();
  const products = useShopStore((state) => state.products);
  const currentRoute = router.asPath;
  if (!products || products.length === 0) {
    return (
      <div
        style={{ fontSize: '1.5rem', marginLeft: '4rem', marginTop: '2rem' }}
      >
        No Results
      </div>
    );
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

Search.getLayout = function getLayout(page: ReactElement) {
  return (
    <main className={styles.main}>
      <ShopHeader />
      <section className={styles.mainContent}>
        <CategoriesSidebar />
        {page}
      </section>
      <Footer />
    </main>
  );
};

export default Search;
