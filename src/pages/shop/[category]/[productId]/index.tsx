import CategoriesSidebar from '@/components/CatergoriesSidebar';
import ShopHeader from '@/components/ShopHeader';
import { sessionOptions, UserWithSession } from '@/lib/session';
import { prisma } from '@/utils/db.server';
import imageLoader from '@/utils/imageLoader';
import { withIronSessionSsr } from 'iron-session/next';
import { NextApiRequest } from 'next';
import Image from 'next/image';
import { ReactElement } from 'react';
import styles from '../../../../styles/Shop.module.css';

const Product = ({ product }: { product: string }) => {
  const currentProduct = JSON.parse(product);
  console.log('ACA EL PRODUCT', JSON.parse(product));
  return (
    <div className={styles.productCard} key={currentProduct.id}>
      <Image
        src={currentProduct.url}
        alt={currentProduct.name}
        width={200}
        height={200}
        loader={imageLoader}
        unoptimized // ver esto  has a "loader" property that does not implement width.
        // Please implement it or use the "unoptimized" property instead.
      />
      <p>{currentProduct.name}</p>
    </div>
  );
};

Product.getLayout = function getLayout(
  page: ReactElement,
  { user }: { user: UserWithSession }
) {
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
    const index = resolvedUrl.lastIndexOf('/');
    const product = await prisma.product.findUnique({
      where: {
        id: resolvedUrl.substring(index + 1),
      },
    });

    return {
      props: {
        user: user ? user : null,
        product: JSON.stringify(product),
      },
    };
  },
  sessionOptions
);

// export const getServerSideProps = async ({
//   resolvedUrl,
// }: {
//   resolvedUrl: string;
// }) => {
//   const index = resolvedUrl.lastIndexOf('/');
//   console.log('RESOLVER', resolvedUrl.substring(index + 1));
//   const product = await prisma.product.findUnique({
//     where: {
//       id: resolvedUrl.substring(index + 1),
//     },
//   });
//   return {
//     props: {
//       product: JSON.stringify(product),
//     },
//   };
// };

export default Product;
