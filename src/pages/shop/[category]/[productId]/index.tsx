import ProductCard from '@/components/ProductCard';
import DisplayReviews from '@/components/Reviews';
import ShopHeader from '@/components/ShopHeader';
import { useGetSingleProduct } from '@/hooks/useGetSingleProduct';
import { UserWithSession } from '@/lib/session';
import imageLoader from '@/utils/imageLoader';
import { Rating } from '@mui/material';
import { Product as ProductType, Review } from '@prisma/client';
import Image from 'next/image';
import { ReactElement } from 'react';
import styles from '../../../../styles/Product.module.css';

export interface ProductWithReviews extends ProductType {
  reviews: Review[];
}

const Product = () => {
  const { isLoading, data } = useGetSingleProduct();

  if (isLoading || !data?.product || !data.relatedProducts)
    return <div>Loading!</div>;
  const { product, relatedProducts } = data;
  const {
    id,
    name,
    url,
    photographerUrl,
    photographerName,
    price,
    stars,
    reviews,
  } = product;
  return (
    <div className={styles.mainContainer}>
      <section className={styles.productInfo}>
        <div className={styles.productHeader} key={id}>
          <p className={styles.productTitle}>{name}</p>
          <div className={styles.stars}>
            <Rating name="read-only" value={stars} readOnly />
            <span>({reviews.length})</span>
          </div>
        </div>
        <ProductCard product={data.product} />
      </section>
      <DisplayReviews productId={id} reviews={reviews} />

      <section className={styles.relatedProducts}>
        RELATED
        {relatedProducts.map((product: any) => {
          return (
            <Image
              key={product.id}
              className={styles.productImage}
              src={product.url}
              alt={product.name}
              width={100}
              height={200}
              loader={imageLoader}
              unoptimized // ver esto  has a "loader" property that does not implement width.
              // Please implement it or use the "unoptimized" property instead.
            />
          );
        })}
      </section>
    </div>
  );
};

Product.getLayout = function getLayout(
  page: ReactElement,
  { user }: { user: UserWithSession }
) {
  return (
    <main className={styles.main}>
      <ShopHeader />
      {page}
    </main>
  );
};

export default Product;
