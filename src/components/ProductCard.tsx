import imageLoader from '@/utils/imageLoader';
import { Button, ButtonGroup } from '@mui/material';
import styles from '../styles/Product.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Product } from '@prisma/client';

const ProductCard = ({ product }: { product: Product }) => {
  const { id, name, url, photographerUrl, photographerName, price, stars } =
    product;
  const [size, setSize] = useState<string>('');
  return (
    <div className={styles.productCard}>
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
          adipisicing elit. Aperiam maiores in cumque sequi quam expedita nulla.
          Ipsum velit rerum, hic illo officiis beatae? Quam quidem, esse
          suscipit quae ab distinctio.
        </p>
      </section>
    </div>
  );
};

export default ProductCard;
