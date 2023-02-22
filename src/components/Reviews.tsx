import { Rating, TextField } from '@mui/material';
import { Review } from '@prisma/client';
import { useState } from 'react';
import styles from '../styles/Product.module.css';
import { format } from 'date-fns';
import { useQueryClient } from 'react-query';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
const DisplayReviews = ({
  productId,
  reviews,
}: {
  productId: string;
  reviews: Review[];
}) => {
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [reviewValue, setReviewValue] = useState<number | null>(0);
  const queryClient = useQueryClient();
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const createReviewUrl = '/api/review/create';
    const response = await fetch(createReviewUrl, {
      method: 'POST',
      body: JSON.stringify({
        productId,
        description: review,
        value: reviewValue,
      }),
    });
    if (response.status < 300) {
      queryClient.invalidateQueries(['products']);
      toast.success('Review Created!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      refreshData();
      setReview('');
      setReviewValue(0);
      setLoading(false);
    } else {
      toast.error('Something went bad :S!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      setReview('');
      setReviewValue(0);
      setLoading(false);
    }
  };

  return (
    <section className={styles.reviewsSection}>
      <div className={styles.reviewCreateForm}>
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
          {!loading ? 'Submit' : 'Loading'}
        </button>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>

      <div className={styles.reviewsContainer}>
        <h3>Reviews</h3>
        {reviews.length !== 0 ? (
          reviews.map((review) => {
            return (
              <article key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <Rating
                    name="half-rating"
                    value={review.value}
                    onChange={(event, newValue) => {
                      setReviewValue(newValue);
                    }}
                    size="small"
                  />
                  <p>{format(new Date(review.createdAt), 'MM/dd/yyyy')}</p>
                </div>
                <p className={styles.reviewDescription}>{review.description}</p>
              </article>
            );
          })
        ) : (
          <div>There is no reviews for this product</div>
        )}
      </div>
    </section>
  );
};

export default DisplayReviews;
