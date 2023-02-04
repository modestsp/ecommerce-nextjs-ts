import { Rating, TextField } from '@mui/material';
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
  const [reviewValue, setReviewValue] = useState<number | null>(0);
  console.log('REVIEW VALUE', reviewValue, typeof reviewValue);
  const handleSubmit = async () => {
    const createReviewUrl = '/api/review/create';
    const response = await fetch(createReviewUrl, {
      method: 'POST',
      body: JSON.stringify({
        productId,
        description: review,
        value: reviewValue,
      }),
    });
    const createdReview = await response.json();
    console.log('CREATED REVIEW', createdReview);
  };
  return (
    <section className={styles.reviewsSection}>
      <div className={styles.reviewCreate}>
        <Rating
          name="half-rating"
          value={reviewValue}
          onChange={(event, newValue) => {
            setReviewValue(newValue);
          }}
          size="small"
        />
        <TextField
          id="outlined-basic"
          label="Write a review"
          variant="outlined"
          value={review}
          multiline
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={handleSubmit} className={styles.submitReviewButton}>
          Submit
        </button>
      </div>

      <div className={styles.reviewsContainer}>
        <h3>Reviews</h3>
        {reviews.map((review) => {
          return (
            <article key={review.id} className={styles.reviewCard}>
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
