import { useQuery } from "@tanstack/react-query";
import React from "react";
import Review from "../../shared components/Review";
import axios from "axios";

function AllReviews({ _id }) {
  console.log("Id from all reviews", _id);
  //fetch reviews from database
  const {
    isLoading,
    error,
    data: reviews = [],
    refetch,
  } = useQuery({
    queryKey: ["review", _id],
    queryFn: async () => {
      let result = await axios.get(
        `https://stylique-backend.vercel.app/reviews/${_id}`
      );

      return result.data;
    },
  });
  //console.log(reviews);

  return (
    <div>
      {reviews.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((userReview) => (
            <Review userReview={userReview} />
          ))}
        </div>
      ) : (
        <p className="font-bold text-2xl py-10">
          There's no review for this product
        </p>
      )}
    </div>
  );
}

export default AllReviews;
