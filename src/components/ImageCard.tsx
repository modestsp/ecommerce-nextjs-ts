import { Rating } from '@mui/material';
import Image from 'next/image';
import imageLoader from '@/utils/imageLoader';
import styles from '../styles/Shop.module.css';
import { useRouter } from 'next/router';

const ImageCard = ({ product }: { product: any }) => {
  const router = useRouter();
  const currentRoute = router.asPath;
  return (
    <article className={styles.productCard} key={product.id}>
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
          router.push(`${currentRoute}/${product.category.name}/${product.id}`)
        }
        className={styles.productImage}
        src={product.url}
        alt={product.name}
        width={300}
        height={350}
        loader={imageLoader}
        unoptimized // ver esto  has a "loader" property that does not implement width.
        // Please implement it or use the "unoptimized" property instead.
      />
      <div className={styles.productFooter}>
        <p>{product.price}$</p>
        <button className={styles.addToCartButton}>Add to Cart</button>
      </div>
    </article>
  );
};

export default ImageCard;
