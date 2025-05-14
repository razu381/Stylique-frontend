import { Rating } from "@smastrom/react-rating";
import React from "react";

function Review({ userReview }) {
  let { rating, review } = userReview;
  return (
    <div className="border border-black/10 border-opacity-10 rounded-[20px] p-5">
      <div className="flex justify-start items-center gap-5">
        <Rating
          style={{ maxWidth: 100 }}
          value={rating}
          readOnly
          className="w-contain"
        />
        <p>{rating}/5</p>
      </div>
      <p className="mt-5">{review}</p>
    </div>
  );
}
export default Review;
