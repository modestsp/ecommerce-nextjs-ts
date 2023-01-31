import CategoriesSidebar from '@/components/CatergoriesSidebar';
import ShopHeader from '@/components/ShopHeader';
import Image from 'next/image';
import { ReactElement, useEffect, useState } from 'react';
import { prisma } from '@/utils/db.server';
import styles from '../../../styles/Shop.module.css';
import { Product } from '@prisma/client';
import imageLoader from '@/utils/imageLoader';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { sessionOptions, UserWithSession } from '@/lib/session';
import { NextApiRequest } from 'next';
import { withIronSessionSsr } from 'iron-session/next';
import { ShopPageWithLayout } from '..';

const Category: ShopPageWithLayout = ({ products }: { products: string }) => {
  const router = useRouter();
  const currentRoute = router.asPath;
  console.log('currentRouse', currentRoute);
  const [allProducts, setAllProducts] = useState<Product[]>(
    JSON.parse(products)
  );
  useEffect(() => {
    setAllProducts(JSON.parse(products));
  }, [products]);

  return (
    <div className={styles.productsContainer}>
      {allProducts.map((product) => {
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

Category.getLayout = function getLayout(
  page: ReactElement,
  { user }: { user: UserWithSession }
) {
  console.log('USER EN CATEGORY', user);
  return (
    <main className={styles.main}>
      <ShopHeader user={user} />
      <section className={styles.mainContent}>
        <CategoriesSidebar />
        {page}
      </section>
    </main>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ resolvedUrl, req }) {
    console.log('URL**********************', resolvedUrl);
    const user = req.session.user;
    const products = await prisma.product.findMany({
      where: {
        category: {
          name: resolvedUrl.substring(6),
        },
      },
    });

    return {
      props: {
        user: user ? user : null,
        products: JSON.stringify(products),
      },
    };
  },
  sessionOptions
);

export default Category;
// export const getServerSideProps = async ({
//   resolvedUrl,
//   req,
// }: {
//   resolvedUrl: string;
//   req: NextApiRequest;
// }) => {
//   const user = req.session?.user;
//   console.log('RESOLVER', resolvedUrl.substring(6));
//   const products = await prisma.product.findMany({
//     where: {
//       category: {
//         name: resolvedUrl.substring(6),
//       },
//     },
//   });
//   return {
//     props: {
//       user: user ? user : null,
//       products: JSON.stringify(products),
//     },
//   };
// };
