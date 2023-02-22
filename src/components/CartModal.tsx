import styles from '../styles/Shop.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { dropIn, fromRightToLeft } from '@/utils/animations';
import { useShopStore } from '@/lib/store';

const CartModal = ({
  toggleCart,
  setToggleCart,
}: {
  toggleCart: boolean;
  setToggleCart: any;
}) => {
  const cart = useShopStore((state) => state.cart);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fromRightToLeft}
      className={styles.cartModal}
    >
      <button
        className={styles.closeButton}
        onClick={() => setToggleCart(!toggleCart)}
      >
        X
      </button>
      <p>CART</p>
      {cart.length > 0 && (
        <ul>
          {cart.map((product) => {
            return <li key={product.id}>{product.price}</li>;
          })}
        </ul>
      )}
    </motion.div>
  );
};

export default CartModal;
