import { Rating } from '@mui/material';
import Image from 'next/image';
import imageLoader from '@/utils/imageLoader';
import styles from '../styles/Shop.module.css';
import { useRouter } from 'next/router';
import { useShopStore } from '@/lib/store';
import { motion } from 'framer-motion';

const ImageCard = ({ product, i }: { product: any; i?: number }) => {
  const router = useRouter();
  const currentRoute = router.asPath;
  const cart = useShopStore((state) => state.cart);
  const updateCart = useShopStore((state) => state.updateCart);
  console.log('PRODUCT', product);
  // console.log(
  //   'TEST ROUTE',
  //   `${currentRoute}/${product.category.name}/${product.id}`
  // );
  const handleAddToCart = () => {
    updateCart(product);
  };

  const staggerAnimProduct = {
    hidden: {
      opacity: 0,
      translateY: -50,
    },
    visible: {
      translateY: 0,
      opacity: 1,
      transition: {
        duration: 0.1,
        delay: i ? i * 0.1 : 0,
        type: 'ease',
      },
    },
  };

  return (
    <motion.li
      className={styles.productCard}
      key={product.id}
      initial="hidden"
      animate="visible"
      variants={staggerAnimProduct}
      // initial={{
      //   opacity: 0,
      //   translateY: -50,
      // }}
      // animate={{
      //   opacity: 1,
      //   translateY: 0,
      // }}
      // transition={{ duration: 0.3, delay: i * 0.2 }}
    >
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
          router.push(`/shop/${product.category.name}/${product.id}`)
        }
        className={styles.productImage}
        src={product.url}
        alt={product.name}
        width={320}
        height={350}
        loader={imageLoader}
        unoptimized // ver esto  has a "loader" property that does not implement width.
        // Please implement it or use the "unoptimized" property instead.
      />
      <div className={styles.productFooter}>
        <p className={styles.productPrice}>{product.price}$</p>
        <button onClick={handleAddToCart} className={styles.addToCartButton}>
          Add to Cart
        </button>
      </div>
    </motion.li>
  );
};

export default ImageCard;
