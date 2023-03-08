import styles from '../styles/Shop.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { dropIn, fromRightToLeft } from '@/utils/animations';
import { useShopStore } from '@/lib/store';
import Image from 'next/image';
import imageLoader from '@/utils/imageLoader';
import DeleteIcon from '@mui/icons-material/Delete';
import { Rating } from '@mui/material';

export const variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.4,
      type: 'ease',
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      type: 'ease',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      type: 'ease',
    },
  },
};

const CartModal = ({
  toggleCart,
  setToggleCart,
}: {
  toggleCart: boolean;
  setToggleCart: any;
}) => {
  const cart = useShopStore((state) => state.cart);
  const totalPrice = useShopStore((state) => state.totalPrice);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className={styles.cartModal}
    >
      <button
        className={styles.closeButton}
        onClick={() => setToggleCart(!toggleCart)}
      >
        X
      </button>
      <h3 style={{ borderBottom: '1px solid black' }}>CART</h3>
      {cart.length > 0 && (
        <ul className={styles.cartProducts}>
          {cart.map((product) => {
            return (
              <li className={styles.cartProductCard} key={product.id}>
                <Image
                  src={product.url}
                  width={100}
                  height={100}
                  alt={product.name}
                  loader={imageLoader}
                />
                <div className={styles.cartProductDetails}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <h3>{product.name} </h3>
                    <Rating
                      name="read-only"
                      value={product.stars}
                      readOnly
                      size="small"
                      className={styles.productRating}
                    />
                  </div>
                  <p>Qty:{cart.find((p) => p.id === product.id)?.quantity}</p>
                  <div className={styles.productPriceCart}>
                    <span>
                      Price:{' '}
                      {product.price! *
                        cart.find((p) => p.id === product.id)?.quantity!}
                      $
                    </span>
                    <DeleteIcon />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <h3>Total: {totalPrice}$</h3>
      <button className={styles.checkoutButton}>Checkout</button>
    </motion.div>
  );
};

export default CartModal;
