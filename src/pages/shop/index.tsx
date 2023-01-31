import { prisma } from '../../utils/db.server';
import Link from 'next/link';
import { Product, ProductCategory } from '@prisma/client';
import styles from '../../styles/Shop.module.css';
import { ReactElement, ReactNode, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { NextPage } from 'next';
import CategoriesSidebar from '@/components/CatergoriesSidebar';
import ShopHeader from '@/components/ShopHeader';
import { sessionOptions, UserWithSession } from '@/lib/session';
import { withIronSessionSsr } from 'iron-session/next';

type Props = {
  products: string;
  user: UserWithSession;
};

export type ShopPageWithLayout = NextPage<Props> & {
  getLayout: (page: ReactElement, props: Props) => ReactNode;
};

// const ShopHeader = ({ user }: { user: any }) => {
//   console.log('SHOP USER', user);
//   return (
//     <header className={styles.header}>
//       <Link href={'/'}>LOGO</Link>
//       <p>SEARCH BAR</p>
//       <p>USERNAME OR LOGIN</p>
//     </header>
//   );
// };

const Shop: ShopPageWithLayout = ({ products }: { products: string }) => {
  const [allProducts, setAllProducts] = useState<Product[]>(
    JSON.parse(products)
  );

  // console.log('ACA LAS CATEGORIAS', productCategories);
  // console.log('ACA LOS PRODUCTS', allProducts);
  return (
    <div className={styles.productsContainer}>
      {/* <aside className={styles.categories}>
          {productCategories.map((category) => {
            return (
              <Link
                key={category.id}
                href={`/shop/${category.name.toLocaleLowerCase()}`}
              >
                {category.name}
              </Link>
            );
          })}
        </aside> */}
      <div className={styles.productCard}>
        {allProducts.map((product) => {
          return <p key={product.id}>{product.name}</p>;
        })}
      </div>
    </div>
  );
};

Shop.getLayout = function getLayout(
  page: ReactElement,
  { user }: { user: any }
) {
  // console.log('props', user);
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
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const products = await prisma.product.findMany();

    return {
      props: {
        user: user ? user : null,
        products: JSON.stringify(products),
      },
    };
  },
  sessionOptions
);

export default Shop;
