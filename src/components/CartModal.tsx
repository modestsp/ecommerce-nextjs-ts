import styles from '../styles/Shop.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import { dropIn, fromRightToLeft } from '@/utils/animations';

const CartModal = ({
  toggleCart,
  setToggleCart,
}: {
  toggleCart: boolean;
  setToggleCart: any;
}) => {
  console.log('TOGGLE', toggleCart);
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
    </motion.div>
  );
};

export default CartModal;
