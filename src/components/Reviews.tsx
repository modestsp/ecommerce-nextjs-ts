import { TextField } from '@mui/material';
import { Review } from '@prisma/client';
import { useState } from 'react';
import styles from '../styles/Product.module.css';

const DisplayReviews = ({
  productId,
  reviews,
}: {
  productId: string;
  reviews: Review[];
}) => {
  const [review, setReview] = useState('');
  const handleSubmit = async () => {
    const createReviewUrl = '/api/review/create';
    const response = await fetch(createReviewUrl, {
      method: 'POST',
      body: JSON.stringify({
        productId,
        description: review,
      }),
    });
    console.log('CREATED REVIEW', response.json());
  };
  return (
    <section className={styles.reviews}>
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
    </section>
  );
};

export default DisplayReviews;
