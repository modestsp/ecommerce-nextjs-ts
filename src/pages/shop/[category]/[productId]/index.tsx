import Footer from '@/components/Footer';
import ImageCard from '@/components/ImageCard';
import ProductCard from '@/components/ProductCard';
import DisplayReviews from '@/components/Reviews';
import ShopHeader from '@/components/ShopHeader';
import { useGetSingleProduct } from '@/hooks/useGetSingleProduct';
import { sessionOptions, UserWithSession } from '@/lib/session';
import imageLoader from '@/utils/imageLoader';
import { Rating } from '@mui/material';
import { Product as ProductType, Review } from '@prisma/client';
import Image from 'next/image';
import {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from '../../../../styles/Product.module.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useShopStore } from '@/lib/store';
import { withIronSessionSsr } from 'iron-session/next';
import { prisma } from '@/utils/db.server';
export interface ProductWithReviews extends ProductType {
  reviews: Review[];
}

const slideWidth = 282;

const scrollToSlide = (slider: HTMLUListElement | null, slideIndex: number) => {
  if (!slider) return;
  slider.scrollTo({
    left: slideIndex * slideWidth,
    behavior: 'smooth',
  });
};
const Product = ({
  product,
  relatedProducts,
}: {
  product: any;
  relatedProducts: any;
}) => {
  const router = useRouter();
  const currentProduct = JSON.parse(product);
  console.log('CURRENT', currentProduct);
  const currentRelatedProducts = JSON.parse(relatedProducts);
  const [currentRoute, setCurrentRoute] = useState('');
  const sliderRef = useRef<HTMLUListElement | null>(null);
  const [sliderPosition, setSliderPosition] = useState(0);

  const currentSlide = useMemo<number>(() => {
    return Math.floor(sliderPosition / slideWidth);
  }, [sliderPosition]);

  const goToNextSlide = useCallback(() => {
    scrollToSlide(sliderRef.current, currentSlide + 1);
  }, [currentSlide]);
  const goToPreviousSlide = useCallback(() => {
    scrollToSlide(sliderRef.current, currentSlide - 1);
  }, [currentSlide]);

  if (!currentProduct || !product)
    return <div className={styles.loadingComponent}>Loading!</div>;
  const { id, name, stars, reviews } = currentProduct;

  return (
    <div className={styles.mainContainer}>
      <h2>{currentRoute}</h2>
      <section className={styles.productInfo}>
        <div className={styles.productHeader} key={id}>
          <p className={styles.productTitle}>{name}</p>
          <div className={styles.stars}>
            <Rating name="read-only" value={stars} readOnly />
            <span>({reviews.length})</span>
          </div>
        </div>
        <ProductCard product={currentProduct} />
      </section>
      <DisplayReviews productId={id} reviews={reviews} />
      <h2 className={styles.relatedProductsTitle}>Related Products</h2>
      <div className={styles.relatedProductsContainer}>
        <ul
          onScroll={(e) => {
            setSliderPosition(e.currentTarget.scrollLeft);
          }}
          ref={sliderRef}
          className={styles.relatedProducts}
        >
          {currentRelatedProducts.map((product: any) => {
            return (
              <li
                onClick={() => {
                  console.log('RELATED PRODUCT', product);
                  // queryClient.invalidateQueries(['product']);
                  // queryClient.refetchQueries(['product']);
                  router.push(`/shop/${product.category.name}/${product.id}`);
                  // window.location.reload();
                }}
                key={product.id}
                className={styles.relatedProductCard}
              >
                <div className={styles.productHeader}>
                  <Rating
                    name="read-only"
                    value={product.stars}
                    readOnly
                    size="small"
                    className={styles.productRating}
                  />
                  <span>{product.name}</span>
                </div>
                <Image
                  className={styles.relatedProductImage}
                  src={product.url}
                  alt={product.name}
                  width={250}
                  height={280}
                  loader={imageLoader}
                  unoptimized // ver esto  has a "loader" property that does not implement width.
                  // Please implement it or use the "unoptimized" property instead.
                />
                <p className={styles.productPrice}>Price: {product.price}$</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.sliderButtons}>
        <button
          className={styles.sliderPrevious}
          onClick={() => goToPreviousSlide()}
        >
          <ArrowForwardIosIcon />
        </button>
        <button className={styles.sliderNext} onClick={() => goToNextSlide()}>
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};

Product.getLayout = function getLayout(page: ReactElement) {
  return (
    <main className={styles.main}>
      <ShopHeader />
      {page}
      <Footer />
    </main>
  );
};

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ resolvedUrl, req }) {
    const index = resolvedUrl.lastIndexOf('/');
    console.log('resolvedUrl.substring(6)', resolvedUrl.substring(6));
    const product = await prisma.product.findUnique({
      where: {
        id: resolvedUrl.substring(index + 1),
      },
      include: {
        category: true,
        reviews: true,
      },
    });
    const relatedProducts = await prisma.product.findMany({
      take: 10,
      where: {
        categoryId: product?.categoryId,
        id: {
          not: product?.id,
        },
      },
      include: {
        category: true,
      },
    });
    return {
      props: {
        product: JSON.stringify(product),
        relatedProducts: JSON.stringify(relatedProducts),
      },
    };
  },
  sessionOptions
);

export default Product;
