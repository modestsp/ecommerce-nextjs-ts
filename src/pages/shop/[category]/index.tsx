import CategoriesSidebar from '@/components/CatergoriesSidebar';
import ShopHeader from '@/components/ShopHeader';
import { ReactElement } from 'react';
import { prisma } from '@/utils/db.server';
import styles from '../../../styles/Shop.module.css';
import { Product } from '@prisma/client';
import { useRouter } from 'next/router';
import { sessionOptions } from '@/lib/session';
import { withIronSessionSsr } from 'iron-session/next';
import { ShopPageWithLayout } from '..';
import ImageCard from '@/components/ImageCard';
import Footer from '@/components/Footer';
import DropMenu from '@/components/DropMenu';

const Category: ShopPageWithLayout = ({ products }: { products: any }) => {
  const router = useRouter();
  const currentRoute = router.asPath;
  const productsFromCat = JSON.parse(products);
  console.log('PRODUCTS *********', JSON.parse(products));
  if (!productsFromCat || !products) return <div>Loading!</div>;

  return (
    <div className={styles.productsGalleryContainer}>
      {productsFromCat.map((product: Product, i: number) => {
        return <ImageCard i={i} key={product.id} product={product} />;
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
        <DropMenu />
        {page}
      </section>
      <Footer />
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
      include: {
        category: true,
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
