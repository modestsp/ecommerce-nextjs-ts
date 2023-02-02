import CategoriesSidebar from '@/components/CatergoriesSidebar';
import ProductCard from '@/components/ProductCard';
import DisplayReviews from '@/components/Reviews';
import ShopHeader from '@/components/ShopHeader';
import { sessionOptions, UserWithSession } from '@/lib/session';
import { prisma } from '@/utils/db.server';
import imageLoader from '@/utils/imageLoader';
import { Button, ButtonGroup, TextField } from '@mui/material';
import { Product as ProductType, Review } from '@prisma/client';
import { withIronSessionSsr } from 'iron-session/next';
import { NextApiRequest } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import styles from '../../../../styles/Product.module.css';

interface ProductWithReviews extends ProductType {
  reviews: Review[];
}

const Product = ({
  product,
  relatedProducts,
}: {
  product: string;
  relatedProducts: string;
}) => {
  const currentProduct: ProductWithReviews = JSON.parse(product);
  const related = JSON.parse(relatedProducts);
  const {
    id,
    name,
    url,
    photographerUrl,
    photographerName,
    price,
    stars,
    reviews,
  } = currentProduct;

  console.log('RELATED', JSON.parse(relatedProducts));
  // console.log('review', review);
  // console.log('PRODUCT', JSON.parse(product));
  const [review, setReview] = useState('');
  const handleSubmit = async () => {
    const createReviewUrl = '/api/review/create';
    const response = await fetch(createReviewUrl, {
      method: 'POST',
      body: JSON.stringify({
        productId: currentProduct.id,
        description: review,
      }),
    });
    const createdReview = response.json();
    console.log('RESPONSE', createdReview);
  };
  // console.log('SIZE', size);
  // console.log('ACA EL PRODUCT', JSON.parse(product));
  return (
    <div className={styles.mainContainer}>
      <section className={styles.productInfo}>
        <div className={styles.productHeader} key={id}>
          <p className={styles.productTitle}>{name}</p>
          <p className={styles.stars}>
            STARTS: {stars} Reviews : XX --- Nos lleva hacia la seccion reviews
          </p>
        </div>
        <ProductCard product={currentProduct} />
        {/* <div className={styles.productCard}>
          <section className={styles.productContent}>
            <Image
              className={styles.productImage}
              src={url}
              alt={name}
              width={400}
              height={600}
              loader={imageLoader}
              unoptimized // ver esto  has a "loader" property that does not implement width.
              // Please implement it or use the "unoptimized" property instead.
            />
            <span className={styles.photoCredit}>
              <Link href={photographerUrl}>{photographerName}</Link>
              <span> on </span>
              <Link href={'https://unsplash.com/'}> Unsplash</Link>
            </span>
          </section>
          <section className={styles.productDetails}>
            <ButtonGroup
              color="secondary"
              variant="text"
              aria-label="text button group"
              size="large"
              className={styles.sizes}
            >
              <Button
                sx={{
                  fontFamily: 'var(--primary-font)',
                  fontSize: 20,
                }}
                onClick={() => setSize('XS')}
              >
                XS
              </Button>
              <Button
                sx={{
                  fontFamily: 'var(--primary-font)',
                  fontSize: 20,
                }}
                onClick={() => setSize('S')}
              >
                S
              </Button>
              <Button
                sx={{
                  fontFamily: 'var(--primary-font)',
                  fontSize: 20,
                }}
                onClick={() => setSize('M')}
              >
                M
              </Button>
              <Button
                sx={{
                  fontFamily: 'var(--primary-font)',
                  fontSize: 20,
                }}
                onClick={() => setSize('L')}
              >
                L
              </Button>
              <Button
                sx={{
                  fontFamily: 'var(--primary-font)',
                  fontSize: 20,
                }}
                onClick={() => setSize('XL')}
              >
                XL
              </Button>
              <Button
                sx={{
                  fontFamily: 'var(--primary-font)',
                  fontSize: 20,
                }}
                onClick={() => setSize('XXL')}
              >
                XXL
              </Button>
            </ButtonGroup>
            <p className={styles.productDescription}>
              Description <br />: Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Aperiam maiores in cumque sequi quam expedita
              nulla. Ipsum velit rerum, hic illo officiis beatae? Quam quidem,
              esse suscipit quae ab distinctio.
            </p>
          </section>
        </div> */}
      </section>
      <DisplayReviews productId={id} reviews={reviews} />
      {/* <section className={styles.reviews}>
        <p>Leave a Review!</p>
        <TextField
          id="outlined-basic"
          label="Write a review"
          variant="outlined"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        <div>
          {reviews.map((review) => {
            return (
              <article key={review.id}>
                <span>
                  <p>{review.value}</p>
                  <p>{String(new Date(review.createdAt))}</p>
                </span>
                <p>{review.description}</p>
              </article>
            );
          })}
        </div>
      </section> */}
      <section className={styles.relatedProducts}>
        RELATED
        {related.map((product: any) => {
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
      <ShopHeader user={user} />
      <section className={styles.mainContent}>
        {/* <CategoriesSidebar /> */}
        {page}
      </section>
    </main>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ resolvedUrl, req }) {
    // console.log('URL**********************', resolvedUrl);
    const user = req.session.user;
    const index = resolvedUrl.lastIndexOf('/');

    const product = await prisma.product.findUnique({
      where: {
        id: resolvedUrl.substring(index + 1),
      },
      include: {
        reviews: true,
      },
    });
    const relatedProducts = await prisma.product.findMany({
      take: 4,
      where: {
        categoryId: product?.categoryId,
        id: {
          not: resolvedUrl.substring(index + 1),
        },
      },
    });
    console.log('RELATED IN SERVER', relatedProducts);
    return {
      props: {
        user: user ? user : null,
        product: JSON.stringify(product),
        relatedProducts: JSON.stringify(relatedProducts),
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
