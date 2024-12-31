import React, { useState } from 'react';
import commentorIcons from "../../../assets/avatar.png";
import { formatDate } from '../../../utils/formatDate';
import RatingStars from '../../../components/RatingStars';
import PostAReview from './PostAReview';

const ReviewsCart = ({ productReviews }) => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const reviews = productReviews || [];

  const handleOpenReviewModel = () => {
    setIsModelOpen(true)

  }
  const handlecloseReviewModel = () => {
    setIsModelOpen(false)
  }
  return (
    <div className='my-6 bg-white p-8'>
      <div>
        {reviews.length > 0 ? (
          <div>
            <h3 className='text-lg font-medium'>All comments...</h3>
            <div>
              {reviews.map((review, index) => (
                <div key={index} className='mt-4'>
                  <div className='flex gap-4 items-center'>
                    <img src={commentorIcons} alt="" className='size-14'/>
                    <div className='space-y-1'>
                      <p className='text-lg font-medium underline capitalize underline-offset-4 text-blue-400'>{review?.userId.username}</p>
                      <p className='text-[12px] italic'>{formatDate(review?.createdAt)}</p>
                      <RatingStars rating={review?.rating} />
                    </div>
                  </div>
                  <div className='text-gray-600 mt-5 border p-8'>
                    <p className='md:w-4/5'>{review?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No reviews yet!</p>
        )}
      </div>

      {/* add review button*/}
      <div className='mt-12'>
        <button
        onClick={handleOpenReviewModel}
        className='px-6 py-3 bg-primary text-white rounded-md'>Add a Review</button>
      </div>

      {/* review model*/}
      <PostAReview isModelOpen={isModelOpen} handleClose={handlecloseReviewModel}/>
    </div>
  );
};

export default ReviewsCart;
