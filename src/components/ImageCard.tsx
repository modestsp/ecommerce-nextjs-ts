import { Rating } from '@mui/material';
import Image from 'next/image';
import imageLoader from '@/utils/imageLoader';
import styles from '../styles/Shop.module.css';
import { useRouter } from 'next/router';
import { useShopStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const ImageCard = ({ product, i }: { product: any; i?: number }) => {
  const router = useRouter();
  // const [addedToCart, setAddedToCart] = useState<boolean>(false);
  const currentRoute = router.asPath;
  const cart = useShopStore((state) => state.cart);
  const updateCart = useShopStore((state) => state.updateCart);
  const updatePrice = useShopStore((state) => state.setTotalPrice);
  const increaseProduct = useShopStore((state) => state.increaseProduct);
  const decreaseProduct = useShopStore((state) => state.decreaseProduct);
  // const totalPrice = useShopStore(state => state.totalPrice)
  const currentProduct = useShopStore((state) =>
    state.cart.find((p) => p.id === product.id)
  );

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    // setAddedToCart(true);
    updateCart(product);
    updatePrice(product.price, 'add');
  };
  const handleIncreaseProduct = () => {
    increaseProduct(product.id);
    updatePrice(product.price, 'add');
  };
  const handleDecreaseProduct = () => {
    decreaseProduct(product.id);
    updatePrice(product.price, 'substract');
    // if (currentProduct?.quantity! <= 0) {
    //   setAddedToCart(false);
    // }
  };
  const staggerAnimProduct = {
    hidden: {
      opacity: 0,
      // translateY: -50,
    },
    visible: {
      // translateY: 0,
      opacity: 1,
      // transition: {
      //   duration: 0.1,
      // },
    },
  };

  return (
    <motion.li
      className={styles.productCard}
      key={product.id}
      initial="hidden"
      animate="visible"
      variants={staggerAnimProduct}
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
        <p className={styles.productPrice}>${product.price}</p>
        <div>
          {currentProduct?.quantity ? (
            <div className={styles.updateProductButtons}>
              <button
                onClick={handleDecreaseProduct}
                className={styles.decreaseButton}
              >
                <RemoveIcon />
              </button>
              {currentProduct?.quantity!}
              <button
                onClick={handleIncreaseProduct}
                className={styles.increaseButton}
              >
                <AddIcon />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className={styles.addToCartButton}
            >
              Add To Cart
            </button>
          )}
        </div>
      </div>
    </motion.li>
  );
};

export default ImageCard;
