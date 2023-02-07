import CategoriesSidebar from '@/components/CatergoriesSidebar';
import ShopHeader from '@/components/ShopHeader';
import Image from 'next/image';
import { ReactElement } from 'react';
import { prisma } from '@/utils/db.server';
import styles from '../../../styles/Shop.module.css';
import { Product } from '@prisma/client';
import imageLoader from '@/utils/imageLoader';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { sessionOptions } from '@/lib/session';
import { withIronSessionSsr } from 'iron-session/next';
import { ShopPageWithLayout } from '..';

const Category: ShopPageWithLayout = ({ products }: { products: any }) => {
  const router = useRouter();
  const currentRoute = router.asPath;
  const productsFromCat = JSON.parse(products);

  if (!productsFromCat || !products) return <div>Loading!</div>;

  return (
    <div className={styles.productsContainer}>
      {productsFromCat.map((product: Product) => {
        return (
          <div className={styles.productCard} key={product.id}>
            <Image
              src={product.url}
              alt={product.name}
              width={200}
              height={200}
              loader={imageLoader}
              unoptimized // ver esto  has a "loader" property that does not implement width.
              // Please implement it or use the "unoptimized" property instead.
            />
            <Link href={`${currentRoute}/${product.id}`}>{product.name}</Link>
          </div>
        );
      })}
    </div>
  );
};

Category.getLayout = function getLayout(page: ReactElement) {
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

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ resolvedUrl, req }) {
    const products = await prisma.product.findMany({
      where: {
        category: {
          name: resolvedUrl.substring(6),
        },
      },
    });

    return {
      props: {
        products: JSON.stringify(products),
      },
    };
  },
  sessionOptions
);

export default Category;
